function ListOfMovies({ movies }) {
    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResult() {
    return (
        <p>No le se no soy cinefilo</p>
    )
}


export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? < ListOfMovies movies={movies} />
            : < NoMoviesResult />
    )

}




