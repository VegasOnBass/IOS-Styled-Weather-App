import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export function weatherHook(city) {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.Weather_Key}&q=${city}&days=10&aqi=no&alerts=no`)
      if (response.status === 200) {
        setWeatherData(response.data)
      } else {
        setError(`Request failed with status code ${response.status}`)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [city])

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])




  return { weatherData, error, isLoading }
}
