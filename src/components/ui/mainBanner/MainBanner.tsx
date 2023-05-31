import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import { MdStar } from "react-icons/all"
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"
import Button from "@/ui/form-elements/Button"
import SkeletonBanner from "@/ui/mainBanner/SkeletonBanner"

import styles from "./MainBanner.module.scss"
import poster from "./dumbPoster.jpg"

export interface IBannerItem {
	bigPoster: string
	name: string
	poster: string
	description: string
	link: string
	rating: number
	season: number
}
export interface IBanner {
	list: IBannerItem[]
}
const Slider: FC<{
	onClick: (arg: number) => void
	currentIndex: number
	list: Array<IBannerItem>
}> = ({ currentIndex, list, onClick }) => {
	const swiperRef = useRef<SwiperCore>()

	const prevSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev()
		}
	}
	const nextSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext()
		}
	}

	return (
		<>
			<div className={styles.swiper}>
				<div onClick={prevSlide}>
					<MaterialIcon
						name={"MdOutlineChevronLeft"}
						className={styles.swipeLeft}
					/>
				</div>

				<Swiper
					onBeforeInit={(swiper: SwiperCore | undefined) => {
						swiperRef.current = swiper
					}}
					onSlideChange={(e) => onClick(e.activeIndex)}
					spaceBetween={1}
					slidesPerView={4}
					breakpoints={{
						320: {
							slidesPerView: 1
						},
						380: {
							slidesPerView: 2
						},
						830: {
							slidesPerView: 3
						},
						1200: {
							spaceBetween: 20,
							slidesPerView: 4
						}
					}}
				>
					{
						// @ts-ignore
						list.list.map((item: IBannerItem, index: number) => (
							<SwiperSlide key={index}>
								<img
									className={styles.swiperSlide}
									src={item.poster}
									alt={item.name}
									draggable={false}
									onClick={() => onClick(index)}
								/>
							</SwiperSlide>
						))
					}
				</Swiper>
				<div onClick={nextSlide}>
					<MaterialIcon
						name={"MdOutlineChevronRight"}
						className={styles.swipeRight}
					/>
				</div>
			</div>
		</>
	)
}
const Rating: FC<IBanner & { currentIndex: number }> = ({
	list,
	currentIndex
}) => {
	// @ts-ignore
	const stars = new Array(list.list[currentIndex].rating + 1)
	stars.fill(0, 0, -1)
	return (
		<>
			{stars.map(() => (
				<MaterialIcon name={"MdStar"} key={v4()} />
			))}
		</>
	)
}
const MainBanner: FC<any> = ({ list }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	return (
		<>
			{list ? (
				<section
					className={styles.banner}
					style={{
						background: `url(${list.list[currentIndex].bigPoster})`
					}}
				>
					<div className={styles.bannerContainer}>
						<div className={styles.content}>
							<div>
								{<h1>{list.list[currentIndex].name}</h1>}
								<p className={styles.rating}>
									<span className={styles.season}>
										{list.list[currentIndex].season} сезон
									</span>
									<span className={styles.stars}>
										<Rating currentIndex={currentIndex} list={list} />
									</span>
								</p>

								<div>
									<p className={styles.description}>
										{list.list[currentIndex].description.slice(0, 180) + "..."}
									</p>
								</div>
								<Button className={styles.watch}>
									<a href={`movies/${list.list[currentIndex].link}`}>
										Cмотреть
										<span>
											<MaterialIcon name={"MdPlayArrow"} />
										</span>
									</a>
								</Button>
							</div>
						</div>
						<Slider
							list={list}
							currentIndex={currentIndex}
							onClick={(num) => setCurrentIndex(num)}
						/>
					</div>
				</section>
			) : (
				<SkeletonBanner />
			)}
		</>
	)
}

export default MainBanner
