import axios from "axios"
import { GetStaticProps, NextPage } from "next"

import { IHome } from "@/screens/home/home.interface"

import { IGalleryItem } from "@/ui/gallery/gallery.interface"
import { ISlide } from "@/ui/slider/slider.types"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import { getGenresList } from "@/utils/movie/getGenresListEach"

import Home from "../components/screens/home/Home"
import { getActorUrl, getMovieUrl } from "../config/url.config"

const HomePage: NextPage<IHome> = ({
	trendingMovies,
	announcedMovies,
	mainMovie
}) => {
	console.log(trendingMovies)
	return (
		<Home
			trendingMovies={trendingMovies}
			announcedMovies={announcedMovies}
			mainMovie={mainMovie}
		/>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: allData } = await axios.get(
			`http://localhost:5000/api/homePage`
		)
		const main = await MovieService.getMain(allData.main.id)
		const mainMovie: any = {
			poster: allData.main.photo,
			name: main.names.ru,
			description: allData.main.description,
			link: main.id
		}
		const announcedMovies: any = allData.announced.map((m: any) => ({
			name: m.title,
			posterPath: m.img,
			type: m.type,
			genres: m.genres
		}))
		const dataTrendingMovies = await MovieService.getTrending(allData.popular)
		const trendingMovies: any = dataTrendingMovies.map((m) => ({
			name: m.names.ru,
			posterPath: m.posters.original.url,
			link: m.id
		}))
		return {
			props: {
				mainMovie,
				announcedMovies,
				trendingMovies
			} as any,
			revalidate: 60
		}
	} catch (e) {
		console.log(e)
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
