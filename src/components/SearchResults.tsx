import DishCard from "./DishCard";
import { AlertCircle } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  reviewSummary: string;
}

interface SearchResultsProps {
  dishes: Dish[];
  restaurantName: string;
  menuType: string;
  isLoading?: boolean;
  hasSearched?: boolean;
}

const SearchResults = ({ 
  dishes, 
  restaurantName, 
  menuType, 
  isLoading = false, 
  hasSearched = false 
}: SearchResultsProps) => {
  if (!hasSearched) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="search-container mt-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Finding the best dishes for you...</p>
        </div>
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="search-container mt-12">
        <div className="text-center space-y-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No reviews yet!
            </h3>
            <p className="text-muted-foreground">
              Sorry, we couldn't find reviews for <strong>{restaurantName}</strong> in the <strong>{menuType}</strong> category.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Be the first to share your experience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-container mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Top Dishes at {restaurantName}
        </h2>
        <p className="text-muted-foreground">
          {menuType.charAt(0).toUpperCase() + menuType.slice(1)} • {dishes.length} recommendation{dishes.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {dishes.map((dish, index) => (
          <div key={dish.id} className="relative">
            <div className="absolute -left-4 top-6 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <DishCard dish={dish} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;