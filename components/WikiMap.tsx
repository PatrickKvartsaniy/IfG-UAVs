"use client"

import { useEffect, useRef, useState } from "react"

interface MapProps {
    selectedSpecies: any | null
    allSpecies: any[]
}

export default function LeafletMap({ selectedSpecies, allSpecies }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Colors for different categories
    const getCategoryColor = (category: string) => {
        switch (category) {
            case "birds":
                return "#3b82f6"
            case "fish":
                return "#06b6d4"
            case "flora":
                return "#10b981"
            case "mammals":
                return "#f59e0b"
            default:
                return "#8b5cf6"
        }
    }

    useEffect(() => {
        const loadLeaflet = async () => {
            if (typeof window === "undefined") return

            // Check if Leaflet is already loaded
            if ((window as any).L) {
                initializeMap()
                return
            }

            // Load CSS
            const cssLink = document.createElement("link")
            cssLink.rel = "stylesheet"
            cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            document.head.appendChild(cssLink)

            // Load JS
            const script = document.createElement("script")
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            script.onload = () => {
                initializeMap()
            }
            document.head.appendChild(script)
        }

        const initializeMap = () => {
            if (!mapContainer.current || map.current) return

            const L = (window as any).L
                if (!L) {
                    console.error("Leaflet (L) not found on window object.");
                    return;
                }
            map.current = L.map(mapContainer.current).setView([45.2671, 19.8335], 14)

            // Add World_Imagery tiles
            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map.current)

            setIsLoaded(true)
        }

        loadLeaflet()

        return () => {
            if (map.current) {
                map.current.remove()
                map.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (!map.current || !isLoaded || typeof window === "undefined") return

        const L = (window as any).L

        // Clear existing markers
        markersRef.current.forEach((marker) => {
            map.current.removeLayer(marker)
        })
        markersRef.current = []

        if (selectedSpecies) {
            // Add marker for selected species
            const marker = L.circleMarker([selectedSpecies.coordinates.lat, selectedSpecies.coordinates.lng], {
                color: "white",
                fillColor: getCategoryColor(selectedSpecies.category),
                fillOpacity: 0.8,
                radius: 12,
                weight: 3,
            }).addTo(map.current)

            const popupContent = `
        <div style="font-family: system-ui; padding: 4px;">
          <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${selectedSpecies.name}</h3>
          <p style="margin: 0; font-style: italic; color: #666; font-size: 12px;">${selectedSpecies.scientificName}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px;">${selectedSpecies.habitat}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #666;">Status: ${selectedSpecies.status}</p>
        </div>
      `

            marker.bindPopup(popupContent).openPopup()
            markersRef.current.push(marker)

            // Add habitat polygon if available
            if (selectedSpecies.polygon) {
                const polygon = L.polygon(
                    selectedSpecies.polygon.map((coord: number[]) => [coord[1], coord[0]]),
                    {
                        color: getCategoryColor(selectedSpecies.category),
                        fillColor: getCategoryColor(selectedSpecies.category),
                        fillOpacity: 0.3,
                        weight: 2,
                    },
                ).addTo(map.current)

                markersRef.current.push(polygon)
            }

            // Fly to selected species
            map.current.setView([selectedSpecies.coordinates.lat, selectedSpecies.coordinates.lng], 16)
        } else {
            // Show all species as small markers
            allSpecies.forEach((species) => {
                const marker = L.circleMarker([species.coordinates.lat, species.coordinates.lng], {
                    color: "white",
                    fillColor: getCategoryColor(species.category),
                    fillOpacity: 0.7,
                    radius: 6,
                    weight: 2,
                }).addTo(map.current)

                const popupContent = `
          <div style="font-family: system-ui; padding: 4px;">
            <h4 style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold;">${species.name}</h4>
            <p style="margin: 0; font-size: 11px; color: #666; text-transform: capitalize;">${species.category}</p>
          </div>
        `

                marker.bindPopup(popupContent)
                markersRef.current.push(marker)
            })

            // Reset view to show all species
            map.current.setView([45.2671, 19.8335], 14)
        }
    }, [selectedSpecies, allSpecies, isLoaded])

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainer} className="w-full h-full rounded-lg" />

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Loading map...</p>
                    </div>
                </div>
            )}

            {/* Legend */}
            {isLoaded && (
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-xs border">
                    <h4 className="font-semibold mb-2">Species Categories</h4>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor("birds") }}></div>
                            <span>Birds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor("fish") }}></div>
                            <span>Fish</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor("flora") }}></div>
                            <span>Flora</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor("mammals") }}></div>
                            <span>Mammals</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
