export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  category: string;
  cuisineType: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  customizations?: Customization[];
  popular?: boolean;
}

export interface Customization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: CustomizationOption[] };
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  total: number;
  deliveryAddress: string;
  estimatedDelivery: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}