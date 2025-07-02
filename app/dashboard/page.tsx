"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MapPin } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import dynamic from "next/dynamic";

const LiveWeather = dynamic(() => import("@/components/LiveWeather"), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />,
});

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded" />,
});

interface LeafletMapRef {
  openPopup: (objectId: number) => void;
}

const flightData = [
  { date: "Jan", flights: 12, coverage: 85 },
  { date: "Feb", flights: 15, coverage: 92 },
  { date: "Mar", flights: 18, coverage: 88 },
  { date: "Apr", flights: 22, coverage: 95 },
  { date: "May", flights: 25, coverage: 91 },
  { date: "Jun", flights: 28, coverage: 97 },
];

const waterQualityData = [
  { time: "13:15", ph: 7.8, oxygen: 8.44, temp: 18.8 }, // Station 1
  { time: "13:37", ph: 8.0, oxygen: 8.55, temp: 18.4 }, // Station 2
  { time: "14:00", ph: 8.0, oxygen: 8.79, temp: 19.6 }, // Station 3
  { time: "14:18", ph: 7.9, oxygen: 8.41, temp: 18.6 }, // Station 6
  { time: "14:35", ph: 8.2, oxygen: 8.34, temp: 18.5 }, // Station 7
  { time: "14:55", ph: 8.2, oxygen: 8.3, temp: 18.8 }, // Station 8
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<LeafletMapRef>(null);

  // State für Survey-Bild - direkt das komprimierte Bild laden
  const [surveyImageUrl] = useState<string>(
    "/survey-data/compressed_survey_new.jpg",
  );

  // ECHTE Koordinaten aus GeoTIFF (ETRS89 UTM 32N -> WGS84)
  // Diese exakten Koordinaten haben ursprünglich funktioniert!
  const [surveyBounds] = useState<[[number, number], [number, number]]>([
    [51.944211596013005, 7.571090165784341], // Southwest - EXAKTE ursprüngliche Koordinaten
    [51.94641954070195, 7.5736040521594665], // Northeast - EXAKTE ursprüngliche Koordinaten
  ]);

  // Zeit nur im Client setzen (Hydration-Problem lösen)
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    setIsClient(true);
  }, []);

  // REAL measurement data from Excel table
  const measurementPoints = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                UAV Protected Area Study - Dashboard
              </h1>
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
          <LiveWeather />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Species Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Restored:</span>
                  <span className="font-bold text-green-600">0.67 avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-red-600">1.0 avg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Non-restored areas show higher species diversity
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Oxygen Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Restored:</span>
                  <span className="font-bold text-green-600">8.43 mg/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-blue-600">8.51 mg/L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Slightly higher in non-restored areas
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Restored:</span>
                  <span className="font-bold text-green-600">18.7°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-orange-600">18.9°C</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Slightly higher in non-restored areas
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Row 2 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">pH Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs">Restored:</span>
                  <span className="font-bold text-green-600">8.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-blue-600">8.03</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "52%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Slightly higher in non-restored areas
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
                  <span className="font-bold text-green-600">523 μS/cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-red-600">527 μS/cm</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Higher mineral content in non-restored
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
                  <span className="font-bold text-blue-600">12.5 m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Non-Restored:</span>
                  <span className="font-bold text-green-600">11.9 m/s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Faster flow in restored areas
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">SenseBox Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-16 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Restored", value: 50, color: "#22c55e" },
                        { name: "Non-Restored", value: 50, color: "#ef4444" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                      dataKey="value"
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#ef4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Restored</span>
                  <span>3 stations</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-Restored</span>
                  <span>3 stations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Central Map - Expanded */}
          <div className="lg:col-span-9">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  UAV Survey Area
                  <Badge variant="secondary" className="ml-2">
                    Survey Image
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Interactive map with survey data overlay
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-80">
                {isClient ? (
                  <LeafletMap
                    ref={mapRef}
                    measurementPoints={measurementPoints}
                    surveyImageUrl={surveyImageUrl}
                    surveyBounds={surveyBounds}
                    height="100%"
                  />
                ) : (
                  <div className="h-full bg-gray-100 animate-pulse rounded" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Monitoring Stations */}
          <div className="lg:col-span-3">
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Monitoring Stations</CardTitle>
                <CardDescription>Click to view station details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      console.log(
                        "Button clicked for station 1, mapRef:",
                        mapRef.current,
                      );
                      mapRef.current?.openPopup(1);
                    }}
                  >
                    <span className="font-medium">Station 1</span>
                    <span className="text-green-600 text-xs">Restored</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      mapRef.current?.openPopup(2);
                    }}
                  >
                    <span className="font-medium">Station 2</span>
                    <span className="text-green-600 text-xs">Restored</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      mapRef.current?.openPopup(3);
                    }}
                  >
                    <span className="font-medium">Station 3</span>
                    <span className="text-red-600 text-xs">Non-Restored</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      mapRef.current?.openPopup(6);
                    }}
                  >
                    <span className="font-medium">Station 6</span>
                    <span className="text-red-600 text-xs">Non-Restored</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      mapRef.current?.openPopup(7);
                    }}
                  >
                    <span className="font-medium">Station 7</span>
                    <span className="text-red-600 text-xs">Non-Restored</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-12 text-xs flex flex-col"
                    onClick={() => {
                      mapRef.current?.openPopup(8);
                    }}
                  >
                    <span className="font-medium">Station 8</span>
                    <span className="text-green-600 text-xs">Restored</span>
                  </Button>
                </div>
                <div className="mt-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Restored Areas (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Non-Restored Areas (3)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © UASFAR-2025_1 course | Ifgi Münster
          </p>
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
