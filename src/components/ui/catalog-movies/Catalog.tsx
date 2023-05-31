import { FC } from "react"
import Skeleton from "react-loading-skeleton"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonCatalog from "@/ui/SkeletonCatalog/SkeletonCatalog"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"

import Meta from "@/utils/meta/Meta"
import { removeDuplicates } from "@/utils/removeDuplicates"

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
					{movies.map(
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
										},
										id: movie.id
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
