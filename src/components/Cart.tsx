import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';
import { processCartCheckout } from '../services/stripe';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = async () => {
    setIsProcessingPayment(true);
    try {
      const checkoutUrl = await processCartCheckout(total);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('Payment processing failed. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Your Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                      
                      {/* Customizations */}
                      {Object.entries(item.customizations).map(([key, options]) => (
                        <div key={key} className="text-xs text-gray-500 mt-1">
                          {options.map(option => option.name).join(', ')}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessingPayment}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {isProcessingPayment ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}