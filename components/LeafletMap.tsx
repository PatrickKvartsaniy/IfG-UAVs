"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Global reference for accessing the map instance from outside
let globalMapInstance: L.Map | null = null;
let globalMarkersMap: Map<number, L.Marker> = new Map();

// Global function to open popup
(window as any).openStationPopup = (objectId: number) => {
  console.log("Global openStationPopup called with objectId:", objectId);
  console.log("Global map instance:", globalMapInstance);
  console.log("Global markers map:", globalMarkersMap);

  if (!globalMapInstance) {
    console.error("Global map instance is not available");
    return;
  }

  const marker = globalMarkersMap.get(objectId);
  if (marker) {
    try {
      console.log("Opening popup for marker at:", marker.getLatLng());
      marker.openPopup();

      // Center map slightly below the marker so popup is fully visible
      const markerLatLng = marker.getLatLng();
      // Offset latitude by +0.0003 degrees (approximately 30 meters north)
      // This moves the view center north, making the marker appear lower and leaving space for popup above
      const offsetLatLng = L.latLng(
        markerLatLng.lat + 0.0003,
        markerLatLng.lng,
      );

      (globalMapInstance as L.Map).setView(offsetLatLng, 18);
      console.log("Popup opened successfully with offset");
    } catch (error) {
      console.error("Error opening popup:", error);
    }
  } else {
    console.warn(`No marker found for objectId: ${objectId}`);
    console.warn("Available markers:", Array.from(globalMarkersMap.keys()));
  }
};

interface MeasurementPoint {
  lat: number;
  lon: number;
  name: string;
  value?: number;
  type?: string;
  // Neue Felder für Excel-Daten
  objectId?: number;
  creationDate?: string;
  numberOfSpecies?: number;
  oxygen?: number;
  temperature?: number;
  pH?: number;
  conductivity?: number;
  flowVelocity?: number | string;
  restored?: string;
}

interface LeafletMapProps {
  measurementPoints: MeasurementPoint[];
  surveyImageUrl?: string;
  surveyBounds?: [[number, number], [number, number]];
  height?: string;
  onMapReady?: () => void;
}

export interface LeafletMapRef {
  openPopup: (objectId: number) => void;
}

