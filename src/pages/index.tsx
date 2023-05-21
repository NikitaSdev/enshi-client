import axios from "axios"
import { GetStaticProps, NextPage } from "next"

import { IHome } from "@/screens/home/home.interface"

//TODO: swiper
//TODO: videoadaptive
//TODO: profile
import { MovieService } from "@/services/movie.service"

import Home from "../components/screens/home/Home"

const HomePage: NextPage<IHome> = ({ trendingMovies, announcedMovies }) => {
	return (
		<Home trendingMovies={trendingMovies} announcedMovies={announcedMovies} />
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: allData } = await axios.get(
			`http://localhost:5000/api/homePage`
		)
		const list = allData.main
		const announcedMovies: any = allData.announced.map((m: any) => ({
			name: m.name,
			posterPath: m.poster,
			type: m.type,
			genres: m.genres
		}))
		const dataTrendingMovies = await MovieService.getTrending(allData.popular)
		const trendingMovies: any = dataTrendingMovies.map((m: any) => ({
			name: m.names.ru,
			posterPath: m.posters.original.url,
			link: m.id
		}))
		return {
			props: {
				list,
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
