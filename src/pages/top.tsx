import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

import SkeletonCatalog from "@/ui/SkeletonCatalog/SkeletonCatalog"
import Button from "@/ui/form-elements/Button"
import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

import { NEST_API } from "../config/api.config"

const Top = () => {
	const [movies, setMovies] = useState({ results: [] })
	const [isLoading, setIsLoading] = useState(true)

	const moviesList: any = []
	const getData = async () => {
		try {
			setIsLoading(true)
			const { data: topList } = await axios.get(`${NEST_API}/topPage`)

			for (let i = 0; i < topList.length; i++) {
				const { data: movies } = await MovieService.getTop(topList[i])
				moviesList.push(...movies.results)
			}

			setMovies({ results: moviesList })
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			{movies && (
				<TopCatalog movies={movies.results} title={"ТОП - 100 аниме"} />
			)}
			<div style={{ marginTop: -150 }}>{isLoading && <SkeletonCatalog />}</div>
		</>
	)
}

export default Top
