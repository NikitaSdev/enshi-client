import axios from "axios"
import { FC, useEffect, useState } from "react"

import Gallery from "@/ui/gallery/Gallery"
import MainBanner, { IBanner } from "@/ui/mainBanner/MainBanner"
import SocialBanner from "@/ui/socialBanner/SocialBanner"

import { MovieService } from "@/services/movie.service"

import Meta from "@/utils/meta/Meta"

import chevron from "./chevron.svg"
import fire from "./fire.svg"
import { IHome } from "./home.interface"

const Home: FC<IHome> = ({
	list,
	trendingMovies,
	announcedMovies,
	ratingsMovies,
	recommendedMovies
}) => {
	console.log(ratingsMovies)
	return (
		<>
			<Meta title={"Главная"} description={"Главная"} />
			<main>
				{list && <MainBanner list={list.list} />}
				{trendingMovies && (
					<Gallery items={trendingMovies} heading={"Популярные"} icon={fire} />
				)}
				{announcedMovies && (
					<Gallery
						items={announcedMovies}
						heading={"Анонсировано "}
						announced
					/>
				)}
				{ratingsMovies && (
					<Gallery
						items={ratingsMovies}
						heading={"Рейтинговые"}
						icon={chevron}
					/>
				)}
				<SocialBanner />
				{recommendedMovies && (
					<Gallery
						items={recommendedMovies}
						heading={"Рекомендуемые"}
						icon={chevron}
					/>
				)}
			</main>
		</>
	)
}

export default Home
