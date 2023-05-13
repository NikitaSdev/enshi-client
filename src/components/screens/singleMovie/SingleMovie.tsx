import dynamic from "next/dynamic"
import Script from "next/script"
import React, {FC, useEffect, useRef} from "react"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"
import Hls from "hls.js";
import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"
import VideoPlayer from "@/ui/video-player/VideoPlayer"

import Meta from "@/utils/meta/Meta"

import { ANILIBRIA_URL } from "../../../config/api.config"
import { IMoviePage } from "../../../pages/movies/[slug]"
interface VideoPlayerProps {
	src: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (Hls.isSupported()) {
			const hls = new Hls();
			if (videoRef.current) {
				hls.loadSource(src);
				hls.attachMedia(videoRef.current);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					const video = videoRef.current!;
					video.play();
				});
			}
		} else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
			const video = videoRef.current!;
			video.src = src;
			video.addEventListener("loadedmetadata", () => {
				video.play();
			});
		}
	}, [src]);

	return (
		<div>
			<video ref={videoRef} controls></video>
		</div>
	);
};
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	console.log(movie)

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
	return (
		<main className={"flex w-full justify-center  align-middle"}>
			{/*<Meta title={movie.names} description={`Watch ${movie.names}`} />*/}
			<Meta title={"О моём перерождении в слизь: Алые узы "} description={``} />
			<div className={"w-11/12"}>
				<Banner
					image={`${ANILIBRIA_URL}` + movie.list[0].posters.original.url}
					Detail={() => <Content movie={movie.list[0]} />}
				/>
				<video>
					<source
						src={`https://cache.libria.fun${movie.list[0].player.list[1].hls.sd.replace(
							'"',
							""
						)}`}
					/>
				</video>
				<VideoPlayer src={`https://cache.libria.fun${movie.list[0].player.list[1].hls.sd.replace(
					'"',
					""
				)}`} />
				<div className={"mt-12"}>
					<SubHeading title={"Похожие фильмы"} />
					<Gallery items={similar} heading={""} />
				</div>
			</div>
		</main>
	)
}

export default SingleMovie
