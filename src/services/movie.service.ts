import { useEffect } from "react"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import axios, { axiosClassic } from "../api/interceptors"
import {
	getAnnounced,
	getByMovieId,
	getMoviesList,
	getMoviesUrl,
	getMoviesUrlByName,
	getMoviesUrlBySlug,
	getSimilar
} from "../config/api.config"
import { getMovieUrl } from "../config/url.config"

export const MovieService = {
	async getAll(page: number) {
		return axiosClassic.get<IMovieList>(getMoviesUrl(page))
	},
	async getMovieList(searchTerm?: string) {
		return axiosClassic.get<IMovieList>(getMoviesList())
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
	async getTrending(movieList: Array<string>) {
		const { data: movies } = await axios.get<IMovieList>(
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
	async getSimilar(genres: Array<string>) {
		return axiosClassic.get<IMovie>(getSimilar(genres))
	},
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds
		})
	},
	async getByActor(actorIds: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-actor/${actorIds}`))
	},
	async getById(_id: string) {
		return axios.get(getMovieUrl(`${_id}`))
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug
		})
	},
	async Get20() {
		useEffect(() => {
			alert("")
		}, [])
		return []
	}
}
