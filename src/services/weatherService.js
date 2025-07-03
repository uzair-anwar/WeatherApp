import { API_ENDPOINTS, DEFAULTS } from '../constants/index.js'

// Creating new file with weather service implementation
export const WeatherService = (() => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!API_KEY) {
    // Warn in development if key is missing
    console.warn('VITE_OPENWEATHER_API_KEY is not set. Requests will fail.')
  }

  /**
   * Internal helper to build query string and make fetch call.
   * Returns parsed JSON or throws Error.
   * @param {string} baseUrl - API endpoint URL
   * @param {Record<string, string|number>} query
   */
  async function request(baseUrl, query) {
    const url = new URL(baseUrl)
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value))
    url.searchParams.append('appid', API_KEY)

    const response = await fetch(url.toString())
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.message || 'Failed to fetch weather data'
      throw new Error(message)
    }
    return response.json()
  }

  async function forecastRequest(query) {
    const response = await fetch(API_ENDPOINTS.FORECAST + '?' + new URLSearchParams({ ...query, appid: API_KEY }))
    if (!response.ok) {
      const message = (await response.json())?.message || 'Failed to fetch forecast'
      throw new Error(message)
    }
    return response.json()
  }

  /**
   * Fetch weather by city name.
   * @param {string} city
   * @param {string} [units='metric']
   */
  function byCity(city, units = DEFAULTS.UNITS) {
    return request(API_ENDPOINTS.CURRENT_WEATHER, { q: city, units })
  }

  /**
   * Fetch weather by zip code. country code can be appended (e.g., `94040,us`).
   * @param {string} zip
   * @param {string} [units='metric']
   */
  function byZip(zip, units = DEFAULTS.UNITS, defaultCountry = DEFAULTS.COUNTRY) {
    const zipParam = /,/.test(zip) ? zip : `${zip},${defaultCountry}`
    return request(API_ENDPOINTS.CURRENT_WEATHER, { zip: zipParam, units })
  }

  /**
   * Fetch weather by geographic coordinates.
   * @param {number} lat
   * @param {number} lon
   * @param {string} [units='metric']
   */
  function byCoords(lat, lon, units = DEFAULTS.UNITS) {
    return request(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon, units })
  }

  function forecastByCity(city, units = DEFAULTS.UNITS) {
    return forecastRequest({ q: city, units })
  }

  function forecastByCoords(lat, lon, units = DEFAULTS.UNITS) {
    return forecastRequest({ lat, lon, units })
  }

  return { byCity, byZip, byCoords, forecastByCity, forecastByCoords }
})() 