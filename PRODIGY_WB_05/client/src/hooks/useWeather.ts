import { useQuery } from "@tanstack/react-query";
import { CurrentWeather, HourlyWeather, DailyWeather } from "@shared/schema";

interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

interface LocationData {
  name: string;
  country: string;
  state?: string;
}

export function useWeather(coordinates: { lat: number; lon: number } | null) {
  const { data: currentWeather, isLoading: currentLoading, error: currentError } = useQuery({
    queryKey: ["/api/weather/current", coordinates?.lat, coordinates?.lon],
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(`/api/weather/current?lat=${coordinates.lat}&lon=${coordinates.lon}`);
      if (!res.ok) throw new Error('Failed to fetch current weather');
      return res.json() as CurrentWeather;
    },
    enabled: !!coordinates,
  });

  const { data: forecast, isLoading: forecastLoading, error: forecastError } = useQuery({
    queryKey: ["/api/weather/forecast", coordinates?.lat, coordinates?.lon],
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(`/api/weather/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`);
      if (!res.ok) throw new Error('Failed to fetch forecast');
      return res.json() as WeatherData;
    },
    enabled: !!coordinates,
  });

  const { data: locationData, isLoading: locationLoading } = useQuery({
    queryKey: ["/api/weather/location", coordinates?.lat, coordinates?.lon],
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(`/api/weather/location?lat=${coordinates.lat}&lon=${coordinates.lon}`);
      if (!res.ok) throw new Error('Failed to fetch location name');
      return res.json() as LocationData;
    },
    enabled: !!coordinates,
  });

  const locationName = locationData 
    ? `${locationData.name}${locationData.state ? `, ${locationData.state}` : ''}, ${locationData.country}`
    : null;

  const isLoading = currentLoading || forecastLoading || locationLoading;
  const error = currentError?.message || forecastError?.message;

  const refetch = () => {
    // This will be handled by React Query's refetch functionality
  };

  return {
    currentWeather,
    forecast,
    locationName,
    isLoading,
    error,
    refetch,
  };
}
