import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

import { IHome } from "@/screens/home/home.interface"

import SkeletonGallery from "@/ui/SkeletonGallery/SkeletonGallery"

//TODO: swiper
//TODO: videoadaptive
//TODO: profile
import { MovieService } from "@/services/movie.service"

import Home from "../components/screens/home/Home"
import { NEST_API } from "../config/api.config"

const HomePage: NextPage<IHome> = () => {
	const [list, setList] = useState()
	const [announcedMovies, setAnnounced] = useState({})
	const [trendingMovies, setTrendingMovies] = useState({})
	const [ratingsMovies, setRatingMovies] = useState({})
	const [recommendedMovies, setRecommendedMovies] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const getData = async () => {
		try {
			const { data: homeData } = await axios.get(`${NEST_API}/HomePage`, {
				headers: { "ngrok-skip-browser-warning": "69420" }
			})
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
				trendingList
			}))
			setRatingMovies((prevMovies) => ({
				...prevMovies,
				ratingsList
			}))
			setRecommendedMovies((prevMovies) => ({
				...prevMovies,
				recommendedList
			}))
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	console.log(trendingMovies)

	return (
		<>
			<Home
				trendingMovies={trendingMovies}
				announcedMovies={announcedMovies}
				list={list}
				recommendedMovies={recommendedMovies}
				ratingsMovies={ratingsMovies}
				isLoading={isLoading}
			/>
		</>
	)
}

export default HomePage
