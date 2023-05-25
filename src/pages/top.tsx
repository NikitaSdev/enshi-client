import axios from "axios"
import { GetStaticProps } from "next"
import React, { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"
import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

import MoviePage from "./movies/[slug]"

const Top = () => {
	const [movies, setMovies] = useState({ results: [] })
	const getData = async () => {
		try {
			const { data: topList } = await axios.get(
				"http://localhost:5000/api/topPage"
			)
			const moviesList = []

			for (let i = 0; i < topList.list.length; i++) {
				const { data: movies } = await MovieService.getTop(topList.list[i])
				moviesList.push(...movies.results)
			}

			setMovies((prevMovies) => ({ ...prevMovies, results: moviesList }))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	console.log(movies)
	return (
		movies && <TopCatalog movies={movies.results} title={"ТОП - 100 аниме"} />
	)
}

export default Top
