import axios from "axios"
import Cookies from "js-cookie"
import React, {
	ChangeEvent,
	FC,
	FormEvent,
	useEffect,
	useRef,
	useState
} from "react"
import {
	Controller,
	FormState,
	SubmitHandler,
	UseFormRegister,
	useForm
} from "react-hook-form"
import { useSelector } from "react-redux"
import { stripHtml } from "string-strip-html"

import { IAuthInput } from "@/screens/auth/auth.interface"

import styles from "@/components/Layout/Header/Profile/Profile.module.scss"

import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import UploadFile from "@/ui/form-elements/UploadField/UploadFile"

import { useProfileEdit } from "@/hooks/useProfileEdit"

import { validEmail } from "@/shared/regex"

import { UsersService } from "@/services/users.service"

interface IAuthFields {
	register: any
	formState: FormState<any>
	isPasswordRequired?: boolean
}
const SettingsField = ({}) => {
	const validatePassword = (value: string) => {
		if (value.length < 6) {
			return "Пароль должен содержать не менее 8 символов"
		} else if (!/\d/.test(value)) {
			return "Пароль должен содержать хотя бы одну цифру"
		} else if (!/[!@#$%^&*]/.test(value)) {
			return "Пароль должен содержать хотя бы один специальный символ"
		}
		return true
	}
	const user = useSelector((state) => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		control
	} = useForm({
		mode: "onChange"
	})
	const refreshToken = Cookies.get("refreshToken")
	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		console.log(data)
		UsersService.updateProfile(refreshToken, data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register("pseudonim", {})}
				label={"Ваш псевдоним"}
				placeholder={user.user.pseudonim}
			/>
			<Field
				{...register("email", {
					pattern: {
						value: validEmail,
						message: "Please enter a valid email"
					}
				})}
				label={"Ваш E-mail"}
				placeholder={user.user.email}
				type={"email"}
			/>
			<div>
				<Field
					{...register("password", {
						pattern: {
							value: validEmail,
							message: "Please enter a valid email"
						}
					})}
					label={"Сменить пароль"}
					placeholder={"Старый пароль"}
					type={"password"}
				/>
				<Field
					{...register("password", {
						pattern: {
							value: validEmail,
							message: "Please enter a valid email"
						}
					})}
					placeholder={"Новый пароль"}
					type={"password"}
				/>
				<Field
					{...register("password", {
						pattern: {
							value: validEmail,
							message: "Please enter a valid email"
						}
					})}
					placeholder={"Повторите новый пароль"}
					type={"password"}
				/>
			</div>
			<Controller
				control={control}
				name={"avatarURL"}
				defaultValue={""}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<UploadFile
						onChange={onChange}
						placeholder={"Аватар"}
						error={error}
						value={value}
						folder={"avatars"}
					/>
				)}
			/>
			<Controller
				control={control}
				name={"wrapperURL"}
				defaultValue={""}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<UploadFile
						onChange={onChange}
						placeholder={"Обложка профиля"}
						error={error}
						value={value}
						folder={"wrappers"}
					/>
				)}
			/>
			<div className={styles.buttons}>
				<Button>Отправить</Button>
			</div>
		</form>
	)
}

export default SettingsField
