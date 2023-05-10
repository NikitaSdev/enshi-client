import { FC } from "react"

import Gallery from "@/ui/gallery/Gallery"
import Heading from "@/ui/heading/Heading"
import SubHeading from "@/ui/heading/SubHeading"
import MainBanner from "@/ui/mainBanner/MainBanner"
import SocialBanner from "@/ui/socialBanner/SocialBanner"

import Meta from "@/utils/meta/Meta"

import fire from "./fire.svg"
import { IHome } from "./home.interface"

const Home: FC<IHome> = ({ trendingMovies, announcedMovies, mainMovie }) => {
	return (
		<>
			<Meta title={"Главная"} description={"Главная"} />
			<main>
				<MainBanner />
				{/*{trendingMovies.length && (*/}
				<Gallery items={trendingMovies} heading={"Популярные"} icon={fire} />
				{/*)}*/}
				<Gallery
					items={trendingMovies}
					heading={"Анонсировано"}
					icon={fire}
					announced
				/>
				<Gallery items={trendingMovies} heading={"Рейтинговые"} icon={fire} />
				{/*<Gallery items={announcedMovies} heading={"Анонсировано "} />*/}
				{/*/!*{announcedMovies.length && <Gallery items={announcedMovies} />}*!/*/}
				<SocialBanner />
				<Gallery items={trendingMovies} heading={"Рекомендуемые"} icon={fire} />
				{/*{announcedMovies.length && <Gallery items={announcedMovies} />}*/}
			</main>
		</>
	)
}

export default Home
