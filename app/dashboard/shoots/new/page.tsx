"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Save, Calendar as CalendarIcon, MapPin, Camera, FolderOpen } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

// Mock clients data - in real app, fetch from database
const mockClients = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Tech Startup" },
  { id: "3", name: "Fashion Brand" },
]

export default function NewShootPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get("client")
  
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    clientId: preselectedClientId || "",
    scheduledDate: "",
    scheduledTime: "",
    location: "",
    expectedContentCount: "",
    objectives: "",
    equipment: "",
    notes: "",
  })

  useEffect(() => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        scheduledDate: format(date, "yyyy-MM-dd")
      }))
    }
  }, [date])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const createGoogleCalendarEvent = async (shootData: {
    title: string;
    date: Date;
    location: string;
    description: string;
    driveFolder: string;
  }) => {
    // Mock Google Calendar API integration
    // In real implementation, this would use Google Calendar API
    console.log("Creating Google Calendar event:", shootData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      eventId: "mock-calendar-event-id",
      eventUrl: `https://calendar.google.com/event?eid=mock-event-id`
    }
  }

  const createGoogleDriveFolder = async (clientName: string, shootDate: string) => {
    // Mock Google Drive API integration
    // In real implementation, this would use Google Drive API
    console.log("Creating Google Drive folder for:", clientName, shootDate)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const folderName = `${shootDate}_${clientName.replace(/\s+/g, '_')}_Shoot`
    return {
      folderId: "mock-drive-folder-id",
      folderUrl: `https://drive.google.com/drive/folders/mock-folder-id`,
      folderName
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const selectedClient = mockClients.find(c => c.id === formData.clientId)
      if (!selectedClient || !date) {
        throw new Error("Missing required fields")
      }

      // Create combined datetime
      const shootDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`)
      
      // Create Google Drive folder
      const driveFolder = await createGoogleDriveFolder(
        selectedClient.name, 
        format(shootDateTime, "yyyy-MM-dd")
      )

      // Create Google Calendar event
      const calendarEvent = await createGoogleCalendarEvent({
        title: `Photo Shoot - ${selectedClient.name}`,
        date: shootDateTime,
        location: formData.location,
        description: `${formData.objectives}\n\nEquipment: ${formData.equipment}\n\nDrive Folder: ${driveFolder.folderUrl}`,
        driveFolder: driveFolder.folderUrl
      })

      // In real app, save shoot to database with:
      // - formData
      // - driveFolder.folderUrl
      // - calendarEvent.eventId
      console.log("Shoot created successfully:", {
        formData,
        driveFolder,
        calendarEvent
      })

      // Mock success - redirect to shoots list
      router.push("/dashboard/shoots")
    } catch (error) {
      console.error("Error creating shoot:", error)
      // In real app, show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/shoots">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Schedule New Shoot</h1>
            <p className="text-muted-foreground mt-2">
              Plan your content creation session and automatically set up calendar and folders
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Shoot Details</CardTitle>
            <CardDescription>
              Enter the shoot information - we&apos;ll automatically create a calendar event and Google Drive folder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Selection */}
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Select 
                  value={formData.clientId} 
                  onValueChange={(value) => handleInputChange("clientId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Shoot Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Shoot Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Client's office, studio address, etc."
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Expected Content Count */}
              <div className="space-y-2">
                <Label htmlFor="expectedContent">Expected Content Count</Label>
                <Input
                  id="expectedContent"
                  type="number"
                  placeholder="15"
                  value={formData.expectedContentCount}
                  onChange={(e) => handleInputChange("expectedContentCount", e.target.value)}
                  min="1"
                />
              </div>

              {/* Objectives */}
              <div className="space-y-2">
                <Label htmlFor="objectives">Shoot Objectives</Label>
                <Textarea
                  id="objectives"
                  placeholder="What type of content are you creating? (e.g., product photos, team headshots, office environment)"
                  value={formData.objectives}
                  onChange={(e) => handleInputChange("objectives", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment Needed</Label>
                <div className="relative">
                  <Camera className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="equipment"
                    placeholder="DSLR camera, lighting kit, tripod, etc."
                    value={formData.equipment}
                    onChange={(e) => handleInputChange("equipment", e.target.value)}
                    className="pl-10"
                    rows={2}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements, client preferences, access instructions, etc."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Integration Info */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium flex items-center">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Automatic Setup
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Calendar event will be created automatically</li>
                  <li>• Google Drive folder will be set up for content upload</li>
                  <li>• You&apos;ll receive calendar reminders 24h and 2h before the shoot</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button type="submit" disabled={isLoading} className="sm:order-2">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Scheduling..." : "Schedule Shoot"}
                </Button>
                <Link href="/dashboard/shoots" className="sm:order-1">
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