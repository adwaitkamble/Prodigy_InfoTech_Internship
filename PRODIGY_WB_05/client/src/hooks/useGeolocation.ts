import { useState, useCallback } from "react";

interface GeolocationState {
  location: { lat: number; lon: number } | null;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setState({
          location: { lat: latitude, lon: longitude },
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setState({
          location: null,
          isLoading: false,
          error: errorMessage,
        });
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 600000, // 10 minutes
      }
    );
  }, []);

  return {
    ...state,
    requestLocation,
  };
}
