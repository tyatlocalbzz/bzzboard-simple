import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
// import { db } from "@/lib/db" // Will be used when database is connected

export async function GET() {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In real implementation, fetch from database
    // const clients = await db.client.findMany({
    //   orderBy: { createdAt: 'desc' }
    // })

    // Mock data for now
    const clients = [
      {
        id: "1",
        name: "Acme Corp",
        email: "hello@acmecorp.com",
        website: "https://acmecorp.com",
        phone: "+1 (555) 123-4567",
        platforms: ["instagram", "facebook"],
        brandColors: "#FF6B6B",
        logoUrl: "https://example.com/logo.png",
        guidelines: "https://example.com/guidelines.pdf",
        status: "active",
        notes: "Great client, loves creative content",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15")
      },
      {
        id: "2",
        name: "Tech Startup",
        email: "contact@techstartup.io",
        website: "https://techstartup.io",
        platforms: ["linkedin", "instagram"],
        brandColors: "#4ECDC4",
        status: "active",
        notes: "Focus on professional, tech-forward content",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-10")
      }
    ]

    return NextResponse.json(clients)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Client name is required" },
        { status: 400 }
      )
    }

    // In real implementation, save to database
    // const client = await db.client.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     website: body.website,
    //     phone: body.phone,
    //     platforms: body.platforms || [],
    //     brandColors: body.brandColors,
    //     logoUrl: body.logoUrl,
    //     guidelines: body.guidelines,
    //     status: body.status || 'active',
    //     notes: body.notes,
    //   }
    // })

    // Mock response for now
    const client = {
      id: `mock-id-${Date.now()}`,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // In real app, also create Google Drive folder structure
    console.log("Would create Drive folder for client:", client.name)

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 