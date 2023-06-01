import axios from "axios"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toastr } from "react-redux-toastr"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"

import MaterialIcon from "@/ui/MaterialIcon"
import Field from "@/ui/form-elements/Field"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"

import { validEmail } from "@/shared/regex"

import Meta from "@/utils/meta/Meta"

import { NEST_API } from "../../../../config/api.config"

import styles from "./Profile.module.scss"

export const AuthForm: FC<{ setIsAuthFormOpened: (arg: boolean) => void }> = ({
	setIsAuthFormOpened
}) => {
	const [type, setType] = useState<"login" | "register" | "newPassword">(
		"login"
	)
	const {
		register: registerInput,
		handleSubmit,
		formState,
		watch
	} = useForm<IAuthInput>({
		mode: "onChange"
	})
	const { login, register } = useActions()
	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === "newPassword") {
			axios.post(`${NEST_API}/auth/changePassword`, data)
			toastr.success("Успешно", "Новый пароль отправлен на почту")
		} else if (type === "login") {
			login(data)
		} else if (type === "register") {
			register(data)
		}
	}
	const user = useAuth()
	useEffect(() => {
		user.user && setIsAuthFormOpened(false)
	}, [user])
	return (
		<>
			<Meta title={"Вход в аккаунт"} />
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.heading}>
						<h1 className={"mt-5"}>
							{(type === "login" && "Авторизация") ||
								(type === "register" && "Регистрация") ||
								(type === "newPassword" && "Восстановить пароль")}
						</h1>
						<button onClick={() => setIsAuthFormOpened(false)}>
							<MaterialIcon name={"MdClose"} />
						</button>
					</div>

					<AuthField
						register={registerInput}
						formState={formState}
						isPasswordRequired
						isLogin={type}
						watch={watch}
					/>
					{type === "login" ? (
						<div className={styles.switch}>
							<p onClick={() => setType("register")}>Регистрация</p>
							<p onClick={() => setType("newPassword")}>Забыли пароль?</p>
						</div>
					) : (
						<div>
							<p
								onClick={() => setType("login")}
								className={classNames({ ["mt-5"]: type === "register" })}
							>
								Войти
							</p>
						</div>
					)}
				</form>
			</section>
		</>
	)
}
const AuthButton: FC<{ setIsAuthFormOpened: (arg: boolean) => void }> = ({
	setIsAuthFormOpened
}) => {
	return (
		<>
			<button
				className={styles.authButton}
				// @ts-ignore
				onClick={() => setIsAuthFormOpened((prev) => !prev)}
			>
				<p>Войти</p>
			</button>
		</>
	)
}
const ProfileButton = () => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const title = (title: string) => {
		return title.length > 9 ? title.slice(0, 9) + "..." : title
	}
	const router = useRouter()
	return (
		<Link href={"/profile"}>
			<a href={"/profile"}>
				<button
					className={styles.profileButton}
					disabled={router.pathname === "/profile"}
				>
					<img src={user.user.avatarUrl} />{" "}
					<p>{user.user.pseudonim && title(user.user.pseudonim)}</p>
					<MaterialIcon name={"MdChevronRight"} />
				</button>
			</a>
		</Link>
	)
}
const Profile: FC<{ setIsAuthFormOpened: (arg: boolean) => void }> = ({
	setIsAuthFormOpened
}) => {
	const { user } = useAuth()
	return (
		<div className={styles.button}>
			{user ? (
				<ProfileButton />
			) : (
				<AuthButton setIsAuthFormOpened={setIsAuthFormOpened} />
			)}
		</div>
	)
}

export default Profile
