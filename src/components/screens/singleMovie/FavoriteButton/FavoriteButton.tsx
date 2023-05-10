import cn from "classnames"
import { FC, useEffect, useState } from "react"
import { useMutation } from "react-query"

import { useFavorites } from "@/screens/favourites/useFavorites"

import { UsersService } from "@/services/users.service"

import { toastError } from "@/utils/toastError"

import HeartImage from "../../../../../public/favicons/heart-animation.png"

import styles from "./FavoriteButton.module.scss"

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoritesMovies, refetch } = useFavorites()

	useEffect(() => {
		if (favoritesMovies) {
			const isHasMovie = favoritesMovies.some((f) => f._id === movieId)
			if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
		}
	}, [favoritesMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		"update actor",
		() => UsersService.toggleFavourite(movieId),
		{
			onError(error) {
				toastError(error, "Update favorite list")
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			}
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed
			})}
			style={{ backgroundImage: `url('/favicons/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
