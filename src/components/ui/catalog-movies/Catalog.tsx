import { FC } from "react"

import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"
import Description from "@/ui/heading/Description"
import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"
import { getMovieUrl } from "../../../config/url.config"

import styles from "./Catalog.module.scss"
import poster from "./poster.png"

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	console.log(movies)
	return (
		<>
			<Meta title={title} description={description}></Meta>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}
			<section className={styles.movies}>
				{movies.map((movie) => (
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
				))}
			</section>
		</>
	)
}

export default Catalog
