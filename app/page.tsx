"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CalendarDays, MapPin, Plane, TreePine, Fish, Bird } from "lucide-react"
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
} from "recharts"

const flightData = [
  { date: "Jan", flights: 12, coverage: 85 },
  { date: "Feb", flights: 15, coverage: 92 },
  { date: "Mar", flights: 18, coverage: 88 },
  { date: "Apr", flights: 22, coverage: 95 },
  { date: "May", flights: 25, coverage: 91 },
  { date: "Jun", flights: 28, coverage: 97 },
]

const speciesData = [
  { name: "Birds", count: 45, color: "#8884d8" },
  { name: "Mammals", count: 23, color: "#82ca9d" },
  { name: "Fish", count: 67, color: "#ffc658" },
  { name: "Plants", count: 156, color: "#ff7300" },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Badge variant="secondary">Live Data</Badge>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Study Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Area Coverage</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">2,450 hectares mapped</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Species Identified</CardTitle>
              <TreePine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">291</div>
              <p className="text-xs text-muted-foreground">45 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Duration</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">months active</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Activity & Coverage</CardTitle>
              <CardDescription>Monthly UAV flights and area coverage percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={flightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="flights" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="coverage" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Species Distribution</CardTitle>
              <CardDescription>Biodiversity breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={speciesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {speciesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Study Information */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Study Area Information</CardTitle>
              <CardDescription>Protected river ecosystem monitoring project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Location Details</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Coordinates: 45.2671° N, 19.8335° E</li>
                    <li>• Total Area: 2,450 hectares</li>
                    <li>• River Length: 12.5 km</li>
                    <li>• Elevation: 85-220m above sea level</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Study Objectives</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Biodiversity assessment</li>
                    <li>• Habitat mapping</li>
                    <li>• Water quality monitoring</li>
                    <li>• Conservation planning</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Current Phase Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Collection</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Discoveries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Bird className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Rare Kingfisher Spotted</p>
                  <p className="text-xs text-muted-foreground">Sector 7, near river bend</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Fish className="h-5 w-5 text-cyan-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">New Fish Species</p>
                  <p className="text-xs text-muted-foreground">Upstream habitat zone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TreePine className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ancient Oak Grove</p>
                  <p className="text-xs text-muted-foreground">Protected forest area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
