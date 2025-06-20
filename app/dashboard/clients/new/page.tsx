"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

const platforms = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter" },
  { id: "tiktok", label: "TikTok" },
]

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    platforms: [] as string[],
    brandColors: "",
    logoUrl: "",
    guidelines: "",
    status: "active",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Mock success - redirect to clients list
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Error creating client:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Client</h1>
            <p className="text-muted-foreground mt-2">
              Create a new client profile to start managing their content
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>
              Enter the basic information and preferences for your new client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Client Name *</Label>
                    <Input
                      id="name"
                      placeholder="Acme Corporation"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@acmecorp.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://acmecorp.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Content Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content Settings</h3>
                
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform.id}
                          checked={formData.platforms.includes(platform.id)}
                          onCheckedChange={(checked) => 
                            handlePlatformChange(platform.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={platform.id} className="text-sm">
                          {platform.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Brand Assets */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Brand Assets</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandColors">Brand Colors</Label>
                    <Input
                      id="brandColors"
                      placeholder="#FF6B6B"
                      value={formData.brandColors}
                      onChange={(e) => handleInputChange("brandColors", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={formData.logoUrl}
                      onChange={(e) => handleInputChange("logoUrl", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guidelines">Style Guidelines URL</Label>
                  <Input
                    id="guidelines"
                    type="url"
                    placeholder="https://example.com/brand-guidelines.pdf"
                    value={formData.guidelines}
                    onChange={(e) => handleInputChange("guidelines", e.target.value)}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the client, content style preferences, etc."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button type="submit" disabled={isLoading} className="sm:order-2">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Create Client"}
                </Button>
                <Link href="/dashboard/clients" className="sm:order-1">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 