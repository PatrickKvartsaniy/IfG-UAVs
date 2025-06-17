"use client"

import { useEffect, useRef, useState } from "react"

interface MapProps {
  selectedSpecies: any | null
  allSpecies: any[]
}

export default function MapboxMap({ selectedSpecies, allSpecies }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Polygon colors for different categories
  const getPolygonColor = (category: string) => {
    switch (category) {
      case "birds":
        return "#3b82f6" // blue
      case "fish":
        return "#06b6d4" // cyan
      case "flora":
        return "#10b981" // green
      case "mammals":
        return "#f59e0b" // orange
      default:
        return "#8b5cf6" // purple
    }
  }

  useEffect(() => {
    // Load Mapbox GL JS from CDN
    const loadMapbox = async () => {
      if (typeof window === "undefined") return

      // Check if mapboxgl is already loaded
      if ((window as any).mapboxgl) {
        initializeMap()
        return
      }

      // Load CSS
      const cssLink = document.createElement("link")
      cssLink.rel = "stylesheet"
      cssLink.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
      document.head.appendChild(cssLink)

      // Load JS
      const script = document.createElement("script")
      script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"
      script.onload = () => {
        initializeMap()
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapContainer.current || map.current) return

      const mapboxgl = (window as any).mapboxgl

      // Set access token - using the environment variable you have available
      mapboxgl.accessToken =
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoidGVzdCIsImEiOiJjbGV4YW1wbGUifQ.example"

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [19.8335, 45.2671],
        zoom: 14,
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")
      map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left")

      map.current.on("load", () => {
        setIsLoaded(true)
      })
    }

    loadMapbox()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !isLoaded || typeof window === "undefined") return

    const mapboxgl = (window as any).mapboxgl

    // Clear existing markers
    const markers = document.querySelectorAll(".mapboxgl-marker")
    markers.forEach((marker) => marker.remove())

    // Remove existing sources and layers
    if (map.current.getSource("habitat-polygons")) {
      if (map.current.getLayer("habitat-polygons-fill")) {
        map.current.removeLayer("habitat-polygons-fill")
      }
      if (map.current.getLayer("habitat-polygons-line")) {
        map.current.removeLayer("habitat-polygons-line")
      }
      map.current.removeSource("habitat-polygons")
    }

    if (selectedSpecies) {
      // Add marker for selected species
      const el = document.createElement("div")
      el.style.width = "20px"
      el.style.height = "20px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = getPolygonColor(selectedSpecies.category)
      el.style.border = "3px solid white"
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"
      el.style.cursor = "pointer"

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px; font-family: system-ui;">
          <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${selectedSpecies.name}</h3>
          <p style="margin: 0; font-style: italic; color: #666; font-size: 12px;">${selectedSpecies.scientificName}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px;">${selectedSpecies.habitat}</p>
        </div>
      `)

      new mapboxgl.Marker(el)
        .setLngLat([selectedSpecies.coordinates.lng, selectedSpecies.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current)

      // Add polygon for selected species habitat
      if (selectedSpecies.polygon) {
        const polygonGeoJSON = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                name: selectedSpecies.name,
                category: selectedSpecies.category,
                status: selectedSpecies.status,
              },
              geometry: {
                type: "Polygon",
                coordinates: [selectedSpecies.polygon],
              },
            },
          ],
        }

        map.current.addSource("habitat-polygons", {
          type: "geojson",
          data: polygonGeoJSON,
        })

        // Add fill layer
        map.current.addLayer({
          id: "habitat-polygons-fill",
          type: "fill",
          source: "habitat-polygons",
          paint: {
            "fill-color": getPolygonColor(selectedSpecies.category),
            "fill-opacity": 0.4,
          },
        })

        // Add outline layer
        map.current.addLayer({
          id: "habitat-polygons-line",
          type: "line",
          source: "habitat-polygons",
          paint: {
            "line-color": getPolygonColor(selectedSpecies.category),
            "line-width": 2,
          },
        })

        // Add click event to polygon
        map.current.on("click", "habitat-polygons-fill", (e: any) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0]
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <div style="padding: 8px; font-family: system-ui;">
                  <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${feature.properties.name} Habitat</h3>
                  <p style="margin: 0; font-size: 12px;">Status: ${feature.properties.status}</p>
                  <p style="margin: 4px 0 0 0; font-size: 12px;">Category: ${feature.properties.category}</p>
                </div>
              `)
              .addTo(map.current)
          }
        })

        // Change cursor on hover
        map.current.on("mouseenter", "habitat-polygons-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer"
          }
        })

        map.current.on("mouseleave", "habitat-polygons-fill", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = ""
          }
        })
      }

      // Fly to selected species location
      map.current.flyTo({
        center: [selectedSpecies.coordinates.lng, selectedSpecies.coordinates.lat],
        zoom: 16,
        duration: 1000,
      })
    } else {
      // If no species selected, show all species as small markers
      allSpecies.forEach((species) => {
        const el = document.createElement("div")
        el.style.backgroundColor = getPolygonColor(species.category)
        el.style.width = "12px"
        el.style.height = "12px"
        el.style.borderRadius = "50%"
        el.style.border = "2px solid white"
        el.style.cursor = "pointer"
        el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.3)"

        const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
          <div style="padding: 6px; font-family: system-ui;">
            <h4 style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold;">${species.name}</h4>
            <p style="margin: 0; font-size: 11px; color: #666; text-transform: capitalize;">${species.category}</p>
          </div>
        `)

        new mapboxgl.Marker(el)
          .setLngLat([species.coordinates.lng, species.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current)
      })

      // Reset view to show all species
      map.current.flyTo({
        center: [19.8335, 45.2671],
        zoom: 14,
        duration: 1000,
      })
    }
  }, [selectedSpecies, allSpecies, isLoaded])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Legend */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-xs">
          <h4 className="font-semibold mb-2">Species Categories</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getPolygonColor("birds") }}></div>
              <span>Birds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getPolygonColor("fish") }}></div>
              <span>Fish</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getPolygonColor("flora") }}></div>
              <span>Flora</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getPolygonColor("mammals") }}></div>
              <span>Mammals</span>
            </div>
          </div>
        </div>
      )}

      {/* Mapbox Attribution */}
      {isLoaded && (
        <div className="absolute bottom-1 right-1 text-xs text-gray-600 bg-white bg-opacity-75 px-1 rounded">
          © Mapbox © OpenStreetMap
        </div>
      )}
    </div>
  )
}
