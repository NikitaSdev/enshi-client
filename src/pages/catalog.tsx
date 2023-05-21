import { GetStaticProps, NextPage } from "next"
import React, { FC } from "react"

import Catalog from "@/ui/catalog-movies/Catalog"
import Pagination from "@/ui/pagination/Pagination"
import { usePagination } from "@/ui/pagination/usePagination"

import { MovieService } from "@/services/movie.service"

const TrendingPage: FC<any> = ({ movies }) => {
	return (
		<>
			<Catalog
				movies={movies || []}
				title={""}
				description={"Трендовые фильмы и сериалы"}
			/>
			<Pagination count={10} />
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
export default TrendingPage
