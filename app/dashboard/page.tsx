"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MapPin, Plane, TreePine, Fish, Bird, RefreshCw, Download, Thermometer } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const flightData = [
  { date: "Jan", flights: 12, coverage: 85 },
  { date: "Feb", flights: 15, coverage: 92 },
  { date: "Mar", flights: 18, coverage: 88 },
  { date: "Apr", flights: 22, coverage: 95 },
  { date: "May", flights: 25, coverage: 91 },
  { date: "Jun", flights: 28, coverage: 97 },
]

const waterQualityData = [
  { time: "00:00", ph: 7.1, oxygen: 8.2, temp: 12.5 },
  { time: "04:00", ph: 7.2, oxygen: 8.5, temp: 11.8 },
  { time: "08:00", ph: 7.0, oxygen: 8.8, temp: 13.2 },
  { time: "12:00", ph: 7.3, oxygen: 8.1, temp: 15.6 },
  { time: "16:00", ph: 7.1, oxygen: 8.4, temp: 16.2 },
  { time: "20:00", ph: 7.2, oxygen: 8.6, temp: 14.1 },
]

export default function Dashboard() {
  const currentTime = new Date().toLocaleString()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UAV Protected Area Study - Dashboard</h1>
              <p className="text-sm text-gray-600">
                Last updated: <span className="font-medium">{currentTime}</span>
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Live Data
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Top Widget Grid - 8 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Row 1 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Live Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">18°C</span>
                  <div className="text-right text-xs text-gray-600">
                    <div>Wind: 5 km/h</div>
                    <div>Humidity: 65%</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <div>Pressure: 1013 hPa</div>
                  <div>Visibility: 10 km</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Vegetation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-16 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Forest", value: 45, color: "#10b981" },
                        { name: "Grassland", value: 30, color: "#84cc16" },
                        { name: "Wetland", value: 25, color: "#06b6d4" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#84cc16" />
                      <Cell fill="#06b6d4" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Forest</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Grassland</span>
                  <span>30%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Plant Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Healthy:</span>
                  <span className="font-bold text-green-600">88%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Unhealthy:</span>
                  <span className="font-bold text-orange-600">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Insects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Species:</span>
                  <span className="font-bold">13</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Beneficial:</span>
                  <span className="font-bold text-green-600">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Activity:</span>
                  <span className="font-bold text-blue-600">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Row 2 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Water Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">pH Level:</span>
                  <span className="font-bold text-green-600">7.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Oxygen:</span>
                  <span className="font-bold text-blue-600">8.5 mg/L</span>
                </div>
                <div className="text-xs text-green-600 font-medium">Status: Excellent</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Wildlife</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs flex items-center gap-1">
                    <Bird className="h-3 w-3" />
                    Birds:
                  </span>
                  <span className="font-bold">34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs flex items-center gap-1">
                    <TreePine className="h-3 w-3" />
                    Mammals:
                  </span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs flex items-center gap-1">
                    <Fish className="h-3 w-3" />
                    Fish:
                  </span>
                  <span className="font-bold">67</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Monitoring Stations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Station 1
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Station 2
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Station 3
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Station 4
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Plane className="h-4 w-4" />
                UAV Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Total Flights:</span>
                  <span className="font-bold">120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Coverage:</span>
                  <span className="font-bold text-green-600">97%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">This Month:</span>
                  <span className="font-bold">28</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Climate Chart */}
          <div className="lg:col-span-3">
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Flight Activity</CardTitle>
                <CardDescription>Monthly operations</CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={flightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="flights" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Central Map */}
          <div className="lg:col-span-6">
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Study Area Map</CardTitle>
                <CardDescription>Protected river ecosystem</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-b-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=256&width=500"
                    alt="Study Area Map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-base font-semibold">Interactive Map</p>
                      <p className="text-sm opacity-90">45.2671° N, 19.8335° E</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Water Level */}
          <div className="lg:col-span-3">
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Water Quality</CardTitle>
                <CardDescription>24-hour trends</CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ph" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="oxygen" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">© UAV Study Platform 2025 | Environmental Research Institute</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
