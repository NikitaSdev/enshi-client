import { IGenreEditInput } from "@/screens/admin/genre/genre-edit.interface"
import { ICollection } from "@/screens/collections/collections.types"

import { IGenre } from "@/shared/types/movie.types"

import axios, { axiosClassic } from "../api/interceptors"
import { getGenresUrl } from "../config/api.config"
import { getGenreUrl } from "../config/url.config"

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenreUrl(""), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},
	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenreUrl(`${_id}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenreUrl(`by-slug/${slug}`))
	},
	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenreUrl(`${_id}`), data)
	},
	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenreUrl(`${_id}`))
	},
	async createGenre() {
		return axios.post<string>(getGenreUrl(""))
	},
	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl("/collections"))
	}
}
