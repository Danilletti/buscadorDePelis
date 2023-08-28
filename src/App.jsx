import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState } from 'react'


function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
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
  const { movies } = useMovies()
  const { search, setSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
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
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>

  )
}

export default App
