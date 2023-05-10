import { FC } from "react"

import FavoriteButton from "@/screens/singleMovie/FavoriteButton/FavoriteButton"
import ContentList from "@/screens/singleMovie/content/ContentList/ContentList"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie } from "@/shared/types/movie.types"

import { getActorUrl, getGenreUrl } from "../../../../config/url.config"

import styles from "./Content.module.scss"

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min. </span>
			</div>
			<ContentList
				name={"Жанры"}
				links={movie.genres.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getGenreUrl(g.slug),
					title: g.name
				}))}
			/>
			<ContentList
				name={"Актеры"}
				links={movie.actors.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getActorUrl(g.slug),
					title: g.name
				}))}
			/>
			<div className={styles.rating}>
				<MaterialIcon name={"MdStarRate"} />
				<span>{movie.rating?.toFixed(1)}</span>
			</div>
			<FavoriteButton movieId={movie._id} />
		</div>
	)
}

export default Content
