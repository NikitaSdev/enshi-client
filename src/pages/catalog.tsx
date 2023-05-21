import { Pagination } from "@mui/material"
import { purple } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import axios from "axios"
import { FC, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"

import Catalog from "@/ui/catalog-movies/Catalog"

import { MovieService } from "@/services/movie.service"

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
		<>
			<>
				<Catalog
					movies={movies || []}
					title={""}
					description={"Трендовые фильмы и сериалы"}
					isLoading={isLoading}
				/>
				<div className={"flex mt-8 justify-center w-full "}>
					<Pagination
						className={classes.root}
						style={{ marginTop: "48px" }}
						count={totalPages}
						onChange={(e, currentPage) => setPage(currentPage)}
					/>
				</div>
			</>
		</>
	)
}

export default TrendingPage
