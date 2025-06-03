import { WEATHER_ICONS } from '../../../constants/index.js'
import styles from './WeatherCard.module.css'

export default function WeatherCard({ data }) {
  if (!data) return null

  const {
    name,
    sys: { country } = {},
    weather = [],
    main: { temp, feels_like, humidity } = {},
    wind: { speed } = {},
  } = data

  const description = weather[0]?.description
  const icon = weather[0]?.icon
  const iconUrl = icon ? WEATHER_ICONS.getIconLarge(icon) : null

  return (
    <div className={styles.weatherCard}>
      <h2>
        {name}, {country}
      </h2>
      {iconUrl && <img src={iconUrl} alt={description} />}
      <p className={styles.temp}>{Math.round(temp)}°C</p>
      <p className={styles.description}>{description}</p>
      <ul className={styles.details}>
        <li>Feels like: {Math.round(feels_like)}°C</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind speed: {speed} m/s</li>
      </ul>
    </div>
  )
} 