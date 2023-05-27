import Link from "next/link"
import React, { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"
import { useAuthRedirect } from "@/screens/auth/useAuthRedirect"

import MaterialIcon from "@/ui/MaterialIcon"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import Meta from "@/utils/meta/Meta"

import styles from "./Profile.module.scss"

export const AuthForm: FC<{ setIsAuthFormOpened: (arg: boolean) => void }> = ({
	setIsAuthFormOpened
}) => {
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
			console.log("login", data)
			login(data)
		} else if (type === "register") {
			console.log(data)
			register(data)
		}
	}
	return (
		<>
			<Meta title={"Вход в аккаунт"} />
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.heading}>
						<h1>{type === "login" ? "Авторизация" : "Регистрация"}</h1>
						<button onClick={() => setIsAuthFormOpened(false)}>
							<MaterialIcon name={"MdClose"} />
						</button>
					</div>

					<AuthField
						register={registerInput}
						formState={formState}
						isPasswordRequired
						isLogin={type}
					/>

					{type === "login" ? (
						<div className={styles.switch}>
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
			{isAuthFormOpened && (
				<AuthForm setIsAuthFormOpened={() => setIsAuthFormOpened(false)} />
			)}
		</>
	)
}
const ProfileButton = () => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const title = (title: string) => {
		return title.length > 9 ? title.slice(0, 9) + "..." : title
	}
	return (
		<Link href={"/profile"}>
			<a href={"/profile"}>
				<button className={styles.profileButton}>
					<img src={user.user.avatarUrl} />{" "}
					<p>{user.user.pseudonim && title(user.user.pseudonim)}</p>
					<MaterialIcon name={"MdChevronRight"} />
				</button>
			</a>
		</Link>
	)
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
