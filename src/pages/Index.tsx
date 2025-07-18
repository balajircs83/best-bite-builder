import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { supabase } from "@/integrations/supabase/client";

interface DishWithReviews {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  reviewSummary: string;
}

const Index = () => {
  const [dishes, setDishes] = useState<DishWithReviews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({ restaurant: "", menuType: "" });

  const handleSearch = async (restaurantName: string, menuType: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchParams({ restaurant: restaurantName, menuType });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-menu-recommendations', {
        body: { restaurantName, menuType }
      });

      if (error) {
        console.error('Error generating recommendations:', error);
        setDishes([]);
      } else {
        setDishes(data.dishes || []);
      }
    } catch (error) {
      console.error('Error calling function:', error);
      setDishes([]);
    } finally {
      setIsLoading(false);
    }
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
