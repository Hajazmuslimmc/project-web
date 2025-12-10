import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, appsRef, AppData } from '@/lib/firebase'

// GET /api/apps/[id] - Get a single app by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'App ID is required' },
        { status: 400 }
      )
    }

    const appDoc = await getDoc(doc(appsRef, id))

    if (!appDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      )
    }

    const appData = appDoc.data()

    // Check if app is approved (published)
    if (!appData.approved) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      )
    }

    const app: AppData = {
      id: appDoc.id,
      ...appData,
      createdAt: appData.createdAt,
      updatedAt: appData.updatedAt
    } as AppData

    // Increment download count
    await updateDoc(doc(appsRef, id), {
      downloadCount: (appData.downloadCount || 0) + 1
    })

    return NextResponse.json({
      success: true,
      data: app
    })

  } catch (error) {
    console.error('Error fetching app:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch app' },
      { status: 500 }
    )
  }
}

// PUT /api/apps/[id] - Update an app (requires authentication and ownership)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const updates = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'App ID is required' },
        { status: 400 }
      )
    }

    // Check if app exists
    const appDoc = await getDoc(doc(appsRef, id))
    if (!appDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      )
    }

    // Update app
    await updateDoc(doc(appsRef, id), {
      ...updates,
      updatedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'App updated successfully'
    })

  } catch (error) {
    console.error('Error updating app:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update app' },
      { status: 500 }
    )
  }
}

// DELETE /api/apps/[id] - Delete an app (requires authentication and ownership/admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'App ID is required' },
        { status: 400 }
      )
    }

    // Check if app exists
    const appDoc = await getDoc(doc(appsRef, id))
    if (!appDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      )
    }

    // Delete app
    await deleteDoc(doc(appsRef, id))

    return NextResponse.json({
      success: true,
      message: 'App deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting app:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete app' },
      { status: 500 }
    )
  }
}
