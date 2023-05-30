import { IProfileInput } from "@/screens/profile/profile.interface"

import { IMovie } from "@/shared/types/movie.types"
import { IUser } from "@/shared/types/user.types"

import axios, { axiosClassic } from "../api/interceptors"
import { NEST_API, getUsersUrl } from "../config/api.config"
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
			`${NEST_API}${getUsersUrl("/profile/favourites")}`,
			{ id },
			{
				headers: { "ngrok-skip-browser-warning": "69420" }
			}
		)
	},
	async toggleFavourite(movieId: string, refreshToken: string | undefined) {
		return axiosClassic.put<string>(
			`${NEST_API}${getUsersUrl("/profile/favourites")}`,
			{
				movieId,
				refreshToken
			},
			{
				headers: { "ngrok-skip-browser-warning": "69420" }
			}
		)
	},
	async getProfile() {
		return axios.get<IUser>(`${NEST_API}${getUsersUrl(`/profile`)},`, {
			headers: { "ngrok-skip-browser-warning": "69420" }
		})
	},
	async updateProfile(refreshToken: string | undefined, data: IProfileInput) {
		try {
			return axios.put<IUser>(
				`${NEST_API}${getUsersUrl(`/profile`)}`,
				{ refreshToken, data },
				{
					headers: { "ngrok-skip-browser-warning": "69420" }
				}
			)
		} catch (e) {
			return e
		}
	}
}
