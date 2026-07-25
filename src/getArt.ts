import { ImageType } from './types'

export const artFetcher = async (search: string = '') => {
  const response = await fetch(`/api/art?q=${encodeURIComponent(search)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch artworks')
  }

  return (await response.json()) as ImageType[]
}
