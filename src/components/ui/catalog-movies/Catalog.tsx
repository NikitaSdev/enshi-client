import { FC } from "react"
import MdStar from "react-icons/all"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"
import Description from "@/ui/heading/Description"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"
import { getMovieUrl } from "../../../config/url.config"

import styles from "./Catalog.module.scss"
import poster from "./poster.png"

const Catalog: FC<ICatalog> = ({ movies, isLoading, title, description }) => {
	const array = new Array(15).fill(0, 0, -1)
	return (
		<main className={styles.main}>
			<Meta title={title} description={description}></Meta>
			{title && (
				<h1 className={styles.heading}>
					ТОП - 100 аниме{" "}
					<span className={styles.stars}>
						<MaterialIcon name={"MdStar"} />
					</span>
				</h1>
			)}

			<section className={styles.movies}>
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
			</section>
		</main>
	)
}

export default Catalog
