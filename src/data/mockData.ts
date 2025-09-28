import { Restaurant, MenuItem, Order } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    description: 'Authentic Italian cuisine with fresh ingredients',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    category: 'Italian',
    cuisineType: 'Italian'
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    description: 'Premium Japanese sushi and traditional dishes',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 3.99,
    category: 'Japanese',
    cuisineType: 'Japanese'
  },
  {
    id: '3',
    name: 'Burger Palace',
    description: 'Gourmet burgers and crispy fries',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 1.99,
    category: 'American',
    cuisineType: 'Fast Food'
  },
  {
    id: '4',
    name: 'Spice Garden',
    description: 'Authentic Indian curry and tandoor specialties',
    image: 'https://images.pexels.com/photos/1580594/pexels-photo-1580594.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    deliveryTime: '35-45 min',
    deliveryFee: 2.49,
    category: 'Indian',
    cuisineType: 'Indian'
  }
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 16.99,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Pizza',
    popular: true,
    customizations: [
      {
        id: 'size',
        name: 'Size',
        required: true,
        maxSelections: 1,
        options: [
          { id: 'small', name: 'Small (10")', price: 0 },
          { id: 'medium', name: 'Medium (12")', price: 3 },
          { id: 'large', name: 'Large (14")', price: 6 }
        ]
      },
      {
        id: 'toppings',
        name: 'Extra Toppings',
        required: false,
        maxSelections: 5,
        options: [
          { id: 'pepperoni', name: 'Pepperoni', price: 2.50 },
          { id: 'mushrooms', name: 'Mushrooms', price: 1.50 },
          { id: 'olives', name: 'Black Olives', price: 1.50 },
          { id: 'peppers', name: 'Bell Peppers', price: 1.50 }
        ]
      }
    ]
  },
  {
    id: '2',
    restaurantId: '2',
    name: 'Dragon Roll',
    description: 'Shrimp tempura, cucumber, topped with eel and avocado',
    price: 14.99,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Sushi',
    popular: true
  },
  {
    id: '3',
    restaurantId: '3',
    name: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar cheese, lettuce, tomato, onion',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    customizations: [
      {
        id: 'patty',
        name: 'Patty',
        required: true,
        maxSelections: 1,
        options: [
          { id: 'beef', name: 'Beef', price: 0 },
          { id: 'chicken', name: 'Chicken', price: 1 },
          { id: 'veggie', name: 'Veggie', price: 0 }
        ]
      }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    items: [],
    status: 'out_for_delivery',
    total: 24.98,
    deliveryAddress: '123 Main St, City, State 12345',
    estimatedDelivery: '7:45 PM',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

export const categories = ['All', 'Italian', 'Japanese', 'American', 'Indian', 'Mexican', 'Chinese'];