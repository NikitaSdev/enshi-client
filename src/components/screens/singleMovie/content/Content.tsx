import { FC, useState } from "react"

import ContentList from "@/screens/singleMovie/content/ContentList/ContentList"

import { IMovie } from "@/shared/types/movie.types"

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
					{movie.last_episode && movie.last_episode}
				</p>
				<p>
					<span>Жанры:</span>{" "}
					{movie.material_data.anime_genres &&
						movie.material_data.anime_genres.join(", ")}
				</p>
				<p>
					<span>Год выпуска:</span> {movie.year}
				</p>
				<p>
					<span>Статус:</span>{" "}
					{movie.material_data.anime_status &&
					movie.material_data.anime_status === "ongoing"
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
					{movie.material_data.anime_description
						? isDescriptionOpened
							? movie.material_data.anime_description
							: title(movie.material_data.anime_description)
						: movie.material_data.description
						? isDescriptionOpened
							? movie.material_data.description
							: title(movie.material_data.description)
						: ""}
				</p>
			</div>

			{(movie.material_data.anime_description ||
				movie.material_data.description) && (
				<button
					className={styles.extra}
					onClick={() => setIsDescriptionOpened((prev) => !prev)}
				>
					{isDescriptionOpened ? "Свернуть" : "Развернуть"}
				</button>
			)}

			{movie.material_data.anime_genres && (
				<ContentList
					name={"Жанры"}
					links={movie.material_data.anime_genres
						.slice(0, 1)
						.map((g: string) => ({
							title: g
						}))}
				/>
			)}
		</div>
	)
}

export default Content
