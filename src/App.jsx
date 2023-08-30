import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from "just-debounce-it"


function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No puedes buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda tiene que tener almenos de 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, error, setSearch }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loanding } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  const handleSort = () => {
    setSort(!sort)
  }


  return (
    <div className='page' >
      <header>
        <h1>Buscador de Pelis</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loanding ? <p>Carganding</p> : <Movies movies={movies} />
        }
      </main>
    </div>

  )
}

export default App
