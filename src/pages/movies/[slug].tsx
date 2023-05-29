import { GetStaticPaths, GetStaticProps, NextPage } from "next"

import SingleMovie from "@/screens/singleMovie/SingleMovie"

import { IMovie } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Error404 from "../404"

export interface IMoviePage {
	movie: IMovie
}
const MoviePage: NextPage<IMoviePage> = ({ movie }) => {
	return movie ? (
		<>
			<SingleMovie movie={movie.results[0]} />
		</>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getMovie()
		const paths = movies.results.map((movie: IMovie) => ({
			params: { slug: movie.id }
		}))
		return { paths, fallback: "blocking" }
	} catch (e) {
		return {
			paths: [],
			fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		return {
			props: { movie },
			revalidate: 60
		}
	} catch (e) {
		return {
			notFound: true
		}
	}
}

export default MoviePage
