import { ImageType, Response } from './types'

const API_URL = 'https://api.artic.edu/api/v1/artworks/search'

const fields = ['id', '_score', 'image_id', 'title', 'artist_display']

/*
Instead of hardcofding the URL, we should build it using the URL and URLSearchParams
APIs, also adding error handling and type checking with try catch and TypeScript types.

Old code:
export const artFetcher = async (search: string = '') => {
    return fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=${fields.join(',')}`)
                .then(({ data }: Response) => data as ImageType[])

*/

export const artFetcher = async (
  search: string = '',
  page: number = 1,
): Promise<Response | null> => {
  const url = new URL(API_URL)
  url.searchParams.append('q', search)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('fields', fields.join(','))

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseObj: Response = await response.json()
    if (!Array.isArray(responseObj.data)) {
      throw new Error('Invalid data format from API')
    }
    return responseObj
  } catch (error) {
    console.error('Failed to fetch art:', error)
    return null
  }
}
