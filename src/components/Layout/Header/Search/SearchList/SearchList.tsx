import Link from "next/link"
import { FC, useState } from "react"

import styles from "./SearchList.module.scss"

const SearchList: FC<{ movies: any | undefined }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies ? (
				movies.map(
					(movie: any) =>
						movie.material_data && (
							<Link key={movie.id} href={`/movies/${movie.id}`}>
								<a>
									<img
										src={
											movie.material_data.poster_url
												? movie.material_data.poster_url
												: ""
										}
										width={50}
										height={50}
										alt={movie.title}
										draggable={false}
									/>
									<span>{movie.title}</span>
								</a>
							</Link>
						)
				)
			) : (
				<div className={"text-white text-center my-4"}>Аниме не найдено</div>
			)}
		</div>
	)
}

export default SearchList
