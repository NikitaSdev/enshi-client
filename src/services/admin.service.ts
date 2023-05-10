import instance from "../api/interceptors"
import { getUsersUrl } from "../config/api.config"

export const AdminService = {
	async getCountUsers() {
		return instance.get<number>(getUsersUrl("/count"))
	}
}
