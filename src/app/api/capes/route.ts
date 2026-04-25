import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/capes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      return NextResponse.json([], { status: 200 });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Return empty array if backend is not available
    return NextResponse.json([], { status: 200 });
  }
}