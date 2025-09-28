import { Plus, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.popular && (
              <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <span className="text-lg font-bold text-orange-500">${item.price}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {item.category}
            </span>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full flex items-center text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}