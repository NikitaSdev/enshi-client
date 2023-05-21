import axios from "axios"
import { FC, useEffect, useState } from "react"

import Gallery from "@/ui/gallery/Gallery"
import MainBanner, { IBanner } from "@/ui/mainBanner/MainBanner"
import SocialBanner from "@/ui/socialBanner/SocialBanner"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import chevron from "./chevron.svg"
import fire from "./fire.svg"
import { IHome } from "./home.interface"

const Home: FC<IHome> = () => {
	const [list, setList] = useState<any>()
	const [announcedMovies, setAnnounced] = useState<any>()
	const [recommendedMovies, setRecommendedMovies] = useState<any>()
	const [ratingsMovies, setRatingsMoviesList] = useState<any>()
	const [trendingMovies, setTrendingMovies] = useState<any>()

	useEffect(() => {
		const fetch = async () => {
			const { data: allData } = await axios.get<any>(
				`http://localhost:5000/api/homePage`
			)
			const list = allData.main
			const announcedMovies = allData.announced
			const trendingMoviesList = allData.trending
			const ratingsMoviesList = allData.ratings
			const recommendedMoviesList = allData.recommended
			console.log(allData)
			const trendingMovies = await MovieService.getTrending(trendingMoviesList)
			const ratingsMovie = await MovieService.getTrending(ratingsMoviesList)
			const recommendedMovies = await MovieService.getTrending(
				recommendedMoviesList
			)
			setTrendingMovies({ list: trendingMovies })
			setRatingsMoviesList({ list: ratingsMovie })
			setRecommendedMovies({ list: recommendedMovies })
			setList(list)
			setAnnounced(announcedMovies)
		}
		fetch()
	}, [])
	console.log(trendingMovies)
	return (
		<>
			<Meta title={"Главная"} description={"Главная"} />
			<main>
				{list && <MainBanner list={list.list} />}
				{trendingMovies && (
					<Gallery items={trendingMovies} heading={"Популярные"} icon={fire} />
				)}
				{announcedMovies && (
					<Gallery
						items={announcedMovies}
						heading={"Анонсировано "}
						announced
					/>
				)}
				{ratingsMovies && (
					<Gallery
						items={ratingsMovies}
						heading={"Рейтинговые"}
						icon={chevron}
					/>
				)}

				<SocialBanner />
				{recommendedMovies && (
					<Gallery
						items={recommendedMovies}
						heading={"Рекомендуемые"}
						icon={chevron}
					/>
				)}
			</main>
		</>
	)
}

export default Home
