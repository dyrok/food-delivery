import { useState } from 'react';
import { CartItem, MenuItem, CustomizationOption } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem, customizations: { [key: string]: CustomizationOption[] }, quantity: number) => {
    const basePrice = menuItem.price;
    const customizationPrice = Object.values(customizations).flat().reduce((sum, option) => sum + option.price, 0);
    const totalPrice = (basePrice + customizationPrice) * quantity;

    const cartItem: CartItem = {
      id: `${menuItem.id}_${Date.now()}_${Math.random()}`,
      menuItem,
      quantity,
      customizations,
      totalPrice
    };

    setCartItems(prev => [...prev, cartItem]);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const basePrice = item.menuItem.price;
          const customizationPrice = Object.values(item.customizations).flat().reduce((sum, option) => sum + option.price, 0);
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: (basePrice + customizationPrice) * newQuantity
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartItemsCount
  };
}