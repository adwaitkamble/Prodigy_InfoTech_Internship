import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface SearchSectionProps {
  onLocationSelect: (lat: number, lon: number) => void;
  onGetCurrentLocation: () => void;
}

export function SearchSection({ onLocationSelect, onGetCurrentLocation }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions = [], isLoading, error } = useQuery({
    queryKey: ["/api/weather/search", searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 3) return [];
      console.log(`Searching for: ${searchQuery}`);
      const res = await fetch(`/api/weather/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to search locations');
      const data = await res.json();
      console.log(`Search results:`, data);
      return data as Location[];
    },
    enabled: searchQuery.length >= 3,
  });

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length >= 3);
  };

  const handleLocationSelect = (location: Location) => {
    setSearchQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    onLocationSelect(location.lat, location.lon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleLocationSelect(suggestions[0]);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for a city or ZIP code..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                {suggestions.map((location, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {location.name}
                      {location.state && `, ${location.state}`}
                    </div>
                    <div className="text-sm text-gray-500">{location.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={searchQuery.length < 3}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 min-w-max disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            
            <Button
              type="button"
              onClick={onGetCurrentLocation}
              className="bg-white text-primary px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 min-w-max"
            >
              <MapPin className="h-4 w-4" />
              <span>Use My Location</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
