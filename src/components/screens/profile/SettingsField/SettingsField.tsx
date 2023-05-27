import Cookies from "js-cookie"
import React, { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import MaterialIcon from "@/ui/MaterialIcon"
import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"
import UploadFile from "@/ui/form-elements/UploadField/UploadFile"

import { validEmail } from "@/shared/regex"

import { UsersService } from "@/services/users.service"

import styles from "../Profile.module.scss"

const SettingsField: FC<{ setIsSettingsOpened: (arg: boolean) => void }> = ({
	setIsSettingsOpened
}) => {
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
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
		control
	} = useForm({
		mode: "onChange"
	})
	const [error, setError] = useState(false)
	const handleClick = () => {
		if (!error) setIsSettingsOpened(false)
	}
	const refreshToken = Cookies.get("refreshToken")
	const onSubmit: SubmitHandler<any> = (data) => {
		console.log(data)
		UsersService.updateProfile(refreshToken, data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.heading}>
				<h1>Настройки </h1>
				<button onClick={() => setIsSettingsOpened(false)}>
					<MaterialIcon name={"MdClose"} />
				</button>
			</div>

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
				<Button onClick={handleClick}>Отправить</Button>
			</div>
		</form>
	)
}

export default SettingsField
