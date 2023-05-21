import Hls from "hls.js"
import { FC, useEffect, useRef, useState } from "react"
import Select from "react-select"
import videojs from "video.js"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"
import { IMoviePage } from "../../../pages/movies/[slug]"

import styles from "./SingleMovie.module.scss"

interface VideoPlayerProps {
	src: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (Hls.isSupported()) {
			const hls = new Hls()
			if (videoRef.current) {
				hls.loadSource(src)
				hls.attachMedia(videoRef.current)
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					const video = videoRef.current!
					video.play()
				})
			}
		} else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
			const video = videoRef.current!
			video.src = src
			video.addEventListener("loadedmetadata", () => {
				video.play()
			})
		}
	}, [src])

	return (
		<div>
			<video ref={videoRef} controls className={styles.video}></video>
		</div>
	)
}

const SingleMovie: FC<IMoviePage> = ({ movie }) => {
	const [similar, setSimilar] = useState<IMovieList>({ list: [movie] })
	useEffect(() => {
		const fetch = async () => {
			const { data: similarMovies } = await MovieService.getSimilar(
				movie.genres
			)
			setSimilar(similarMovies)
		}
		fetch()
	}, [])
	console.log(similar)
	const [episode, setEpisode] = useState<number>(movie.player.episodes.first)
	const [quality, setQuality] = useState<"hd" | "sd">("hd")
	const qualityOptions: any = [
		{
			value: "hd",
			label: `Качество: HD`
		},
		{
			value: "sd",
			label: `Качество: SD`
		}
	]
	const options: any = []
	for (
		let i = movie.player.episodes.first;
		i <= movie.player.episodes.last;
		i++
	) {
		options.push({
			value: movie.player.list[i].episode,
			label: `Серия ${movie.player.list[i].episode}`
		})
	}
	return (
		<main>
			<Meta title={movie.names.ru} description={`Смотрите ${movie.names.ru}`} />
			<section>
				<div className={styles.container}>
					<Banner
						image={`${ANILIBRIA_URL}` + movie.posters.original.url}
						Detail={() => <Content movie={movie} />}
					/>
					<div>
						<p>Серия: {episode}</p>
						<Select
							options={options}
							onChange={(value: any) => setEpisode(value?.value)}
						/>
						<p>Качесвтво: {quality}</p>
						<Select
							options={qualityOptions}
							onChange={(value: any) => setQuality(value?.value)}
						/>
					</div>
					<VideoPlayer
						src={`https://${movie.player.host}${movie.player.list[episode].hls[quality]}`}
					/>
					<div className={"mt-12"}>
						<Gallery items={similar} heading={"Похожие фильмы"} singleMovie />
					</div>
				</div>
			</section>
		</main>
	)
}

export default SingleMovie
