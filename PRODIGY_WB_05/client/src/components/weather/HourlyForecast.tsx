import { Clock } from "lucide-react";
import { HourlyWeather } from "@shared/schema";
import { convertTemperature, getWeatherIcon } from "@/lib/weatherUtils";

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
  temperatureUnit: 'C' | 'F';
}

export function HourlyForecast({ hourlyData, temperatureUnit }: HourlyForecastProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    
    if (date.getHours() === now.getHours() && date.getDate() === now.getDate()) {
      return 'Now';
    }
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mb-6">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-white text-lg font-medium mb-4 flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>24-Hour Forecast</span>
        </h2>
        
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {hourlyData.map((hour, index) => {
            const temperature = convertTemperature(hour.temp, temperatureUnit);
            const WeatherIcon = getWeatherIcon(hour.weather[0]?.icon || '01d');
            
            return (
              <div 
                key={index} 
                className="flex-shrink-0 bg-white/10 rounded-xl p-4 text-center min-w-[80px] border border-white/20"
              >
                <p className="text-white/70 text-sm mb-2">
                  {formatTime(hour.dt)}
                </p>
                <div className="text-2xl mb-2">
                  <WeatherIcon />
                </div>
                <p className="text-white font-medium">
                  {Math.round(temperature)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
