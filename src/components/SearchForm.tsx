import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearch: (restaurantName: string, menuType: string) => void;
  isLoading?: boolean;
}

const menuTypes = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "non-vegetarian", label: "Non-Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
];

const SearchForm = ({ onSearch, isLoading = false }: SearchFormProps) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [menuType, setMenuType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurantName.trim() && menuType) {
      onSearch(restaurantName.trim(), menuType);
    }
  };

  return (
    <div className="search-container">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Find the Best Dishes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover top-rated dishes at your hotel restaurant based on real guest reviews
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="restaurant" className="text-sm font-medium text-foreground">
            Restaurant Name
          </label>
          <Input
            id="restaurant"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="h-12 text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="menu-type" className="text-sm font-medium text-foreground">
            Menu Type
          </label>
          <Select value={menuType} onValueChange={setMenuType} required>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select menu type" />
            </SelectTrigger>
            <SelectContent>
              {menuTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold"
          disabled={isLoading || !restaurantName.trim() || !menuType}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              <span>Searching...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Get Recommendations</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;