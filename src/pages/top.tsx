import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { toastr } from "react-redux-toastr"

import SkeletonCatalog from "@/ui/SkeletonCatalog/SkeletonCatalog"
import Button from "@/ui/form-elements/Button"
import SkeletonBanner from "@/ui/mainBanner/SkeletonBanner"
import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

import { NEST_API } from "../config/api.config"

const Top = () => {
	const [movies, setMovies] = useState({ results: [] })
	const [isLoading, setIsLoading] = useState(true)
	const [skip, setSkip] = useState(0)
	const [limit, setLimit] = useState(10)
	const moviesList: any = []
	const getData = async () => {
		try {
			setIsLoading(true)
			const { data: topList } = await axios.get(
				`${NEST_API}/topPage?page${skip}&limit=${limit}`
			)

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

			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					color: "white",
					marginTop: "24px"
				}}
			>
				<Button
					disabled={skip >= 90 || isLoading}
					onClick={() => {
						setIsLoading(true)
						setSkip((prev) => prev + 10)
						setLimit((prev) => prev + 10)
						toastr.success("Загрузка", "В процессе")
						skip < 90 && getData()
					}}
				>
					Загрузить еще
				</Button>
			</div>
		</>
	)
}

export default Top
