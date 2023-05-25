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
		return title.length > 34 ? title.slice(0, 350) + "..." : title.slice(0, 34)
	}
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.info}>
				<p>
					<span>Эпизоды:</span>
					{movie.last_episode}
				</p>
				<p>
					<span>Жанры:</span> {movie.material_data.anime_genres.join(", ")}
				</p>
				<p>
					<span>Год выпуска:</span> {movie.year}
				</p>
				<p>
					<span>Статус:</span>{" "}
					{movie.material_data.anime_status === "ongoing"
						? "Онгоинг"
						: "Завершенный"}
				</p>
				<p>
					<span>Тип:</span>{" "}
					{movie.material_data.anime_kins === "tv" ? "Сериал" : "Фильм"}
				</p>
			</div>

			<div className={styles.description}>
				<p>
					{isDescriptionOpened
						? movie.material_data.anime_description
						: title(movie.material_data.anime_description)}
				</p>
			</div>

			<button
				className={styles.extra}
				onClick={() => setIsDescriptionOpened((prev) => !prev)}
			>
				{isDescriptionOpened ? "Свернуть" : "Развернуть"}
			</button>

			<ContentList
				name={"Жанры"}
				links={movie.material_data.anime_genres
					.slice(0, 1)
					.map((g: string) => ({
						title: g
					}))}
			/>
			<FavoriteButton movieId={movie.id} />
		</div>
	)
}

export default Content
