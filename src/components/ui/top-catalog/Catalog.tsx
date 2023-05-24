import { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"
import { ICatalog } from "@/ui/catalog-movies/catalog.interface"
import GalleryItem from "@/ui/gallery/GalleryItem"

import Meta from "@/utils/meta/Meta"

import styles from "./Catalog.module.scss"

const TopCatalog: FC<ICatalog> = ({ movies, title, description }) => {
	movies &&
		movies.results.map((movieResults) => console.log(movieResults.results[0]))
	// movies.results.results.results.map((movie) => console.log(movie))
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

			{/*{movies && (*/}
			{/*	<div className={styles.movies}>*/}
			{/*		{movies.results.map((movie: any) => {*/}
			{/*			console.log(movie.results[0].results)*/}
			{/*			return (*/}
			{/*				movie.results[0].material_data && (*/}
			{/*					<GalleryItem*/}
			{/*						catalog*/}
			{/*						key={movie.id}*/}
			{/*						item={{*/}
			{/*							name: movie.results[0].title,*/}
			{/*							link: movie.id,*/}
			{/*							posterPath: movie.material_data.poster_url,*/}
			{/*							posters: "",*/}
			{/*							genres: movie.material_data.anime_genres*/}
			{/*								? movie.material_data.anime_genres*/}
			{/*								: [""],*/}
			{/*							year: movie.year,*/}
			{/*							content: {*/}
			{/*								title: movie.title*/}
			{/*							}*/}
			{/*						}}*/}
			{/*						variant={"horizontal"}*/}
			{/*					/>*/}
			{/*				)*/}
			{/*			)*/}
			{/*		})}*/}
			{/*	</div>*/}
			{/*)}*/}
		</section>
	)
}

export default TopCatalog
