import { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"

import styles from "./Catalog.module.scss"

const Catalog: FC<ICatalog> = ({ movies, isLoading, title, description }) => {
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

			<div className={styles.movies}>
				{isLoading ? (
					<div className={styles.loader}>
						<SkeletonLoader count={15} />
					</div>
				) : (
					movies.list.map((movie: any) => (
						<GalleryItem
							key={movie.id}
							item={{
								name: movie.names.ru,
								link: movie.code,
								posterPath: `${ANILIBRIA_URL}${movie.posters.original.url}`,
								posters: "",
								genres: movie.genres,
								year: movie.season.year,
								content: {
									title: movie.names.ru
								}
							}}
							variant={"horizontal"}
						/>
					))
				)}
			</div>
		</section>
	)
}

export default Catalog
