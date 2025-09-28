interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500 hover:text-orange-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}