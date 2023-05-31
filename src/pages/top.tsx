import axios from "axios"
import React, { useEffect, useState } from "react"

import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

import { NEST_API } from "../config/api.config"

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
	return <TopCatalog movies={movies.results} title={"ТОП - 100 аниме"} />
}

export default Top
