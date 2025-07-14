import fs from "fs";
import path from "path";
import csv from "csv-parser";

// ----------------------------------
// Types
// ----------------------------------

export type IconName = "Bird" | "TreePine" | "Fish" | "Flower";

export interface Species {
  id: number;
  name: string;
  scientific_name: string;
  category: "birds" | "mammals" | "fish" | "flora";
  scientificName: string;
  status: "Protected" | "Common";
  coordinates: { lat: number; lng: number }; // still used for first point
  locations: { lat: number; lng: number }[]; // all sightings
  description: string;
  lastSeen: string;
  icon: IconName;
  inaturalistId: string;
  url?: string;
  imageUrl?: string;
  galery?: string[];
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
};

// ----------------------------------
// Taxonomy Icon/Category Map
// ----------------------------------

const categoryMap: Record<
  string,
  { category: Species["category"]; icon: IconName }
> = {
  Aves: { category: "birds", icon: "Bird" },
  Mammalia: { category: "mammals", icon: "TreePine" },
  Actinopterygii: { category: "fish", icon: "Fish" },
  Plantae: { category: "flora", icon: "Flower" },
};

// ----------------------------------
// CSV Loader
// ----------------------------------

export function loadWildlifeDataFromCSV(): Promise<Species[]> {
  const csvPath = path.join(process.cwd(), "observations-594798.csv");
  return new Promise((resolve, reject) => {
    const speciesMap = new Map<string, Species>();

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const lat = parseFloat(row.latitude);
        const lng = parseFloat(row.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const iconic = row.iconic_taxon_name;
        const mapInfo = categoryMap[iconic] || categoryMap.default;
        if (!mapInfo) return;

        const key = row.scientific_name || row.species_guess;
        const inaturalistId = row.url?.split("/").pop() || "";
        const location = { lat, lng };

        if (speciesMap.has(key)) {
          const existing = speciesMap.get(key)!;
          existing.locations.push(location);

          // Append image if present and not duplicate
          if (row.image_url && !existing.galery?.includes(row.image_url)) {
            existing.galery?.push(row.image_url);
          }
        } else {
          speciesMap.set(key, {
            id: speciesMap.size + 1,
            name: row.common_name || row.species_guess || "Unknown",
            scientific_name: row.scientific_name || "Unknown",
            scientificName: row.scientific_name || "Unknown",
            category: mapInfo.category,
            status: row.quality_grade === "research" ? "Protected" : "Common",
            coordinates: location,
            locations: [location],
            description: row.description || "No description available.",
            lastSeen: row.observed_on,
            icon: mapInfo.icon,
            inaturalistId,
            url: row.url,
            imageUrl: row.image_url || "",
            galery: row.image_url ? [row.image_url] : [], // ← initialize new gallery
          });
        }
      })
      .on("end", () => resolve(Array.from(speciesMap.values())))
      .on("error", (err) => reject(err));
  });
}
