import { CheckCircle, Clock, Truck, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  order: Order;
}

const statusConfig = {
  placed: { icon: Clock, label: 'Order Placed', color: 'text-gray-500' },
  confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-orange-500' },
  preparing: { icon: Clock, label: 'Preparing', color: 'text-orange-500' },
  ready: { icon: CheckCircle, label: 'Ready for Pickup', color: 'text-orange-500' },
  out_for_delivery: { icon: Truck, label: 'Out for Delivery', color: 'text-orange-500' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-green-500' }
};

export default function OrderTracking({ order }: OrderTrackingProps) {
  const statuses: (keyof typeof statusConfig)[] = ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Estimated delivery: {order.estimatedDelivery}</span>
        </div>
      </div>

      <div className="space-y-4">
        {statuses.map((status, index) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <div key={status} className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? isCurrent 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="ml-4 flex-1">
                <div className={`font-medium ${
                  isCompleted ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {config.label}
                </div>
                {isCurrent && (
                  <div className="text-sm text-orange-500 mt-1">
                    Current status
                  </div>
                )}
              </div>
              
              {index < statuses.length - 1 && (
                <div className={`absolute left-4 mt-8 w-0.5 h-6 ${
                  index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-200'
                }`} style={{ marginLeft: '15px' }} />
              )}
            </div>
          );
        })}
      </div>

      {order.status === 'out_for_delivery' && (
        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center text-orange-700">
            <Truck className="w-5 h-5 mr-2" />
            <span className="font-medium">Your order is on its way!</span>
          </div>
          <p className="text-sm text-orange-600 mt-1">
            Track your delivery driver in real-time
          </p>
        </div>
      )}
    </div>
  );
}