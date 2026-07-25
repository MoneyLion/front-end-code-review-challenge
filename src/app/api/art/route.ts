import { NextRequest, NextResponse } from 'next/server'

const fields = ['id', '_score', 'image_id', 'title', 'artist_display']

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('q') ?? ''

  const url = new URL('https://api.artic.edu/api/v1/artworks/search')
  url.searchParams.set('q', search)
  url.searchParams.set('fields', fields.join(','))

  const response = await fetch(url)

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: response.status },
    )
  }

  const payload = await response.json()
  return NextResponse.json(payload.data ?? [])
}
