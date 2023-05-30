import axios from "axios"

import { NEST_API } from "../config/api.config"

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return axios.post<{ url: string; name: string }[]>(
			`${NEST_API}/file`,
			file,
			{
				params: { folder },
				headers: {
					"Content-Type": "multipart/form-data",
					"ngrok-skip-browser-warning": "69420"
				}
			}
		)
	}
}
