import { Eye, Droplets, Wind, Thermometer } from "lucide-react";
import { CurrentWeather as CurrentWeatherType } from "@shared/schema";
import { convertTemperature, getWeatherIcon } from "@/lib/weatherUtils";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: string;
  currentDate: string;
  temperatureUnit: 'C' | 'F';
  onToggleUnit: () => void;
}

export function CurrentWeather({ 
  weather, 
  location, 
  currentDate, 
  temperatureUnit, 
  onToggleUnit 
}: CurrentWeatherProps) {
  const temperature = convertTemperature(weather.temp, temperatureUnit);
  const feelsLike = convertTemperature(weather.feels_like, temperatureUnit);
  const windSpeed = temperatureUnit === 'F' ? Math.round(weather.wind_speed * 2.237) : Math.round(weather.wind_speed);
  const windUnit = temperatureUnit === 'F' ? 'mph' : 'm/s';
  const visibilityMiles = Math.round(weather.visibility / 1609.34);
  const visibilityKm = Math.round(weather.visibility / 1000);
  const pressureInHg = (weather.pressure * 0.02953).toFixed(2);

  const WeatherIcon = getWeatherIcon(weather.weather[0]?.icon || '01d');

  return (
    <main className="max-w-4xl mx-auto px-4">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
        
        {/* Location and Date */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-white/90 mb-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-lg font-medium">{location}</span>
          </div>
          <p className="text-white/70">{currentDate}</p>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Temperature and Condition */}
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
              <div className="text-6xl animate-bounce-slow">
                <WeatherIcon />
              </div>
              <div>
                <div className="text-6xl lg:text-7xl font-light text-white">
                  {Math.round(temperature)}°
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    onClick={onToggleUnit}
                    className={`text-sm transition-colors ${
                      temperatureUnit === 'F' ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                  <span className="text-white/50">|</span>
                  <button 
                    onClick={onToggleUnit}
                    className={`text-sm transition-colors ${
                      temperatureUnit === 'C' ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xl text-white/90 mb-2 capitalize">
              {weather.weather[0]?.description || 'Clear'}
            </p>
            <p className="text-white/70">
              Feels like {Math.round(feelsLike)}°
            </p>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
              <Eye className="text-white/70 text-xl mb-2 mx-auto" />
              <p className="text-white/70 text-sm">Visibility</p>
              <p className="text-white font-medium">
                {temperatureUnit === 'F' ? `${visibilityMiles} mi` : `${visibilityKm} km`}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
              <Droplets className="text-white/70 text-xl mb-2 mx-auto" />
              <p className="text-white/70 text-sm">Humidity</p>
              <p className="text-white font-medium">{weather.humidity}%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
              <Wind className="text-white/70 text-xl mb-2 mx-auto" />
              <p className="text-white/70 text-sm">Wind Speed</p>
              <p className="text-white font-medium">{windSpeed} {windUnit}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
              <Thermometer className="text-white/70 text-xl mb-2 mx-auto" />
              <p className="text-white/70 text-sm">Pressure</p>
              <p className="text-white font-medium">
                {temperatureUnit === 'F' ? `${pressureInHg} in` : `${weather.pressure} hPa`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
