'use client'

import { ImageType } from '../types'
import styles from './Results.module.css'

interface DisplayProps {
  _score: number
  title: string
  image_id: string
  artist_display: string
}

const Display: React.FC<DisplayProps> = (image) => {
  const { title, image_id, artist_display } = image
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          alt={title}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.artist}>{artist_display || 'Unknown artist'}</p>
        <p className={styles.meta}>Featured artwork</p>
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

  for (let i = 0; i < data.length; i++) {
    if (!data[i].title.match(/nud(e|ity)/i)) {
      filteredData.push(data[i])
    }
  }

  return filteredData
}

const Results = ({ isLoading, data }: ResultsProps): JSX.Element => {
  if (isLoading) return <></>
  const sanitizedData = filterOutNudity(
    [...data].sort((a: ImageType, b: ImageType) => b._score - a._score),
  )

  if (!sanitizedData.length) {
    return (
      <div className={styles.emptyState}>
        No matching artworks to display right now.
      </div>
    )
  }

  return (
    <div className={styles.resultsGrid}>
      {sanitizedData.map((image, i) => (
        <Display key={`${image.image_id}-${i}`} {...image} />
      ))}
    </div>
  )
}

export default Results
