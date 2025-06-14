import { useState, useEffect } from "react";
import { CloudSun, Settings } from "lucide-react";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { WeeklyForecast } from "@/components/weather/WeeklyForecast";
import { SearchSection } from "@/components/weather/SearchSection";
import { LoadingState } from "@/components/weather/LoadingState";
import { ErrorState } from "@/components/weather/ErrorState";
import { useWeather } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function WeatherPage() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('F');
  
  const { location, requestLocation, isLoading: locationLoading, error: locationError } = useGeolocation();
  
  const { 
    currentWeather, 
    forecast, 
    locationName,
    isLoading: weatherLoading,
    error: weatherError,
    refetch
  } = useWeather(coordinates);

  const isLoading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  useEffect(() => {
    if (location) {
      setCoordinates(location);
    }
  }, [location]);

  const handleLocationSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  const handleGetCurrentLocation = () => {
    requestLocation();
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'F' ? 'C' : 'F');
  };

  const handleRetry = () => {
    if (coordinates) {
      refetch();
    } else {
      requestLocation();
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLastUpdated = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CloudSun className="text-white text-2xl" />
                <h1 className="text-white text-xl font-medium">WeatherNow</h1>
              </div>
              <Settings className="text-white/80 hover:text-white transition-colors text-xl cursor-pointer" />
            </div>
          </div>
        </header>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CloudSun className="text-white text-2xl" />
                <h1 className="text-white text-xl font-medium">WeatherNow</h1>
              </div>
              <Settings className="text-white/80 hover:text-white transition-colors text-xl cursor-pointer" />
            </div>
          </div>
        </header>
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CloudSun className="text-white text-2xl" />
              <h1 className="text-white text-xl font-medium">WeatherNow</h1>
            </div>
            <Settings className="text-white/80 hover:text-white transition-colors text-xl cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Search Section */}
      <SearchSection 
        onLocationSelect={handleLocationSelect}
        onGetCurrentLocation={handleGetCurrentLocation}
      />

      {/* Current Weather */}
      {currentWeather && locationName && (
        <CurrentWeather
          weather={currentWeather}
          location={locationName}
          currentDate={getCurrentDate()}
          temperatureUnit={temperatureUnit}
          onToggleUnit={toggleTemperatureUnit}
        />
      )}

      {/* Hourly Forecast */}
      {forecast?.hourly && (
        <HourlyForecast 
          hourlyData={forecast.hourly.slice(0, 24)}
          temperatureUnit={temperatureUnit}
        />
      )}

      {/* Weekly Forecast */}
      {forecast?.daily && (
        <WeeklyForecast 
          dailyData={forecast.daily.slice(0, 7)}
          temperatureUnit={temperatureUnit}
        />
      )}

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 pb-6">
        <div className="text-center text-white/60 text-sm">
          <p>Weather data provided by OpenWeatherMap</p>
          <p className="mt-1">Last updated: {getLastUpdated()}</p>
        </div>
      </footer>
    </div>
  );
}
