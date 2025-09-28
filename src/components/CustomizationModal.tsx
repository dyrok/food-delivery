import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { MenuItem, Customization, CustomizationOption } from '../types';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onAddToCart: (item: MenuItem, customizations: { [key: string]: CustomizationOption[] }, quantity: number) => void;
}

export default function CustomizationModal({ isOpen, onClose, item, onAddToCart }: CustomizationModalProps) {
  const [selectedCustomizations, setSelectedCustomizations] = useState<{ [key: string]: CustomizationOption[] }>({});
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const handleCustomizationChange = (customizationId: string, option: CustomizationOption, isSelected: boolean) => {
    const customization = item.customizations?.find(c => c.id === customizationId);
    if (!customization) return;

    setSelectedCustomizations(prev => {
      const current = prev[customizationId] || [];
      
      if (isSelected) {
        if (customization.maxSelections === 1) {
          return { ...prev, [customizationId]: [option] };
        } else {
          return { ...prev, [customizationId]: [...current, option] };
        }
      } else {
        return { ...prev, [customizationId]: current.filter(o => o.id !== option.id) };
      }
    });
  };

  const calculatePrice = () => {
    let price = item.price;
    Object.values(selectedCustomizations).forEach(options => {
      options.forEach(option => {
        price += option.price;
      });
    });
    return price * quantity;
  };

  const canAddToCart = () => {
    if (!item.customizations) return true;
    
    return item.customizations.every(customization => {
      if (!customization.required) return true;
      const selected = selectedCustomizations[customization.id] || [];
      return selected.length > 0;
    });
  };

  const handleAddToCart = () => {
    onAddToCart(item, selectedCustomizations, quantity);
    setSelectedCustomizations({});
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Customize Your Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>

          {item.customizations?.map((customization: Customization) => (
            <div key={customization.id} className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">{customization.name}</h4>
                {customization.required && (
                  <span className="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded">Required</span>
                )}
              </div>
              
              <div className="space-y-2">
                {customization.options.map((option: CustomizationOption) => {
                  const isSelected = selectedCustomizations[customization.id]?.some(o => o.id === option.id) || false;
                  
                  return (
                    <label key={option.id} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type={customization.maxSelections === 1 ? "radio" : "checkbox"}
                          name={customization.id}
                          checked={isSelected}
                          onChange={(e) => handleCustomizationChange(customization.id, option, e.target.checked)}
                          className="mr-3 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-gray-700">{option.name}</span>
                      </div>
                      {option.price > 0 && (
                        <span className="text-gray-600 text-sm">+${option.price}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between py-4 border-t border-gray-200">
            <span className="font-medium text-gray-800">Quantity</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              canAddToCart()
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add to Cart - ${calculatePrice().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}