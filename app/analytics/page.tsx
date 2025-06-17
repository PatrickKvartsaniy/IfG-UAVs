"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"

const flightAnalytics = [
  { month: "Jul", flights: 8, hours: 24, coverage: 78 },
  { month: "Aug", flights: 12, hours: 36, coverage: 85 },
  { month: "Sep", flights: 15, hours: 45, coverage: 92 },
  { month: "Oct", flights: 18, hours: 54, coverage: 88 },
  { month: "Nov", flights: 22, hours: 66, coverage: 95 },
  { month: "Dec", flights: 25, hours: 75, coverage: 91 },
  { month: "Jan", flights: 28, hours: 84, coverage: 97 },
]

const speciesDetection = [
  { week: "W1", birds: 12, mammals: 5, fish: 8, plants: 23 },
  { week: "W2", birds: 15, mammals: 7, fish: 12, plants: 28 },
  { week: "W3", birds: 18, mammals: 6, fish: 15, plants: 31 },
  { week: "W4", birds: 22, mammals: 9, fish: 18, plants: 35 },
]

const habitatData = [
  { habitat: "Riparian Forest", area: 45, species: 89 },
  { habitat: "Wetlands", area: 25, species: 67 },
  { habitat: "Grasslands", area: 20, species: 34 },
  { habitat: "River Channel", area: 10, species: 45 },
]

const waterQuality = [
  { date: "Jan 1", ph: 7.2, oxygen: 8.5, temperature: 4.2 },
  { date: "Jan 8", ph: 7.1, oxygen: 8.8, temperature: 3.8 },
  { date: "Jan 15", ph: 7.3, oxygen: 8.2, temperature: 4.5 },
  { date: "Jan 22", ph: 7.0, oxygen: 9.1, temperature: 3.9 },
  { date: "Jan 29", ph: 7.2, oxygen: 8.7, temperature: 4.1 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Analytics</h1>
          <Badge variant="outline">Advanced Insights</Badge>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flight Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Quality Score</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7/10</div>
              <p className="text-xs text-muted-foreground">Excellent quality</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs text-muted-foreground">Species identification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage Growth</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">Area expansion</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="operations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
            <TabsTrigger value="habitat">Habitat</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Operations Trend</CardTitle>
                  <CardDescription>Monthly flight activity and coverage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={flightAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="flights" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="coverage" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flight Hours vs Coverage</CardTitle>
                  <CardDescription>Efficiency analysis of UAV operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={flightAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="hours" stroke="#ff7300" strokeWidth={2} />
                      <Line type="monotone" dataKey="coverage" stroke="#00ff00" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Species Detection Over Time</CardTitle>
                  <CardDescription>Weekly species identification trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={speciesDetection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="birds" fill="#8884d8" />
                      <Bar dataKey="mammals" fill="#82ca9d" />
                      <Bar dataKey="fish" fill="#ffc658" />
                      <Bar dataKey="plants" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Biodiversity Metrics</CardTitle>
                  <CardDescription>Key biodiversity indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Species Richness</span>
                      <span className="text-sm font-medium">291 species</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Shannon Diversity Index</span>
                      <span className="text-sm font-medium">3.42</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Evenness Index</span>
                      <span className="text-sm font-medium">0.78</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="habitat" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Habitat Distribution</CardTitle>
                  <CardDescription>Area coverage by habitat type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={habitatData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="habitat" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="area" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Species-Habitat Relationship</CardTitle>
                  <CardDescription>Species count vs habitat area</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={habitatData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="area" name="Area %" />
                      <YAxis dataKey="species" name="Species Count" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter dataKey="species" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Water Quality Trends</CardTitle>
                  <CardDescription>Key water quality parameters over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={waterQuality}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="ph" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="oxygen" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="temperature" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Health Score</CardTitle>
                  <CardDescription>Overall ecosystem health indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Water Quality</span>
                      <span className="text-sm font-medium">Excellent (9.2/10)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Air Quality</span>
                      <span className="text-sm font-medium">Good (8.7/10)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Habitat Integrity</span>
                      <span className="text-sm font-medium">Very Good (8.4/10)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Biodiversity Index</span>
                      <span className="text-sm font-medium">High (8.9/10)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
