import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface SearchFormProps {
  onSearch: (hotelName: string, city: string, menuType: string) => void;
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

// Static list of Indian states (can be replaced with API-powered list later)
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Static mapping of states to cities (for demo; can be replaced with API-powered list)
const stateToCities: Record<string, string[]> = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Vellore", "Tirunelveli", "Thoothukudi", "Dindigul"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davanagere", "Ballari", "Tumakuru", "Shivamogga", "Raichur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Akola"],
  // ...add more states and cities as needed
};

// Debug helper
const debug = (...args: any[]) => { if (typeof window !== 'undefined') console.log('[SearchForm]', ...args); };

const SearchForm = ({ onSearch, isLoading = false }: SearchFormProps) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [hotelQuery, setHotelQuery] = useState("");
  const [hotelSuggestions, setHotelSuggestions] = useState<{ name: string; lat: string; lon: string }[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<{ name: string; lat: string; lon: string } | null>(null);

  const cities = stateToCities[state] || [];

  // Fetch hotel suggestions from Nominatim when city and hotelQuery are set
  useEffect(() => {
    debug('State:', state, 'City:', city, 'HotelQuery:', hotelQuery);
  }, [state, city, hotelQuery]);

  useEffect(() => {
    debug('Hotel suggestions:', hotelSuggestions);
  }, [hotelSuggestions]);
  useEffect(() => {
    debug('Selected hotel:', selectedHotel);
  }, [selectedHotel]);

  useEffect(() => {
    if (city && hotelQuery.length > 2) {
      const fetchHotels = async () => {
        try {
          const url = `https://nominatim.openstreetmap.org/search?q=hotel+${encodeURIComponent(hotelQuery)}+${encodeURIComponent(city)}+India&format=json&addressdetails=1&extratags=1&limit=5`;
          debug('Fetching hotels from:', url);
          const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
          const data = await res.json();
          debug('Nominatim data:', data);
          if (Array.isArray(data)) {
            setHotelSuggestions(
              data.map((item: any) => ({
                name: item.display_name,
                lat: item.lat,
                lon: item.lon,
              }))
            );
          } else {
            setHotelSuggestions([]);
          }
        } catch (err) {
          debug('Hotel fetch error:', err);
          setHotelSuggestions([]);
        }
      };
      fetchHotels();
    } else {
      setHotelSuggestions([]);
    }
  }, [city, hotelQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHotel && city && menuType) {
      onSearch(selectedHotel.name, city, menuType);
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
          <label htmlFor="state" className="text-sm font-medium text-foreground">
            State
          </label>
          <Select value={state} onValueChange={setState} required>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((stateName) => (
                <SelectItem key={stateName} value={stateName}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-foreground">
            City
          </label>
          <Select value={city} onValueChange={setCity} required disabled={!state}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder={state ? "Select city" : "Select state first"} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="hotel" className="text-sm font-medium text-foreground">
            Hotel Name
          </label>
          <Input
            id="hotel"
            type="text"
            placeholder={city ? "Type hotel name" : "Select city first"}
            value={hotelQuery}
            onChange={(e) => {
              setHotelQuery(e.target.value);
              setSelectedHotel(null);
            }}
            className="h-12 text-base"
            disabled={!city}
            autoComplete="off"
          />
          {hotelSuggestions.length > 0 && (
            <ul className="border rounded bg-background mt-1 max-h-40 overflow-y-auto shadow">
              {hotelSuggestions.map((hotel) => (
                <li
                  key={hotel.name + hotel.lat + hotel.lon}
                  className="px-3 py-2 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setHotelQuery(hotel.name);
                    setSelectedHotel(hotel);
                    setHotelSuggestions([]);
                  }}
                >
                  {hotel.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedHotel && selectedHotel.lat && selectedHotel.lon && !isNaN(Number(selectedHotel.lat)) && !isNaN(Number(selectedHotel.lon)) && (
          <div className="my-4">
            <h4 className="text-md font-semibold mb-2">Hotel Location</h4>
            <MapContainer
              center={[parseFloat(selectedHotel.lat), parseFloat(selectedHotel.lon)]}
              zoom={15}
              style={{ height: "300px", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[parseFloat(selectedHotel.lat), parseFloat(selectedHotel.lon)]}>
                <Popup>{selectedHotel.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

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
          disabled={isLoading || !state || !city || !selectedHotel || !selectedHotel.lat || !selectedHotel.lon || !menuType}
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