import axios from "axios"
import { FC, useEffect, useState } from "react"

import Gallery from "@/ui/gallery/Gallery"
import MainBanner, { IBanner } from "@/ui/mainBanner/MainBanner"
import SocialBanner from "@/ui/socialBanner/SocialBanner"

import Meta from "@/utils/meta/Meta"

import chevron from "./chevron.svg"
import fire from "./fire.svg"
import { IHome } from "./home.interface"

interface IResponse {
	main: IBanner
}
const Home: FC<IHome> = ({ trendingMovies, announcedMovies }) => {
	const [list, setList] = useState()

	useEffect(() => {
		const fetch = async () => {
			const { data: allData } = await axios.get<IResponse>(
				`http://localhost:5000/api/homePage`
			)
			const list = allData.main
			setList(list)
		}
		fetch()
	}, [])

	return (
		<>
			<Meta title={"Главная"} description={"Главная"} />
			<main>
				{list && <MainBanner list={list.list} />}
				{/*{trendingMovies.length && (*/}
				{/*	<Gallery items={trendingMovies} heading={"Популярные"} icon={fire} />*/}
				{/*)}*/}
				{/*<Gallery*/}
				{/*	items={trendingMovies}*/}
				{/*	heading={"Анонсировано"}*/}
				{/*	icon={chevron}*/}
				{/*	announced*/}
				{/*/>*/}
				{/*<Gallery*/}
				{/*	items={trendingMovies}*/}
				{/*	heading={"Рейтинговые"}*/}
				{/*	icon={chevron}*/}
				{/*/>*/}
				{/*/!*<Gallery items={announcedMovies} heading={"Анонсировано "} />*!/*/}
				{/*/!*{announcedMovies.length && <Gallery items={announcedMovies} />}*!/*/}
				<SocialBanner />
				{/*<Gallery*/}
				{/*	items={trendingMovies}*/}
				{/*	heading={"Рекомендуемые"}*/}
				{/*	icon={chevron}*/}
				{/*/>*/}
				{/*{announcedMovies.length && <Gallery items={announcedMovies} />}*/}
			</main>
		</>
	)
}

export default Home
