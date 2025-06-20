import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Users, Calendar, FileText } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()
  
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Buzzboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Streamlined content creation management system for social media professionals
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Organize client content creation with minimal overhead - schedule shoots, upload processed content, create social posts, track what&apos;s been posted.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep multiple clients&apos; content separate and organized with brand assets and preferences
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Camera className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Shoot Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plan shoots with automatic Google Calendar integration and Drive folder creation
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Content Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Know what content exists and what&apos;s been posted with simple usage tracking
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 mx-auto text-orange-600 mb-4" />
              <CardTitle>Post Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Plan and schedule social posts across platforms with content coordination
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to streamline your content workflow?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Single-user design with full access to organize client content creation efficiently.
              </p>
              <Link href="/auth/signin">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign In to Continue
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
