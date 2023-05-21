import axios from "axios"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useQuery } from "react-query"

import SingleMovie from "@/screens/singleMovie/SingleMovie"

import { IGalleryItem } from "@/ui/gallery/gallery.interface"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Error404 from "../404"
import { axiosClassic } from "../../api/interceptors"
import { getMovieUrl } from "../../config/url.config"

export interface IMoviePage {
	movie: IMovie
}
const MoviePage: NextPage<IMoviePage> = ({ movie }) => {
	return movie ? (
		<>
			<SingleMovie movie={movie} />
		</>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getMovieList()
		const paths = movies.list.map((movie: IMovie) => ({
			params: { slug: movie.code }
		}))

		return { paths, fallback: "blocking" }
	} catch {
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
		console.log(e)
		return {
			notFound: true
		}
	}
}

export default MoviePage
