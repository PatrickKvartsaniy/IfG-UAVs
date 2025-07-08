"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Wind, Droplets, Gauge, MapPin } from "lucide-react"

interface WeatherData {
  temperature: number
  feels_like: number
  humidity: number
  pressure: number
  visibility: number
  wind_speed: number
  wind_direction: number
  description: string
  icon: string
  location: string
  last_updated: string
}

export default function LiveWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Coordinates for Münster Sentrup
      const LAT = 51.945028
      const LON = 7.572704
      const API_KEY = "22c7a033180b14d031ae66ad64f220a7" // Demo API key

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`,
        {
          headers: {
            "User-Agent": "IfG-UAVs Dashboard/1.0",
          },
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        if (response.status === 401) {
          throw new Error("Invalid API key - Check your OpenWeatherMap API key")
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded - Too many requests")
        } else {
          throw new Error(errorData.message || response.statusText)
        }
      }

      const data = await response.json()

      // Validate response data
      if (!data.main || !data.weather) {
        throw new Error("Invalid weather data received from API")
      }

      setWeatherData({
        temperature: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: Math.round((data.visibility || 10000) / 1000),
        wind_speed: Math.round(data.wind?.speed * 3.6 || 0), // Convert m/s to km/h
        wind_direction: data.wind?.deg || 0,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: data.name,
        last_updated: new Date().toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    } catch (err) {
      console.error("Weather fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to load weather data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()

    // Update weather every 10 minutes
    const interval = setInterval(fetchWeatherData, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Live Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Live Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-xs text-red-600">
            <div className="mb-2">⚠️ Weather Error</div>
            <div className="text-xs opacity-75">{error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Thermometer className="h-4 w-4" />
          Live Weather
          <span className="ml-auto text-xs text-green-600">●</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/w/${weatherData.icon}.png`}
                alt={weatherData.description}
                className="w-8 h-8"
              />
              <div>
                <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
                <div className="text-xs text-gray-500 capitalize">{weatherData.description}</div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Thermometer className="h-3 w-3 text-orange-500" />
              <span>Feels: {weatherData.feels_like}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-blue-500" />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-gray-500" />
              <span>Wind: {weatherData.wind_speed} km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-purple-500" />
              <span>Press: {weatherData.pressure} hPa</span>
            </div>
          </div>

          {/* Location & Update */}
          <div className="border-t pt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1 mb-1">
              <MapPin className="h-3 w-3" />
              <span>Münster Sentrup</span>
            </div>
            <div>Updated: {weatherData.last_updated}</div>
            <div className="text-xs opacity-75">Source: OpenWeatherMap</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
