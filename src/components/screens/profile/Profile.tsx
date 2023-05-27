import { rootReducer } from "@reduxjs/toolkit/src/tests/injectableCombineReducers.example"
import axios from "axios"
import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"
import chevron from "@/screens/home/chevron.svg"
import SettingsField from "@/screens/profile/SettingsField/SettingsField"

import MaterialIcon from "@/ui/MaterialIcon"
import Button from "@/ui/form-elements/Button"
import Gallery from "@/ui/gallery/Gallery"

import { useActions } from "@/hooks/useActions"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import { logout } from "@/store/user/user.actions"
import { userSlice } from "@/store/user/user.slice"

import styles from "./Profile.module.scss"
import settingsIcon from "./settings.svg"

const Settings: FC<{ setIsSettingsOpened: () => void }> = ({
	setIsSettingsOpened
}) => {
	return (
		<>
			<Meta title={"Настройки"} />
			<section className={styles.wrapper}>
				<div className={styles.heading}>
					<h1>Настройки </h1>
					<button onClick={() => setIsSettingsOpened(false)}>
						<MaterialIcon name={"MdClose"} />
					</button>
				</div>

				<SettingsField />
			</section>
		</>
	)
}
const Profile = () => {
	const user = useSelector((state) => state.user)
	const { logout } = useActions()
	const [isSettingsOpened, setIsSettingsOpened] = useState(false)
	const [recent, setRecent] = useState({ results: [] })
	const getData = async () => {
		try {
			const count = user.user.count

			const recent = {
				list: count
			}
			const moviesList: any = []

			for (let i = 0; i < recent.list.length; i++) {
				const { data: movies } = await MovieService.getTop(recent.list[i])
				moviesList.push(...movies.results)
			}
			moviesList.reverse()
			setRecent((prevMovies: any) => ({ ...prevMovies, results: moviesList }))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	const getRank = (count: number) => {
		if (count > 55) return "Господин"
		if (count > 50) return "Рассен Отаку"
		if (count > 44) return "Гуру"
		if (count > 40) return "Профи"
		if (count > 36) return "Отаку"
		if (count > 32) return "Сенсей"
		if (count > 28) return "Сэйто"
		if (count > 23) return "Анимешник"
		if (count > 16) return "Семпай"
		if (count > 10) return "Кохай"
		if (count > 6) return "Знаток"
		if (count > 3) return "Фанат"
		if (count <= 3) return "Новичок"
	}
	return (
		<>
			<Meta title={"Профиль"}></Meta>
			<main>
				<section
					className={styles.banner}
					style={{
						background: `url(${user.user.wrapperURL})`,
						backgroundPosition: "center",
						backgroundSize: "cover"
					}}
				>
					<div className={styles.bannerContainer}>
						<div className={styles.user}>
							<img
								className={styles.avatar}
								src={user.user.avatarUrl}
								alt={user.user.pseudonim}
							/>
							<div>
								<h3>{user.user.pseudonim}</h3>
								<p>{getRank(user.user.count.length)}</p>
							</div>
						</div>
						<div className={styles.info}>
							<div>
								<h3>7</h3>
								<p>В избранном</p>
							</div>
							<div>
								<h3>{user.user.count.length}</h3>
								<p>Просмотрено</p>
							</div>
						</div>
						<div
							className={styles.settings}
							onClick={() => setIsSettingsOpened((prev) => !prev)}
						>
							<Image src={settingsIcon} alt="Настройки" />
						</div>
						<div className={styles.settings} onClick={() => logout()}>
							<MaterialIcon name={"MdExitToApp"} />
						</div>
					</div>
				</section>
				<section className={styles.favorite}>
					<h1>Избранное</h1>
				</section>
				<section className={styles.recent}>
					{recent && (
						<Gallery
							items={recent}
							heading={"Недавно просмотренные"}
							icon={chevron}
						/>
					)}
				</section>
				{isSettingsOpened && (
					<Settings setIsSettingsOpened={() => setIsSettingsOpened(false)} />
				)}
			</main>
		</>
	)
}

export default Profile
