/**
 * Application constants - centralized location for URLs, API endpoints, and other constants
 */

// OpenWeather API endpoints
export const API_ENDPOINTS = {
  CURRENT_WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
  FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
}

// OpenWeather icon URLs
export const WEATHER_ICONS = {
  BASE_URL: 'https://openweathermap.org/img/wn',
  // Helper functions for different icon sizes
  getIcon: (icon) => `${WEATHER_ICONS.BASE_URL}/${icon}.png`,
  getIconLarge: (icon) => `${WEATHER_ICONS.BASE_URL}/${icon}@2x.png`,
  getIconXLarge: (icon) => `${WEATHER_ICONS.BASE_URL}/${icon}@4x.png`,
}

// Default values
export const DEFAULTS = {
  UNITS: 'metric',
  COUNTRY: 'us',
}

// Chart configuration
export const CHART_CONFIG = {
  HOURLY_POINTS: 8, // number of 3-hour forecast points to show (24h)
  FORECAST_DAYS: 6, // number of days to show in week list
} 