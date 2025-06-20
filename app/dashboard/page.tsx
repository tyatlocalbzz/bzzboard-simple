import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CalendarDays, Camera, FileText, Plus, Users } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

async function DashboardContent() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Mock data for demo - in real app, fetch from database
  const todaysStats = {
    scheduledShoots: 2,
    postsToCreate: 5,
    contentToUpload: 3,
  }

  const recentActivity = [
    { id: 1, type: "shoot", client: "Acme Corp", action: "Shoot completed", time: "2 hours ago" },
    { id: 2, type: "content", client: "Tech Startup", action: "Content uploaded", time: "4 hours ago" },
    { id: 3, type: "post", client: "Fashion Brand", action: "Post scheduled", time: "6 hours ago" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Today's Focus */}
      <Card>
        <CardHeader>
                     <CardTitle>Today&apos;s Focus</CardTitle>
          <CardDescription>Your priorities for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Camera className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{todaysStats.scheduledShoots}</p>
                <p className="text-sm text-muted-foreground">Shoots Scheduled</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{todaysStats.postsToCreate}</p>
                <p className="text-sm text-muted-foreground">Posts to Create</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Plus className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{todaysStats.contentToUpload}</p>
                <p className="text-sm text-muted-foreground">Content to Upload</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/shoots/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Camera className="h-6 w-6" />
                Schedule New Shoot
              </Button>
            </Link>
            <Link href="/dashboard/clients/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Users className="h-6 w-6" />
                Add New Client
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <FileText className="h-6 w-6" />
                Create New Post
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === "shoot" && <Camera className="h-5 w-5 text-blue-600" />}
                    {activity.type === "content" && <FileText className="h-5 w-5 text-green-600" />}
                    {activity.type === "post" && <CalendarDays className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  )
} 