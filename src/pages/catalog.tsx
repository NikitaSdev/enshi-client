import axios from "axios"
import { useEffect, useState } from "react"

import Catalog from "@/ui/catalog-movies/Catalog"
import Pagination from "@/ui/pagination/Pagination"

import { MovieService } from "@/services/movie.service"

const TrendingPage = () => {
	const [movies, setMovies] = useState()
	useEffect(() => {
		const getMovies = async () => {
			const { data: movies } = await MovieService.getMovieList()
			setMovies(movies)
		}
		getMovies()
	}, [])
	const handlePrev = async () => {
		const { data: prev } = await axios.get(movies.prev_page)
		setMovies(prev)
	}
	const handleNext = async () => {
		const { data: next } = await axios.get(movies.next_page)
		setMovies(next)
	}

	return (
		<main className={"flex flex-col items-center "}>
			{movies && (
				<Catalog
					movies={movies || []}
					title={"Каталог"}
					description={"Трендовые фильмы и сериалы"}
				/>
			)}
			<Pagination
				movies={movies}
				handleNext={handleNext}
				handlePrev={handlePrev}
			/>
		</main>
	)
}

export default TrendingPage
