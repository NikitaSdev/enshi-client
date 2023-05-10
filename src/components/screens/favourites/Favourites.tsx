import React, { FC } from "react"

import Heading from "@/components/ui/heading/Heading"

import SkeletonLoader from "@/ui/SkeletonLoader"

import Meta from "@/utils/meta/Meta"

import { getMovieUrl } from "../../../config/url.config"

import FavoriteItem from "./FavoriteItem"
import styles from "./Favorites.module.scss"
import { useFavorites } from "./useFavorites"

const Favourites: FC = () => {
	const { favoritesMovies, isLoading } = useFavorites()

	return (
		<>
			<Meta title="Favourites"></Meta>
			<Heading title={"Избранное"} />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoritesMovies?.map((movie) => (
						<FavoriteItem
							key={movie._id}
							item={{
								name: movie.title,
								posterPath: movie.bigPoster,
								link: getMovieUrl(movie.slug),
								title: movie.title,
								_id: movie._id
							}}
						/>
					))
				)}
			</section>
		</>
	)
}

export default Favourites
