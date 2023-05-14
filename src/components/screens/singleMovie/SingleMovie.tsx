import Hls from "hls.js"
import { FC, useEffect, useRef, useState } from "react"
import Select from "react-select"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"
import { IMoviePage } from "../../../pages/movies/[slug]"

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
			<video ref={videoRef} controls></video>
		</div>
	)
}
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	console.log(movie)
	const [episode, setEpisode] = useState(1)
	console.log(episode)
	const similar = [
		{
			season: "1 сезон",
			genres: ["Романтика", "Экшен"],
			list: [],
			id: "dfdsf",
			poster:
				"https://images0.persgroep.net/rcs/RvzOii3OIhTUhdDIY8qdyKnINFg/diocontent/115579801/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
			bigPoster:
				"https://images0.persgroep.net/rcs/RvzOii3OIhTUhdDIY8qdyKnINFg/diocontent/115579801/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
			posters:
				"https://images0.persgroep.net/rcs/RvzOii3OIhTUhdDIY8qdyKnINFg/diocontent/115579801/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
			description:
				"Знакомьтесь! Сатору Миками, 37-летний рядовой служащий крупной финансовой компании, ныне мечтающий лишь об одном — о девушке. Однако встреча с приятелем на улице обернулась для Сатору трагедией, перечеркнув все планы: грабитель с ножом бросился на товарища, а  принял на себя удар...\n" +
				"Но жизнь для   на этом не закончилась. Мужчина переродился в другом мире. Перед смертью он подумал о том, как плохо человеку от потери крови, а после перерождения получил... тело слизня, в котором эта жидкая красная субстанция попросту отсутствует. Но что может сделать в огромном незнакомом мире, пускай и разумная, но слизь?",
			names: { ru: "Твоё имя" },
			name: "string",
			videoUrl: "string",
			link: "string"
		}
	]
	const options: any = []

	for (let i = 1; i <= Object.keys(movie.list[0].player.list).length; i++) {
		options.push({
			value: movie.list[0].player.list[i].uuid,
			label: movie.list[0].player.list[i].episode
		})
	}
	console.log(options)
	return (
		<main className={"flex w-full justify-center  align-middle"}>
			<Meta
				title={movie.list[0].names.ru}
				description={`Смотрите ${movie.list[0].names.ru}`}
			/>

			<div className={"w-11/12"}>
				<Banner
					image={`${ANILIBRIA_URL}` + movie.list[0].posters.original.url}
					Detail={() => <Content movie={movie.list[0]} />}
				/>
				<div>
					<p>Серия {episode}</p>
					<Select
						options={options}
						onChange={(value: any) => setEpisode(value?.label)}
					/>
				</div>
				<VideoPlayer
					src={`https://${movie.list[0].player.host}${movie.list[0].player.list[episode].hls.sd}`}
				/>
				<div className={"mt-12"}>
					<SubHeading title={"Похожие фильмы"} />
					{/*<Gallery items={similar} heading={""} />*/}
				</div>
			</div>
		</main>
	)
}

export default SingleMovie
