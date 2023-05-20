import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"
import { useAuthRedirect } from "@/screens/auth/useAuthRedirect"

import Button from "@/ui/form-elements/Button"
import Heading from "@/ui/heading/Heading"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import Meta from "@/utils/meta/Meta"

import styles from "./Profile.module.scss"

const AuthForm = () => {
	const [type, setType] = useState<"login" | "register">("login")
	const {
		register: registerInput,
		handleSubmit,
		formState
	} = useForm<IAuthInput>({
		mode: "onChange"
	})
	const { login, register } = useActions()
	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type == "login") {
			login(data)
		} else if (type === "register") {
			register(data)
		}
	}
	return (
		<>
			<Meta title={"Вход в аккаунт"} />
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading
						title={type === "login" ? "Авторизация" : "Регистрация"}
						className={"mb-12"}
					/>
					<AuthField
						register={registerInput}
						formState={formState}
						isPasswordRequired
						isLogin={type}
					/>

					{type === "login" ? (
						<div>
							<p onClick={() => setType("register")}>Регистрация</p>
							<p>Забыли пароль?</p>
						</div>
					) : (
						<div>
							<p onClick={() => setType("login")}>Войти</p>
						</div>
					)}
				</form>
			</section>
		</>
	)
}
const AuthButton = () => {
	const [isAuthFormOpened, setIsAuthFormOpened] = useState(false)
	return (
		<>
			<button
				className={styles.authButton}
				onClick={() => setIsAuthFormOpened((prev) => !prev)}
			>
				<p>Войти</p>
			</button>
			{isAuthFormOpened && <AuthForm />}
		</>
	)
}
const ProfileButton = () => {
	return <div>Профиль</div>
}
const Profile = () => {
	const { user } = useAuth()
	return (
		<div className={styles.button}>
			{user ? <ProfileButton /> : <AuthButton />}
		</div>
	)
}

export default Profile
