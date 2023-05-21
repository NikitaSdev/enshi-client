import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import { useEffect, useState } from "react"

import { IHome } from "@/screens/home/home.interface"

import { IGalleryItem } from "@/ui/gallery/gallery.interface"
import { ISlide } from "@/ui/slider/slider.types"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

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
		const trendingMovies: any = dataTrendingMovies.map((m) => ({
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
