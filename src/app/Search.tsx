'use client'

import { useEffect, useState } from 'react'
import { ImageType } from '../types'
import Results from '../Components/Results'
import { artFetcher } from '../getArt'

const Search = () => {
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [data, setData] = useState([] as ImageType[])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Fetch art with async/await and try/catch for error handling and better readability
    const fetchArt = async () => {
      setIsLoading(true)
      try {
        // artFetcher should accept page as argument, update if needed
        const result = await artFetcher(search, page)
        setData(result?.data || [])
        setTotalPages(result?.pagination?.total_pages || 1)
      } catch (e) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArt()
  }, [search, page])

  const handleSearch = (value: string) => {
    setPage(1) // Reset to first page on new search
    setSearch(searchInputValue)
  }

  return (
    <div style={{ margin: '1em' }}>
      <div>
        <input
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.currentTarget.value)}
          onKeyDown={(e) =>
            e.key == 'Enter' && handleSearch(e.currentTarget.value)
          }
        />
        <button onClick={() => handleSearch(searchInputValue)}>Search</button>
      </div>
      <p>&nbsp;</p>
      {error && 'There was an error fetching the art.'}
      {isLoading ? 'Loading ...' : !data.length && 'No results.'}
      <Results isLoading={isLoading} data={data} />
      {/* We should have Pagination to load additional data when clicking next button */}
      {totalPages > 1 && (
        <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Search
