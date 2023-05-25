import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

import { IHome } from "@/screens/home/home.interface"

//TODO: swiper
//TODO: videoadaptive
//TODO: profile
import { MovieService } from "@/services/movie.service"

import Home from "../components/screens/home/Home"

const HomePage: NextPage<IHome> = () => {
	const [list, setList] = useState()
	const [announcedMovies, setAnnounced] = useState()
	const [trendingMovies, setTrendingMovies] = useState({ results: [] })
	const [ratingsMovies, setRatingMovies] = useState({ results: [] })
	const [recommendedMovies, setRecommendedMovies] = useState({ results: [] })
	const getData = async () => {
		try {
			const { data: homeData } = await axios.get(
				"http://localhost:5000/api/HomePage"
			)
			setAnnounced(homeData.announced)
			setList(homeData.main)
			const trendingList: any = []
			const ratingsList: any = []
			const recommendedList: any = []

			for (let i = 0; i < homeData.trending.length; i++) {
				const { data: movies } = await MovieService.getTop(homeData.trending[i])
				trendingList.push(...movies.results)
			}
			for (let i = 0; i < homeData.ratings.length; i++) {
				const { data: movies } = await MovieService.getTop(homeData.ratings[i])
				ratingsList.push(...movies.results)
			}
			for (let i = 0; i < homeData.recommended.length; i++) {
				const { data: movies } = await MovieService.getTop(
					homeData.recommended[i]
				)
				recommendedList.push(...movies.results)
			}
			setTrendingMovies((prevMovies) => ({
				...prevMovies,
				results: trendingList
			}))
			setRatingMovies((prevMovies) => ({
				...prevMovies,
				results: ratingsList
			}))
			setRecommendedMovies((prevMovies) => ({
				...prevMovies,
				results: recommendedList
			}))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	console.log(recommendedMovies)

	return (
		<Home
			trendingMovies={trendingMovies}
			announcedMovies={announcedMovies}
			list={list}
			recommendedMovies={recommendedMovies}
			ratingsMovies={ratingsMovies}
		/>
	)
}

export default HomePage
