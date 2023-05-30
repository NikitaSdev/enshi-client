import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import Select from "react-select"

import MaterialIcon from "@/ui/MaterialIcon"
import Catalog from "@/ui/catalog-movies/Catalog"
import Filter from "@/ui/filter/Filter"
import Pagination from "@/ui/pagination/Pagination"

import { MovieService } from "@/services/movie.service"

import { removeDuplicates } from "@/utils/removeDuplicates"

import styles from "../components/ui/filter/Filter.module.scss"

const TrendingPage = () => {
	const [movies, setMovies] = useState()
	const [genreList, setGenresList] =
		useState<Array<{ value: string; label: string; icon: ReactNode }>>()
	const [yearList, setYearList] =
		useState<Array<{ value: number; label: number; icon: ReactNode }>>()
	const [statuses, setStatuses] =
		useState<Array<{ value: string; label: string; icon: ReactNode }>>()
	const [years, setYears] =
		useState<Array<{ value: number; label: number; icon: ReactNode }>>()
	const [genres, setGenres] =
		useState<Array<{ value: string; label: string; icon: ReactNode }>>()
	const genreOptions: Array<{ value: string; label: string; icon: ReactNode }> =
		[]
	const yearOptions: Array<{ value: number; label: number; icon: ReactNode }> =
		[]
	const statusOptions = [
		{
			value: "ongoing",
			label: "Онгоинг",
			icon: <MaterialIcon name={"MdOutlineAddBox"} className={styles.icon} />
		},
		{
			value: "released",
			label: "Закончено",
			icon: <MaterialIcon name={"MdOutlineAddBox"} className={styles.icon} />
		}
	]
	const getOptions = async () => {
		const { data: genres } = await axios.get(
			"https://kodikapi.com/genres?token=d046caa991d8b228f8d0a1a2f990cce5&types=anime-serial"
		)

		genres.results.map((genre: { title: string }) => {
			if (
				genre.title !== "фильм-нуар" &&
				genre.title !== "аниме" &&
				genre.title !== "биография" &&
				genre.title !== "вестерн" &&
				genre.title !== "детский" &&
				genre.title !== "мультфильм" &&
				genre.title !== "мюзикл"
			)
				genreOptions.push({
					value: genre.title,
					label: genre.title[0].toUpperCase() + genre.title.slice(1),
					icon: (
						<MaterialIcon name={"MdOutlineAddBox"} className={styles.icon} />
					)
				})
		})

		setGenresList(genreOptions)
		const { data: years } = await axios.get(
			"https://kodikapi.com/years?token=d046caa991d8b228f8d0a1a2f990cce5&types=anime-serial"
		)

		years.results.map((year: { year: number }) => {
			yearOptions.push({
				value: year.year,
				label: year.year,
				icon: <MaterialIcon name={"MdOutlineAddBox"} className={styles.icon} />
			})
		})

		setYearList(yearOptions)
	}

	useEffect(() => {
		const getMovies = async (
			genres: Array<{ value: string; label: string }>,
			statuses: Array<{ value: string; label: string }>,
			years: Array<{ value: number; label: number }>
		) => {
			// @ts-ignore
			const { data: movies } = await MovieService.getMovieList(
				genres,
				statuses,
				years
			)
			setMovies(movies)
		}
		getOptions()

		// @ts-ignore
		getMovies(genres, statuses, years)
	}, [genres, statuses, years])

	const handlePrev = async () => {
		// @ts-ignore
		const { data: prev } = await axios.get(movies.prev_page)
		setMovies(prev)
	}
	const handleNext = async () => {
		// @ts-ignore
		const { data: next } = await axios.get(movies.next_page)
		setMovies(next)
	}
	const resetFilters = () => {
		setGenres(undefined)
		setYears(undefined)
		setStatuses(undefined)
	}

	return (
		<main>
			<Filter
				genreList={genreList}
				statusOptions={statusOptions}
				setStatuses={setStatuses}
				resetFilters={resetFilters}
				setGenres={setGenres}
				yearList={yearList}
				setYears={setYears}
			/>

			{movies && (
				<Catalog
					movies={
						// @ts-ignore
						removeDuplicates(movies.results) || []
					}
					title={"Каталог"}
					description={"Трендовые фильмы и сериалы"}
				/>
			)}

			<Pagination
				movies={movies}
				handleNext={handleNext}
				handlePrev={handlePrev}
			/>
		</main>
	)
}

export default TrendingPage
