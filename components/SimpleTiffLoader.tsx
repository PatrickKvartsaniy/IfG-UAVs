"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface SimpleTiffLoaderProps {
  onImageProcessed: (imageUrl: string, bounds: [[number, number], [number, number]]) => void
}

export default function SimpleTiffLoader({ onImageProcessed }: SimpleTiffLoaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadedImage, setLoadedImage] = useState<string | null>(null)

  // UTM Zone 32N zu WGS84 Konvertierung (präziser für Deutschland)
  const utmToWgs84 = (easting: number, northing: number): [number, number] => {
    // UTM Zone 32N Parameter für Deutschland
    const a = 6378137.0 // WGS84 semi-major axis
    const f = 1/298.257223563 // WGS84 flattening
    const k0 = 0.9996 // UTM scale factor
    const falseEasting = 500000
    const falseNorthing = 0
    
    const e = Math.sqrt(2*f - f*f)
    const e1sq = e*e / (1-e*e)
    
    const x = easting - falseEasting
    const y = northing - falseNorthing
    
    const M = y / k0
    const mu = M / (a * (1 - e*e/4 - 3*e*e*e*e/64 - 5*Math.pow(e,6)/256))
    
    const e1 = (1 - Math.sqrt(1-e*e)) / (1 + Math.sqrt(1-e*e))
    const J1 = 3*e1/2 - 27*Math.pow(e1,3)/32
    const J2 = 21*e1*e1/16 - 55*Math.pow(e1,4)/32
    const J3 = 151*Math.pow(e1,3)/96
    const J4 = 1097*Math.pow(e1,4)/512
    
    const fp = mu + J1*Math.sin(2*mu) + J2*Math.sin(4*mu) + J3*Math.sin(6*mu) + J4*Math.sin(8*mu)
    
    const C1 = e1sq * Math.pow(Math.cos(fp), 2)
    const T1 = Math.pow(Math.tan(fp), 2)
    const R1 = a * (1-e*e) / Math.pow(1-e*e*Math.pow(Math.sin(fp),2), 1.5)
    const N1 = a / Math.sqrt(1-e*e*Math.pow(Math.sin(fp),2))
    const D = x / (N1*k0)
    
    const Q1 = N1*Math.tan(fp)/R1
    const Q2 = D*D/2
    const Q3 = (5 + 3*T1 + 10*C1 - 4*C1*C1 - 9*e1sq) * Math.pow(D,4) / 24
    const Q4 = (61 + 90*T1 + 298*C1 + 45*T1*T1 - 1.6*e1sq - 3*C1*C1) * Math.pow(D,6) / 720
    
    const lat = fp - Q1*(Q2 - Q3 + Q4)
    
    const Q5 = D
    const Q6 = (1 + 2*T1 + C1) * Math.pow(D,3) / 6
    const Q7 = (5 - 2*C1 + 28*T1 - 3*C1*C1 + 8*e1sq + 24*T1*T1) * Math.pow(D,5) / 120
    
    const centralMeridian = 9 // Zone 32N central meridian
    const lon = centralMeridian + (Q5 - Q6 + Q7) / Math.cos(fp)
    
    return [lat * 180/Math.PI, lon * 180/Math.PI]
  }

  const loadCompressedImage = async () => {
    setIsLoading(true)
    
    try {
      // Ihre UTM-Koordinaten vom GeoTIFF
      const utmBounds = {
        west: 401785.101500,
        south: 5755797.727200,
        east: 401962.697400,
        north: 5756039.889900
      }
      
      // Konvertierung zu WGS84
      const [southLat, westLon] = utmToWgs84(utmBounds.west, utmBounds.south)
      const [northLat, eastLon] = utmToWgs84(utmBounds.east, utmBounds.north)
      
      // Bounds für Leaflet
      const bounds: [[number, number], [number, number]] = [
        [southLat, westLon],
        [northLat, eastLon]
      ]
      
      console.log('UTM Bounds:', utmBounds)
      console.log('WGS84 Bounds:', bounds)
      
      // Pfad zum komprimierten Bild
      const imageUrl = '/compressed_survey_new.jpg'
      
      // Testen ob das Bild existiert
      const response = await fetch(imageUrl, { method: 'HEAD' })
      if (!response.ok) {
        throw new Error('Komprimiertes Bild nicht gefunden')
      }
      
      setLoadedImage(imageUrl)
      onImageProcessed(imageUrl, bounds)
      
    } catch (error) {
      console.error('Fehler beim Laden:', error)
      alert('Fehler: Komprimiertes Bild konnte nicht geladen werden. Stellen Sie sicher, dass compressed_survey_new.jpg im public Ordner liegt.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadWithManualCoords = () => {
    const coordsInput = prompt(`Bitte geben Sie die Koordinaten manuell ein (Lat/Lon Format):
Format: südliche_lat,westliche_lon,nördliche_lat,östliche_lon
Beispiel für Münster: 51.96,7.61,51.97,7.63`)
    
    if (coordsInput) {
      const coords = coordsInput.split(',').map(Number)
      if (coords.length === 4 && coords.every(n => !isNaN(n))) {
        const [southLat, westLon, northLat, eastLon] = coords
        const bounds: [[number, number], [number, number]] = [
          [southLat, westLon],
          [northLat, eastLon]
        ]
        
        const imageUrl = '/compressed_survey_new.jpg'
        setLoadedImage(imageUrl)
        onImageProcessed(imageUrl, bounds)
      } else {
        alert('Ungültige Koordinaten. Bitte verwenden Sie das Format: lat,lon,lat,lon')
      }
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Survey Bild Loader
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={loadCompressedImage}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Lade...' : 'Komprimiertes Bild laden'}
            </Button>
            <Button 
              onClick={loadWithManualCoords}
              variant="outline"
              className="flex-1"
            >
              Mit manuellen Koordinaten
            </Button>
          </div>
          
          {loadedImage && (
            <div className="text-sm text-green-600">
              ✅ Bild geladen: {loadedImage.split('/').pop()}
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Lädt compressed_survey_new.jpg mit den UTM-Koordinaten:
            <br />
            UTM: 401785,5755798 → 401963,5756040
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
