import axios from "axios"
import Cookies from "js-cookie"
import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

import { AuthForm } from "@/components/Layout/Header/Profile/Profile"

import Button from "@/ui/form-elements/Button"

import { UsersService } from "@/services/users.service"

import { NEST_API } from "../../../config/api.config"

import styles from "./Banner.module.scss"

interface IBanner {
	image: string
	Detail?: FC | null
}
const Banner: FC<IBanner & { id: string }> = ({ image, id, Detail }) => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const [refetch, setRefetch] = useState(true)
	const [favoriteMovies, setFavoriteMovies] =
		useState<Array<string | undefined>>()
	useEffect(() => {
		if (user.user) {
			const _id = user.user._id
			const getFavorite = async () => {
				const { data: favouriteMovies } = await axios.post(
					`${NEST_API}/users/profile/favourites`,
					{
						_id
					}
				)
				setFavoriteMovies(favouriteMovies)
				console.log(favouriteMovies)
				console.log(id)
			}
			user.user && getFavorite()
		}
	}, [refetch])
	const [isAuthFormOpened, setIsAuthFormOpened] = useState(false)
	const toggleFavourites = async () => {
		if (user.user) {
			setRefetch((prev) => !prev)
			const refreshToken = Cookies.get("refreshToken")
			await UsersService.toggleFavourite(id, refreshToken)
		} else {
			setIsAuthFormOpened(true)
		}
	}

	return (
		<>
			{isAuthFormOpened && (
				<AuthForm setIsAuthFormOpened={setIsAuthFormOpened} />
			)}
			<div className={styles.banner}>
				<div>
					<Image
						className={styles.poster}
						src={image}
						alt={""}
						width={312}
						height={445}
						draggable={false}
						unoptimized
						priority
					/>
					<Button className={styles.addToFavourite} onClick={toggleFavourites}>
						{favoriteMovies?.includes(id) ? (
							<p>Удалить из избранного</p>
						) : (
							<p>Добавить в избранное</p>
						)}
					</Button>
				</div>
				{Detail && <Detail />}
			</div>
		</>
	)
}

export default Banner
