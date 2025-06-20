import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, MapPin, Clock, Camera, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

async function ShootsContent() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Mock data for demo - in real app, fetch from database
  const shoots = [
    {
      id: "1",
      clientId: "1",
      clientName: "Acme Corp",
      scheduledDate: new Date("2024-01-25T10:00:00"),
      location: "Downtown Office Building",
      expectedContentCount: 15,
      status: "scheduled",
      objectives: "Product launch content - headshots and office environment",
      equipment: "DSLR, lighting kit, tripod",
      driveFolderUrl: "https://drive.google.com/drive/folders/abc123",
      notes: "Client prefers natural lighting"
    },
    {
      id: "2", 
      clientId: "2",
      clientName: "Tech Startup",
      scheduledDate: new Date("2024-01-28T14:00:00"),
      location: "Client's Office - 123 Tech St",
      expectedContentCount: 20,
      status: "scheduled",
      objectives: "Team photos and workspace shots for recruitment content",
      equipment: "DSLR, wide-angle lens, portable lighting",
      driveFolderUrl: "https://drive.google.com/drive/folders/def456",
      notes: "Need shots of the development team and office space"
    },
    {
      id: "3",
      clientId: "1", 
      clientName: "Acme Corp",
      scheduledDate: new Date("2024-01-15T09:00:00"),
      location: "Factory Location",
      expectedContentCount: 25,
      status: "complete",
      objectives: "Manufacturing process documentation",
      equipment: "DSLR, macro lens, industrial lighting",
      driveFolderUrl: "https://drive.google.com/drive/folders/ghi789",
      completedAt: new Date("2024-01-15T15:30:00"),
      notes: "Completed successfully - all content uploaded"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "complete":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const upcomingShoots = shoots.filter(shoot => shoot.status === "scheduled")
  const completedShoots = shoots.filter(shoot => shoot.status === "complete")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shoots</h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage your content creation shoots
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/calendar">
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
          </Link>
          <Link href="/dashboard/shoots/new">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Shoot
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{upcomingShoots.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Shoots</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{completedShoots.length}</p>
                <p className="text-sm text-muted-foreground">Completed This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {shoots.reduce((acc, shoot) => acc + (shoot.expectedContentCount || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Content Expected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Shoots */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Shoots</h2>
        {upcomingShoots.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingShoots.map((shoot) => (
              <Card key={shoot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{shoot.clientName}</CardTitle>
                    <Badge className={getStatusColor(shoot.status)}>
                      {shoot.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date & Time */}
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(shoot.scheduledDate, "PPP 'at' p")}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{shoot.location}</span>
                  </div>

                  {/* Objectives */}
                  <div className="text-sm">
                    <p className="font-medium mb-1">Objectives</p>
                    <p className="text-muted-foreground">{shoot.objectives}</p>
                  </div>

                  {/* Expected Content */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Expected Content:</span>
                    <span className="font-medium">{shoot.expectedContentCount} items</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Link href={`/dashboard/shoots/${shoot.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Shoot
                      </Button>
                    </Link>
                    {shoot.driveFolderUrl && (
                      <Link 
                        href={shoot.driveFolderUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Drive Folder
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming shoots</h3>
              <p className="text-muted-foreground mb-4">
                Schedule your first shoot to start creating content
              </p>
              <Link href="/dashboard/shoots/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Your First Shoot
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Completed Shoots */}
      {completedShoots.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recently Completed</h2>
          <div className="space-y-3">
            {completedShoots.slice(0, 3).map((shoot) => (
              <Card key={shoot.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{shoot.clientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(shoot.scheduledDate, "PPP")} - {shoot.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(shoot.status)}>
                      {shoot.status}
                    </Badge>
                    {shoot.driveFolderUrl && (
                      <Link 
                        href={shoot.driveFolderUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ShootsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ShootsContent />
      </Suspense>
    </DashboardLayout>
  )
} 