import { useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"

import { IMovie } from "@/shared/types/movie.types"

import { axiosClassic } from "../../../api/interceptors"
import { API_SERVER_URL } from "../../../config/api.config"

export const useGenrePagination = (genreId: string) => {
	const [page, setPage] = useState<number>(0)

	const getMovies = async (skip = 0) => {
		const { data } = await axiosClassic.post<IMovie[]>(
			`${API_SERVER_URL}/movies/by-genres?limit=18&page=${skip}`,
			{
				genreIds: [genreId]
			}
		)
		return data
	}

	const { data: movies, isLoading } = useQuery(
		["get 18 movies", page],
		() => getMovies(page),
		{
			keepPreviousData: true
		}
	)
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}
	return useMemo(() => {
		return { isLoading, page, movies, setPage, scrollToTop }
	}, [isLoading, page, movies, setPage, scrollToTop])
}
