import { Star } from "lucide-react";

interface DishCardProps {
  dish: {
    id: string;
    name: string;
    description: string;
    averageRating: number;
    reviewCount: number;
    reviewSummary: string;
  };
}

const DishCard = ({ dish }: DishCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-rating-star text-rating-star" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-5 w-5 text-muted-foreground" />
            <Star 
              className="h-5 w-5 fill-rating-star text-rating-star absolute top-0 left-0" 
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-5 w-5 text-muted-foreground" />
        );
      }
    }

    return stars;
  };

  return (
    <div className="dish-card">
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-foreground">{dish.name}</h3>
        
        <p className="text-muted-foreground text-base leading-relaxed">
          {dish.description}
        </p>
        
        <div className="flex items-center space-x-3">
          <div className="rating-stars">
            {renderStars(dish.averageRating)}
          </div>
          <span className="text-sm font-medium text-foreground">
            {dish.averageRating.toFixed(1)}/5
          </span>
          <span className="text-sm text-muted-foreground">
            ({dish.reviewCount} review{dish.reviewCount !== 1 ? 's' : ''})
          </span>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground italic">
            "{dish.reviewSummary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default DishCard;