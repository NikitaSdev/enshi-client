import { Pagination } from "@mui/material"
import { makeStyles } from "@mui/styles"
import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiPaginationItem-page.Mui-selected": {
			backgroundColor: "#8C53FD",
			color: "white"
		},
		"& .MuiPaginationItem-root": {
			borderRadius: 5,
			width: 50,
			height: 50,
			fontSize: "1rem",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			"&:hover": {
				color: "white",
				backgroundColor: "#b79ee8"
			}
		}
	}
}))
const TrendingPage: FC<any> = () => {
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const { data: movies, isLoading } = useQuery(
		[`getCatalog`, page],
		() =>
			axios.get(
				`https://api.anilibria.tv/v3/title/search/advanced?query={season.year} > 2016&limit=15&page=${page}`
			),
		{ select: ({ data }) => data }
	)
	useEffect(() => {
		movies && setTotalPages(movies.pagination.pages)
	}, [movies])
	const classes = useStyles()
	return (
		<main className={"flex flex-col items-center "}>
			<Catalog
				movies={movies || []}
				title={"Каталог"}
				description={"Трендовые фильмы и сериалы"}
				isLoading={isLoading}
			/>

			<Pagination
				className={classes.root}
				count={totalPages}
				onChange={(e, currentPage) => setPage(currentPage)}
			/>
		</main>
	)
}

export default TrendingPage
