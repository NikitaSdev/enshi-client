import axios from "axios"

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return axios.post<{ url: string; name: string }[]>(
			`http://localhost:5000/api/file`,
			file,
			{
				params: { folder },
				headers: { "Content-Type": "multipart/form-data" }
			}
		)
	}
}
