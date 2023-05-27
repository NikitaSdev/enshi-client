import { IProfileInput } from "@/screens/profile/profile.interface"

import { IMovie } from "@/shared/types/movie.types"
import { IUser } from "@/shared/types/user.types"

import axios, { axiosClassic } from "../api/interceptors"
import { getUsersUrl } from "../config/api.config"
import { getMovieUrl } from "../config/url.config"

export const UsersService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(``), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},
	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
	async getById(_id: string) {
		return axios.get(getUsersUrl(`/${_id}`))
	},
	// async updateUser(_id: string, data: IUserEditInput) {
	// 	return axios.put<string>(getUsersUrl(`/${_id}`), data)
	// },
	async getFavourites(id: string) {
		return axiosClassic.post<IMovie[]>(
			`http://localhost:5000/api${getUsersUrl("/profile/favourites")}`,
			{ id }
		)
	},
	async toggleFavourite(movieId: string, refreshToken: string) {
		return axiosClassic.put<string>(
			`http://localhost:5000/api${getUsersUrl("/profile/favourites")}`,
			{
				movieId,
				refreshToken
			}
		)
	},
	async getProfile() {
		return axios.get<IUser>(
			`http://localhost:5000/api${getUsersUrl(`/profile`)}`
		)
	},
	async updateProfile(refreshToken: string | undefined, data: IProfileInput) {
		return axios.put<IUser>(
			`http://localhost:5000/api${getUsersUrl(`/profile`)}`,
			{ refreshToken, data }
		)
	}
}
