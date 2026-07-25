import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { artFetcher } from './getArt'

describe('artFetcher', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('calls the BFF route with the search term and returns artwork data', async () => {
    const mockData = [
      {
        _score: 1,
        title: 'Mona Lisa',
        image_id: 'abc',
        artist_display: 'Leonardo da Vinci',
      },
    ]

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })

    vi.stubGlobal('fetch', fetchMock)

    const result = await artFetcher('monet')

    expect(fetchMock).toHaveBeenCalledWith('/api/art?q=monet')
    expect(result).toEqual(mockData)
  })
})
