import WeatherCard from '../WeatherCard/index.js'
import WeekList from '../WeekList/index.js'
import HourlyChart from '../HourlyChart/index.js'
import { WEATHER_ICONS } from '../../../constants/index.js'
import styles from './Dashboard.module.css'

export default function Dashboard({ weather, forecast }) {
  if (!weather) return null

  return (
    <div className={styles.dashboard}>
      <div className={styles.left}>
        <WeatherCard data={weather} />
      </div>
      <div className={styles.center}>
        {weather.weather?.[0]?.icon && (
          <img
            src={WEATHER_ICONS.getIconXLarge(weather.weather[0].icon.replace('n', 'd'))}
            alt={weather.weather[0].description}
            className={styles.heroIcon}
          />
        )}
      </div>
      <div className={styles.right}>
        <WeekList forecast={forecast} />
      </div>
      <div className={styles.bottom}>
        <HourlyChart forecast={forecast} />
      </div>
    </div>
  )
} 