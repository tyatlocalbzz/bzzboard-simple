"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  Calendar, 
  Camera, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  Users 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Shoots", href: "/dashboard/shoots", icon: Camera },
  { name: "Content", href: "/dashboard/content", icon: FileText },
  { name: "Posts", href: "/dashboard/posts", icon: FileText },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" })
  }

  const NavigationItems = () => (
    <nav className="flex flex-col space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon className="mr-3 h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Buzzboard</h2>
            </div>
            <div className="flex-1 p-6">
              <NavigationItems />
            </div>
            <div className="p-6 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r bg-card">
          <div className="flex items-center px-6 py-6 border-b">
            <h1 className="text-xl font-bold text-foreground">Buzzboard</h1>
          </div>
          <div className="flex-1 px-6 py-6">
            <NavigationItems />
          </div>
          <div className="px-6 py-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="px-4 py-8 md:px-8">
          <div className="pt-12 md:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 