import { ImageType, Response } from "./types"

const fields = [
    'id',
    '_score',
    'image_id',
    'title',
    'artist_display'
]

export const artFetcher = async (search: string = '') => {
    return fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=${fields.join(',')}`)
        .then(r => r.json())
        .then(({ data }: Response) => data as ImageType[])
}
