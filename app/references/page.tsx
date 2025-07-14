"use client";

import { CardDescription } from "@/components/ui/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ExternalLink } from "lucide-react";

const references = [
  {
    id: 1,
    citation:
      "Musungu, K., Dube, T., Smit, J., & Shoko, M. (2024). Using UAV multispectral photography to discriminate plant species in a seep wetland of the Fynbos Biome. Wetlands Ecology and Management, 32(2), 207–227. https://doi.org/10.1007/s11273-023-09971-y",
  },
  {
    id: 2,
    citation:
      "Lewis, David, et al. (2009, May). Developing a Monitoring Program for Riparian Revegetation Projects. University of California Division of Agriculture and Natural Resources. ucanr.edu/sites/default/files/2024-02/393870.pdf",
  },
  {
    id: 3,
    citation:
      "Munjiu, O., Toderas, I., & Andreev, N. (2022). GUIDANCE ON THE MONITORING OF WATER QUALITY AND ASSESSMENT OF THE ECOLOGICAL STATUS OF AQUATIC ECOSYSTEMS.",
  },
  {
    id: 4,
    citation:
      "Martins, Julia. (2025, January 19). What Is Kanban? A Beginner’s Guide for Agile Teams [2025]. Asana. asana.com/resources/what-is-kanban",
  },
  {
    id: 5,
    citation:
      "Radigan, Dan. (n.d.). Kanban: How the Kanban Methodology Applies to Software Development. Atlassian. Retrieved June 10, 2025, from www.atlassian.com/agile/kanban",
  },
];

const tools = [
  {
    name: "ArcGIS Pro",
    description:
      "Geographic Information System for spatial analysis and mapping",
    version: "3.2",
    url: "https://www.esri.com/en-us/arcgis/products/arcgis-pro",
  },
  {
    name: "ArcGIS Online",
    description:
      "Geographic Information System for cloud-based spatial analysis and mapping",
    url: "https://www.esri.com/en-us/arcgis/products/arcgis-online",
  },
  {
    name: "QGIS",
    description: "Open-source Geographic Information System",
    version: "3.34",
    url: "https://qgis.org/",
  },
  {
    name: "Python",
    description: "Programming language for data analysis and machine learning",
    version: "3.11",
    url: "https://www.python.org/",
  },
  {
    name: "TypeScript",
    description: "Superset of JavaScript for building applications",
    version: "4.9",
  },
  {
    name: "Next.js",
    description: "React framework for building server-rendered applications",
    version: "14.4",
    url: "https://nextjs.org/",
  },
  {
    name: "Leaflet",
    description: "JavaScript library for interactive maps",
  },
];

export default function ReferencesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">References</h1>
          <Badge variant="outline">Literature</Badge>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-8">
        {/* Introduction */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Scientific References & Resources
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of research papers, technical reports,
            datasets, and tools that support our UAV-based environmental
            monitoring research.
          </p>
        </div>

        {/* Publications */}
        <Card>
          <CardHeader>
            <CardTitle>Publications & Research</CardTitle>
            <CardDescription>
              Peer-reviewed papers, conference proceedings, and technical
              reports from our research team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {references.map((ref) => (
                <li key={ref.id} className="text-sm leading-relaxed">
                  <span className="font-medium text-muted-foreground mr-2">
                    {ref.id}.
                  </span>
                  {ref.citation}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Software & Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Software & Tools</CardTitle>
            <CardDescription>
              Key software applications and tools used in our research and data
              analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <Badge variant="outline">v{tool.version}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tool.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => window.open(tool.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standards & Protocols */}
        <Card>
          <CardHeader>
            <CardTitle>Standards & Protocols</CardTitle>
            <CardDescription>
              International standards and protocols followed in our research
              methodology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">
                    ISO 19115:2003 - Geographic Information Metadata
                  </p>
                  <p className="text-sm text-muted-foreground">
                    International standard for describing geographic information
                    and services
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Water Framework Directive (WFD)</p>
                  <p className="text-sm text-muted-foreground">
                    European legislation for water quality assessment and
                    management
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">
                    LAWA (Länderarbeitsgemeinschaft Wasser)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    RaKon Teil B – Arbeitspapier II: Hintergrund- und
                    Orientierungswerte für physikalisch-chemische
                    Qualitätskomponenten in Fließgewässern.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acknowledgments */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Acknowledgments</CardTitle>
            <CardDescription>Organizations and institutions that have supported our research</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Funding Agencies</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• National Science Foundation (NSF)</li>
                  <li>• Environmental Protection Agency (EPA)</li>
                  <li>• European Research Council (ERC)</li>
                  <li>• National Geographic Society</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Partner Institutions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• University of Environmental Sciences</li>
                  <li>• Institute for Advanced Ecology</li>
                  <li>• Remote Sensing Research Center</li>
                  <li>• Conservation Biology Institute</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