const LeafletMap = forwardRef<LeafletMapRef, LeafletMapProps>(
  (
    {
      measurementPoints,
      surveyImageUrl,
      surveyBounds,
      height = "320px",
      onMapReady,
    },
    ref,
  ) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<Map<number, L.Marker>>(new Map());

    useImperativeHandle(ref, () => ({
      openPopup: (objectId: number) => {
        console.log("openPopup called with objectId:", objectId);
        console.log(
          "Available markers:",
          Array.from(markersRef.current.keys()),
        );
        console.log("Map instance:", mapInstanceRef.current);

        // Check if map instance exists and is valid
        if (!mapInstanceRef.current || !mapInstanceRef.current.getContainer()) {
          console.error("Map instance is not available or invalid");
          return;
        }

        const marker = markersRef.current.get(objectId);
        console.log("Found marker:", marker);

        if (marker) {
          try {
            console.log("Opening popup for marker at:", marker.getLatLng());

            // Use setTimeout to ensure the map is ready for the operation
            setTimeout(() => {
              if (mapInstanceRef.current && marker) {
                marker.openPopup();
                // Center the map on the marker with higher zoom level
                mapInstanceRef.current.setView(marker.getLatLng(), 18);
                console.log("Map centered on marker");
              }
            }, 100);
          } catch (error) {
            console.error("Error opening popup:", error);
          }
        } else {
          console.warn(`No marker found for objectId: ${objectId}`);
          console.warn(
            "Available markers:",
            Array.from(markersRef.current.entries()),
          );
        }
      },
    }));

    useEffect(() => {
      if (!mapRef.current) return;

      // Clean up previous map instance if it exists
      if (mapInstanceRef.current) {
        console.log("Cleaning up previous map instance");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current.clear();
        // Clear global references
        globalMapInstance = null;
        globalMarkersMap.clear();
      }

      // Calculate center and zoom based on measurement points or survey bounds
      let center: [number, number] = [52.0, 7.6]; // Fallback Münster
      let zoom = 13;

      if (surveyBounds) {
        // Use survey bounds if available
        center = [
          (surveyBounds[0][0] + surveyBounds[1][0]) / 2,
          (surveyBounds[0][1] + surveyBounds[1][1]) / 2,
        ];
      } else if (measurementPoints.length > 0) {
        // Calculate bounds from measurement points
        const lats = measurementPoints.map((p) => p.lat);
        const lons = measurementPoints.map((p) => p.lon);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);

        // Calculate center
        center = [(minLat + maxLat) / 2, (minLon + maxLon) / 2];

        // Calculate appropriate zoom level based on bounds
        const latDiff = maxLat - minLat;
        const lonDiff = maxLon - minLon;
        const maxDiff = Math.max(latDiff, lonDiff);

        // Adjust zoom based on the span of coordinates
        if (maxDiff > 0.1) zoom = 10;
        else if (maxDiff > 0.01) zoom = 13;
        else if (maxDiff > 0.005) zoom = 15;
        else zoom = 16;
      }

      console.log(
        "Creating new map instance with center:",
        center,
        "zoom:",
        zoom,
      );
      const map = L.map(mapRef.current).setView(center, zoom);

      // Satelliten-Basemap (Esri World Imagery)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        },
      ).addTo(map);

      // Survey-Bild als Overlay hinzufügen
      if (surveyImageUrl && surveyBounds) {
        L.imageOverlay(surveyImageUrl, surveyBounds, {
          opacity: 0.8,
          attribution: "UAV Survey Data",
        }).addTo(map);

        // Karte auf Survey-Bereich zoomen
        map.fitBounds(surveyBounds);
      } else if (measurementPoints.length > 0) {
        // If no survey bounds but we have measurement points, fit to those bounds
        const lats = measurementPoints.map((p) => p.lat);
        const lons = measurementPoints.map((p) => p.lon);

        const bounds = L.latLngBounds([
          [Math.min(...lats), Math.min(...lons)],
          [Math.max(...lats), Math.max(...lons)],
        ]);

        // Add some padding to the bounds
        map.fitBounds(bounds, { padding: [20, 20] });
      }

      // Measurement locations as markers
      markersRef.current.clear(); // Clear previous markers
      measurementPoints.forEach((point) => {
        // Color coding based on "restored" status
        const iconColor = point.restored === "y" ? "#22c55e" : "#ef4444"; // Green for renatured, Red for not renatured
        const statusText =
          point.restored === "y" ? "Renatured" : "Non-renatured";

        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
          background: ${iconColor};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        // Detailed popup with all measurement data
        const popupContent = `
        <div class="text-sm max-w-xs">
          <h3 class="font-bold text-gray-900 border-b pb-1 mb-2">${point.name}</h3>
          <div class="space-y-1">
            <p><span class="font-medium">Status:</span> <span class="px-2 py-1 rounded text-xs ${point.restored === "y" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">${statusText}</span></p>
            ${point.oxygen ? `<p><span class="font-medium">O₂:</span> ${point.oxygen} mg/L</p>` : ""}
            ${point.temperature ? `<p><span class="font-medium">Temperature:</span> ${point.temperature}°C</p>` : ""}
            ${point.pH ? `<p><span class="font-medium">pH Value:</span> ${point.pH}</p>` : ""}
            ${point.conductivity ? `<p><span class="font-medium">Conductivity:</span> ${point.conductivity} μS/cm</p>` : ""}
            ${point.flowVelocity && point.flowVelocity !== "n/a" ? `<p><span class="font-medium">Flow Velocity:</span> ${point.flowVelocity} m/s</p>` : ""}
            ${(point as any).humidity ? `<p><span class="font-medium">Humidity:</span> ${(point as any).humidity}%</p>` : ""}
            ${(point as any).soilMoisture ? `<p><span class="font-medium">Soil Moisture:</span> ${(point as any).soilMoisture}%</p>` : ""}
          </div>
          <p class="text-xs text-gray-500 mt-2 pt-1 border-t">
            📍 ${point.lat.toFixed(6)}, ${point.lon.toFixed(6)}
          </p>
        </div>
      `;

        const marker = L.marker([point.lat, point.lon], { icon: customIcon })
          .bindPopup(popupContent, {
            maxWidth: 300,
            className: "custom-popup",
          })
          .addTo(map);

        // Store marker reference by objectId
        if (point.objectId) {
          console.log("Storing marker for objectId:", point.objectId);
          markersRef.current.set(point.objectId, marker);
          // Also store in global map for direct access
          globalMarkersMap.set(point.objectId, marker);
        } else {
          console.warn("Point has no objectId:", point);
        }
      });

      mapInstanceRef.current = map;
      // Set global map instance for direct access
      globalMapInstance = map;
      console.log("Map initialized with", markersRef.current.size, "markers");
      console.log("Marker objectIds:", Array.from(markersRef.current.keys()));

      // Notify parent that the map is ready
      if (onMapReady) {
        setTimeout(() => {
          onMapReady();
        }, 100);
      }

      return () => {
        console.log("Cleaning up map in useEffect cleanup");
        try {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
          markersRef.current.clear();
        } catch (error) {
          console.error("Error during map cleanup:", error);
          // Force clear the references even if cleanup fails
          mapInstanceRef.current = null;
          markersRef.current.clear();
        }
      };
    }, [measurementPoints, surveyImageUrl, surveyBounds]);

    return <div ref={mapRef} style={{ height, width: "100%" }} />;
  },
);

LeafletMap.displayName = "LeafletMap";

export default LeafletMap;
