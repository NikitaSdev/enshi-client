import { GetStaticProps, NextPage } from "next"
import React from "react"

import Catalog from "@/ui/catalog-movies/Catalog"
import Pagination from "@/ui/pagination/Pagination"
import { usePagination } from "@/ui/pagination/usePagination"

import { MovieService } from "@/services/movie.service"

const TrendingPage = () => {
	const { isLoading, page, movies, setPage, scrollToTop } = usePagination(
		"movies/most-popular"
	)
	return (
		<>
			{!isLoading && (
				<>
					<Catalog
						movies={movies || []}
						title={"Популярное"}
						description={"Трендовые фильмы и сериалы"}
					/>
					<Pagination
						movies={movies}
						page={page}
						setPage={setPage}
						scrollToTop={scrollToTop}
					/>
				</>
			)}
		</>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getPopularMovies()
		console.log(movies)
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
export default TrendingPage
