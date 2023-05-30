import axios from "axios"
import { GetStaticProps } from "next"
import React, { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"
import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

import { NEST_API } from "../config/api.config"

import MoviePage from "./movies/[slug]"

const Top = () => {
	const [movies, setMovies] = useState({ results: [] })
	const getData = async () => {
		try {
			const { data: topList } = await axios.get(`${NEST_API}/topPage`, {
				headers: { "ngrok-skip-browser-warning": "69420" }
			})
			const moviesList: any = []

			for (let i = 0; i < topList.list.length; i++) {
				const { data: movies } = await MovieService.getTop(topList.list[i])
				moviesList.push(...movies.results)
			}

			setMovies((prevMovies: any) => ({ ...prevMovies, results: moviesList }))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])

	return (
		movies && <TopCatalog movies={movies.results} title={"ТОП - 100 аниме"} />
	)
}

export default Top
