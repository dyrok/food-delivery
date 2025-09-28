import { Star, Clock, Truck } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
          {restaurant.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-1" />
            <span>${restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}