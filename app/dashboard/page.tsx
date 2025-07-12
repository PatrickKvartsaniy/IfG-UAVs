"use client";

import { useState, useEffect } from "react";
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
import { MapPin, Thermometer, Droplets, Gauge } from "lucide-react";
import dynamic from "next/dynamic";

const LiveWeather = dynamic(() => import("@/components/LiveWeather"), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />,
});

interface MeasurementPoint {
  lat: number;
  lon: number;
  name: string;
  value?: number;
  type?: string;
  objectId?: number;
  creationDate?: string;
  numberOfSpecies?: number;
  oxygen?: number;
  temperature?: number;
  pH?: number;
  conductivity?: number;
  flowVelocity?: number | string;
  restored?: string;
  humidity?: number;
  soilMoisture?: number;
}

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded" />,
});

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [activeDataset, setActiveDataset] = useState<"water" | "soil">("water");
  const [showLawaInfo, setShowLawaInfo] = useState(false);

  // Function to handle station selection using global popup function
  const handleStationSelection = (stationId: number) => {
    console.log("Handling station selection for ID:", stationId);

    // Use global function instead of React ref
    if (typeof (window as any).openStationPopup === "function") {
      (window as any).openStationPopup(stationId);
    } else {
      console.warn("Global openStationPopup function is not available");
    }
  };

  // Zeit nur im Client setzen (Hydration-Problem lösen)
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    setIsClient(true);
  }, []);

  // Reset when dataset changes
  useEffect(() => {
    console.log("Dataset changed to:", activeDataset);
  }, [activeDataset]);

  // REAL measurement data from Excel table - WATER (Ordered from South to North)
  const waterMeasurementPoints = [
    // Station 1 (southernmost) - Renaturated
    {
      lat: 51.94405765,
      lon: 7.573433435,
      objectId: 1,
      creationDate: "5/30/2025 2:55:37 PM",
      numberOfSpecies: 2,
      oxygen: 8.3,
      temperature: 18.8,
      pH: 8.2,
      conductivity: 527,
      flowVelocity: 22.68,
      restored: "y",
      name: "Water Station 1",
      type: "Renaturated",
    },
    // Station 2 - Renaturated
    {
      lat: 51.94476251,
      lon: 7.573200841,
      objectId: 2,
      creationDate: "5/30/2025 1:15:53 PM",
      numberOfSpecies: 0,
      oxygen: 8.44,
      temperature: 18.8,
      pH: 7.8,
      conductivity: 520,
      flowVelocity: 9.1,
      restored: "y",
      name: "Water Station 2",
      type: "Renaturated",
    },
    // Station 3 - Renaturated
    {
      lat: 51.94504219,
      lon: 7.572768064,
      objectId: 3,
      creationDate: "5/30/2025 1:37:45 PM",
      numberOfSpecies: 0,
      oxygen: 8.55,
      temperature: 18.4,
      pH: 8.0,
      conductivity: 524,
      flowVelocity: 5.6,
      restored: "y",
      name: "Water Station 3",
      type: "Renaturated",
    },
    // Station 4 - Non-renaturated
    {
      lat: 51.94539172,
      lon: 7.571738768,
      objectId: 4,
      creationDate: "5/30/2025 2:00:48 PM",
      numberOfSpecies: 1,
      oxygen: 8.79,
      temperature: 19.6,
      pH: 8.0,
      conductivity: 522,
      flowVelocity: "n/a",
      restored: "n",
      name: "Water Station 4",
      type: "Non-renaturated",
    },
    // Station 5 - Non-renaturated
    {
      lat: 51.94591424,
      lon: 7.571528757,
      objectId: 5,
      creationDate: "5/30/2025 2:18:16 PM",
      numberOfSpecies: 1,
      oxygen: 8.41,
      temperature: 18.6,
      pH: 7.9,
      conductivity: 524,
      flowVelocity: 13.5,
      restored: "n",
      name: "Water Station 5",
      type: "Non-renaturated",
    },
    // Station 6 (northernmost) - Non-renaturated
    {
      lat: 51.9469839,
      lon: 7.571487392,
      objectId: 6,
      creationDate: "5/30/2025 2:35:08 PM",
      numberOfSpecies: 1,
      oxygen: 8.34,
      temperature: 18.5,
      pH: 8.2,
      conductivity: 535,
      flowVelocity: 10.3,
      restored: "n",
      name: "Water Station 6",
      type: "Non-renaturated",
    },
  ];

  // SOIL measurement data from Excel table - Ordered from South to North (lat 51.9415 to 51.9469)
  const soilMeasurementPoints = [
    // Station 1 (southernmost) - Renaturated
    {
      lat: 51.9414862,
      lon: 7.5764494,
      objectId: 1,
      temperature: 17.44,
      humidity: 75.67,
      soilMoisture: 12.1,
      restored: "y",
      name: "Soil Station 1",
      type: "Renaturated",
    },
    // Station 2 - Renaturated
    {
      lat: 51.9415407,
      lon: 7.5767333,
      objectId: 2,
      temperature: 16.52,
      humidity: 75.55,
      soilMoisture: 11.6,
      restored: "y",
      name: "Soil Station 2",
      type: "Renaturated",
    },
    // Station 3 - Renaturated
    {
      lat: 51.9415959,
      lon: 7.5767742,
      objectId: 3,
      temperature: 17.95,
      humidity: 75.26,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 3",
      type: "Renaturated",
    },
    // Station 4 - Renaturated
    {
      lat: 51.941743,
      lon: 7.5764706,
      objectId: 4,
      temperature: 18.98,
      humidity: 72.38,
      soilMoisture: 12.19,
      restored: "y",
      name: "Soil Station 4",
      type: "Renaturated",
    },
    // Station 5 - Renaturated
    {
      lat: 51.9421082,
      lon: 7.5756079,
      objectId: 5,
      temperature: 17.43,
      humidity: 80.73,
      soilMoisture: 11.87,
      restored: "y",
      name: "Soil Station 5",
      type: "Renaturated",
    },
    // Station 6 - Renaturated
    {
      lat: 51.9423608,
      lon: 7.5757084,
      objectId: 6,
      temperature: 18.22,
      humidity: 76.24,
      soilMoisture: 11.71,
      restored: "y",
      name: "Soil Station 6",
      type: "Renaturated",
    },
    // Station 7 - Renaturated
    {
      lat: 51.9427036,
      lon: 7.5750969,
      objectId: 7,
      temperature: 17.09,
      humidity: 77.49,
      soilMoisture: 11.79,
      restored: "y",
      name: "Soil Station 7",
      type: "Renaturated",
    },
    // Station 8 - Renaturated
    {
      lat: 51.9431885,
      lon: 7.5750439,
      objectId: 8,
      temperature: 17.61,
      humidity: 80.26,
      soilMoisture: 11.67,
      restored: "y",
      name: "Soil Station 8",
      type: "Renaturated",
    },
    // Station 9 - Renaturated
    {
      lat: 51.943661,
      lon: 7.5749714,
      objectId: 9,
      temperature: 17.51,
      humidity: 76.33,
      soilMoisture: 11.53,
      restored: "y",
      name: "Soil Station 9",
      type: "Renaturated",
    },
    // Station 10 - Renaturated
    {
      lat: 51.9436947,
      lon: 7.5738278,
      objectId: 10,
      temperature: 16.39,
      humidity: 76.95,
      soilMoisture: 11.68,
      restored: "y",
      name: "Soil Station 10",
      type: "Renaturated",
    },
    // Station 11 - Renaturated
    {
      lat: 51.9437077,
      lon: 7.5742544,
      objectId: 11,
      temperature: 16.33,
      humidity: 76.5,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 11",
      type: "Renaturated",
    },
    // Station 12 - Renaturated
    {
      lat: 51.9441371,
      lon: 7.5733219,
      objectId: 12,
      temperature: 16.83,
      humidity: 74.16,
      soilMoisture: 12.03,
      restored: "y",
      name: "Soil Station 12",
      type: "Renaturated",
    },
    // Station 13 - Renaturated
    {
      lat: 51.944236,
      lon: 7.5728354,
      objectId: 13,
      temperature: 22.15,
      humidity: 59.99,
      soilMoisture: 12.4,
      restored: "y",
      name: "Soil Station 13",
      type: "Renaturated",
    },
    // Station 14 - Renaturated
    {
      lat: 51.9445077,
      lon: 7.5729556,
      objectId: 14,
      temperature: 18.5,
      humidity: 68.61,
      soilMoisture: 12.31,
      restored: "y",
      name: "Soil Station 14",
      type: "Renaturated",
    },
    // Station 15 - Renaturated
    {
      lat: 51.9448183,
      lon: 7.5731248,
      objectId: 15,
      temperature: 17.92,
      humidity: 71.47,
      soilMoisture: 12.14,
      restored: "y",
      name: "Soil Station 15",
      type: "Renaturated",
    },
    // Station 16 - Renaturated
    {
      lat: 51.9451206,
      lon: 7.5725664,
      objectId: 16,
      temperature: 18.08,
      humidity: 70.82,
      soilMoisture: 12.22,
      restored: "y",
      name: "Soil Station 16",
      type: "Renaturated",
    },
    // Station 17 - Non-renaturated
    {
      lat: 51.945153,
      lon: 7.5716911,
      objectId: 17,
      temperature: 18.43,
      humidity: 68.34,
      soilMoisture: 11.75,
      restored: "n",
      name: "Soil Station 17",
      type: "Non-renaturated",
    },
    // Station 18 - Non-renaturated
    {
      lat: 51.9453003,
      lon: 7.5715979,
      objectId: 18,
      temperature: 19.3,
      humidity: 69.49,
      soilMoisture: 11.83,
      restored: "n",
      name: "Soil Station 18",
      type: "Non-renaturated",
    },
    // Station 19 - Non-renaturated
    {
      lat: 51.9453341,
      lon: 7.5724037,
      objectId: 19,
      temperature: 16.21,
      humidity: 76.94,
      soilMoisture: 12.05,
      restored: "n",
      name: "Soil Station 19",
      type: "Non-renaturated",
    },
    // Station 20 - Non-renaturated
    {
      lat: 51.945416,
      lon: 7.5713291,
      objectId: 20,
      temperature: 19.9,
      humidity: 66.36,
      soilMoisture: 11.88,
      restored: "n",
      name: "Soil Station 20",
      type: "Non-renaturated",
    },
    // Station 21 - Non-renaturated
    {
      lat: 51.9454298,
      lon: 7.5718045,
      objectId: 21,
      temperature: 17.21,
      humidity: 68.96,
      soilMoisture: 12.17,
      restored: "n",
      name: "Soil Station 21",
      type: "Non-renaturated",
    },
    // Station 22 - Non-renaturated
    {
      lat: 51.945557,
      lon: 7.5713674,
      objectId: 22,
      temperature: 20.99,
      humidity: 70.79,
      soilMoisture: 11.96,
      restored: "n",
      name: "Soil Station 22",
      type: "Non-renaturated",
    },
    // Station 23 - Non-renaturated
    {
      lat: 51.9456671,
      lon: 7.5713769,
      objectId: 23,
      temperature: 22.02,
      humidity: 68.1,
      soilMoisture: 11.96,
      restored: "n",
      name: "Soil Station 23",
      type: "Non-renaturated",
    },
    // Station 24 - Non-renaturated
    {
      lat: 51.9459548,
      lon: 7.5713928,
      objectId: 24,
      temperature: 24.03,
      humidity: 63.8,
      soilMoisture: 12.12,
      restored: "n",
      name: "Soil Station 24",
      type: "Non-renaturated",
    },
    // Station 25 - Non-renaturated
    {
      lat: 51.9461344,
      lon: 7.5715772,
      objectId: 25,
      temperature: 18.86,
      humidity: 67.3,
      soilMoisture: 12.42,
      restored: "n",
      name: "Soil Station 25",
      type: "Non-renaturated",
    },
    // Station 26 - Non-renaturated
    {
      lat: 51.9464195,
      lon: 7.5714852,
      objectId: 26,
      temperature: 23.74,
      humidity: 66.9,
      soilMoisture: 12.46,
      restored: "n",
      name: "Soil Station 26",
      type: "Non-renaturated",
    },
    // Station 27 - Non-renaturated
    {
      lat: 51.946422,
      lon: 7.5716927,
      objectId: 27,
      temperature: 19.49,
      humidity: 62.76,
      soilMoisture: 12.51,
      restored: "n",
      name: "Soil Station 27",
      type: "Non-renaturated",
    },
    // Station 28 - Non-renaturated
    {
      lat: 51.946784,
      lon: 7.5711248,
      objectId: 28,
      temperature: 23.11,
      humidity: 59.35,
      soilMoisture: 12.5,
      restored: "n",
      name: "Soil Station 28",
      type: "Non-renaturated",
    },
    // Station 29 - Non-renaturated
    {
      lat: 51.9468261,
      lon: 7.5715349,
      objectId: 29,
      temperature: 21.06,
      humidity: 63.06,
      soilMoisture: 12.43,
      restored: "n",
      name: "Soil Station 29",
      type: "Non-renaturated",
    },
    // Station 30 (northernmost) - Non-renaturated
    {
      lat: 51.9469094,
      lon: 7.5713069,
      objectId: 30,
      temperature: 22.35,
      humidity: 59.05,
      soilMoisture: 12.65,
      restored: "n",
      name: "Soil Station 30",
      type: "Non-renaturated",
    },
  ];

  const measurementPoints =
    activeDataset === "water" ? waterMeasurementPoints : soilMeasurementPoints;

  // Calculate statistics for active dataset
  const calculateStats = () => {
    const restored = measurementPoints.filter((p) => p.restored === "y");
    const nonRestored = measurementPoints.filter((p) => p.restored === "n");

    if (activeDataset === "water") {
      return {
        temperature: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).temperature, 0) /
            restored.length
          ).toFixed(1),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).temperature, 0) /
            nonRestored.length
          ).toFixed(1),
        },
        oxygen: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).oxygen, 0) /
            restored.length
          ).toFixed(2),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).oxygen, 0) /
            nonRestored.length
          ).toFixed(2),
        },
        pH: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).pH, 0) /
            restored.length
          ).toFixed(2),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).pH, 0) /
            nonRestored.length
          ).toFixed(2),
        },
        conductivity: {
          restored: Math.round(
            restored.reduce((sum, p) => sum + (p as any).conductivity, 0) /
              restored.length,
          ),
          nonRestored: Math.round(
            nonRestored.reduce((sum, p) => sum + (p as any).conductivity, 0) /
              nonRestored.length,
          ),
        },
        species: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).numberOfSpecies, 0) /
            restored.length
          ).toFixed(1),
          nonRestored: (
            nonRestored.reduce(
              (sum, p) => sum + (p as any).numberOfSpecies,
              0,
            ) / nonRestored.length
          ).toFixed(1),
        },
        flow: {
          restored: "7.4 cm/s", // Average of 9.1 and 5.6
          nonRestored: "n/a",
        },
      };
    } else {
      return {
        temperature: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).temperature, 0) /
            restored.length
          ).toFixed(1),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).temperature, 0) /
            nonRestored.length
          ).toFixed(1),
        },
        humidity: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).humidity, 0) /
            restored.length
          ).toFixed(1),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).humidity, 0) /
            nonRestored.length
          ).toFixed(1),
        },
        soilMoisture: {
          restored: (
            restored.reduce((sum, p) => sum + (p as any).soilMoisture, 0) /
            restored.length
          ).toFixed(2),
          nonRestored: (
            nonRestored.reduce((sum, p) => sum + (p as any).soilMoisture, 0) /
            nonRestored.length
          ).toFixed(2),
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
      };
    }
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">
            UAV Protected Area Study - Dashboard
          </h1>
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
                  <LeafletMap
                    measurementPoints={measurementPoints}
                    height="100%"
                  />
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
              {activeDataset === "water" ? (
                <button
                  className="text-xs text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  onClick={() => setShowLawaInfo(true)}
                >
                  Further information about LAWA Reference values
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Widget Grid Below Map */}
        {activeDataset === "water" ? (
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 w-full">
            {/* Water Quality Stations Widget */}
            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Water Quality
                </CardTitle>
              </CardHeader>
              <CardContent>                  <div className="space-y-3">
                    {/* Water stations summary */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-xs font-medium text-green-800">
                          Renaturated
                        </div>
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-xs text-green-600">measurements</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-200">
                        <div className="text-xs font-medium text-orange-800">
                          Non-renaturated
                        </div>
                        <div className="text-2xl font-bold text-orange-600">3</div>
                        <div className="text-xs text-orange-600">measurements</div>
                      </div>
                    </div>

                    {/* Station selection */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">
                        Select Station:
                      </div>
                      <select
                        className="w-full text-xs p-2 border rounded bg-white"
                        onChange={(e) => {
                          if (e.target.value) {
                            const stationId = Number.parseInt(e.target.value);
                            handleStationSelection(stationId);
                            e.target.value = ""; // Reset selection
                          }
                        }}
                      >
                        <option value="">Choose station...</option>
                        <optgroup label="Renaturated (3)">
                          {waterMeasurementPoints
                            .filter((p) => p.restored === "y")
                            .map((point) => (
                              <option key={point.objectId} value={point.objectId}>
                                Station {point.objectId}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="Non-renaturated (3)">
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

            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Oxygen Levels</CardTitle>
                <CardDescription className="text-xs">
                  LAWA Standard: ≥9 mg/L
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Renaturated:</span>
                    <span className="font-bold text-green-600">
                      {stats.oxygen?.restored} mg/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-renaturated:</span>
                    <span className="font-bold text-red-600">
                      {stats.oxygen?.nonRestored} mg/L
                    </span>
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

                      {/* Green marker for Renaturated */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.oxygen?.restored || "0") - 7) / 3) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker for Non-Renaturated */}
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

            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Water Temperature</CardTitle>
                <CardDescription className="text-xs">
                  LAWA Standard: 19-24°C (max. annual)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Renaturated:</span>
                    <span className="font-bold text-green-600">
                      {stats.temperature?.restored}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-renaturated:</span>
                    <span className="font-bold text-red-600">
                      {stats.temperature?.nonRestored}°C
                    </span>
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

                      {/* Green marker - Renaturated */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.temperature?.restored || "0") - 16) / 10) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker - Non-Renaturated */}
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
            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">pH Values</CardTitle>
                <CardDescription className="text-xs">
                  LAWA Standard: 7.0-8.5
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Renaturated:</span>
                    <span className="font-bold text-green-600">
                      {stats.pH?.restored}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-renaturated:</span>
                    <span className="font-bold text-red-600">
                      {stats.pH?.nonRestored}
                    </span>
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

                      {/* Green marker - Renaturated */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
                        style={{
                          left: `${Math.min(95, Math.max(5, ((Number.parseFloat(stats.pH?.restored || "0") - 6.5) / 2.5) * 100))}%`,
                        }}
                      >
                        <div className="absolute -top-2 left-0 w-0.5 h-2 bg-green-600"></div>
                        <div className="absolute -bottom-2 left-0 w-0.5 h-2 bg-green-600"></div>
                      </div>

                      {/* Red marker - Non-Renaturated */}
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

            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Conductivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Renaturated:</span>
                    <span className="font-bold text-green-600">
                      {stats.conductivity?.restored} μS/cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-renaturated:</span>
                    <span className="font-bold text-red-600">
                      {stats.conductivity?.nonRestored} μS/cm
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 lg:flex-none lg:w-[calc(33.333%-1rem)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Flow Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Renaturated:</span>
                    <span className="font-bold text-green-600">12.5 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Non-renaturated:</span>
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
                    Soil Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Soil stations summary */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-xs font-medium text-green-800">
                          Renaturated
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          16
                        </div>
                        <div className="text-xs text-green-600">measurements</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-200">
                        <div className="text-xs font-medium text-orange-800">
                          Non-renaturated
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          14
                        </div>
                        <div className="text-xs text-orange-600">measurements</div>
                      </div>
                    </div>

                    {/* Station selection */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">
                        Select Station:
                      </div>
                      <select
                        className="w-full text-xs p-2 border rounded bg-white"
                        onChange={(e) => {
                          if (e.target.value) {
                            const stationId = Number.parseInt(e.target.value);
                            handleStationSelection(stationId);
                            e.target.value = ""; // Reset selection
                          }
                        }}
                      >
                        <option value="">Choose station...</option>
                        <optgroup label="Renaturated (16)">
                          {soilMeasurementPoints
                            .filter((p) => p.restored === "y")
                            .map((point) => (
                              <option
                                key={point.objectId}
                                value={point.objectId}
                              >
                                Station {point.objectId}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="Non-renaturated (14)">
                          {soilMeasurementPoints
                            .filter((p) => p.restored === "n")
                            .map((point) => (
                              <option
                                key={point.objectId}
                                value={point.objectId}
                              >
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
                    Air Temperature
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Average temperature comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Renaturated Areas:
                        </span>
                        <span className="font-bold text-green-600 text-lg">
                          {stats.temperature?.restored}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Non-renaturated:
                        </span>
                        <span className="font-bold text-orange-600 text-lg">
                          {stats.temperature?.nonRestored}°C
                        </span>
                      </div>
                    </div>

                    {/* Temperature difference indicator */}
                    <div className="bg-blue-50 p-2 rounded border border-blue-200">
                      <div className="text-xs text-blue-800 font-medium">
                        Temperature Difference
                      </div>
                      <div className="text-sm text-blue-600">
                        {(
                          Number.parseFloat(
                            stats.temperature?.nonRestored || "0",
                          ) -
                          Number.parseFloat(stats.temperature?.restored || "0")
                        ).toFixed(1)}
                        °C warmer in non-renaturated areas
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
                  <CardDescription className="text-xs">
                    Relative humidity levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Renaturated Areas:
                        </span>
                        <span className="font-bold text-green-600 text-lg">
                          {stats.humidity?.restored}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Non-renaturated:
                        </span>
                        <span className="font-bold text-blue-600 text-lg">
                          {stats.humidity?.nonRestored}%
                        </span>
                      </div>
                    </div>

                    {/* Humidity difference indicator */}
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="text-xs text-green-800 font-medium">
                        Humidity Advantage
                      </div>
                      <div className="text-sm text-green-600">
                        {(
                          Number.parseFloat(stats.humidity?.restored || "0") -
                          Number.parseFloat(stats.humidity?.nonRestored || "0")
                        ).toFixed(1)}
                        % higher in renaturated areas
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
                  <CardDescription className="text-xs">
                    Moisture content levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Renaturated Areas:
                        </span>
                        <span className="font-bold text-green-600 text-lg">
                          {stats.soilMoisture?.restored}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Non-renaturated:
                        </span>
                        <span className="font-bold text-orange-600 text-lg">
                          {stats.soilMoisture?.nonRestored}%
                        </span>
                      </div>
                    </div>

                    {/* Moisture difference indicator */}
                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                      <div className="text-xs text-gray-800 font-medium">
                        Moisture Difference
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.abs(
                          Number.parseFloat(
                            stats.soilMoisture?.restored || "0",
                          ) -
                            Number.parseFloat(
                              stats.soilMoisture?.nonRestored || "0",
                            ),
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
                  <CardTitle className="text-base">
                    Temperature Range Analysis
                  </CardTitle>
                  <CardDescription>
                    Detailed temperature distribution across measurement points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-2">
                          Renaturated Areas
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {stats.tempRange?.restored}
                        </div>
                        <div className="text-xs text-green-600">
                          Temperature Range
                        </div>
                        <div className="text-sm text-green-700 mt-2">
                          Average: {stats.temperature?.restored}°C
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="text-sm font-medium text-orange-800 mb-2">
                          Non-renaturated Areas
                        </div>
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {stats.tempRange?.nonRestored}
                        </div>
                        <div className="text-xs text-orange-600">
                          Temperature Range
                        </div>
                        <div className="text-sm text-orange-700 mt-2">
                          Average: {stats.temperature?.nonRestored}°C
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="text-sm font-medium text-blue-800">
                        Key Findings
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Renaturated areas show consistently lower temperatures,
                        indicating better soil health and vegetation cover.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Humidity Range Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Humidity Range Analysis
                  </CardTitle>
                  <CardDescription>
                    Comprehensive humidity distribution patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-2">
                          Renaturated Areas
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {stats.humidityRange?.restored}
                        </div>
                        <div className="text-xs text-green-600">
                          Humidity Range
                        </div>
                        <div className="text-sm text-green-700 mt-2">
                          Average: {stats.humidity?.restored}%
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm font-medium text-blue-800 mb-2">
                          Non-renaturated Areas
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {stats.humidityRange?.nonRestored}
                        </div>
                        <div className="text-xs text-blue-600">
                          Humidity Range
                        </div>
                        <div className="text-sm text-blue-700 mt-2">
                          Average: {stats.humidity?.nonRestored}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        Key Findings
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        Renaturated areas maintain higher humidity levels,
                        supporting better ecosystem recovery and biodiversity.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* LAWA Information Popup */}
      {showLawaInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl relative z-[10000]">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">What is LAWA?</h2>
                <button
                  onClick={() => setShowLawaInfo(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-base leading-relaxed">
                  <strong>LAWA</strong> stands for the <em>Bund/Länder-Arbeitsgemeinschaft Wasser</em>, or German Working Group on Water Issues of the Federal States and the Federal Government. It is a national coordination body that develops strategies, guidance, and standards for water management across Germany. LAWA plays a central role in implementing European and national water protection policies in a harmonized way across the German federal states.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Role and Significance of LAWA Standards</h3>
                  <p className="text-base leading-relaxed mb-4">
                    LAWA standards aim to ensure consistent, science-based, and legally compliant monitoring and assessment of surface waters in Germany, especially in the context of the EU Water Framework Directive (WFD) (Directive 2000/60/EC). The WFD sets goals for achieving and maintaining a "good status" for all European waters.
                  </p>
                  
                  <p className="text-base leading-relaxed mb-4">
                    LAWA develops and publishes frameworks (such as the "Rahmenkonzeption Monitoring und Bewertung von Oberflächengewässern") that:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                    <li>Define technical and procedural standards for water monitoring programs.</li>
                    <li>Ensure national consistency in how ecological and chemical water status is evaluated.</li>
                    <li>Support EU reporting requirements, allowing Germany to present unified positions and fulfill legal obligations.</li>
                    <li>Integrate additional environmental and legal directives (e.g. Nitrates Directive, Habitats Directive).</li>
                  </ul>
                  
                  <p className="text-base leading-relaxed">
                    These frameworks are developed through collaboration between federal and state experts and adapted based on updates to laws, monitoring needs, and EU agreements. The documents are regularly updated to reflect new scientific knowledge, legal changes, and international coordination results.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Reference Guidelines</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    You can find the referenced guidelines here:
                  </p>
                  <a
                    href="https://www.lawa.de/documents/lawa-rakon-teil-a-monitoring-og-210812-final-barrierefrei_1689846507.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                  >
                    LAWA Rahmenkonzeption Monitoring und Bewertung von Oberflächengewässern (PDF)
                  </a>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowLawaInfo(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
