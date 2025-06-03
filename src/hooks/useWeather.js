/**
 * useWeather – reusable hook that provides current weather + forecast fetching logic.
 * This keeps data-layer concerns outside of UI components so new screens can reuse it.
 */
import { useState } from 'react'
import { WeatherService } from '../services/weatherService.js'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Triggers an API call based on search type and value.
   * @param {'city'|'zip'|'coords'} type
   * @param {string|{lat:number,lon:number}} value
   */
  const search = async (type, value) => {
    setError('')
    setLoading(true)
    setWeather(null)
    setForecast(null)
    try {
      let data, forecastData
      if (type === 'city') {
        data = await WeatherService.byCity(value)
        forecastData = await WeatherService.forecastByCity(value)
      } else if (type === 'zip') {
        data = await WeatherService.byZip(value)
        forecastData = await WeatherService.forecastByCoords(data.coord.lat, data.coord.lon)
      } else if (type === 'coords') {
        const { lat, lon } = value
        data = await WeatherService.byCoords(lat, lon)
        forecastData = await WeatherService.forecastByCoords(lat, lon)
      }
      setWeather(data)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { weather, forecast, loading, error, search }
} 