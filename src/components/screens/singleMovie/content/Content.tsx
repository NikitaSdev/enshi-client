import { FC, useState } from "react"

import FavoriteButton from "@/screens/singleMovie/FavoriteButton/FavoriteButton"
import ContentList from "@/screens/singleMovie/content/ContentList/ContentList"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie } from "@/shared/types/movie.types"

import { getActorUrl, getGenreUrl } from "../../../../config/url.config"

import styles from "./Content.module.scss"

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const [isDescriptionOpened, setIsDescriptionOpened] = useState(false)
	const title = (title: string) => {
		return title.length > 34 ? title.slice(0, 200) + "..." : title.slice(0, 34)
	}
	return (
		<div className={styles.content}>
			<h1>{movie.names.ru}</h1>
			<div className={styles.info}>
				<p>
					<span>Эпизоды:</span>
					{movie.type.episodes}
				</p>
				<p>
					<span>Жанры:</span> {movie.genres.join(", ")}
				</p>
				<p>
					<span>Год выпуска:</span> {movie.season.year}
				</p>
				<p>
					<span>Статус:</span> {movie.status.string}
				</p>
				<p>
					<span>Тип:</span> {movie.type.string === "TV" ? "Сериал" : "Фильм"}
				</p>
			</div>

			<div className={styles.description}>
				<p>
					{isDescriptionOpened ? movie.description : title(movie.description)}
				</p>
			</div>

			<button className={styles.extra} onClick={() => setIsDescriptionOpened((prev) => !prev)}>
				{isDescriptionOpened ? "Свернуть" : "Развернуть"}
			</button>

			{/*<ContentList*/}
			{/*	name={"Жанры"}*/}
			{/*	links={movie.genres.slice(0, 1).map((g) => ({*/}
			{/*		title: g*/}
			{/*	}))}*/}
			{/*/>*/}
			{/*<div className={styles.rating}>*/}
			{/*	<MaterialIcon name={"MdStarRate"} />*/}
			{/*</div>*/}
			{/*<FavoriteButton movieId={movie.id} />*/}
		</div>
	)
}

export default Content
