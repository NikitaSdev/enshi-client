import classNames from "classnames"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { toastr } from "react-redux-toastr"

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
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch
	} = useForm({
		mode: "onChange"
	})

	const router = useRouter()
	const password = watch("password")
	const newPassword = watch("newPassword")

	const refreshToken = Cookies.get("refreshToken")
	const [error, setError] = useState("")
	const onSubmit: SubmitHandler<any> = async (data) => {
		// @ts-ignore
		const { data: response } = await UsersService.updateProfile(
			refreshToken,
			data
		)
		if (response !== "Пароли не совпадают") {
			toastr.success("Настройки", "Обновление прошло успешно")
			setIsSettingsOpened(false)
			router.reload()
		} else {
			setError("Пароль неверен")
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={classNames(styles.heading, "mb-6")}>
				<h1>Настройки </h1>
				<button onClick={() => setIsSettingsOpened(false)}>
					<MaterialIcon name={"MdClose"} />
				</button>
			</div>

			<Field
				{...register("pseudonim", {})}
				label={"Имя пользователя"}
				placeholder={user.user.pseudonim}
			/>
			<Field
				{...register("email", {
					pattern: {
						value: validEmail,
						message: "Введите валидный email адресс"
					}
				})}
				label={"Ваш E-mail"}
				placeholder={user.user.email}
				type={"email"}
			/>

			<Field
				{...register("password")}
				label={"Сменить пароль"}
				placeholder={"Старый пароль"}
				type={"password"}
			/>
			{errors.password && <p>{errors.password.message}</p>}
			{error !== "" && <p>{error}</p>}
			<Field
				{...register("newPassword", {
					minLength: {
						value: 6,
						message: "Пароль должен состоять более чем из 6 символов"
					},
					required: {
						value: password !== "",
						message: "Введите новый пароль"
					}
				})}
				placeholder={"Новый пароль"}
				type={"password"}
			/>
			{errors.newPassword && <p>{errors.newPassword.message}</p>}
			<Field
				{...register("confirmPassword", {
					validate: (value) => value === newPassword || "Пароли не совпадают"
				})}
				placeholder={"Повторите новый пароль"}
				type={"password"}
			/>
			{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

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
