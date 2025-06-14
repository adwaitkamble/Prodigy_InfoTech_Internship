import { Calendar } from "lucide-react";
import { DailyWeather } from "@shared/schema";
import { convertTemperature, getWeatherIcon } from "@/lib/weatherUtils";

interface WeeklyForecastProps {
  dailyData: DailyWeather[];
  temperatureUnit: 'C' | 'F';
}

export function WeeklyForecast({ dailyData, temperatureUnit }: WeeklyForecastProps) {
  const formatDay = (timestamp: number, index: number) => {
    if (index === 0) return 'Today';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getTemperatureRange = (min: number, max: number) => {
    const minTemp = convertTemperature(min, temperatureUnit);
    const maxTemp = convertTemperature(max, temperatureUnit);
    const range = maxTemp - minTemp;
    const percentage = range > 0 ? ((maxTemp - minTemp) / 30) * 100 : 50; // Normalize to 30 degree range
    
    return Math.min(Math.max(percentage, 20), 100); // Keep between 20-100%
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mb-6">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-white text-lg font-medium mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>7-Day Forecast</span>
        </h2>
        
        <div className="space-y-3">
          {dailyData.map((day, index) => {
            const minTemp = convertTemperature(day.temp.min, temperatureUnit);
            const maxTemp = convertTemperature(day.temp.max, temperatureUnit);
            const tempRange = getTemperatureRange(day.temp.min, day.temp.max);
            const WeatherIcon = getWeatherIcon(day.weather[0]?.icon || '01d');
            
            return (
              <div 
                key={index} 
                className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-white font-medium w-20">
                    {formatDay(day.dt, index)}
                  </span>
                  <div className="text-xl w-8">
                    <WeatherIcon />
                  </div>
                  <span className="text-white/80 flex-1 capitalize">
                    {day.weather[0]?.description || 'Clear'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white/70">
                    {Math.round(minTemp)}°
                  </span>
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"
                      style={{ width: `${tempRange}%` }}
                    />
                  </div>
                  <span className="text-white font-medium">
                    {Math.round(maxTemp)}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
