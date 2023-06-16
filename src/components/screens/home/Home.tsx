import { FC } from "react"

import SkeletonGallery from "@/ui/SkeletonGallery/SkeletonGallery"
import Gallery from "@/ui/gallery/Gallery"
import HomeGallery from "@/ui/homeGallery/HomeGallery"
import MainBanner, { IBanner } from "@/ui/mainBanner/MainBanner"
import SocialBanner from "@/ui/socialBanner/SocialBanner"

import Meta from "@/utils/meta/Meta"

import chevron from "./chevron.svg"
import fire from "./fire.svg"
import { IHome } from "./home.interface"

const Home: FC<IHome> = ({
	list,
	trendingMovies,
	announcedMovies,
	ratingsMovies,
	recommendedMovies,
	isLoading
}) => {
	return (
		<>
			<main>
				<MainBanner list={list} />

				{isLoading ? (
					<div className={"mt-5"}>
						<SkeletonGallery />
					</div>
				) : (
					<Gallery
						items={trendingMovies.trendingList}
						heading={"Популярные"}
						icon={fire}
					/>
				)}

				{isLoading ? (
					<SkeletonGallery />
				) : (
					<HomeGallery
						items={announcedMovies}
						heading={"Анонсировано "}
						announced
					/>
				)}

				{isLoading ? (
					<SkeletonGallery />
				) : (
					<Gallery
						items={ratingsMovies.ratingsList}
						heading={"Рейтинговые"}
						icon={chevron}
					/>
				)}

				<SocialBanner />

				{isLoading ? (
					<SkeletonGallery />
				) : (
					<Gallery
						items={recommendedMovies.recommendedList}
						heading={"Рекомендуемые"}
						icon={chevron}
					/>
				)}
			</main>
		</>
	)
}

export default Home
