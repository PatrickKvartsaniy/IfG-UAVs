"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">About Us</h1>
          <Badge variant="outline">Research Team</Badge>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-8">
        {/* Group Photo */}
        <div className="text-center">
          <img
            src="/team.JPG?height=300&width=600"
            alt="UAV Study Research Team"
            className="mx-auto rounded-lg shadow-lg"
          />
          <p className="text-sm text-muted-foreground mt-2">UAV Study Research Team</p>
        </div>

        {/* Teams */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Data Dissemination</CardTitle>
              <CardDescription>Data management and publication</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Petro Kvartsianyi</li>
                <li className="text-sm">• Margaux Neri</li>
                <li className="text-sm">• Melanie Menoscal</li>
                <li className="text-sm">• Hala Ghareeb</li>
                <li className="text-sm">• Darian Weiß</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image Analysis</CardTitle>
              <CardDescription>UAV imagery processing and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Lourenço Alexandre</li>
                <li className="text-sm">• Muhammad Sanan</li>
                <li className="text-sm">• Kazim Baran Wilmaz</li>
                <li className="text-sm">• Ruben Femenia</li>
                <li className="text-sm">• Nolan Kressin</li>
                <li className="text-sm">• George Nana Harris</li>
                <li className="text-sm">• Philipp Mundinger</li>
                <li className="text-sm">• Gomathy Ambalavanan</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sensors</CardTitle>
              <CardDescription>Environmental monitoring equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Solenn Reeves-Long</li>
                <li className="text-sm">• Samuel Costa Cabral</li>
                <li className="text-sm">• Justin Cheung Cheng Chung</li>
                <li className="text-sm">• Brenan Gabriel Andre</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Coordination and administration</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Francisco Lozada</li>
                <li className="text-sm">• Mario Galvao</li>
                <li className="text-sm">• Selani Thomas</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
