import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useEffect } from 'react';

interface OrderSuccessProps {
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export default function OrderSuccess({ onContinueShopping, onViewOrders }: OrderSuccessProps) {
  useEffect(() => {
    // Clear cart or perform any cleanup after successful payment
    // This could also trigger order creation in your backend
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your payment and your food is being prepared.
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 mb-6">
          <p className="text-orange-700 font-medium mb-1">
            Estimated Delivery Time
          </p>
          <p className="text-orange-600 text-sm">
            25-35 minutes
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onViewOrders}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            Track Your Order
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          
          <button
            onClick={onContinueShopping}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}