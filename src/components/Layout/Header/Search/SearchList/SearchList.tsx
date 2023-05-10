import Link from "next/link"
import { FC } from "react"

import { IMovie } from "@/shared/types/movie.types"

import { ANILIBRIA_URL } from "../../../../../config/api.config"

import styles from "./SearchList.module.scss"

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	console.log(movies)
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link key={movie.id} href={`/movies/${movie.id}`}>
						<a>
							<img
								src={`${ANILIBRIA_URL}${movie.posters.original.url}`}
								width={50}
								height={50}
								alt={movie.names.ru}
								draggable={false}
							/>
							<span>{movie.names.ru}</span>
						</a>
					</Link>
				))
			) : (
				<div className={"text-white text-center my-4"}>Аниме не найдено</div>
			)}
		</div>
	)
}

export default SearchList
