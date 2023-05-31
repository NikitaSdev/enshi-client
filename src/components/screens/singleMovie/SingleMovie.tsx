import axios from "axios"
import Cookies from "js-cookie"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StylesConfig } from "react-select"

import Content from "@/screens/singleMovie/content/Content"

import SkeletonGallery from "@/ui/SkeletonGallery/SkeletonGallery"
import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"

import { IMovieList } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"
import { removeDuplicates } from "@/utils/removeDuplicates"

import { NEST_API } from "../../../config/api.config"
import { IMoviePage } from "../../../pages/movies/[slug]"

import styles from "./SingleMovie.module.scss"

interface OptionType {
	value: string
	label: string
}

const SingleMovie: FC<IMoviePage> = ({ movie }) => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const [similar, setSimilar] = useState<IMovieList>()
	const [linked, setLinked] = useState<IMovieList>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetch = async () => {
			const { data: similarMovies } = await MovieService.getSimilar(
				movie.material_data.anime_genres,
				movie.year
			)
			setSimilar(similarMovies)
			const { data: linkedMovies } = await MovieService.getByName(
				movie.material_data.title
			)

			setLinked(linkedMovies)
			setIsLoading(false)
		}
		fetch()
	}, [])
	const handleIframeMessage = (event: any) => {
		if (event.data.key == "kodik_player_current_episode") {
			if (user.user && event.data.value.episode === movie.last_episode) {
				const refreshToken = Cookies.get("refreshToken")
				axios.post(`${NEST_API}/users/count`, {
					movieId: movie.id,
					refreshToken
				})
			}
		}
	}

	useEffect(() => {
		window.addEventListener("message", handleIframeMessage)
		return () => window.removeEventListener("message", handleIframeMessage)
	}, [])
	return (
		movie &&
		movie.material_data && (
			<main>
				<Meta
					title={movie.material_data.title}
					description={`Смотрите ${movie.material_data.title}`}
				/>
				<section>
					<div className={styles.container}>
						<Banner
							id={movie.id}
							image={movie.material_data.poster_url}
							Detail={() => <Content movie={movie} />}
						/>
						<iframe
							allowFullScreen
							allow={"fullscreen; autoplay"}
							src={`https:${movie.link}`}
							className={styles.video}
						></iframe>

						{isLoading ? (
							<SkeletonGallery />
						) : (
							<div className={"mt-6"}>
								<Gallery
									items={removeDuplicates(linked?.results)}
									heading={"Похожие"}
									singleMovie
								/>
							</div>
						)}
						{isLoading ? (
							<SkeletonGallery />
						) : (
							<div className={"mt-6"}>
								<Gallery
									items={removeDuplicates(similar?.results)}
									heading={"Еще аниме"}
									singleMovie
								/>
							</div>
						)}
					</div>
				</section>
			</main>
		)
	)
}

export default SingleMovie
