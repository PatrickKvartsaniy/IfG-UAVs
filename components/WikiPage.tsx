"use client"

import { useMemo, useState } from "react"
import { FixedSizeList as List } from "react-window"
import { Species } from "@/data/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Search,
  MapPin,
  ExternalLink,
  Bird,
  Fish,
  Flower,
  TreePine,
} from "lucide-react"
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import("@/components/WikiMap"), { ssr: false })

const iconMap = {
  Bird,
  Fish,
  Flower,
  TreePine,
}

interface WikiPageProps {
  wildlifeData: Species[]
  riverPolygon: GeoJSON.FeatureCollection
}

const categories = ["all", "birds", "fish", "flora", "mammals"]

export default function WikiPage({ wildlifeData }: WikiPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null)

  const filteredData = useMemo(() => {
    return wildlifeData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [wildlifeData, searchTerm, selectedCategory])

  const handleSpeciesClick = (species: Species) => {
    setSelectedSpecies(species)
  }

  const clearSelection = () => {
    setSelectedSpecies(null)
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const species = filteredData[index]
    const Icon = iconMap[species.icon as keyof typeof iconMap] || TreePine

    return (
      <div
        style={style}
        key={species.id}
        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
          selectedSpecies?.id === species.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
        }`}
        onClick={() => handleSpeciesClick(species)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium truncate">{species.name}</h4>
              <p className="text-sm text-muted-foreground italic truncate">{species.scientificName}</p>
              <p className="text-xs text-muted-foreground capitalize">{species.category}</p>
            </div>
          </div>
          <Badge
            variant={
              species.status === "Protected"
                ? "destructive"
                : "secondary"
            }
            className="text-xs ml-2 flex-shrink-0"
          >
            {species.status}
          </Badge>
        </div>
      </div>
    )
  }

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
          {/* Data Source Attribution */}
          <Card className="bg-blue-50 border-blue-200 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-blue-800">
                    <strong>Data Source:</strong> Observations from iNaturalist
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://www.inaturalist.org", "_blank")}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit iNaturalist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search + Filters */}
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
                      variant={selectedCategory === category ? "default" : "outline"}
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

          <div className="grid xl:grid-cols-5 gap-6">
            {/* Virtualized Species List */}
            <div className="xl:col-span-2">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Species ({filteredData.length})</span>
                    {selectedSpecies && (
                      <Button variant="ghost" size="sm" onClick={clearSelection}>
                        Clear
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>Click on a species to view on the map</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredData.length > 0 ? (
                    <List
                      height={700}
                      itemCount={filteredData.length}
                      itemSize={88}
                      width="100%"
                    >
                      {Row}
                    </List>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No species found</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Map + Species Info */}
            <div className="xl:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                  <CardDescription>
                    {selectedSpecies
                      ? `Showing location of ${selectedSpecies.name}`
                      : "All species locations in the study area"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[450px] w-full">
                    <MapWithNoSSR selectedSpecies={selectedSpecies} allSpecies={wildlifeData} />
                  </div>
                </CardContent>
              </Card>

              {selectedSpecies && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {(() => {
                        const Icon = iconMap[selectedSpecies.icon as keyof typeof iconMap] || TreePine
                        return <Icon className="h-6 w-6" />
                      })()}
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
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={selectedSpecies.status === "Protected" ? "destructive" : "secondary"}>
                          {selectedSpecies.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {selectedSpecies.category}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(`https://www.inaturalist.org/taxa/${selectedSpecies.inaturalistId}`, "_blank")
                          }
                          className="h-6 px-2 text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on iNaturalist
                        </Button>
                      </div>

                      <p className="text-sm leading-relaxed">{selectedSpecies.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Habitat</h4>
                          <p className="text-sm text-muted-foreground">{selectedSpecies.habitat}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Last Observed</h4>
                          <p className="text-sm text-muted-foreground">{selectedSpecies.lastSeen}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Coordinates</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedSpecies.coordinates.lat.toFixed(4)}, {selectedSpecies.coordinates.lng.toFixed(4)}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Conservation Status</h4>
                          <p className="text-sm text-muted-foreground">{selectedSpecies.status}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
