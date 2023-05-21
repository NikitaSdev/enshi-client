import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import { MdStar } from "react-icons/all"
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"
import Button from "@/ui/form-elements/Button"

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

	console.log(currentIndex)
	const prevSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev()
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
				>
					{list.map((item: IBannerItem, index: number) => (
						<SwiperSlide key={index}>
							<img
								className={styles.swiperSlide}
								src={item.poster}
								alt={item.name}
								draggable={false}
								onClick={() => onClick(index)}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	)
}
const Rating: FC<IBanner & { currentIndex: number }> = ({
	list,
	currentIndex
}) => {
	const stars = new Array(list[currentIndex].rating + 1)
	stars.fill(0, 0, -1)
	return (
		<>
			{stars.map((star) => (
				<MaterialIcon name={"MdStar"} key={v4()} />
			))}
		</>
	)
}
const MainBanner: FC<IBanner> = ({ list }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	return (
		<>
			{list && (
				<section
					className={styles.banner}
					style={{
						background: `url(${list[currentIndex].bigPoster})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover"
					}}
				>
					<div className={styles.bannerContainer}>
						<div className={styles.content}>
							<div>
								{<h1>{list[currentIndex].name}</h1>}
								<p className={styles.rating}>
									<span className={styles.season}>
										{list[currentIndex].season} сезон
									</span>
									<span className={styles.stars}>
										<Rating currentIndex={currentIndex} list={list} />
									</span>
								</p>

								<div>
									<p className={styles.description}>
										{list[currentIndex].description}
									</p>
								</div>
								<Button className={styles.watch}>
									<a href={`movies/${list[currentIndex].link}`}>
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
			)}
		</>
	)
}

export default MainBanner
