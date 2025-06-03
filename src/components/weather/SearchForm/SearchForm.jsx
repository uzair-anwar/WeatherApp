import { useState } from 'react'
import styles from './SearchForm.module.css'

/**
 * Props:
 *   onSearch: (searchType: 'city'|'zip'|'coords', value: string|{lat:number,lon:number}) => void
 */
export default function SearchForm({ onSearch }) {
  const [searchType, setSearchType] = useState('city')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [coords, setCoords] = useState({ lat: '', lon: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchType === 'city' && city) {
      onSearch('city', city)
    } else if (searchType === 'zip' && zip) {
      onSearch('zip', zip)
    } else if (searchType === 'coords' && coords.lat && coords.lon) {
      onSearch('coords', { lat: coords.lat, lon: coords.lon })
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lon: longitude })
        setSearchType('coords')
        onSearch('coords', { lat: latitude, lon: longitude })
      },
      (err) => {
        alert(err.message)
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchOptions}>
        <label>
          <input
            type="radio"
            name="searchType"
            value="city"
            checked={searchType === 'city'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          City
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="zip"
            checked={searchType === 'zip'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Zip Code
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="coords"
            checked={searchType === 'coords'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Coordinates
        </label>
      </div>

      {searchType === 'city' && (
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className={styles.input}
        />
      )}

      {searchType === 'zip' && (
        <input
          type="text"
          placeholder="Enter zip (e.g., 94040 or 94040,us)"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
          className={styles.input}
        />
      )}

      {searchType === 'coords' && (
        <div className={styles.coordsInputs}>
          <input
            type="number"
            placeholder="Latitude"
            step="any"
            value={coords.lat}
            onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
            required
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Longitude"
            step="any"
            value={coords.lon}
            onChange={(e) => setCoords({ ...coords, lon: e.target.value })}
            required
            className={styles.input}
          />
          <button type="button" onClick={handleUseCurrentLocation} className={styles.button}>
            Use my location
          </button>
        </div>
      )}

      <button type="submit" className={styles.button}>Search</button>
    </form>
  )
} 