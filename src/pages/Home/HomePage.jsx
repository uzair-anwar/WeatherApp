import SearchForm from '../../components/weather/SearchForm/index.js'
import Dashboard from '../../components/weather/Dashboard/index.js'
import { useWeather } from '../../hooks/useWeather.js'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { weather, forecast, loading, error, search } = useWeather()

  return (
    <div className={styles.homePage}>
      <header className={styles.homeHeader}>
        <h1>Weather Search</h1>
        <p>Get current weather conditions and forecasts for any location</p>
      </header>

      <main className={styles.homeMain}>
        <SearchForm onSearch={search} />

        {loading && <div className={styles.loading}>Loading weather data...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {weather && <Dashboard weather={weather} forecast={forecast} />}
      </main>
    </div>
  )
} 