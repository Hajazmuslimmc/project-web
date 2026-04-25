import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get('name');
  const userId = formData.get('userId');
  const file = formData.get('file') as File;

  // Upload to Firebase Storage and create cape
  // TODO: Implement upload logic
  const response = await fetch('http://localhost:3001/createCape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, name, imageUrl: 'uploaded-url' }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}