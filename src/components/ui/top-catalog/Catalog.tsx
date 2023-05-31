import { FC, useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { v4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"

import Meta from "@/utils/meta/Meta"

import styles from "./Catalog.module.scss"

const TopCatalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<section className={styles.main}>
			<Meta title={title} description={description}></Meta>
			{title === "Каталог" ? null : (
				<h1 className={styles.heading}>
					ТОП - 100 аниме
					<span className={styles.stars}>
						<MaterialIcon name={"MdStar"} />
					</span>
				</h1>
			)}
			{movies ? (
				<div className={styles.movies}>
					{movies.map((movie: any) => {
						return (
							<GalleryItem
								catalog
								key={v4()}
								item={{
									name: movie.title,
									link: movie.id,
									posterPath: movie.material_data.poster_url,
									posters: "",
									genres: movie.material_data.anime_genres
										? movie.material_data.anime_genres
										: [""],
									year: movie.year,
									content: {
										title: movie.title
									},
									id: movie.id
								}}
								variant={"horizontal"}
							/>
						)
					})}
				</div>
			) : (
				<>
					<SkeletonLoader count={25} width={290} height={250} />
				</>
			)}
		</section>
	)
}

export default TopCatalog
