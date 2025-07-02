"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
}

export interface LeafletMapRef {
  openPopup: (objectId: number) => void;
}

const LeafletMap = forwardRef<LeafletMapRef, LeafletMapProps>(
  (
    { measurementPoints, surveyImageUrl, surveyBounds, height = "320px" },
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
        const marker = markersRef.current.get(objectId);
        console.log("Found marker:", marker);
        if (marker) {
          marker.openPopup();
          // Center the map on the marker
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView(marker.getLatLng(), 16);
          }
        } else {
          console.warn(`No marker found for objectId: ${objectId}`);
        }
      },
    }));

    useEffect(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Zentrum berechnen
      const center = surveyBounds
        ? [
            (surveyBounds[0][0] + surveyBounds[1][0]) / 2,
            (surveyBounds[0][1] + surveyBounds[1][1]) / 2,
          ]
        : [52.0, 7.6]; // Fallback Münster

      const map = L.map(mapRef.current).setView(center as [number, number], 13);

      // OpenStreetMap Basis-Layer
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "© OpenStreetMap contributors",
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
      }

      // Measurement locations as markers
      markersRef.current.clear(); // Clear previous markers
      measurementPoints.forEach((point) => {
        // Color coding based on "restored" status
        const iconColor = point.restored === "y" ? "#22c55e" : "#ef4444"; // Green for restored, Red for not restored
        const statusText = point.restored === "y" ? "Restored" : "Not restored";

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
            ${point.objectId ? `<p><span class="font-medium">Object ID:</span> ${point.objectId}</p>` : ""}
            ${point.creationDate ? `<p><span class="font-medium">Date:</span> ${point.creationDate}</p>` : ""}
            ${point.numberOfSpecies !== undefined ? `<p><span class="font-medium">Species:</span> ${point.numberOfSpecies}</p>` : ""}
            ${point.oxygen ? `<p><span class="font-medium">O₂:</span> ${point.oxygen} mg/L</p>` : ""}
            ${point.temperature ? `<p><span class="font-medium">Temperature:</span> ${point.temperature}°C</p>` : ""}
            ${point.pH ? `<p><span class="font-medium">pH Value:</span> ${point.pH}</p>` : ""}
            ${point.conductivity ? `<p><span class="font-medium">Conductivity:</span> ${point.conductivity} μS/cm</p>` : ""}
            ${point.flowVelocity && point.flowVelocity !== "n/a" ? `<p><span class="font-medium">Flow Velocity:</span> ${point.flowVelocity} m/s</p>` : ""}
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
        }
      });

      mapInstanceRef.current = map;

      return () => {
        map.remove();
        mapInstanceRef.current = null;
        markersRef.current.clear();
      };
    }, [measurementPoints, surveyImageUrl, surveyBounds]);

    return <div ref={mapRef} style={{ height, width: "100%" }} />;
  },
);

LeafletMap.displayName = "LeafletMap";

export default LeafletMap;
