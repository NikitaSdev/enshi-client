import axios from "axios"
import { GetStaticProps } from "next"
import React, { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"
import TopCatalog from "@/ui/top-catalog/Catalog"

import { MovieService } from "@/services/movie.service"

const Top = () => {
	const [isCatalogLoading, setIsCatalogLoading] = useState(true)
	const { data: topList, isLoading } = useQuery(
		[`getTopList`],
		async () => await axios.get(`http://localhost:5000/api/topPage`),
		{
			select: ({ data }) => data
		}
	)

	const top = { results: [] }

	const getTop = async () => {
		for (let i = 0; i < topList.list.length; i++) {
			const { data: movies } = await MovieService.getTop(topList.list[i])
			top.results.push(movies)
			if (i === top.results.length - 1) setIsCatalogLoading(false)
		}
	}

	!isLoading && getTop()
	console.log(top)
	console.log(isCatalogLoading)
	return (
		<>
			{!isLoading && !isCatalogLoading && (
				<TopCatalog movies={top || []} title={"ТОП - 100 аниме"} />
			)}
		</>
	)
}

export default Top
