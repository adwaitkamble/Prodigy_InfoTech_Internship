import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Eye } from "lucide-react";

export function convertTemperature(tempCelsius: number, unit: 'C' | 'F'): number {
  if (unit === 'F') {
    return (tempCelsius * 9/5) + 32;
  }
  return tempCelsius;
}

export function getWeatherIcon(iconCode: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    '01d': Sun, // clear sky day
    '01n': Sun, // clear sky night
    '02d': Cloud, // few clouds day
    '02n': Cloud, // few clouds night
    '03d': Cloud, // scattered clouds day
    '03n': Cloud, // scattered clouds night
    '04d': Cloud, // broken clouds day
    '04n': Cloud, // broken clouds night
    '09d': CloudDrizzle, // shower rain day
    '09n': CloudDrizzle, // shower rain night
    '10d': CloudRain, // rain day
    '10n': CloudRain, // rain night
    '11d': Zap, // thunderstorm day
    '11n': Zap, // thunderstorm night
    '13d': CloudSnow, // snow day
    '13n': CloudSnow, // snow night
    '50d': Eye, // mist day
    '50n': Eye, // mist night
  };

  return iconMap[iconCode] || Sun;
}

export function getWeatherIconColor(iconCode: string): string {
  const colorMap: Record<string, string> = {
    '01d': 'text-yellow-400', // clear sky day
    '01n': 'text-blue-200', // clear sky night
    '02d': 'text-yellow-300', // few clouds day
    '02n': 'text-gray-300', // few clouds night
    '03d': 'text-gray-300', // scattered clouds day
    '03n': 'text-gray-400', // scattered clouds night
    '04d': 'text-gray-400', // broken clouds day
    '04n': 'text-gray-500', // broken clouds night
    '09d': 'text-blue-300', // shower rain day
    '09n': 'text-blue-400', // shower rain night
    '10d': 'text-blue-300', // rain day
    '10n': 'text-blue-400', // rain night
    '11d': 'text-yellow-300', // thunderstorm day
    '11n': 'text-yellow-400', // thunderstorm night
    '13d': 'text-blue-100', // snow day
    '13n': 'text-blue-200', // snow night
    '50d': 'text-gray-300', // mist day
    '50n': 'text-gray-400', // mist night
  };

  return colorMap[iconCode] || 'text-yellow-400';
}
