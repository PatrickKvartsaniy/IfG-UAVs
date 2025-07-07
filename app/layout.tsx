import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UAV Protected Area Study",
  description: "Environmental monitoring and research platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-auto">{children}</main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  )
}
