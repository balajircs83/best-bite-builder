import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary">
            <ChefHat className="h-8 w-8" />
            <span>Best Menu Generator</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/submit-review" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Submit Review
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
          </div>
          
          {/* Mobile menu button - will implement later */}
          <div className="md:hidden">
            <button className="text-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;