"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Map,
  Shield,
  Calendar,
  Euro,
  Droplets,
  Fish,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-96 bg-gradient-to-r from-green-600 to-blue-600">
          <img
            src="/hero.jpeg?height=400&width=1200"
            alt="UAV flying over protected river ecosystem"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="h-16 w-16 text-white" />
                <h1 className="text-6xl font-bold">UAV Study Platform</h1>
              </div>
              <p className="text-2xl mb-8 max-w-4xl">
                Advanced environmental monitoring and research platform for
                protected river ecosystems using UAV technology
              </p>
            </div>
          </div>
        </div>

        {/* Content below hero */}
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Feature Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
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
                    <Button variant="outline" className="w-full bg-transparent">
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
                  <CardDescription>
                    Interactive species database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore flora and fauna with interactive maps showing
                    habitat locations.
                  </p>
                  <Link href="/wiki">
                    <Button variant="outline" className="w-full bg-transparent">
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
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Immersive stories combining maps, data, and multimedia
                    content.
                  </p>
                  <Link href="/story-maps">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Stories
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Renaturation Project Section */}
            <div className="mb-16">
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-blue-800">
                    River Aa Renaturation Project
                  </CardTitle>
                  <CardDescription className="text-lg text-blue-600">
                    Restoring natural habitats and improving biodiversity along
                    the protected river ecosystem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Project Timeline
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">Planning Phase (2011)</p>
                            <p className="text-muted-foreground">
                              Initial concept and planning for restoration
                              within the nature reserve
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">
                              Implementation (August 2012 - Summer 2014)
                            </p>
                            <p className="text-muted-foreground">
                              Main renaturation works completed over 2-year
                              period
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">Additional Sections</p>
                            <p className="text-muted-foreground">
                              Westerholtsche Wiese (2018), Haus Coerde (2010),
                              ongoing works since 2012
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Euro className="h-5 w-5 text-green-600" />
                        Project Investment
                      </h3>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="text-center mb-4">
                          <p className="text-3xl font-bold text-green-600">
                            €1 Million
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Project Cost
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-blue-600">
                              80%
                            </p>
                            <p className="text-muted-foreground">
                              State of North Rhine-Westphalia
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-semibold text-purple-600">
                              20%
                            </p>
                            <p className="text-muted-foreground">
                              City of Münster
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      Project Objectives
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="bg-white border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <h4 className="font-medium">Water Quality</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Improvement of both River Aa and Aasee through
                            re-establishing natural hydromorphology
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <h4 className="font-medium">Flood Protection</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Enhanced protection through wider, more sinuous
                            channel design reducing peak flows
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white border-purple-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Fish className="h-4 w-4 text-purple-500" />
                            <h4 className="font-medium">
                              Ecological Enhancement
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            New riparian habitats with improved connectivity for
                            flora and fauna
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="font-semibold mb-3">
                      Key Implementation Features
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                        <span>
                          Increased buffer zones between agricultural fields and
                          riverbed to create natural barriers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                        <span>
                          210-meter restoration section at Westerholtsche Wiese
                          (completed 2018)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                        <span>
                          320-meter section near Haus Coerde (completed 2010)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                        <span>
                          Ongoing works at Hülshoffstraße, A1 & inner-city areas
                          since 2012
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Information */}
            <div className="grid gap-8 lg:grid-cols-2 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Study Area Overview
                  </CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Research Institutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                    {/* University Logos */}
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src="csm_1623743845_DAH_Logo_ifgi_long_2b4c356743.png"
                        alt="Institute for Geoinformatics"
                        className="h-16 w-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <p className="text-xs text-center text-muted-foreground">
                        Institut für Geoinformatik
                      </p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src="1d3502d0963cebedbf37a0aedc81e093af096661-300x300.png"
                        alt="Master's Geotech"
                        className="h-16 w-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <p className="text-xs text-center text-muted-foreground">
                        Master's Geotech
                      </p>
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
                        className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
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
        </div>
      </section>
    </div>
  );
}
