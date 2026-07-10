'use client'
import { useEffect, useState } from 'react'
import { ImageType } from '../types'
import Results from '../Components/Results'
import { artFetcher } from '../getArt'
const Search = () => {
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [data, setData] = useState<ImageType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (!search.trim()) {
            setData([])
            return
        }
        const fetchArtwork = async () => {
            try {
                setError(false)
                setIsLoading(true)
                const results = await artFetcher(search)
                setData(results)
            } catch (error) {
                console.error('Error fetching artwork:', error)
                setError(true)
                setData([])
            } finally {
                setIsLoading(false)
            }
        }
        fetchArtwork()
    }, [search])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmedSearch = inputValue.trim()
        if (!trimmedSearch) {
            return
        }
        setSearch(trimmedSearch)
    }
    return (
        <div style={{ margin: '1rem' }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="art-search">
                    Search Artwork
                </label>
                <div style={{ marginTop: '0.5rem' }}>
                    <input
                        id="art-search"
                        type="text"
                        placeholder="Search artwork..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
            <p>&nbsp;</p>
            {error && (
                <p>There was an error fetching artwork. Please try again.</p>
            )}
            {!isLoading && !error && search && data.length === 0 && (
                <p>No results found.</p>
            )}
            <Results
                isLoading={isLoading}
                data={data}
            />
        </div>
    )
}
export default Search