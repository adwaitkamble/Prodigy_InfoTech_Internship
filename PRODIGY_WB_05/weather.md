# Weather Application

## Overview

This is a modern weather application built with React, TypeScript, and Node.js. The application provides current weather conditions, hourly forecasts, and weekly forecasts for any location worldwide. It features a clean, responsive interface with location search capabilities and geolocation support.

## System Architecture

The application follows a full-stack architecture with a clear separation between client and server components:

- **Frontend**: React SPA with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **API Integration**: OpenWeatherMap API for weather data
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components for consistent UI design
- **Weather Components**: Specialized components for current weather, hourly forecast, and weekly forecast
- **Hooks**: Custom hooks for geolocation and weather data fetching
- **Utilities**: Weather icon mapping and temperature conversion utilities

### Backend Architecture
- **Express Server**: RESTful API endpoints for weather data
- **Weather Routes**: 
  - `/api/weather/current` - Current weather by coordinates
  - `/api/weather/forecast` - Forecast data by coordinates
  - `/api/weather/search` - Location search functionality
- **Storage**: Memory-based storage implementation (prepared for database integration)

### Data Flow

1. **Location Input**: User can search for locations or use geolocation
2. **API Requests**: Frontend makes requests to backend weather endpoints
3. **External API**: Backend fetches data from OpenWeatherMap API
4. **Data Processing**: Weather data is processed and validated using Zod schemas
5. **UI Updates**: React components update with new weather information

## External Dependencies

### Core Dependencies
- **React & TypeScript**: Frontend framework and type safety
- **Express.js**: Backend web framework
- **TanStack Query**: Server state management and caching
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible UI components
- **Wouter**: Lightweight routing library

### Weather Integration
- **OpenWeatherMap API**: External weather data provider
- **Zod**: Schema validation for API responses
- **Date-fns**: Date manipulation utilities

### Database (Prepared)
- **Drizzle ORM**: Type-safe database ORM
- **PostgreSQL**: Relational database (configured via @neondatabase/serverless)

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` - Runs both client and server in development mode
- **Build**: `npm run build` - Builds client with Vite and server with esbuild
- **Production**: `npm run start` - Serves the built application

### Environment Configuration
- **NODE_ENV**: Controls development/production behavior
- **OPENWEATHER_API_KEY**: Required for weather API access
- **DATABASE_URL**: PostgreSQL connection (optional for current functionality)

### Build Process
1. Vite builds the React client into `dist/public`
2. esbuild bundles the Express server into `dist/index.js`
3. Static files are served from the built client directory

## Changelog
```
Changelog:
- June 14, 2025. Initial setup - Weather app with React, TypeScript, Express
- June 14, 2025. Added submit button for location search and fallback data system
```

## User Preferences

Preferred communication style: Simple, everyday language.