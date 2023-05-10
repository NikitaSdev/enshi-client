import { GetStaticPaths, GetStaticProps, NextPage } from "next"

import SingleMovie from "@/screens/singleMovie/SingleMovie"

import { IGalleryItem } from "@/ui/gallery/gallery.interface"

import { IMovie } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Error404 from "../404"
import { getMovieUrl } from "../../config/url.config"

export interface IMoviePage {
	similarMovies: IGalleryItem[]
	movie: IMovie
}
const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	try {
// 		const { data: movies } = await MovieService.getAll()
// 		const paths = movies.list.map((movie: IMovie) => ({
// 			params: { slug: movie.name }
// 		}))
//
// 		return { paths, fallback: "blocking" }
// 	} catch {
// 		return {
// 			paths: [],
// 			fallback: false
// 		}
// 	}
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	try {
// 		// const { data: movie } = await MovieService.getBySlug(String(params?.slug))
// 		//
// 		// const { data: responseSimilarMovies } = await MovieService.getByGenres(
// 		// 	movie.genres.map((g) => g._id)
// 		// )
// 		//
// 		// const similarMovies: IGalleryItem[] = responseSimilarMovies
// 		// 	.filter((m) => m._id !== movie._id)
// 		// 	.map((m) => ({
// 		// 		name: m.title,
// 		// 		posterPath: m.poster,
// 		// 		link: getMovieUrl(m.slug)
// 		// 	}))
// 		//
// 		return {
// 			props: { null, null },
// 			revalidate: 60
// 		}
// 	} catch (e) {
// 		return {
// 			notFound: true
// 		}
// 	}
// }

export default MoviePage
