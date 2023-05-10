import React, {
	ChangeEvent,
	FC,
	FormEvent,
	useEffect,
	useRef,
	useState
} from "react"
import { FormState, UseFormRegister, useForm } from "react-hook-form"

import styles from "@/components/Layout/Header/Profile/Profile.module.scss"

import Button from "@/ui/form-elements/Button"
import Field from "@/ui/form-elements/Field"

import { validEmail } from "@/shared/regex"

interface IAuthFields {
	register: any
	formState: FormState<any>
	isPasswordRequired?: boolean
	isLogin: "login" | "register"
}
const AuthField: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
	isLogin
}) => {
	const { watch } = useForm<any>()
	const password = useRef<any>(null)
	password.current = watch("password", "")

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

	return (
		<>
			{isLogin === "login" ? (
				<>
					<Field
						{...register("emailOrLogin", {
							required: "Это обязательное поле",
							pattern: {
								value: validEmail,
								message: "Please enter a valid email"
							}
						})}
						placeholder="E-mail или логин"
					/>
					<Field
						{...register(
							"password",
							isPasswordRequired
								? {
										required: "Пароль необходим",
										minLength: {
											value: 6,
											message: "Password must contains at least 6 characters"
										}
								  }
								: {}
						)}
						placeholder="Пароль"
						type={"password"}
						error={errors.password}
					/>
				</>
			) : (
				<>
					<Field
						{...register("login", {
							required: "Логин необходим"
						})}
						placeholder="Логин"
					/>
					<Field
						{...register(
							"password",
							isPasswordRequired
								? {
										required: "Пароль необходим",
										minLength: {
											value: 6,
											message: "Пароль должен быть не менее 6 символов"
										}
								  }
								: {}
						)}
						ref={register({ validate: validatePassword })}
						placeholder="Пароль"
						type={"password"}
						error={errors.password}
					/>
					<Field
						placeholder="Повторите пароль"
						ref={register({
							required: true,
							validate: (value: string) =>
								value === password.current || "Пароли не совпадают"
						})}
					/>

					<Field
						{...register("email", {
							required: "Email необходим",
							pattern: {
								value: validEmail,
								message: "Введите корректный email"
							}
						})}
						placeholder="E-mail"
					/>
				</>
			)}
			<div className={styles.buttons}>
				<Button>{isLogin === "login" ? "Войти на сайт" : "Отправить"}</Button>
			</div>
		</>
	)
}

export default AuthField
