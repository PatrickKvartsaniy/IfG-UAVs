"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react"

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
}

export default function LiveWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        // Coordinates for the study area (approximate center)
        const lat = 51.945
        const lon = 7.573
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

        if (!apiKey) {
          throw new Error("OpenWeather API key not configured")
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        )

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()

        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind?.speed * 3.6 || 0), // Convert m/s to km/h
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        })
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch weather data")

        // Fallback to mock data
        setWeather({
          temperature: 18,
          humidity: 65,
          windSpeed: 12,
          description: "partly cloudy",
          icon: "02d",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconCode: string) => {
    const hour = new Date().getHours()
    const isDay = hour >= 6 && hour < 20

    if (iconCode.includes("01")) return isDay ? Sun : Sun
    if (iconCode.includes("02") || iconCode.includes("03")) return Cloud
    if (iconCode.includes("09") || iconCode.includes("10")) return CloudRain
    return Cloud
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-gray-100 animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  if (error && !weather) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-red-600">Unable to load weather data</div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  const WeatherIcon = getWeatherIcon(weather.icon)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main weather display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WeatherIcon className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-xs text-gray-600 capitalize">{weather.description}</div>
              </div>
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-blue-400" />
              <span className="text-gray-600">Humidity:</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Wind:</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
          </div>

          {/* Location */}
          <div className="text-xs text-gray-500 border-t pt-2">Study Area, Germany</div>
        </div>
      </CardContent>
    </Card>
  )
}
