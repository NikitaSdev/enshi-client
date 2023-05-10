import dynamic from "next/dynamic"
import Script from "next/script"
import React, { FC, useEffect } from "react"

import Content from "@/screens/singleMovie/content/Content"
import { useUpdateCountOpened } from "@/screens/singleMovie/useUpdateCountOpened"

import Banner from "@/ui/banner/Banner"
import Gallery from "@/ui/gallery/Gallery"
import SubHeading from "@/ui/heading/SubHeading"
import VideoPlayer from "@/ui/video-player/VideoPlayer"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../pages/movies/[slug]"

const DynamicRate = dynamic(
	() => import("@/screens/singleMovie/RateMovie/RateMovie"),
	{
		ssr: false
	}
)
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	return (
		<>
			<Meta title={movie.title} description={`Watch ${movie.title}`} />
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			{/*<VideoPlayer kinopoiskId={movie.kinopoiskId} />*/}
			<div className={"mt-12"}>
				<SubHeading title={"Похожие фильмы"} />
				<Gallery items={similarMovies} />
			</div>
		</>
	)
}

export default SingleMovie
