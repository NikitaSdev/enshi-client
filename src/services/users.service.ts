import { IMovieEditInput } from "@/screens/admin/movie/movie-edit.interface"
import { IUserEditInput } from "@/screens/admin/user/user-edit.interface"
import { IProfileInput } from "@/screens/profile/profile.interface"

import { IMovie } from "@/shared/types/movie.types"
import { IUser } from "@/shared/types/user.types"

import axios from "../api/interceptors"
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
		return axios.get<IUserEditInput>(getUsersUrl(`/${_id}`))
	},
	async updateUser(_id: string, data: IUserEditInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},
	async getFavourites() {
		return axios.get<IMovie[]>(getUsersUrl("/profile/favourites"))
	},
	async toggleFavourite(movieId: string) {
		return axios.put<string>(getUsersUrl("/profile/favourites"), { movieId })
	},
	async getProfile() {
		return axios.get<IUser>(getUsersUrl(`/profile`))
	},
	async updateProfile(data: IProfileInput) {
		return axios.put<IUser>(getUsersUrl(`/profile`), data)
	}
}
