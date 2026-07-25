'use client'

import { useEffect, useState } from 'react'
import { ImageType } from '../types'
import Results from '../Components/Results'
import { artFetcher } from '../getArt'
import styles from './Search.module.css'

const Search = () => {
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [data, setData] = useState([] as ImageType[])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    artFetcher(search)
      .then((data) => {
        setIsLoading(false)
        setData(data)
        setError(false)
      })
      .catch(() => {
        setIsLoading(false)
        setError(true)
      })
  }, [search])

  const handleSearch = () => {
    setSearch(searchInputValue.trim())
  }

  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Art explorer</span>
          <h1 className={styles.title}>
            Discover artwork from the Art Institute of Chicago
          </h1>
          <p className={styles.subtitle}>
            Search by artist, title, or theme to browse a curated collection of
            pieces.
          </p>
        </div>

        <div className={styles.form}>
          <input
            className={styles.input}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search artworks"
            aria-label="Search artworks"
          />
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && (
          <div className={styles.status}>
            There was an error fetching the art.
          </div>
        )}
        {!error && isLoading && (
          <div className={styles.status}>Loading artworks...</div>
        )}
        {!error && !isLoading && !data.length && search && (
          <div className={styles.status}>No results found for that search.</div>
        )}
        {!error && !isLoading && !data.length && !search && (
          <div className={styles.status}>
            Try searching for an artist or a title to begin.
          </div>
        )}

        <Results isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}

export default Search
