import { useMemo } from 'react'
import { WEATHER_ICONS, CHART_CONFIG } from '../../../constants/index.js'
import styles from './WeekList.module.css'

function groupByDay(list) {
  const map = new Map()
  list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dayKey = date.toLocaleDateString(undefined, { weekday: 'long' })
    const prev = map.get(dayKey) || { temps: [], icon: item.weather[0].icon, description: item.weather[0].description }
    prev.temps.push(item.main.temp)
    map.set(dayKey, prev)
  })
  return Array.from(map.entries()).map(([day, { temps, icon, description }]) => ({
    day,
    icon,
    description,
    temp: temps.reduce((a, b) => a + b, 0) / temps.length,
  }))
}

export default function WeekList({ forecast }) {
  const days = useMemo(() => {
    if (!forecast?.list?.length) return []
    return groupByDay(forecast.list).slice(0, CHART_CONFIG.FORECAST_DAYS)
  }, [forecast])

  return (
    <div className={styles.weekList}>
      {days.map((d, idx) => (
        <div key={idx} className={styles.dayRow}>
          <div className={styles.dayName}>{d.day}</div>
          <img src={WEATHER_ICONS.getIcon(d.icon)} alt={d.description} />
          <div className={styles.dayTemp}>{Math.round(d.temp)}°</div>
        </div>
      ))}
    </div>
  )
} 