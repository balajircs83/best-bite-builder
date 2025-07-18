// Dummy data for testing the Best Menu Generator

export interface Restaurant {
  id: string;
  name: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  menuType: string;
  restaurantId: string;
}

export interface Review {
  id: string;
  dishId: string;
  rating: number;
  reviewText: string;
  userId: string;
  timestamp: string;
}

export interface DishWithReviews {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  reviewSummary: string;
}

// Dummy restaurants
export const restaurants: Restaurant[] = [
  { id: "1", name: "Grand Palace Hotel Restaurant" },
  { id: "2", name: "Oceanview Resort Dining" },
];

// Dummy dishes
export const dishes: Dish[] = [
  // Grand Palace Hotel Restaurant - Breakfast
  { id: "1", name: "Eggs Benedict Royale", description: "Poached eggs on English muffins with smoked salmon and hollandaise sauce", menuType: "breakfast", restaurantId: "1" },
  { id: "2", name: "Avocado Toast Supreme", description: "Multigrain toast topped with smashed avocado, cherry tomatoes, and feta cheese", menuType: "breakfast", restaurantId: "1" },
  { id: "3", name: "Berry Pancake Stack", description: "Fluffy pancakes with fresh berries, maple syrup, and whipped cream", menuType: "breakfast", restaurantId: "1" },
  
  // Grand Palace Hotel Restaurant - Lunch  
  { id: "4", name: "Grilled Salmon Caesar", description: "Fresh Atlantic salmon over crisp romaine with parmesan and house-made croutons", menuType: "lunch", restaurantId: "1" },
  { id: "5", name: "Truffle Mushroom Risotto", description: "Creamy arborio rice with wild mushrooms and truffle oil", menuType: "lunch", restaurantId: "1" },
  
  // Grand Palace Hotel Restaurant - Dinner
  { id: "6", name: "Wagyu Beef Tenderloin", description: "Premium wagyu beef with roasted vegetables and red wine reduction", menuType: "dinner", restaurantId: "1" },
  { id: "7", name: "Lobster Thermidor", description: "Fresh lobster in cognac cream sauce with gruyere cheese", menuType: "dinner", restaurantId: "1" },
  
  // Grand Palace Hotel Restaurant - Vegetarian
  { id: "8", name: "Quinoa Buddha Bowl", description: "Organic quinoa with roasted vegetables, chickpeas, and tahini dressing", menuType: "vegetarian", restaurantId: "1" },
  
  // Oceanview Resort Dining - Breakfast
  { id: "9", name: "Tropical Acai Bowl", description: "Acai puree topped with granola, fresh fruits, and coconut flakes", menuType: "breakfast", restaurantId: "2" },
  { id: "10", name: "Coconut French Toast", description: "Brioche French toast with coconut cream and tropical fruit compote", menuType: "breakfast", restaurantId: "2" },
  
  // Oceanview Resort Dining - Lunch
  { id: "11", name: "Catch of the Day", description: "Fresh local fish grilled with lemon herbs and seasonal vegetables", menuType: "lunch", restaurantId: "2" },
  { id: "12", name: "Poke Bowl", description: "Fresh tuna poke with sushi rice, edamame, and wasabi aioli", menuType: "lunch", restaurantId: "2" },
  
  // Oceanview Resort Dining - Dinner
  { id: "13", name: "Surf and Turf", description: "Grilled lobster tail and beef filet with garlic butter", menuType: "dinner", restaurantId: "2" },
  
  // Oceanview Resort Dining - Vegan
  { id: "14", name: "Plant-Based Pad Thai", description: "Rice noodles with tofu, vegetables, and coconut-based sauce", menuType: "vegan", restaurantId: "2" },
  
  // Oceanview Resort Dining - Gluten-Free
  { id: "15", name: "Grilled Chicken Salad", description: "Free-range chicken breast with mixed greens and gluten-free dressing", menuType: "gluten-free", restaurantId: "2" },
];

// Dummy reviews
export const reviews: Review[] = [
  // Eggs Benedict Royale
  { id: "1", dishId: "1", rating: 5, reviewText: "Absolutely perfect! The hollandaise was divine.", userId: "user1", timestamp: "2024-01-15" },
  { id: "2", dishId: "1", rating: 4, reviewText: "Great dish, salmon was fresh and delicious.", userId: "user2", timestamp: "2024-01-16" },
  { id: "3", dishId: "1", rating: 5, reviewText: "Best eggs benedict I've ever had!", userId: "user3", timestamp: "2024-01-17" },
  
  // Avocado Toast Supreme
  { id: "4", dishId: "2", rating: 4, reviewText: "Fresh ingredients and great presentation.", userId: "user4", timestamp: "2024-01-18" },
  { id: "5", dishId: "2", rating: 3, reviewText: "Good but a bit overpriced.", userId: "user5", timestamp: "2024-01-19" },
  
  // Berry Pancake Stack
  { id: "6", dishId: "3", rating: 5, reviewText: "Fluffy and delicious, kids loved it!", userId: "user6", timestamp: "2024-01-20" },
  { id: "7", dishId: "3", rating: 4, reviewText: "Great portion size and fresh berries.", userId: "user7", timestamp: "2024-01-21" },
  
  // Grilled Salmon Caesar
  { id: "8", dishId: "4", rating: 5, reviewText: "Perfect salmon, cooked to perfection.", userId: "user8", timestamp: "2024-01-22" },
  { id: "9", dishId: "4", rating: 4, reviewText: "Fresh and tasty, would order again.", userId: "user9", timestamp: "2024-01-23" },
  
  // Truffle Mushroom Risotto
  { id: "10", dishId: "5", rating: 4, reviewText: "Rich and creamy, amazing truffle aroma.", userId: "user10", timestamp: "2024-01-24" },
];

// Function to get dishes with calculated ratings and review summaries
export const getDishesWithReviews = (restaurantName: string, menuType: string): DishWithReviews[] => {
  // Find restaurant by name (case insensitive)
  const restaurant = restaurants.find(
    r => r.name.toLowerCase().includes(restaurantName.toLowerCase())
  );
  
  if (!restaurant) {
    return [];
  }
  
  // Get dishes for the restaurant and menu type
  const restaurantDishes = dishes.filter(
    d => d.restaurantId === restaurant.id && d.menuType.toLowerCase() === menuType.toLowerCase()
  );
  
  // Calculate ratings and create dish objects with review data
  const dishesWithReviews = restaurantDishes.map(dish => {
    const dishReviews = reviews.filter(r => r.dishId === dish.id);
    
    if (dishReviews.length === 0) {
      return null; // Skip dishes with no reviews
    }
    
    const averageRating = dishReviews.reduce((sum, review) => sum + review.rating, 0) / dishReviews.length;
    const reviewCount = dishReviews.length;
    
    // Create a summary from the highest rated review
    const bestReview = dishReviews.reduce((best, current) => 
      current.rating > best.rating ? current : best
    );
    
    return {
      id: dish.id,
      name: dish.name,
      description: dish.description,
      averageRating,
      reviewCount,
      reviewSummary: bestReview.reviewText
    };
  }).filter((dish): dish is DishWithReviews => dish !== null);
  
  // Sort by average rating (highest first), then by review count
  return dishesWithReviews
    .sort((a, b) => {
      if (a.averageRating !== b.averageRating) {
        return b.averageRating - a.averageRating;
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 5); // Return top 5 dishes
};

// Function to get restaurant suggestions for autocomplete
export const getRestaurantSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  return restaurants
    .filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    .map(r => r.name);
};