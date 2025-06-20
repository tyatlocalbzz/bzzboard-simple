import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, Globe, Phone, Camera, FileText, Users } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

async function ClientsContent() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Mock data for demo - in real app, fetch from database
  const clients = [
    {
      id: "1",
      name: "Acme Corp",
      email: "hello@acmecorp.com",
      website: "https://acmecorp.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      platforms: ["instagram", "facebook"],
      brandColors: "#FF6B6B",
      lastShoot: "2024-01-15",
      nextActivity: "Shoot scheduled for Jan 25",
      contentCount: 45,
      postCount: 23
    },
    {
      id: "2", 
      name: "Tech Startup",
      email: "contact@techstartup.io",
      website: "https://techstartup.io",
      status: "active",
      platforms: ["linkedin", "instagram"],
      brandColors: "#4ECDC4",
      lastShoot: "2024-01-10",
      nextActivity: "Content review pending",
      contentCount: 32,
      postCount: 18
    },
    {
      id: "3",
      name: "Fashion Brand",
      email: "info@fashionbrand.com",
      status: "paused",
      platforms: ["instagram", "facebook"],
      brandColors: "#45B7D1",
      lastShoot: "2023-12-20",
      nextActivity: "Contract renewal needed",
      contentCount: 78,
      postCount: 56
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-2">
            Manage your client relationships and content projects
          </p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{client.name}</CardTitle>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
              {client.brandColors && (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: client.brandColors }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {client.brandColors}
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                {client.email && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {client.website && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="truncate">{client.website}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>

              {/* Platforms */}
              <div>
                <p className="text-sm font-medium mb-2">Platforms</p>
                <div className="flex gap-1 flex-wrap">
                  {client.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div className="text-center">
                  <p className="text-xl font-bold">{client.contentCount}</p>
                  <p className="text-xs text-muted-foreground">Content Items</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{client.postCount}</p>
                  <p className="text-xs text-muted-foreground">Posts Created</p>
                </div>
              </div>

              {/* Next Activity */}
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">{client.nextActivity}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3">
                <Link href={`/dashboard/shoots/new?client=${client.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    New Shoot
                  </Button>
                </Link>
                <Link href={`/dashboard/posts/new?client=${client.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first client to start managing content and shoots
            </p>
            <Link href="/dashboard/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Client
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientsContent />
      </Suspense>
    </DashboardLayout>
  )
} 