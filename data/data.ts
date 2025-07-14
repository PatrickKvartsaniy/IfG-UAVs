import fs from "fs"
import path from "path"
import csv from "csv-parser"

// ----------------------------------
// Types
// ----------------------------------

export type IconName = "Bird" | "TreePine" | "Fish" | "Flower"

export interface Species {
  id: number
  name: string
  scientific_name: string
  category: "birds" | "mammals" | "fish" | "flora"
  scientificName: string
  status: "Protected" | "Common"
  habitat: string
  coordinates: { lat: number; lng: number }
  description: string
  lastSeen: string
  icon: IconName
  inaturalistId: string
  url?: string
  imageUrl?: string
}

// ----------------------------------
// Optional: Still using polygon for river area
// ----------------------------------

export const riverPolygon: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [7.57188255386237, 51.9472890384623],
              [7.57798829892342, 51.9417250472388],
              [7.57548092377824, 51.9406634699034],
              [7.5693814870451, 51.9462902273457],
              [7.57188255386237, 51.9472890384623],
            ],
          ],
        ],
      },
    },
  ],
}

// ----------------------------------
// Taxonomy Icon/Category Map
// ----------------------------------

const categoryMap: Record<string, { category: Species["category"]; icon: IconName }> = {
  Aves: { category: "birds", icon: "Bird" },
  Mammalia: { category: "mammals", icon: "TreePine" },
  Actinopterygii: { category: "fish", icon: "Fish" },
  Plantae: { category: "flora", icon: "Flower" },
}

// ----------------------------------
// CSV Loader 
// ----------------------------------

export function loadWildlifeDataFromCSV(): Promise<Species[]> {
  const csvPath = path.join(process.cwd(), "observations-594798.csv")

  return new Promise((resolve, reject) => {
    const results: Species[] = []

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const lat = parseFloat(row.latitude)
        const lng = parseFloat(row.longitude)
        if (isNaN(lat) || isNaN(lng)) return

        const iconic = row.iconic_taxon_name
        const mapInfo = categoryMap[iconic] || categoryMap.default
        if (!mapInfo) return
        const inaturalistId = row.url?.split("/").pop() || ""
        console.log("Processing row:", row)
        results.push({
          id: results.length + 1,
          name: row.common_name || row.species_guess || "Unknown",
          scientific_name: row.scientific_name || "Unknown",
          category: mapInfo.category,
          scientificName: row.scientific_name,
          status: row.quality_grade === "research" ? "Protected" : "Common",
          habitat: "Unknown",
          coordinates: { lat, lng },
          description: row.description || "No description available.",
          lastSeen: row.observed_on,
          icon: mapInfo.icon,
          inaturalistId,
          url: row.url,
          imageUrl: row.image_url || "",
        })
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err))
  })
}
