import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovie } from '../service/getMovies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loanding, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(search)

    const getMovies = useCallback(
        async ({ search }) => {
            if (search === previusSearch.current) return
            try {
                setLoading(true)
                setError(null)
                previusSearch.current = search
                const newMovie = await searchMovie({ search })
                setMovies(newMovie)
            } catch (error) {
                setError(e.message)
            }
            finally {
                setLoading(false)
            }
        }, [])



    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])


    return { movies: sortedMovies, getMovies, loanding }
}