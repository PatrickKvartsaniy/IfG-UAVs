"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MapPin, Thermometer, Droplets, Gauge } from "lucide-react"
import dynamic from "next/dynamic"

const LiveWeather = dynamic(() => import("@/components/LiveWeather"), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />,
})

interface MeasurementPoint {
  lat: number
  lon: number
  name: string
  value?: number
  type?: string
  objectId?: number
  creationDate?: string
  numberOfSpecies?: number
  oxygen?: number
  temperature?: number
  pH?: number
  conductivity?: number
  flowVelocity?: number | string
  restored?: string
  humidity?: number
  soilMoisture?: number
}

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded" />,
})

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [activeDataset, setActiveDataset] = useState<"water" | "soil">("water")

  // Function to handle station selection using global popup function
  const handleStationSelection = (stationId: number) => {
    console.log("Handling station selection for ID:", stationId)

    // Use global function instead of React ref
    if (typeof (window as any).openStationPopup === "function") {
      ;(window as any).openStationPopup(stationId)
    } else {
      console.warn("Global openStationPopup function is not available")
    }
  }

  // Zeit nur im Client setzen (Hydration-Problem lösen)
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString())
    setIsClient(true)
  }, [])

  // Reset when dataset changes
  useEffect(() => {
    console.log("Dataset changed to:", activeDataset)
  }, [activeDataset])

  // REAL measurement data from Excel table - WATER
  const waterMeasurementPoints = [
    {
      lat: 51.94476251,
      lon: 7.573200841,
      objectId: 1,
      creationDate: "5/30/2025 1:15:53 PM",
      numberOfSpecies: 0,
      oxygen: 8.44,
      temperature: 18.8,
      pH: 7.8,
      conductivity: 520,
      flowVelocity: 9.1,
      restored: "y",
      name: "Measurement Station 1",
      type: "Restored",
    },
    {
      lat: 51.94504219,
      lon: 7.572768064,
      objectId: 2,
      creationDate: "5/30/2025 1:37:45 PM",
      numberOfSpecies: 0,
      oxygen: 8.55,
      temperature: 18.4,
      pH: 8.0,
      conductivity: 523,
      flowVelocity: 5.6,
      restored: "y",
      name: "Measurement Station 2",
      type: "Restored",
    },
    {
      lat: 51.94539172,
      lon: 7.571738768,
      objectId: 3,
      creationDate: "5/30/2025 2:00:48 PM",
      numberOfSpecies: 1,
      oxygen: 8.79,
      temperature: 19.6,
      pH: 8.0,
      conductivity: 522,
      flowVelocity: "n/a",
      restored: "n",
      name: "Measurement Station 3",
      type: "Not restored",
    },
    {
      lat: 51.94591424,
      lon: 7.571528757,
      objectId: 6,
      creationDate: "5/30/2025 2:18:16 PM",
      numberOfSpecies: 1,
      oxygen: 8.41,
      temperature: 18.6,
      pH: 7.9,
      conductivity: 524,
      flowVelocity: 13.5,
      restored: "n",
      name: "Measurement Station 6",
      type: "Not restored",
    },
    {
      lat: 51.9469839,
      lon: 7.571487392,
      objectId: 7,
      creationDate: "5/30/2025 2:35:08 PM",
      numberOfSpecies: 1,
      oxygen: 8.34,
      temperature: 18.5,
      pH: 8.2,
      conductivity: 535,
      flowVelocity: 10.3,
      restored: "n",
      name: "Measurement Station 7",
      type: "Not restored",
    },
    {
      lat: 51.94405765,
      lon: 7.573433435,
      objectId: 8,
      creationDate: "5/30/2025 2:55:37 PM",
      numberOfSpecies: 2,
      oxygen: 8.3,
      temperature: 18.8,
      pH: 8.2,
      conductivity: 527,
      flowVelocity: 22.68,
      restored: "y",
      name: "Measurement Station 8",
      type: "Restored",
    },
  ]

  // SOIL measurement data from Excel table
  const soilMeasurementPoints = [
    // Non-restored points
    {
      lat: 51.9461438,
      lon: 7.5703373,
      objectId: 1,
      temperature: 21.19,
      humidity: 63.36,
      soilMoisture: 12.41,
      restored: "n",
      name: "Soil Station 1",
      type: "Not restored",
    },
    {
      lat: 51.9468261,
      lon: 7.5715349,
      objectId: 2,
      temperature: 21.06,
      humidity: 63.06,
      soilMoisture: 12.43,
      restored: "n",
      name: "Soil Station 2",
      type: "Not restored",
    },
    {
      lat: 51.946422,
      lon: 7.5716927,
      objectId: 3,
      temperature: 19.49,
      humidity: 62.76,
      soilMoisture: 12.51,
      restored: "n",
      name: "Soil Station 3",
      type: "Not restored",
    },
    {
      lat: 51.9461344,
      lon: 7.5715772,
      objectId: 4,
      temperature: 18.86,
      humidity: 67.3,
      soilMoisture: 12.42,
      restored: "n",
      name: "Soil Station 4",
      type: "Not restored",
    },
    {
      lat: 51.9448183,
      lon: 7.5731248,
      objectId: 21,
      temperature: 17.92,
      humidity: 71.47,
      soilMoisture: 12.14,
      restored: "n",
      name: "Soil Station 21",
      type: "Not restored",
    },
    {
      lat: 51.9451206,
      lon: 7.5725664,
      objectId: 22,
      temperature: 18.08,
      humidity: 70.82,
      soilMoisture: 12.22,
      restored: "n",
      name: "Soil Station 22",
      type: "Not restored",
    },
    {
      lat: 51.945153,
      lon: 7.5716911,
      objectId: 23,
      temperature: 18.43,
      humidity: 68.34,
      soilMoisture: 11.75,
      restored: "n",
      name: "Soil Station 23",
      type: "Not restored",
    },
    {
      lat: 51.9453003,
      lon: 7.5715979,
      objectId: 24,
      temperature: 19.3,
      humidity: 69.49,
      soilMoisture: 11.83,
      restored: "n",
      name: "Soil Station 24",
      type: "Not restored",
    },
    {
      lat: 51.945416,
      lon: 7.5713291,
      objectId: 25,
      temperature: 19.9,
      humidity: 66.36,
      soilMoisture: 11.88,
      restored: "n",
      name: "Soil Station 25",
      type: "Not restored",
    },
    {
      lat: 51.945557,
      lon: 7.5713674,
      objectId: 26,
      temperature: 20.99,
      humidity: 70.79,
      soilMoisture: 11.96,
      restored: "n",
      name: "Soil Station 26",
      type: "Not restored",
    },
    {
      lat: 51.9456671,
      lon: 7.5713769,
      objectId: 27,
      temperature: 22.02,
      humidity: 68.1,
      soilMoisture: 11.96,
      restored: "n",
      name: "Soil Station 27",
      type: "Not restored",
    },
    {
      lat: 51.9459548,
      lon: 7.5713928,
      objectId: 28,
      temperature: 24.03,
      humidity: 63.8,
      soilMoisture: 12.12,
      restored: "n",
      name: "Soil Station 28",
      type: "Not restored",
    },
    {
      lat: 51.9464195,
      lon: 7.5714852,
      objectId: 29,
      temperature: 23.74,
      humidity: 66.9,
      soilMoisture: 12.46,
      restored: "n",
      name: "Soil Station 29",
      type: "Not restored",
    },
    {
      lat: 51.946784,
      lon: 7.5711248,
      objectId: 30,
      temperature: 23.11,
      humidity: 59.35,
      soilMoisture: 12.5,
      restored: "n",
      name: "Soil Station 30",
      type: "Not restored",
    },
    {
      lat: 51.9469094,
      lon: 7.5713069,
      objectId: 31,
      temperature: 22.35,
      humidity: 59.05,
      soilMoisture: 12.65,
      restored: "n",
      name: "Soil Station 31",
      type: "Not restored",
    },

    // Restored points
    {
      lat: 51.9454298,
      lon: 7.5718045,
      objectId: 5,
      temperature: 17.21,
      humidity: 68.96,
      soilMoisture: 12.17,
      restored: "y",
      name: "Soil Station 5",
      type: "Restored",
    },
    {
      lat: 51.9453341,
      lon: 7.5724037,
      objectId: 6,
      temperature: 16.21,
      humidity: 76.94,
      soilMoisture: 12.05,
      restored: "y",
      name: "Soil Station 6",
      type: "Restored",
    },
    {
      lat: 51.943661,
      lon: 7.5749714,
      objectId: 7,
      temperature: 17.51,
      humidity: 76.33,
      soilMoisture: 11.53,
      restored: "y",
      name: "Soil Station 7",
      type: "Restored",
    },
    {
      lat: 51.9431885,
      lon: 7.5750439,
      objectId: 8,
      temperature: 17.61,
      humidity: 80.26,
      soilMoisture: 11.67,
      restored: "y",
      name: "Soil Station 8",
      type: "Restored",
    },
    {
      lat: 51.9415407,
      lon: 7.5767333,
      objectId: 9,
      temperature: 16.52,
      humidity: 75.55,
      soilMoisture: 11.6,
      restored: "y",
      name: "Soil Station 9",
      type: "Restored",
    },
    {
      lat: 51.9441371,
      lon: 7.5733219,
      objectId: 10,
      temperature: 16.83,
      humidity: 74.16,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 10",
      type: "Restored",
    },
    {
      lat: 51.9436947,
      lon: 7.5738278,
      objectId: 11,
      temperature: 16.39,
      humidity: 76.95,
      soilMoisture: 11.68,
      restored: "y",
      name: "Soil Station 11",
      type: "Restored",
    },
    {
      lat: 51.9437077,
      lon: 7.5742544,
      objectId: 12,
      temperature: 16.33,
      humidity: 76.5,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 12",
      type: "Restored",
    },
    {
      lat: 51.9427036,
      lon: 7.5750969,
      objectId: 13,
      temperature: 17.09,
      humidity: 77.49,
      soilMoisture: 11.79,
      restored: "y",
      name: "Soil Station 13",
      type: "Restored",
    },
    {
      lat: 51.9423608,
      lon: 7.5757084,
      objectId: 14,
      temperature: 18.22,
      humidity: 76.24,
      soilMoisture: 11.71,
      restored: "y",
      name: "Soil Station 14",
      type: "Restored",
    },
    {
      lat: 51.9421082,
      lon: 7.5756079,
      objectId: 15,
      temperature: 17.43,
      humidity: 80.73,
      soilMoisture: 11.87,
      restored: "y",
      name: "Soil Station 15",
      type: "Restored",
    },
    {
      lat: 51.941743,
      lon: 7.5764706,
      objectId: 16,
      temperature: 18.98,
      humidity: 72.38,
      soilMoisture: 12.19,
      restored: "y",
      name: "Soil Station 16",
      type: "Restored",
    },
    {
      lat: 51.9415959,
      lon: 7.5767742,
      objectId: 17,
      temperature: 17.95,
      humidity: 75.26,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 17",
      type: "Restored",
    },
    {
      lat: 51.9414862,
      lon: 7.5764494,
      objectId: 18,
      temperature: 17.44,
      humidity: 75.67,
      soilMoisture: 12.1,
      restored: "y",
      name: "Soil Station 18",
      type: "Restored",
    },
    {
      lat: 51.944236,
      lon: 7.5728354,
      objectId: 19,
      temperature: 22.15,
      humidity: 59.99,
      soilMoisture: 12.4,
      restored: "y",
      name: "Soil Station 19",
      type: "Restored",
    },
    {
      lat: 51.9445077,
      lon: 7.5729556,
      objectId: 20,
      temperature: 18.5,
      humidity: 68.61,
      soilMoisture: 12.31,
      restored: "y",
      name: "Soil Station 20",
      type: "Restored",
    },
  ]

  const measurementPoints = activeDataset === "water" ? waterMeasurementPoints : soilMeasurementPoints

  // Calculate statistics for active dataset
  const calculateStats = () => {
    const restored = measurementPoints.filter((p) => p.restored === "y")
    const nonRestored = measurementPoints.filter((p) => p.restored === "n")

    if (activeDataset === "water") {
      return {
        temperature: {
          restored: (restored.reduce((sum, p) => sum + (p as any).temperature, 0) / restored.length).toFixed(1),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).temperature, 0) / nonRestored.length).toFixed(
            1,
          ),
        },
        oxygen: {
          restored: (restored.reduce((sum, p) => sum + (p as any).oxygen, 0) / restored.length).toFixed(2),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).oxygen, 0) / nonRestored.length).toFixed(2),
        },
        pH: {
          restored: (restored.reduce((sum, p) => sum + (p as any).pH, 0) / restored.length).toFixed(2),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).pH, 0) / nonRestored.length).toFixed(2),
        },
        conductivity: {
          restored: Math.round(restored.reduce((sum, p) => sum + (p as any).conductivity, 0) / restored.length),
          nonRestored: Math.round(
            nonRestored.reduce((sum, p) => sum + (p as any).conductivity, 0) / nonRestored.length,
          ),
        },
        species: {
          restored: (restored.reduce((sum, p) => sum + (p as any).numberOfSpecies, 0) / restored.length).toFixed(1),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).numberOfSpecies, 0) / nonRestored.length
          ).toFixed(1),
        },
        flow: {
          restored: "7.4 cm/s", // Average of 9.1 and 5.6
          nonRestored: "n/a",
        },
      }
    } else {
      return {
        temperature: {
          restored: (restored.reduce((sum, p) => sum + (p as any).temperature, 0) / restored.length).toFixed(1),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).temperature, 0) / nonRestored.length).toFixed(
            1,
          ),
        },
        humidity: {
          restored: (restored.reduce((sum, p) => sum + (p as any).humidity, 0) / restored.length).toFixed(1),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).humidity, 0) / nonRestored.length).toFixed(1),
        },
        soilMoisture: {
          restored: (restored.reduce((sum, p) => sum + (p as any).soilMoisture, 0) / restored.length).toFixed(2),
          nonRestored: (nonRestored.reduce((sum, p) => sum + (p as any).soilMoisture, 0) / nonRestored.length).toFixed(
            2,
          ),
        },
        humidityRange: {
          restored: `${Math.min(...restored.map((p) => (p as any).humidity)).toFixed(1)}-${Math.max(...restored.map((p) => (p as any).humidity)).toFixed(1)}%`,
          nonRestored: `${Math.min(...nonRestored.map((p) => (p as any).humidity)).toFixed(1)}-${Math.max(...nonRestored.map((p) => (p as any).humidity)).toFixed(1)}%`,
        },
        tempRange: {
          restored: `${Math.min(...restored.map((p) => (p as any).temperature)).toFixed(1)}-${Math.max(...restored.map((p) => (p as any).temperature)).toFixed(1)}°C`,
          nonRestored: `${Math.min(...nonRestored.map((p) => (p as any).temperature)).toFixed(1)}-${Math.max(...nonRestored.map((p) => (p as any).temperature)).toFixed(1)}°C`,
        },
        count: {
          restored: restored.length,
          nonRestored: nonRestored.length,
        },
      }
    }
  }

  const stats = calculateStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">UAV Protected Area Study - Dashboard</h1>
          <Badge variant="outline">Environmental Monitoring</Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Main Dashboard Layout - Map and Monitoring Stations on Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Central Map - Expanded */}
          <div className="lg:col-span-9">
            <Card className="h-[480px]">
              <CardContent className="p-0 h-[480px]">
                {isClient ? (
                  <LeafletMap measurementPoints={measurementPoints} height="100%" />
                ) : (
                  <div className="h-full bg-gray-100 animate-pulse rounded" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Live Weather and Dataset Toggle */}
          <div className="lg:col-span-3 space-y-6">
            <LiveWeather />

            {/* Toggle Button for Dataset Selection */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-sm border w-full">
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    variant={activeDataset === "water" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveDataset("water")}
                    className="text-xs px-2"
                  >
                    Water Quality
                  </Button>
                  <Button
                    variant={activeDataset === "soil" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveDataset("soil")}
                    className="text-xs px-2"
                  >
                    Soil Analysis
                  </Button>
                </div>
              </div>
            </div>

            {/* Information Link */}
            <div className="text-center">
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-gray-500 underline cursor-not-allowed"
                onClick={(e) => e.preventDefault()}
              >
                {activeDataset === "water"
                  ? "Further information about LAWA Reference values"
                  : "Soil monitoring standards and guidelines"}
              </a>
            </div>
          </div>
        </div>

        {/* Widget Grid Below Map */}
        {activeDataset === "water" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SenseBox Stations Widget */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Water Quality Stations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Water stations summary */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="text-xs font-medium text-green-800">Restored</div>
                      <div className="text-lg font-bold text-green-600">3</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded border border-red-200">
                      <div className="text-xs font-medium text-red-800">Non-Restored</div>
                      <div className="text-lg font-bold text-red-600">3</div>
                    </div>
                  </div>

                  {/* Compact station selection */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">Select Station:</div>
                    <select
                      className="w-full text-xs p-1 border rounded bg-white"
                      onChange={(e) => {
                        if (e.target.value) {
                          const stationId = Number.parseInt(e.target.value)
                          handleStationSelection(stationId)
                          e.target.value = "" // Reset selection
                        }
                      }}
                    >
                      <option value="">Choose station...</option>
                      <optgroup label="Restored (3)">
                        {waterMeasurementPoints
                          .filter((p) => p.restored === "y")
                          .map((point) => (
                            <option key={point.objectId} value={point.objectId}>
                              Station {point.objectId}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Non-Restored (3)">
                        {waterMeasurementPoints
                          .filter((p) => p.restored === "n")
                          .map((point) => (
                            <option key={point.objectId} value={point.objectId}>
                              Station {point.objectId}
                            </option>
                          ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Oxygen Levels</CardTitle>
                <CardDescription className="text-xs">LAWA Standard: ≥9 mg/L</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Restored:</span>
                    <span className="font-bold text-green-600">{stats.oxygen?.restored} mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-Restored:</span>
                    <span className="font-bold text-red-600">{stats.oxygen?.nonRestored} mg/L</span>
                  </div>

                  {/* Simple bar with markers and axis labels */}
                  <div className="relative mt-4">
                    {/* Axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>7.0</span>
                      <span>10.0 mg/L</span>
                    </div>

                    {/* Bar with LAWA range highlight */}
                    <div className="relative h-4 bg-gray-200 rounded">
                      {/* LAWA range background (9 mg/L and above) */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-100 rounded-r"
                        style={{
                          left: `${Math.max(0, ((9 - 7) / 3) * 100)}%`,
                          width: `${100 - Math.max(0, ((9 - 7) / 3) * 100)}%`,
                        }}
                      ></div>

                      {/* Tick marks under the bar for every unit (8.0, 9.0) */}
                      <div
                        className="absolute top-4 w-px h-0.5 bg-gray-200"
                        style={{ left: `${((8 - 7) / 3) * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-4 w-px h-0.5 bg-gray-200"
                        style={{ left: `${((9 - 7) / 3) * 100}%` }}
                      ></div>

                      {/* Green marker for Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.oxygen?.restored || "0") - 7) / 3) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker for Non-Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.oxygen?.nonRestored || "0") - 7) / 3) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-red-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-red-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Water Temperature</CardTitle>
                <CardDescription className="text-xs">LAWA Standard: 19-24°C (max. annual)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Restored:</span>
                    <span className="font-bold text-green-600">{stats.temperature?.restored}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-Restored:</span>
                    <span className="font-bold text-red-600">{stats.temperature?.nonRestored}°C</span>
                  </div>

                  {/* Simple bar with markers and axis labels */}
                  <div className="relative mt-4">
                    {/* Axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>16.0</span>
                      <span>26.0°C</span>
                    </div>

                    {/* Bar with LAWA range highlight */}
                    <div className="relative h-4 bg-gray-200 rounded">
                      {/* LAWA range background (19-24°C) */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-100 rounded"
                        style={{
                          left: `${Math.max(0, ((19 - 16) / 10) * 100)}%`,
                          width: `${Math.min(100, ((24 - 19) / 10) * 100)}%`,
                        }}
                      ></div>

                      {/* Tick marks for every unit (17, 18, 19, 20, 21, 22, 23, 24, 25) */}
                      {[17, 18, 19, 20, 21, 22, 23, 24, 25].map((temp) => (
                        <div
                          key={temp}
                          className="absolute top-4 w-px h-0.5 bg-gray-200"
                          style={{ left: `${((temp - 16) / 10) * 100}%` }}
                        ></div>
                      ))}

                      {/* Green marker - Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.temperature?.restored || "0") - 16) / 10) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker - Non-Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.temperature?.nonRestored || "0") - 16) / 10) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-red-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-red-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 2 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">pH Values</CardTitle>
                <CardDescription className="text-xs">LAWA Standard: 7.0-8.5</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Restored:</span>
                    <span className="font-bold text-green-600">{stats.pH?.restored}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-Restored:</span>
                    <span className="font-bold text-red-600">{stats.pH?.nonRestored}</span>
                  </div>

                  {/* Simple bar with markers and axis labels */}
                  <div className="relative mt-4">
                    {/* Axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>6.5</span>
                      <span>9.0 pH</span>
                    </div>

                    {/* Bar with LAWA range highlight */}
                    <div className="relative h-4 bg-gray-200 rounded">
                      {/* LAWA range background (7.0-8.5) */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-100 rounded"
                        style={{
                          left: `${Math.max(0, ((7.0 - 6.5) / 2.5) * 100)}%`,
                          width: `${Math.min(100, ((8.5 - 7.0) / 2.5) * 100)}%`,
                        }}
                      ></div>

                      {/* Tick marks for every unit (7.0, 8.0) */}
                      <div
                        className="absolute top-4 w-px h-0.5 bg-gray-200"
                        style={{ left: `${((7.0 - 6.5) / 2.5) * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-4 w-px h-0.5 bg-gray-200"
                        style={{ left: `${((8.0 - 6.5) / 2.5) * 100}%` }}
                      ></div>

                      {/* Green marker - Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.pH?.restored || "0") - 6.5) / 2.5) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker - Non-Restored */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.pH?.nonRestored || "0") - 6.5) / 2.5) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-red-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-red-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Conductivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Restored:</span>
                    <span className="font-bold text-green-600">{stats.conductivity?.restored} μS/cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-Restored:</span>
                    <span className="font-bold text-red-600">{stats.conductivity?.nonRestored} μS/cm</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Flow Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Restored:</span>
                    <span className="font-bold text-green-600">12.5 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-Restored:</span>
                    <span className="font-bold text-red-600">11.9 m/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Soil Analysis View - Improved Layout */
          <div className="space-y-6">
            {/* Overview Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stations Overview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Soil Monitoring Stations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Soil stations summary */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-xs font-medium text-green-800">Restored Areas</div>
                        <div className="text-2xl font-bold text-green-600">16</div>
                        <div className="text-xs text-green-600">stations</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-200">
                        <div className="text-xs font-medium text-orange-800">Non-Restored</div>
                        <div className="text-2xl font-bold text-orange-600">15</div>
                        <div className="text-xs text-orange-600">stations</div>
                      </div>
                    </div>

                    {/* Station selection */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">Select Station:</div>
                      <select
                        className="w-full text-xs p-2 border rounded bg-white"
                        onChange={(e) => {
                          if (e.target.value) {
                            const stationId = Number.parseInt(e.target.value)
                            handleStationSelection(stationId)
                            e.target.value = "" // Reset selection
                          }
                        }}
                      >
                        <option value="">Choose station...</option>
                        <optgroup label="Restored Areas (16)">
                          {soilMeasurementPoints
                            .filter((p) => p.restored === "y")
                            .map((point) => (
                              <option key={point.objectId} value={point.objectId}>
                                Station {point.objectId}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="Non-Restored Areas (15)">
                          {soilMeasurementPoints
                            .filter((p) => p.restored === "n")
                            .map((point) => (
                              <option key={point.objectId} value={point.objectId}>
                                Station {point.objectId}
                              </option>
                            ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Soil Temperature
                  </CardTitle>
                  <CardDescription className="text-xs">Average temperature comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Restored Areas:</span>
                        <span className="font-bold text-green-600 text-lg">{stats.temperature?.restored}°C</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Non-Restored:</span>
                        <span className="font-bold text-orange-600 text-lg">{stats.temperature?.nonRestored}°C</span>
                      </div>
                    </div>

                    {/* Temperature difference indicator */}
                    <div className="bg-blue-50 p-2 rounded border border-blue-200">
                      <div className="text-xs text-blue-800 font-medium">Temperature Difference</div>
                      <div className="text-sm text-blue-600">
                        {(
                          Number.parseFloat(stats.temperature?.nonRestored || "0") -
                          Number.parseFloat(stats.temperature?.restored || "0")
                        ).toFixed(1)}
                        °C warmer in non-restored areas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Humidity Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Soil Humidity
                  </CardTitle>
                  <CardDescription className="text-xs">Relative humidity levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Restored Areas:</span>
                        <span className="font-bold text-green-600 text-lg">{stats.humidity?.restored}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Non-Restored:</span>
                        <span className="font-bold text-blue-600 text-lg">{stats.humidity?.nonRestored}%</span>
                      </div>
                    </div>

                    {/* Humidity difference indicator */}
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="text-xs text-green-800 font-medium">Humidity Advantage</div>
                      <div className="text-sm text-green-600">
                        {(
                          Number.parseFloat(stats.humidity?.restored || "0") -
                          Number.parseFloat(stats.humidity?.nonRestored || "0")
                        ).toFixed(1)}
                        % higher in restored areas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Soil Moisture Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    Soil Moisture
                  </CardTitle>
                  <CardDescription className="text-xs">Moisture content levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Restored Areas:</span>
                        <span className="font-bold text-green-600 text-lg">{stats.soilMoisture?.restored}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Non-Restored:</span>
                        <span className="font-bold text-orange-600 text-lg">{stats.soilMoisture?.nonRestored}%</span>
                      </div>
                    </div>

                    {/* Moisture difference indicator */}
                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                      <div className="text-xs text-gray-800 font-medium">Moisture Difference</div>
                      <div className="text-sm text-gray-600">
                        {Math.abs(
                          Number.parseFloat(stats.soilMoisture?.restored || "0") -
                            Number.parseFloat(stats.soilMoisture?.nonRestored || "0"),
                        ).toFixed(2)}
                        % variation
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Range Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Temperature Range Analysis</CardTitle>
                  <CardDescription>Detailed temperature distribution across monitoring stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-2">Restored Areas</div>
                        <div className="text-2xl font-bold text-green-600 mb-1">{stats.tempRange?.restored}</div>
                        <div className="text-xs text-green-600">Temperature Range</div>
                        <div className="text-sm text-green-700 mt-2">Average: {stats.temperature?.restored}°C</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="text-sm font-medium text-orange-800 mb-2">Non-Restored Areas</div>
                        <div className="text-2xl font-bold text-orange-600 mb-1">{stats.tempRange?.nonRestored}</div>
                        <div className="text-xs text-orange-600">Temperature Range</div>
                        <div className="text-sm text-orange-700 mt-2">Average: {stats.temperature?.nonRestored}°C</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="text-sm font-medium text-blue-800">Key Findings</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Restored areas show consistently lower temperatures, indicating better soil health and
                        vegetation cover.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Humidity Range Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Humidity Range Analysis</CardTitle>
                  <CardDescription>Comprehensive humidity distribution patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-2">Restored Areas</div>
                        <div className="text-2xl font-bold text-green-600 mb-1">{stats.humidityRange?.restored}</div>
                        <div className="text-xs text-green-600">Humidity Range</div>
                        <div className="text-sm text-green-700 mt-2">Average: {stats.humidity?.restored}%</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm font-medium text-blue-800 mb-2">Non-Restored Areas</div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{stats.humidityRange?.nonRestored}</div>
                        <div className="text-xs text-blue-600">Humidity Range</div>
                        <div className="text-sm text-blue-700 mt-2">Average: {stats.humidity?.nonRestored}%</div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">Key Findings</div>
                      <div className="text-sm text-green-700 mt-1">
                        Restored areas maintain higher humidity levels, supporting better ecosystem recovery and
                        biodiversity.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
