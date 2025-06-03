import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js'
import { useMemo } from 'react'
import { CHART_CONFIG } from '../../../constants/index.js'
import styles from './HourlyChart.module.css'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

export default function HourlyChart({ forecast }) {
  // forecast.list contains 3-hour steps – pick next 8 (24h)
  const { labels, temps } = useMemo(() => {
    if (!forecast?.list?.length) return { labels: [], temps: [] }
    const slice = forecast.list.slice(0, CHART_CONFIG.HOURLY_POINTS)
    const labels = slice.map((item) => {
      const date = new Date(item.dt * 1000)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    const temps = slice.map((item) => item.main.temp)
    return { labels, temps }
  }, [forecast])

  if (!labels.length) return null

  const data = {
    labels,
    datasets: [
      {
        data: temps,
        borderColor: '#ffa726',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#ffa726',
      },
    ],
  }

  const options = {
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${Math.round(ctx.raw)}°` } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#ccc' } },
      y: { display: false },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className={styles.hourlyChartContainer}>
      <Line data={data} options={options} height={120} />
    </div>
  )
} 