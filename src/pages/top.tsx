import { GetStaticProps } from "next"
import React, { FC } from "react"

import Catalog from "@/ui/catalog-movies/Catalog"

import { MovieService } from "@/services/movie.service"

const Top: FC<{ movies: any }> = ({ movies }) => {
	return (
		<>
			<Catalog
				movies={movies || []}
				title={"ТОП - 100 аниме"}
				description={"Трендовые фильмы и сериалы"}
			/>
		</>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const movie = await MovieService.getPopularMovies()
		const movies = movie.list
		return {
			props: {
				movies
			},
			revalidate: 60
		}
	} catch (e) {
		return {
			notFound: true
		}
	}
}
export default Top
