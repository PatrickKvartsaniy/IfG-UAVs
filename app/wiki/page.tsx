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
import dynamic from "next/dynamic";

// Import Leaflet component dynamically
const MapWithNoSSR = dynamic(() => import("@/components/WikiMap"), {
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

const categories = ["all", "birds", "fish", "flora", "mammals"];

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState<
    (typeof wildlifeData)[0] | null
  >(null);

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
  };

  const clearSelection = () => {
    setSelectedSpecies(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center gap-2 px-6 py-4 bg-white border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Wildlife Wiki</h1>
          <Badge variant="outline">Interactive Species Database</Badge>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search species by name or scientific name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category === "all" ? "All" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Species List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Species ({filteredData.length})</span>
                    {selectedSpecies && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                      >
                        Clear
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Click on a species to view on map
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {filteredData.map((species) => (
                      <div
                        key={species.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedSpecies?.id === species.id
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                        onClick={() => handleSpeciesClick(species)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <species.icon className="h-5 w-5 text-gray-600" />
                            <div>
                              <h4 className="font-medium">{species.name}</h4>
                              <p className="text-sm text-muted-foreground italic">
                                {species.scientificName}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {species.category}
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
                      </div>
                    ))}

                    {filteredData.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-2">No species found</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          Try adjusting your search terms or filters
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                  <CardDescription>
                    {selectedSpecies
                      ? `Showing habitat for ${selectedSpecies.name}`
                      : "All species locations in the study area"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] w-full">
                    <MapWithNoSSR
                      selectedSpecies={selectedSpecies}
                      allSpecies={wildlifeData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Species Details */}
              {selectedSpecies && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <selectedSpecies.icon className="h-6 w-6" />
                      <div>
                        <div>{selectedSpecies.name}</div>
                        <div className="text-sm font-normal text-muted-foreground italic">
                          {selectedSpecies.scientificName}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
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

                      <p className="text-sm leading-relaxed">
                        {selectedSpecies.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Habitat</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedSpecies.habitat}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">
                            Last Observed
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedSpecies.lastSeen}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">
                            Coordinates
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedSpecies.coordinates.lat.toFixed(4)},{" "}
                            {selectedSpecies.coordinates.lng.toFixed(4)}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Status</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedSpecies.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedSpecies && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Select a Species</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      Choose a species from the list to view its location,
                      habitat details, and additional information on the map
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
