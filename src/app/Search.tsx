
'use client'

import { useEffect, useState } from "react"
import { ImageType } from "../types"
import Results from "../Components/Results"
import { artFetcher } from "../getArt"

const Search = () => {
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
    const [data, setData] = useState([] as ImageType[])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // set the state as loading
        setIsLoading(true)

        // fetch the art
        artFetcher(search)
            .then(data => {
                setIsLoading(false)
                setData(data)
            })
            .catch((e) => {
                setIsLoading(false)
                setError(true)
            })
    }, [search])

    return (
        <div style={{ margin: '1em' }}>
            <div>
                <input 
                    value={searchInputValue}
                    onChange={e => setSearchInputValue(e.currentTarget.value)}
                    onKeyDown={e => e.key == 'Enter' && setSearch(e.currentTarget.value)}
                />
                <button onClick={() => setSearch(searchInputValue)}>Search</button>
            </div>
            <p>&nbsp;</p>
            {error && 'There was an error fetching the art.'}
            {isLoading 
                ? 'Loading ...'
                : !data.length && 'No results.'
            }
            <Results isLoading={isLoading} data={data} />
        </div>

    )
}

export default Search

