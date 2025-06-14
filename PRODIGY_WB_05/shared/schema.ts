import { z } from "zod";

export const LocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  name: z.string(),
  country: z.string(),
  state: z.string().optional(),
});

export const WeatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const CurrentWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  weather: z.array(WeatherConditionSchema),
});

export const HourlyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  weather: z.array(WeatherConditionSchema),
});

export const DailyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.object({
    min: z.number(),
    max: z.number(),
  }),
  weather: z.array(WeatherConditionSchema),
});

export const WeatherDataSchema = z.object({
  location: LocationSchema,
  current: CurrentWeatherSchema,
  hourly: z.array(HourlyWeatherSchema),
  daily: z.array(DailyWeatherSchema),
});

export const LocationSearchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export const GeolocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export type Location = z.infer<typeof LocationSchema>;
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;
export type DailyWeather = z.infer<typeof DailyWeatherSchema>;
export type WeatherData = z.infer<typeof WeatherDataSchema>;
export type LocationSearch = z.infer<typeof LocationSearchSchema>;
export type Geolocation = z.infer<typeof GeolocationSchema>;
