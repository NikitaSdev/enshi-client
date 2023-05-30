import { getContentType } from "api/api.helpers"
import axios from "axios"
import Cookies from "js-cookie"

import { IAuthResponse } from "@/store/user/user.interface"

import { APP_URL, NEST_API, getAuthUrl } from "../../config/api.config"

import { removeTokensStorage, saveToStorage } from "./auth.helper"

export const AuthService = {
	async register(
		email: string,
		password: string,
		login: string,
		pseudonim: string
	) {
		const response = await axios.post<IAuthResponse>(
			`${NEST_API}${getAuthUrl("/register")}`,
			{
				email,
				password,
				login,
				pseudonim
			},
			{
				headers: { "ngrok-skip-browser-warning": "69420" }
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	async login(emailOrLogin: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${NEST_API}${getAuthUrl("/login")}`,
			{
				emailOrLogin,
				password
			},
			{
				headers: { "ngrok-skip-browser-warning": "69420" }
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem("user")
	},
	async getNewTokens() {
		const refreshToken = Cookies.get("refreshToken")
		const response = await axios.post<IAuthResponse>(
			`${NEST_API}${getAuthUrl("/login/access-token")}`,
			{
				refreshToken
			},
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	}
}
