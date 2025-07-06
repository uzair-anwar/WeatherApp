import { render, screen } from '@testing-library/react'
import WeatherCard from '../../components/weather/WeatherCard/index.js'

const mockData = {
  name: 'Paris',
  sys: { country: 'FR' },
  weather: [{ description: 'clear sky', icon: '01d' }],
  main: { temp: 23.4, feels_like: 22.8, humidity: 55 },
  wind: { speed: 3.2 },
}

describe('WeatherCard', () => {
  it('renders city and country', () => {
    render(<WeatherCard data={mockData} />)
    expect(screen.getByText(/Paris, FR/i)).toBeInTheDocument()
  })

  it('shows rounded temperature', () => {
    render(<WeatherCard data={mockData} />)
    const temps = screen.getAllByText(/23°c/i)
    expect(temps.length).toBeGreaterThan(0)
  })
}) 