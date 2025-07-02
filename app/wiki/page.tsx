"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, MapPin, TreePine, Fish, Bird, Flower } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

// Import Mapbox component dynamically
const MapWithNoSSR = dynamic(() => import("@/components/mapbox-map"), {
  ssr: false,
});

const wildlifeData = [
  {
    id: 1,
    name: "European Kingfisher",
    category: "birds",
    scientificName: "Alcedo atthis",
    status: "Protected",
    habitat: "River banks, shallow waters",
    coordinates: { lat: 51.987, lng: 7.626 },
    polygon: [
      [7.626, 51.987],
      [7.627, 51.9872],
      [7.628, 51.9868],
      [7.6265, 51.9866],
      [7.626, 51.987],
    ],
    description:
      "Small, brightly colored bird known for its brilliant blue and orange plumage.",
    lastSeen: "2024-01-15",
    icon: Bird,
  },
  {
    id: 2,
    name: "Brown Trout",
    category: "fish",
    scientificName: "Salmo trutta",
    status: "Common",
    habitat: "Cool, oxygen-rich river waters",
    coordinates: { lat: 51.984, lng: 7.622 },
    polygon: [
      [7.622, 51.984],
      [7.6235, 51.9845],
      [7.624, 51.9835],
      [7.6225, 51.983],
      [7.622, 51.984],
    ],
    description:
      "Native freshwater fish species, important indicator of water quality.",
    lastSeen: "2024-01-20",
    icon: Fish,
  },
  {
    id: 3,
    name: "Pedunculate Oak",
    category: "flora",
    scientificName: "Quercus robur",
    status: "Ancient",
    habitat: "Riparian forest, well-drained soils",
    coordinates: { lat: 51.9855, lng: 7.618 },
    polygon: [
      [7.618, 51.9855],
      [7.619, 51.986],
      [7.618, 51.9865],
      [7.617, 51.985],
      [7.618, 51.9855],
    ],
    description:
      "Centuries-old oak trees forming the backbone of the forest ecosystem.",
    lastSeen: "2024-01-10",
    icon: TreePine,
  },
  {
    id: 4,
    name: "Wild Iris",
    category: "flora",
    scientificName: "Iris pseudacorus",
    status: "Abundant",
    habitat: "Wetlands, river margins",
    coordinates: { lat: 51.983, lng: 7.625 },
    polygon: [
      [7.625, 51.983],
      [7.626, 51.9835],
      [7.625, 51.984],
      [7.624, 51.9825],
      [7.625, 51.983],
    ],
    description:
      "Yellow flowering plant that thrives in wet conditions along the riverbank.",
    lastSeen: "2024-01-18",
    icon: Flower,
  },
  {
    id: 5,
    name: "Roe Deer",
    category: "mammals",
    scientificName: "Capreolus capreolus",
    status: "Common",
    habitat: "Forest edges, clearings",
    coordinates: { lat: 51.982, lng: 7.621 },
    polygon: [
      [7.621, 51.982],
      [7.6225, 51.9828],
      [7.624, 51.9824],
      [7.623, 51.981],
      [7.621, 51.982],
    ],
    description:
      "Small deer species frequently observed in early morning hours.",
    lastSeen: "2024-01-22",
    icon: TreePine,
  },
  {
    id: 6,
    name: "Grey Heron",
    category: "birds",
    scientificName: "Ardea cinerea",
    status: "Regular",
    habitat: "Shallow waters, fishing spots",
    coordinates: { lat: 51.988, lng: 7.628 },
    polygon: [
      [7.628, 51.988],
      [7.629, 51.989],
      [7.63, 51.9875],
      [7.629, 51.9865],
      [7.628, 51.988],
    ],
    description:
      "Large wading bird, excellent fisher and indicator of healthy aquatic ecosystem.",
    lastSeen: "2024-01-25",
    icon: Bird,
  },
];

const categories = [
  { id: "all", label: "All Species", count: wildlifeData.length },
  {
    id: "birds",
    label: "Birds",
    count: wildlifeData.filter((item) => item.category === "birds").length,
  },
  {
    id: "fish",
    label: "Fish",
    count: wildlifeData.filter((item) => item.category === "fish").length,
  },
  {
    id: "flora",
    label: "Flora",
    count: wildlifeData.filter((item) => item.category === "flora").length,
  },
  {
    id: "mammals",
    label: "Mammals",
    count: wildlifeData.filter((item) => item.category === "mammals").length,
  },
];

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState<
    (typeof wildlifeData)[0] | null
  >(null);
  const [mapKey, setMapKey] = useState(0); // Used to force map re-render

  const filteredData = wildlifeData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSpeciesClick = (species: (typeof wildlifeData)[0]) => {
    setSelectedSpecies(species);
    // Force map to re-render with new selected species
    setMapKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Wildlife Wiki</h1>
          <Badge variant="outline">Flora & Fauna Database</Badge>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Search, Filter, and Species List */}
          <div className="space-y-4">
            {/* Search and Filter Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="birds">Birds</TabsTrigger>
                    <TabsTrigger value="fish">Fish</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-2 mt-2">
                    <TabsTrigger value="flora">Flora</TabsTrigger>
                    <TabsTrigger value="mammals">Mammals</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex justify-between text-sm p-2 bg-muted rounded"
                    >
                      <span className="capitalize">{category.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Species Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Species Database</CardTitle>
                <CardDescription>
                  Click on a species to view its location on the map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 max-h-[600px] overflow-y-auto">
                  {filteredData.map((species) => (
                    <div
                      key={species.id}
                      className={`cursor-pointer p-3 border rounded-lg hover:shadow-md transition-shadow ${
                        selectedSpecies?.id === species.id
                          ? "ring-2 ring-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleSpeciesClick(species)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <species.icon className="h-4 w-4 text-primary" />
                          <div>
                            <h4 className="font-medium text-sm">
                              {species.name}
                            </h4>
                            <p className="text-xs text-muted-foreground italic">
                              {species.scientificName}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            species.status === "Protected"
                              ? "destructive"
                              : species.status === "Ancient"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {species.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {species.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{species.category}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeciesClick(species);
                          }}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Search className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">No species found</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Map and Selected Species Details */}
          <div className="space-y-4">
            {/* Map */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Location Map</CardTitle>
                <CardDescription>
                  Interactive map showing species habitat areas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] w-full">
                  <MapWithNoSSR
                    key={mapKey}
                    selectedSpecies={selectedSpecies}
                    allSpecies={wildlifeData}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Selected Species Details */}
            {selectedSpecies && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <selectedSpecies.icon className="h-5 w-5" />
                    {selectedSpecies.name}
                  </CardTitle>
                  <CardDescription className="italic">
                    {selectedSpecies.scientificName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          selectedSpecies.status === "Protected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {selectedSpecies.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {selectedSpecies.category}
                      </Badge>
                    </div>
                    <p className="text-sm">{selectedSpecies.description}</p>
                    <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground bg-muted p-3 rounded">
                      <div>
                        <span className="font-medium">Habitat:</span>{" "}
                        {selectedSpecies.habitat}
                      </div>
                      <div>
                        <span className="font-medium">Last seen:</span>{" "}
                        {selectedSpecies.lastSeen}
                      </div>
                      <div>
                        <span className="font-medium">Coordinates:</span>{" "}
                        {selectedSpecies.coordinates.lat},{" "}
                        {selectedSpecies.coordinates.lng}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!selectedSpecies && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Select a Species</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Click on a species from the list to view its location and
                    habitat on the map
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
