import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { getDishesWithReviews, DishWithReviews } from "@/data/dummyData";

const Index = () => {
  const [dishes, setDishes] = useState<DishWithReviews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({ restaurant: "", menuType: "" });

  const handleSearch = async (restaurantName: string, menuType: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchParams({ restaurant: restaurantName, menuType });
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      const results = getDishesWithReviews(restaurantName, menuType);
      setDishes(results);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        <SearchResults 
          dishes={dishes}
          restaurantName={searchParams.restaurant}
          menuType={searchParams.menuType}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </main>
      
      <footer className="bg-muted border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Best Menu Generator. Helping you find the perfect dish.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
