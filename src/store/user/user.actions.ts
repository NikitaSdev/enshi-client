import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

import { AuthService } from "@/services/auth/auth.service"

import { toastError } from "@/utils/toastError"

import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface"

import { errorCatch } from "../../api/api.helpers"

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	"auth/register",
	// @ts-ignore
	async ({ email, password, login, pseudonim }, thunkAPI) => {
		try {
			const response = await AuthService.register(
				email,
				password,
				login,
				pseudonim
			)
			return response.data
		} catch (e) {
			toastError(e, "Ошибка")
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	"auth/login",
	async ({ emailOrLogin, password }, thunkAPI) => {
		try {
			const response = await AuthService.login(emailOrLogin, password)
			return response.data
		} catch (e) {
			toastError(e, "Ошибка")
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk("auth/logout", async () => {
	await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	"auth/check-auth",
	async (_, thunkAPI) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (e) {
			if (errorCatch(e) == "jwt expired") {
				toastError("Logout", "Your authorization is expired")
				thunkAPI.dispatch(logout())
			}
			return thunkAPI.rejectWithValue(e)
		}
	}
)
