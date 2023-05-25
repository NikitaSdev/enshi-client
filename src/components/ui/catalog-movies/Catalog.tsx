import { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"

import styles from "./Catalog.module.scss"

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
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

			{movies && (
				<div className={styles.movies}>
					{movies.results.map(
						(movie: any) =>
							movie.material_data && (
								<GalleryItem
									catalog
									key={movie.id}
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
										}
									}}
									variant={"horizontal"}
								/>
							)
					)}
				</div>
			)}
		</section>
	)
}

export default Catalog
