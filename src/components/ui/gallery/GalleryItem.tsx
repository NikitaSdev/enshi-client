import axios from "axios"
import cn from "classnames"
import classNames from "classnames"
import Cookies from "js-cookie"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import MaterialIcon from "@/ui/MaterialIcon"
import { IGalleryItemProps } from "@/ui/gallery/gallery.interface"

import { UsersService } from "@/services/users.service"

import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter"

import styles from "./Gallery.module.scss"

const GalleryItem: FC<IGalleryItemProps> = ({ item, catalog }) => {
	const title = (title: string) => {
		return title.length > 34 ? title.slice(0, 30) + "..." : title.slice(0, 34)
	}
	const user = useSelector((state) => state.user)
	const [refetch, setRefetch] = useState(true)
	const [favoriteMovies, setFavoriteMovies] =
		useState<Array<string | undefined>>()
	useEffect(() => {
		const _id = user.user._id
		const getFavorite = async () => {
			const { data: favouriteMovies } = await axios.post(
				"http://localhost:5000/api/users/profile/favourites",
				{
					_id
				}
			)
			setFavoriteMovies(favouriteMovies)
			console.log(favouriteMovies)
		}
		getFavorite()
	}, [refetch])
	const toggleFavourites = async (id: string) => {
		setRefetch((prev) => !prev)
		const refreshToken = Cookies.get("refreshToken")
		await UsersService.toggleFavourite(id, refreshToken)
	}
	console.log(item)
	return (
		<div
			className={classNames(styles.item, {
				[styles.catalogItem]: catalog
			})}
		>
			<div
				className={classNames(styles.favourite, {
					[styles.activeFavourite]: favoriteMovies?.includes(item.id)
				})}
				onClick={() => toggleFavourites(item.id)}
			>
				<MaterialIcon name={"MdBookmark"} />
			</div>

			<a href={`movies/${item.link}`}>
				<img alt={item.name} src={item.posterPath} draggable={false} />

				{item.content && (
					<div className={styles.description}>
						<h3>{title(item.content.title)}</h3>
						<div>
							<div className={styles.year}>
								<p>{item.year}</p>
							</div>

							<div className={styles.genre}>
								{item.genres[0] && item.genres[1] ? (
									<>
										<p>{capitalizeFirstLetter(item.genres[0])}/</p>{" "}
										<p>{capitalizeFirstLetter(item.genres[1])}</p>
									</>
								) : (
									<p>{capitalizeFirstLetter(item.genres[0])}</p>
								)}
							</div>
						</div>
					</div>
				)}
			</a>
		</div>
	)
}

export default GalleryItem
