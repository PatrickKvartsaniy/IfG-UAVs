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
import {
  ArrowRight,
  Plane,
  TreePine,
  BarChart3,
  BookOpen,
  Map,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="h-12 w-12 text-green-600" />
              <h1 className="text-5xl font-bold text-gray-900">
                UAV Study Platform
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advanced environmental monitoring and research platform for
              protected river ecosystems using UAV technology
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Plane className="h-4 w-4 mr-2" />
                120+ UAV Flights
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <TreePine className="h-4 w-4 mr-2" />
                291 Species Identified
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <BarChart3 className="h-4 w-4 mr-2" />
                18 Months Active
              </Badge>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Real-time monitoring and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive overview of UAV operations, species data, and
                  environmental metrics.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    View Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Wildlife Wiki</CardTitle>
                <CardDescription>Interactive species database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore flora and fauna with interactive maps showing habitat
                  locations.
                </p>
                <Link href="/wiki">
                  <Button variant="outline" className="w-full">
                    Explore Species
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Map className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Story Maps</CardTitle>
                <CardDescription>ArcGIS interactive narratives</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Immersive stories combining maps, data, and multimedia
                  content.
                </p>
                <Link href="/story-maps">
                  <Button variant="outline" className="w-full">
                    View Stories
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Advanced data insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Deep dive into operational metrics, biodiversity, and
                  environmental data.
                </p>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full">
                    View Analytics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Study Information */}
          <div className="grid gap-8 lg:grid-cols-2 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Study Area Overview</CardTitle>
                <CardDescription>
                  Protected river ecosystem in Central Europe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Location Details</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Coordinates: 45.2671° N, 19.8335° E</li>
                      <li>• Total Area: 2,450 hectares</li>
                      <li>• River Length: 12.5 km</li>
                      <li>• Elevation: 85-220m above sea level</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Research Focus</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Biodiversity assessment</li>
                      <li>• Habitat mapping</li>
                      <li>• Water quality monitoring</li>
                      <li>• Conservation planning</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Key Achievements</CardTitle>
                <CardDescription>
                  Research milestones and discoveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">
                        Comprehensive Species Catalog
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Identified and documented 291 species across multiple
                        taxonomic groups
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Advanced UAV Mapping</p>
                      <p className="text-sm text-muted-foreground">
                        Achieved 97% area coverage with high-resolution aerial
                        surveys
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Conservation Impact</p>
                      <p className="text-sm text-muted-foreground">
                        Data-driven recommendations for habitat protection and
                        restoration
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Start Exploring</h2>
                <p className="text-xl mb-8 opacity-90">
                  Discover the rich biodiversity of our protected river
                  ecosystem
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" variant="secondary">
                      View Dashboard
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/wiki">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-green-600"
                    >
                      Explore Species
                      <BookOpen className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
