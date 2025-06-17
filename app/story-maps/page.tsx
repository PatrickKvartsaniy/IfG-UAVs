"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ExternalLink, Calendar, Users } from "lucide-react"

const storyMaps = [
  {
    id: 1,
    title: "Journey Through the Protected River Ecosystem",
    description:
      "An immersive exploration of our study area, from source to delta, showcasing the diverse habitats and species discovered through UAV monitoring.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-15",
    author: "Research Team",
    tags: ["Ecosystem", "Biodiversity", "Conservation"],
    views: 1247,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example1",
  },
  {
    id: 2,
    title: "Seasonal Changes: A Year in the Life",
    description:
      "Witness the dramatic seasonal transformations captured by our UAV fleet, from spring floods to autumn migrations.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-10",
    author: "Dr. Sarah Chen",
    tags: ["Seasons", "Migration", "Climate"],
    views: 892,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example2",
  },
  {
    id: 3,
    title: "Conservation Success Stories",
    description:
      "Highlighting the positive impact of protection measures and community involvement in preserving this unique ecosystem.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-05",
    author: "Conservation Team",
    tags: ["Conservation", "Community", "Success"],
    views: 654,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example3",
  },
  {
    id: 4,
    title: "The Hidden World Beneath the Canopy",
    description:
      "Using advanced UAV technology to reveal the secret life of forest floor inhabitants and their crucial role in the ecosystem.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-20",
    author: "Tech Team",
    tags: ["Technology", "Forest", "Wildlife"],
    views: 0,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example4",
    isDraft: true,
  },
  {
    id: 5,
    title: "Water Quality and Aquatic Life",
    description:
      "A deep dive into the river's health, examining water quality indicators and their relationship with aquatic biodiversity.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-25",
    author: "Aquatic Team",
    tags: ["Water Quality", "Aquatic Life", "Monitoring"],
    views: 0,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example5",
    isDraft: true,
  },
  {
    id: 6,
    title: "Community Engagement and Education",
    description:
      "How local communities are becoming active participants in conservation efforts and environmental education programs.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishDate: "2024-01-30",
    author: "Outreach Team",
    tags: ["Education", "Community", "Outreach"],
    views: 423,
    arcGisUrl: "https://storymaps.arcgis.com/stories/example6",
  },
]

export default function StoryMapsPage() {
  const publishedMaps = storyMaps.filter((map) => !map.isDraft)
  const draftMaps = storyMaps.filter((map) => map.isDraft)

  const openArcGisStoryMap = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">ArcGIS Story Maps</h1>
          <Badge variant="outline">Interactive Narratives</Badge>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Explore Our Research Through ArcGIS Story Maps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the fascinating world of our protected river ecosystem through immersive, data-driven ArcGIS Story
            Maps that bring our UAV research to life.
          </p>
        </div>

        {/* Featured Story Map */}
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Featured story map"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-3">Featured</Badge>
              <h3 className="text-2xl font-bold mb-3">{storyMaps[0].title}</h3>
              <p className="text-muted-foreground mb-4">{storyMaps[0].description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {storyMaps[0].publishDate}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {storyMaps[0].views} views
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {storyMaps[0].tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button className="w-full md:w-auto" onClick={() => openArcGisStoryMap(storyMaps[0].arcGisUrl)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in ArcGIS Story Maps
              </Button>
            </div>
          </div>
        </Card>

        {/* Published Story Maps */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Published Stories</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedMaps.slice(1).map((storyMap) => (
              <Card key={storyMap.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={storyMap.thumbnail || "/placeholder.svg"}
                    alt={storyMap.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{storyMap.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{storyMap.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {storyMap.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {storyMap.views} views
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">By {storyMap.author}</span>
                  </div>
                  <div className="flex gap-1 mb-4 flex-wrap">
                    {storyMap.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => openArcGisStoryMap(storyMap.arcGisUrl)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in ArcGIS Story Maps
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Draft/In Review Story Maps */}
        {draftMaps.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">In Development</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {draftMaps.map((storyMap) => (
                <Card key={storyMap.id} className="overflow-hidden opacity-75">
                  <div className="aspect-video relative">
                    <img
                      src={storyMap.thumbnail || "/placeholder.svg"}
                      alt={storyMap.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      Draft
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{storyMap.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{storyMap.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {storyMap.publishDate}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">By {storyMap.author}</span>
                    </div>
                    <div className="flex gap-1 mb-4 flex-wrap">
                      {storyMap.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ArcGIS Story Maps Information */}
        <Card>
          <CardHeader>
            <CardTitle>About ArcGIS Story Maps</CardTitle>
            <CardDescription>
              Powerful tools for creating immersive, interactive narratives that combine maps, text, images, and
              multimedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our research team uses ArcGIS Story Maps to create compelling narratives about our UAV study of the
              protected river ecosystem. These interactive experiences allow you to explore our findings through maps,
              images, videos, and data visualizations.
            </p>
            <Button variant="outline" onClick={() => window.open("https://storymaps.arcgis.com", "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More About ArcGIS Story Maps
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
