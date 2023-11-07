'use client'

import { ImageType } from "../types"

interface DisplayProps {
    _score: number
    title: string
    image_id: string
    artist_display: string
}

const Display: React.FC<DisplayProps> = (image) => {
    const { title, image_id, artist_display } = image
    return (
        <div style={{ 
            margin: '1em', 
            border: '1px solid', 
            padding: '1em',
            background: '#222',
            display: 'flex',
            maxWidth: '400px'
        }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} alt={title} height="100" />
            <div style={{ marginLeft: '1em' }}>
                <h2 style={{ marginBottom: '0.5em' }}>{title}</h2>
                <p style={{ marginTop: '0.5em'}}>{artist_display}</p>
            </div>
        </div>
    )
}

type ResultsProps = {
    isLoading: boolean
    data: ImageType[]
}

const filterOutNudity = (data: ImageType[]) => {
    const filteredData: ImageType[] = []

    for(let i = 0; i < data.length; i++) {
        if(!data[i].title.match(/nud(e|ity)/i)) {
            filteredData.push(data[i])
        }
    }

    return filteredData
}


const Results = ({ isLoading, data }: ResultsProps): JSX.Element => {
    if(isLoading) return <></>
    let sanitizedData = filterOutNudity(
        data.sort((a: ImageType, b: ImageType) => b._score - a._score)
    )
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sanitizedData.map((image, i) => 
                <Display key={i} {...image} />
            )}
        </div>
    )
}

export default Results
