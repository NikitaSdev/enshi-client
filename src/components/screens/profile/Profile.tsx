import { rootReducer } from "@reduxjs/toolkit/src/tests/injectableCombineReducers.example"
import axios from "axios"
import classNames from "classnames"
import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import AuthField from "@/screens/auth/AuthField"
import { IAuthInput } from "@/screens/auth/auth.interface"
import chevron from "@/screens/home/chevron.svg"
import SettingsField from "@/screens/profile/SettingsField/SettingsField"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonGallery from "@/ui/SkeletonGallery/SkeletonGallery"
import Button from "@/ui/form-elements/Button"
import Gallery from "@/ui/gallery/Gallery"

import { useActions } from "@/hooks/useActions"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import { logout } from "@/store/user/user.actions"

import styles from "./Profile.module.scss"
import settingsIcon from "./settings.svg"

const Settings: FC<{ setIsSettingsOpened: (arg: boolean) => void }> = ({
	setIsSettingsOpened
}) => {
	return (
		<>
			<Meta title={"Настройки"} />
			<section className={styles.wrapper}>
				<SettingsField setIsSettingsOpened={() => setIsSettingsOpened(false)} />
			</section>
		</>
	)
}
const Profile = () => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const { logout } = useActions()
	const [isSettingsOpened, setIsSettingsOpened] = useState(false)
	const [recent, setRecent] = useState({ results: [] })
	const [favourite, setFavourite] = useState({ results: [] })
	const [isLoading, setIsLoading] = useState(true)
	const getData = async () => {
		try {
			const count = user.user.count
			const favourites = user.user.favourites

			const recent = {
				list: count
			}
			const favourite = {
				list: favourites
			}
			const recentList: any = []
			const favouriteList: any = []

			for (let i = 0; i < recent.list.length; i++) {
				const { data: movies } = await MovieService.getTop(recent.list[i])
				recentList.push(...movies.results)
			}
			for (let i = 0; i < favourite.list.length; i++) {
				const { data: movies } = await MovieService.getTop(favourite.list[i])
				favouriteList.push(...movies.results)
			}
			recentList.reverse()
			favouriteList.reverse()
			setRecent((prevMovies: any) => ({ ...prevMovies, results: recentList }))
			setFavourite((prevMovies: any) => ({
				...prevMovies,
				results: favouriteList
			}))
			setIsLoading(false)
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
			{user && user.user && (
				<main>
					<section
						className={styles.banner}
						style={{
							background: `url(${user.user.wrapperURL})`,
							backgroundPosition: "center",
							backgroundSize: "cover"
						}}
					></section>
					<section className={styles.bannerContainer}>
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
						<div className={styles.logosContainer}>
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
					{isLoading ? (
						<SkeletonGallery />
					) : (
						<section className={styles.favorite}>
							{favourite && favourite.results && favourite.results.length ? (
								<Gallery
									count={user.user.favourites.length}
									items={favourite.results}
									heading={"Избранное"}
									icon={chevron}
								/>
							) : (
								<div className={styles.noItems}>
									<h1>Нет избранных</h1>
								</div>
							)}
						</section>
					)}
					{isLoading ? (
						<SkeletonGallery />
					) : (
						<section className={styles.recent}>
							{recent && recent.results && recent.results.length ? (
								<Gallery
									count={user.user.count.length}
									items={recent.results}
									heading={"Недавно просмотренные"}
									icon={chevron}
								/>
							) : (
								<div className={styles.noItems}>
									<h1>Нет недавно просмотренных</h1>
								</div>
							)}
						</section>
					)}
					{isSettingsOpened && (
						<Settings setIsSettingsOpened={() => setIsSettingsOpened(false)} />
					)}
				</main>
			)}
		</>
	)
}

export default Profile
