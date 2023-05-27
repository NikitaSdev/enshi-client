import axios from "axios"
import Cookies from "js-cookie"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StylesConfig } from "react-select"

import Content from "@/screens/singleMovie/content/Content"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"

import { IMovieList } from "@/shared/types/movie.types"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../pages/movies/[slug]"

import styles from "./SingleMovie.module.scss"

interface OptionType {
	value: string
	label: string
}

const customStyles: StylesConfig<OptionType, false> = {
	control: (provided) => ({
		...provided,
		height: 40,
		width: 169,
		borderRadius: 10,
		backgroundColor: "#8b54fd",
		border: "none",
		boxShadow: "none"
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: 0,
		color: "#fff",
		display: "flex",
		alignItems: "center"
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#fff",
		paddingLeft: 8,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "#fff" : "transparent",
		color: state.isSelected ? "#8b54fd" : "#666",
		padding: "10px 15px",
		cursor: "pointer"
	}),
	menu: (provided) => ({
		...provided,
		marginTop: 0,
		borderRadius: 10,
		boxShadow: "none"
	}),
	placeholder: (provided) => ({
		...provided,
		color: "#fff",
		paddingLeft: 8
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: "white",
		"&:hover": {
			color: "white"
		}
	}),
	indicatorSeparator: (provided) => ({
		...provided,
		display: "none"
	})
}

const SingleMovie: FC<IMoviePage> = ({ movie }) => {
	// @ts-ignore
	const user = useSelector((state) => state.user)
	const [similar, setSimilar] = useState<IMovieList>()
	useEffect(() => {
		if (user) {
			const refreshToken = Cookies.get("refreshToken")
			axios.post("http://localhost:5000/api/users/count", {
				movieId: movie.id,
				refreshToken
			})
		}
	})
	useEffect(() => {
		const fetch = async () => {
			const { data: similarMovies } = await MovieService.getSimilar(
				movie.material_data.anime_genres,
				movie.year
			)
			setSimilar(similarMovies)
		}
		fetch()
	}, [])

	return (
		movie &&
		movie.material_data && (
			<main>
				<Meta
					title={movie.material_data.title}
					description={`Смотрите ${movie.material_data.title}`}
				/>
				<section>
					<div className={styles.container}>
						<Banner
							id={movie.id}
							image={movie.material_data.poster_url}
							Detail={() => <Content movie={movie} />}
						/>
						<iframe
							src={`http:${movie.link}`}
							className={styles.video}
						></iframe>
						{similar && similar.results && (
							<div className={"mt-12"}>
								<Gallery
									items={similar}
									heading={"Похожие фильмы"}
									singleMovie
								/>
							</div>
						)}
					</div>
				</section>
			</main>
		)
	)
}

export default SingleMovie
