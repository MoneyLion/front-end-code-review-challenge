'use client'

import React from 'react'
import Image from 'next/image'
import { ImageType } from '../types'
import styles from './Results.module.css'

interface DisplayProps {
  _score: number
  title: string
  image_id: string
  artist_display: string
}

/*Memoizing Display component to prevent unnecessary re-renders and 
destructuring props for better readability and using external css file
for styling instead of inline styles for better maintainability
*/
const Display = React.memo(function DisplayComponent({
  title,
  image_id,
  artist_display,
}: DisplayProps) {
  return (
    <div className={styles.displayArt}>
      {' '}
      {/* Using Next.js Image component for optimized image loading */}
      <Image
        key={`image-${image_id}`}
        src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
        alt={title}
        width={150}
        height={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.artImage}
        loading={'lazy'}
        priority={false}
      />
      <div className={styles.artInfo}>
        <h2 className={styles.artTitle}>{title}</h2>
        <p className={styles.artArtist}>{artist_display}</p>
      </div>
    </div>
  )
})
Display.displayName = 'Display'

type ResultsProps = {
  isLoading: boolean
  data: ImageType[]
}

// Better readability to exclude artworks with title having "nude" or "nudity" in the title
const filterOutNudity = (data: ImageType[]) =>
  data.filter((img) => !img.title.match(/nud(e|ity)/i))

const Results = ({ isLoading, data }: ResultsProps): JSX.Element => {
  if (isLoading) return <></>
  const sanitizedData = filterOutNudity(
    [...data].sort((a, b) => b._score - a._score),
  )
  return (
    <div className={styles.resultsGrid}>
      {sanitizedData.map((image) => (
        <Display key={image.image_id} {...image} />
      ))}
    </div>
  )
}

export default Results
