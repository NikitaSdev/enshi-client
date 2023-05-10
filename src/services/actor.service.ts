import { IActorEditInput } from "@/screens/admin/actor/actor-edit.interface"

import { IActor } from "@/shared/types/movie.types"

import axios, { axiosClassic } from "../api/interceptors"
import { getActorsUrl, getUsersUrl } from "../config/api.config"

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axios.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {}
		})
	},
	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},
	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},
	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},
	async createActor() {
		return axios.post<string>(getActorsUrl(""))
	}
}
