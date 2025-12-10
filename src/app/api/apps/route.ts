import { NextRequest, NextResponse } from 'next/server'
import { getDocs, query, where, orderBy, limit, addDoc, collection, Timestamp } from 'firebase/firestore'
import { db, appsRef, AppData } from '@/lib/firebase'

// GET /api/apps - Get all apps with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get filter parameters
    const category = searchParams.get('category')
    const platform = searchParams.get('platform')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    const limitCount = parseInt(searchParams.get('limit') || '20')

    let appsQuery = query(appsRef, where('approved', '==', true))

    // Add filters
    if (category && category !== 'all') {
      appsQuery = query(appsQuery, where('category', '==', category))
    }

    if (featured) {
      appsQuery = query(appsQuery, where('featured', '==', true))
    }

    // Add ordering and limit
    appsQuery = query(appsQuery, orderBy('createdAt', 'desc'), limit(limitCount))

    const querySnapshot = await getDocs(appsQuery)
    const apps: AppData[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      apps.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as AppData)
    })

    // Filter by platform and search if provided
    let filteredApps = apps

    if (platform && platform !== 'all') {
      filteredApps = filteredApps.filter(app =>
        app.platforms.includes(platform)
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredApps = filteredApps.filter(app =>
        app.name.toLowerCase().includes(searchLower) ||
        app.description.toLowerCase().includes(searchLower) ||
        app.developer.toLowerCase().includes(searchLower) ||
        app.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredApps,
      total: filteredApps.length
    })

  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apps' },
      { status: 500 }
    )
  }
}

// POST /api/apps - Create a new app (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    const requiredFields = ['name', 'description', 'category', 'platforms', 'developer', 'developerEmail', 'downloadUrl', 'iconUrl']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const appData = {
      ...body,
      rating: 0,
      totalRatings: 0,
      downloadCount: 0,
      featured: false,
      published: false,
      approved: false, // Will need admin approval
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      tags: body.tags || []
    }

    const docRef = await addDoc(appsRef, appData)

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...appData },
      message: 'App submitted successfully. It will be reviewed before publishing.'
    })

  } catch (error) {
    console.error('Error creating app:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create app' },
      { status: 500 }
    )
  }
}
