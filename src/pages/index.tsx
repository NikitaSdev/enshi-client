import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import { useQuery } from "react-query"

import { IHome } from "@/screens/home/home.interface"

//TODO: swiper
//TODO: videoadaptive
//TODO: profile
import { MovieService } from "@/services/movie.service"

import Home from "../components/screens/home/Home"

const HomePage: NextPage<IHome> = ({
	list,
	ratingsMovies,
	recommendedMovies,
	trendingMovies,
	announcedMovies
}) => {
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
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: allData } = await axios.get<any>(
			`http://localhost:5000/api/homePage`
		)

		const list = allData.main
		const announcedMovies = allData.announced
		const trendingMoviesList = allData.trending
		const ratingsMoviesList = allData.ratings
		const recommendedMoviesList = allData.recommended
		const trendingMovies = {
			list: await MovieService.getTrending(trendingMoviesList)
		}
		const ratingsMovies = {
			list: await MovieService.getTrending(ratingsMoviesList)
		}
		const recommendedMovies = {
			list: await MovieService.getTrending(recommendedMoviesList)
		}
		return {
			props: {
				list,
				ratingsMovies,
				recommendedMovies,
				announcedMovies,
				trendingMovies
			} as any,
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: []
			}
		}
	}
}

export default HomePage
