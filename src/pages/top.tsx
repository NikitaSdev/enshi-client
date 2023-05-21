import axios from "axios"
import { GetStaticProps } from "next"
import React, { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"

import { MovieService } from "@/services/movie.service"

const Top = () => {
	const { data: topList, isLoading: topListLoading } = useQuery(
		[`getTopList`],
		async () => await axios.get(`http://localhost:5000/api/topPage`),
		{
			select: ({ data }) => data
		}
	)
	const { data: top, isLoading } = useQuery(
		[`getTop`, topList],
		async () => await MovieService.getTrending(topList.list)
	)
	const moviesToRender = { list: top }
	console.log(moviesToRender)
	return (
		<>
			<Catalog
				isLoading={isLoading}
				movies={moviesToRender || []}
				title={"ТОП - 100 аниме"}
			/>
		</>
	)
}

export default Top
