import { useState, useMemo } from 'react';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import CategoryFilter from './components/CategoryFilter';
import MenuItemCard from './components/MenuItemCard';
import Cart from './components/Cart';
import OrderTracking from './components/OrderTracking';
import CustomizationModal from './components/CustomizationModal';
import OrderSuccess from './components/OrderSuccess';
import { useCart } from './hooks/useCart';
import { restaurants, menuItems, categories, mockOrders } from './data/mockData';
import { Restaurant, MenuItem, CustomizationOption } from './types';

type View = 'restaurants' | 'menu' | 'tracking' | 'order-success';

function App() {
  const [currentView, setCurrentView] = useState<View>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  
  const { cartItems, addToCart, updateQuantity, removeItem, clearCart, cartItemsCount } = useCart();

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const restaurantMenuItems = useMemo(() => {
    if (!selectedRestaurant) return [];
    return menuItems.filter(item => item.restaurantId === selectedRestaurant.id);
  }, [selectedRestaurant]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('menu');
  };

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizations && item.customizations.length > 0) {
      setSelectedMenuItem(item);
      setIsCustomizationOpen(true);
    } else {
      addToCart(item, {}, 1);
    }
  };

  const handleCustomizedAddToCart = (item: MenuItem, customizations: { [key: string]: CustomizationOption[] }, quantity: number) => {
    addToCart(item, customizations, quantity);
  };

  const handleCheckout = () => {
    // The actual checkout is now handled in the Cart component
    // This is just a fallback
    setIsCartOpen(false);
  };

  const handleBackToRestaurants = () => {
    setCurrentView('restaurants');
    setSelectedRestaurant(null);
  };

  const handleOrderSuccess = () => {
    clearCart();
    setCurrentView('order-success');
  };

  const handleViewOrders = () => {
    setCurrentView('tracking');
  };

  // Handle URL-based navigation for order success
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/order-success') {
      handleOrderSuccess();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'restaurants' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Discover Great Food
              </h1>
              <p className="text-gray-600">
                Order from your favorite restaurants and get it delivered fast
              </p>
            </div>

            <div className="mb-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleRestaurantClick(restaurant)}
                />
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your criteria</p>
              </div>
            )}
          </>
        )}

        {currentView === 'menu' && selectedRestaurant && (
          <>
            <div className="mb-8">
              <button
                onClick={handleBackToRestaurants}
                className="text-orange-500 hover:text-orange-600 mb-4 flex items-center"
              >
                ← Back to Restaurants
              </button>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 md:h-32 relative">
                  <img
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-6 text-white">
                      <h1 className="text-3xl font-bold mb-2">{selectedRestaurant.name}</h1>
                      <p className="text-gray-200">{selectedRestaurant.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {restaurantMenuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}

        {currentView === 'tracking' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Track Your Order
              </h1>
              <p className="text-gray-600">
                Follow your order's journey from kitchen to your door
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <OrderTracking order={mockOrders[0]} />
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleBackToRestaurants}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Order Again
              </button>
            </div>
          </>
        )}

        {currentView === 'order-success' && (
          <OrderSuccess
            onContinueShopping={handleBackToRestaurants}
            onViewOrders={handleViewOrders}
          />
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CustomizationModal
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        item={selectedMenuItem}
        onAddToCart={handleCustomizedAddToCart}
      />
    </div>
  );
}

export default App;