"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ExternalLink, Calendar, Users } from "lucide-react";

const storyMaps = [
  {
    id: 1,
    title: "Journey Through the Protected River Ecosystem",
    description:
      "An immersive exploration of our study area, from source to delta, showcasing the diverse habitats and species discovered through UAV monitoring.",
    thumbnail: "/storymap.jpeg",
    publishDate: "2024-01-15",
    author: "Research Team",
    tags: ["Ecosystem", "Biodiversity", "Conservation"],
    views: 1247,
    arcGisUrl:
      "https://storymaps.arcgis.com/stories/c845e722bb0e456a8ba56d2ec1b95e8e",
  },
];

export default function StoryMapsPage() {
  const openArcGisStoryMap = (url: string) => {
    window.open(url, "_blank");
  };

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
          <h2 className="text-3xl font-bold">
            Explore Our Research Through ArcGIS Story Maps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the fascinating world of our protected river ecosystem
            through immersive, data-driven ArcGIS Story Maps that bring our UAV
            research to life.
          </p>
        </div>

        {/* Featured Story Map */}
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={storyMaps[0].thumbnail}
                alt="Featured story map"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-3">Featured</Badge>
              <h3 className="text-2xl font-bold mb-3">{storyMaps[0].title}</h3>
              <p className="text-muted-foreground mb-4">
                {storyMaps[0].description}
              </p>
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
              <Button
                className="w-full md:w-auto"
                onClick={() => openArcGisStoryMap(storyMaps[0].arcGisUrl)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in ArcGIS Story Maps
              </Button>
            </div>
          </div>
        </Card>

        {/* ArcGIS Story Maps Information */}
        <Card>
          <CardHeader>
            <CardTitle>About ArcGIS Story Maps</CardTitle>
            <CardDescription>
              Powerful tools for creating immersive, interactive narratives that
              combine maps, text, images, and multimedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our research team uses ArcGIS Story Maps to create compelling
              narratives about our UAV study of the protected river ecosystem.
              These interactive experiences allow you to explore our findings
              through maps, images, videos, and data visualizations.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://storymaps.arcgis.com", "_blank")
              }
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More About ArcGIS Story Maps
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
