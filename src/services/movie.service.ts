import { useEffect } from "react"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import axios, { axiosClassic } from "../api/interceptors"
import {
	getAnnounced,
	getByMovieId,
	getMovie,
	getMoviesList,
	getMoviesUrl,
	getMoviesUrlByName,
	getMoviesUrlBySlug,
	getSimilar,
	getTopList
} from "../config/api.config"
import { getMovieUrl } from "../config/url.config"

export const MovieService = {
	async getAll(page: number) {
		return axiosClassic.get<IMovieList>(getMoviesUrl(page))
	},
	async getMovieList(
		genres: Array<{ value: string; label: string }>,
		statuses: Array<{ value: string; label: string }>,
		years: Array<{ value: number; label: number }>
	) {
		return axios.get<IMovieList>(getMoviesList(genres, statuses, years))
	},
	async getMovie() {
		return axios.get<IMovieList>(getMovie())
	},

	async getMain(mainId: string) {
		const { data: movies } = await axiosClassic.get<IMovie>(
			getByMovieId(mainId)
		)
		return movies
	},
	async getAnnounced(movieList: Array<string>) {
		const { data: movies } = await axiosClassic.get<IMovieList>(
			getAnnounced(movieList.join(","))
		)
		return movies
	},
	async getTop(id: string) {
		const movies = await axios.get<IMovieList>(getTopList(id))
		return movies
	},
	async getTrending(movieList: Array<string>) {
		const { data: movies } = await axios.get<IMovie>(
			getAnnounced(movieList.join(","))
		)
		return movies
	},
	async getPopularMovies(page: number) {
		const { data: movies } = await axiosClassic.get<IMovieList>(
			getMoviesUrl(page)
		)
		return movies
	},
	async getBySlug(slug: string) {
		return axios.get<IMovie>(getMoviesUrlBySlug(slug))
	},
	async getByName(name: string) {
		return axiosClassic.get<IMovieList>(getMoviesUrlByName(name))
	},
	async getSimilar(genres: Array<string>, year: string) {
		return axios.get<IMovieList>(getSimilar(genres, year))
	},
	// async updateCountOpened(slug: string) {
	// 	return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
	// 		slug
	// 	})
	// },
	async Get20() {
		useEffect(() => {
			alert("")
		}, [])
		return []
	}
}
