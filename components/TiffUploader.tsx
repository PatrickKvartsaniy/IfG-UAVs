"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, MapPin } from "lucide-react";
import { fromArrayBuffer } from "geotiff";
import proj4 from "proj4";

interface TiffUploaderProps {
  onImageProcessed: (
    imageUrl: string,
    bounds: [[number, number], [number, number]],
  ) => void;
}

export default function TiffUploader({ onImageProcessed }: TiffUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [geoInfo, setGeoInfo] = useState<string | null>(null);
  const [showWorldFileInput, setShowWorldFileInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const worldFileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleAutoLoad = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/survey-data/new.tif");
      if (!response.ok) {
        throw new Error("Could not load TIF from public folder");
      }

      const blob = await response.blob();
      const file = new File([blob], "new.tif", { type: "image/tiff" });
      await processFile(file);
    } catch (error) {
      console.error("Auto-load error:", error);
      alert("Could not auto-load TIF. Please upload manually.");
      setIsProcessing(false);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setGeoInfo("🔄 Processing file...");
    console.log(
      "Processing file:",
      file.name,
      "Size:",
      file.size,
      "Type:",
      file.type,
    );

    // First, try to process as a regular image (fallback approach)
    const processAsRegularImage = async () => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        img.onload = () => {
          console.log(
            "Image loaded as regular image:",
            img.width,
            "x",
            img.height,
          );

          // Scale down large images
          const maxDimension = 2048;
          const scale = Math.min(
            1,
            maxDimension / Math.max(img.width, img.height),
          );
          canvas.width = Math.floor(img.width * scale);
          canvas.height = Math.floor(img.height * scale);

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressedDataUrl);
        };

        img.onerror = () => {
          reject(new Error("Cannot load as regular image"));
        };

        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      // Try GeoTIFF processing first
      const arrayBuffer = await file.arrayBuffer();
      console.log("ArrayBuffer loaded, size:", arrayBuffer.byteLength);

      setGeoInfo("🔄 Parsing GeoTIFF structure...");

      let geotiff;
      try {
        geotiff = await fromArrayBuffer(arrayBuffer);
        console.log("GeoTIFF parsed successfully");
      } catch (parseError) {
        console.log("GeoTIFF parsing failed:", parseError);
        throw new Error(
          `GeoTIFF parsing failed: ${parseError instanceof Error ? parseError.message : "Unknown parsing error"}`,
        );
      }

      setGeoInfo("🔄 Extracting image and coordinates...");

      const image = await geotiff.getImage();
      console.log("Image extracted from GeoTIFF");

      // Get geographic information
      const bbox = image.getBoundingBox();
      console.log("Bounding box:", bbox);

      // Get additional metadata
      const geoKeys = image.getGeoKeys();
      console.log("GeoKeys:", geoKeys);

      const origin = image.getOrigin();
      console.log("Origin:", origin);

      const resolution = image.getResolution();
      console.log("Resolution:", resolution);

      // Function to detect coordinate system and convert to WGS84 if needed
      const convertToWGS84 = (
        west: number,
        south: number,
        east: number,
        north: number,
        geoKeys: any,
      ) => {
        // Check if coordinates are already in geographic (lat/lon) format
        // Lat/Lon values are typically between -180 to 180 for longitude and -90 to 90 for latitude
        if (
          west >= -180 &&
          west <= 180 &&
          east >= -180 &&
          east <= 180 &&
          south >= -90 &&
          south <= 90 &&
          north >= -90 &&
          north <= 90
        ) {
          console.log("Coordinates appear to be in lat/lon format already");
          return { west, south, east, north };
        }

        // Check if it's UTM coordinates (large numbers)
        if (
          Math.abs(west) > 180 ||
          Math.abs(east) > 180 ||
          Math.abs(south) > 90 ||
          Math.abs(north) > 90
        ) {
          console.log(
            "Coordinates appear to be in projected format (UTM/other), attempting conversion...",
          );

          try {
            // Try to get EPSG code from GeoKeys
            let sourceProj = null;

            // Common German UTM zones
            if (
              geoKeys &&
              (geoKeys.ProjectedCSTypeGeoKey || geoKeys.GeographicTypeGeoKey)
            ) {
              const epsgCode =
                geoKeys.ProjectedCSTypeGeoKey || geoKeys.GeographicTypeGeoKey;
              console.log("Found EPSG code from GeoKeys:", epsgCode);
              sourceProj = `EPSG:${epsgCode}`;
            } else {
              // Detect UTM zone based on coordinates (for Germany)
              // Germany is primarily in UTM zones 32N and 33N
              const utmZone = west < 500000 ? 32 : 33; // Rough estimation
              sourceProj = `EPSG:${25800 + utmZone}`; // UTM zones for Germany
              console.log(
                `No EPSG found, guessing UTM zone ${utmZone}N (${sourceProj})`,
              );
            }

            if (sourceProj) {
              // Convert corner points
              const targetProj = "EPSG:4326"; // WGS84

              const [convertedWestLon, convertedSouthLat] = proj4(
                sourceProj,
                targetProj,
                [west, south],
              );
              const [convertedEastLon, convertedNorthLat] = proj4(
                sourceProj,
                targetProj,
                [east, north],
              );

              console.log("Conversion successful:", {
                original: { west, south, east, north },
                converted: {
                  west: convertedWestLon,
                  south: convertedSouthLat,
                  east: convertedEastLon,
                  north: convertedNorthLat,
                },
              });

              return {
                west: convertedWestLon,
                south: convertedSouthLat,
                east: convertedEastLon,
                north: convertedNorthLat,
              };
            }
          } catch (conversionError) {
            console.error("Coordinate conversion failed:", conversionError);
          }
        }

        // Fallback: assume coordinates are correct as-is
        console.log("Using coordinates as-is (no conversion applied)");
        return { west, south, east, north };
      };

      let bounds: [[number, number], [number, number]];

      if (bbox && bbox.length === 4) {
        const [rawWest, rawSouth, rawEast, rawNorth] = bbox;
        console.log("Using bounding box coordinates:", {
          rawWest,
          rawSouth,
          rawEast,
          rawNorth,
        });

        // Validate coordinates
        if (
          isNaN(rawWest) ||
          isNaN(rawSouth) ||
          isNaN(rawEast) ||
          isNaN(rawNorth)
        ) {
          throw new Error("Invalid coordinates in bounding box");
        }

        // Convert coordinates if needed
        const { west, south, east, north } = convertToWGS84(
          rawWest,
          rawSouth,
          rawEast,
          rawNorth,
          geoKeys,
        );
        bounds = [
          [south, west],
          [north, east],
        ];
      } else if (origin && resolution) {
        // Calculate bounds from origin and resolution
        const [originX, originY] = origin;
        const [resX, resY] = resolution;
        const width = image.getWidth();
        const height = image.getHeight();

        const rawWest = originX;
        const rawEast = originX + width * resX;
        const rawNorth = originY;
        const rawSouth = originY - height * Math.abs(resY);

        console.log("Calculated from origin/resolution:", {
          rawWest,
          rawSouth,
          rawEast,
          rawNorth,
        });

        // Convert coordinates if needed
        const { west, south, east, north } = convertToWGS84(
          rawWest,
          rawSouth,
          rawEast,
          rawNorth,
          geoKeys,
        );
        bounds = [
          [south, west],
          [north, east],
        ];
      } else {
        throw new Error("No geographic information found in GeoTIFF");
      }

      setGeoInfo("🔄 Reading raster data...");

      const rasters = await image.readRasters();
      console.log("Rasters loaded, count:", rasters.length);

      const width = image.getWidth();
      const height = image.getHeight();
      console.log("Image dimensions:", width, "x", height);

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      // Use smaller scale for large images
      const maxDimension = 2048;
      const scale = Math.min(1, maxDimension / Math.max(width, height));
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);

      console.log(
        "Canvas size:",
        canvas.width,
        "x",
        canvas.height,
        "Scale:",
        scale,
      );

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const numBands = rasters.length;
      console.log("Number of bands:", numBands);

      // Handle different band configurations
      if (numBands >= 3) {
        // RGB or multi-spectral image
        setGeoInfo("🔄 Processing RGB image...");

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const sourceX = Math.floor(x / scale);
            const sourceY = Math.floor(y / scale);
            const sourceIndex = sourceY * width + sourceX;

            const pixelIndex = (y * canvas.width + x) * 4;

            // Get RGB values from first 3 bands
            const r = Math.min(
              255,
              Math.max(0, (rasters[0] as any)[sourceIndex] || 0),
            );
            const g = Math.min(
              255,
              Math.max(0, (rasters[1] as any)[sourceIndex] || 0),
            );
            const b = Math.min(
              255,
              Math.max(0, (rasters[2] as any)[sourceIndex] || 0),
            );

            data[pixelIndex] = r;
            data[pixelIndex + 1] = g;
            data[pixelIndex + 2] = b;
            data[pixelIndex + 3] = 255;
          }
        }
      } else {
        // Grayscale image
        setGeoInfo("🔄 Processing grayscale image...");

        const raster = rasters[0] as any;
        let min = Infinity;
        let max = -Infinity;

        // Find min/max values for normalization
        for (let i = 0; i < raster.length; i++) {
          const val = raster[i];
          if (val < min) min = val;
          if (val > max) max = val;
        }

        console.log("Raster value range:", min, "to", max);

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const sourceX = Math.floor(x / scale);
            const sourceY = Math.floor(y / scale);
            const sourceIndex = sourceY * width + sourceX;

            const pixelIndex = (y * canvas.width + x) * 4;

            const rawValue = raster[sourceIndex] || 0;
            const normalized = Math.floor(
              ((rawValue - min) / (max - min)) * 255,
            );

            data[pixelIndex] = normalized;
            data[pixelIndex + 1] = normalized;
            data[pixelIndex + 2] = normalized;
            data[pixelIndex + 3] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setProcessedImage(compressedDataUrl);

      const [south, west] = bounds[0];
      const [north, east] = bounds[1];
      setGeoInfo(
        `✅ GeoTIFF processed! Bounds (WGS84): ${south.toFixed(6)}, ${west.toFixed(6)} to ${north.toFixed(6)}, ${east.toFixed(6)}`,
      );

      onImageProcessed(compressedDataUrl, bounds);
      setIsProcessing(false);
    } catch (error) {
      console.error("GeoTIFF processing failed:", error);
      setGeoInfo(
        `⚠️ GeoTIFF failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );

      // Try processing as regular image
      try {
        setGeoInfo("🔄 Trying as regular image...");
        const imageDataUrl = await processAsRegularImage();
        setProcessedImage(imageDataUrl);

        // Prompt for manual coordinates
        const manualBounds =
          prompt(`Could not extract coordinates from GeoTIFF. 
Please enter coordinates manually in format: west,south,east,north
Example for Münster area: 7.55,51.95,7.65,52.05`);

        if (manualBounds) {
          const coords = manualBounds.split(",").map(Number);
          if (coords.length === 4 && coords.every((n) => !isNaN(n))) {
            const [west, south, east, north] = coords;
            const bounds: [[number, number], [number, number]] = [
              [south, west],
              [north, east],
            ];

            setGeoInfo(
              `📍 Manual coordinates applied: ${south}, ${west} to ${north}, ${east}`,
            );
            onImageProcessed(imageDataUrl, bounds);
            setIsProcessing(false);
            return;
          }
        }

        // Default fallback to Münster area
        setGeoInfo("📍 Using default Münster coordinates");
        const bounds: [[number, number], [number, number]] = [
          [51.95, 7.55],
          [52.05, 7.65],
        ];
        onImageProcessed(imageDataUrl, bounds);
        setIsProcessing(false);
      } catch (fallbackError) {
        console.error("Complete processing failure:", fallbackError);
        setGeoInfo(
          `❌ Cannot process file: ${fallbackError instanceof Error ? fallbackError.message : "Unknown error"}`,
        );
        alert(
          "Error: File cannot be processed. Please check if it's a valid image file.",
        );
        setIsProcessing(false);
      }
    }
  };

  const downloadProcessed = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.download = "compressed_survey.jpg";
    link.href = processedImage;
    link.click();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          GeoTIFF Processor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              variant="outline"
            >
              Manual Upload
            </Button>
            <Button
              onClick={handleAutoLoad}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? "Loading..." : "Auto-Load TIF"}
            </Button>
          </div>

          <Button
            onClick={() => setShowWorldFileInput(!showWorldFileInput)}
            variant="ghost"
            className="w-full text-sm"
          >
            📄 Alternative: Upload Image + World File (.tfw)
          </Button>

          {showWorldFileInput && (
            <div className="border rounded p-3 space-y-2 bg-gray-50">
              <p className="text-xs text-gray-600">
                If GeoTIFF doesn't work, upload your image and its world file
                separately:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.tif,.tiff"
                  className="text-xs"
                  placeholder="Image file"
                />
                <input
                  ref={worldFileRef}
                  type="file"
                  accept=".tfw,.jgw,.pgw,.wld"
                  className="text-xs"
                  placeholder="World file"
                />
              </div>
              <p className="text-xs text-gray-500">
                📍 World file contains: pixel size, rotation, upper-left
                coordinates
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".tif,.tiff,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="text-xs space-y-1">
            <p className="text-gray-500">
              🗺️ <strong>Auto-Load:</strong> Loads your new.tif automatically
              with coordinates
            </p>
            <p className="text-gray-400">
              📁 <strong>Manual:</strong> Choose any GeoTIFF/image file
            </p>
            <p className="text-gray-400">
              📄 <strong>World File:</strong> For when GeoTIFF parsing fails
            </p>
          </div>

          {processedImage && (
            <div className="space-y-2">
              <div className="text-sm text-green-600 font-medium">
                ✅ Image processed successfully!
              </div>
              {geoInfo && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {geoInfo}
                </div>
              )}
              <Button
                variant="outline"
                onClick={downloadProcessed}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Compressed Image
              </Button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </CardContent>
    </Card>
  );
}
