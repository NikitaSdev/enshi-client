import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { MdStar } from "react-icons/all"
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

import MaterialIcon from "@/ui/MaterialIcon"
import Button from "@/ui/form-elements/Button"

import styles from "./MainBanner.module.scss"
import poster from "./dumbPoster.jpg"

interface IBanner {
	name: string
	poster: string
	description: string
	link: string
}
const Slider = () => {
	const swiperRef = useRef<SwiperCore>()
	const [activeIndex, setActiveIndex] = useState(0)
	const [allSlides, setAllSlides] = useState<number | undefined>(1)
	useEffect(() => {
		const slides = getSlides()
		setAllSlides(slides)
	}, [])
	const getSlides = () => {
		if (swiperRef.current) {
			return swiperRef.current?.slides.length
		}
	}
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
					onSlideChange={(e) => setActiveIndex(e.activeIndex)}
					spaceBetween={1}
					slidesPerView={5}
				>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
					<SwiperSlide>
						<Image src={poster} alt={""} draggable={false} />
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	)
}
const Rating = () => {
	return (
		<>
			<MaterialIcon name={"MdStar"} />
			<MaterialIcon name={"MdStar"} />
			<MaterialIcon name={"MdStar"} />
			<MaterialIcon name={"MdStar"} />
			<MaterialIcon name={"MdStar"} />
		</>
	)
}
const MainBanner = () => {
	return (
		// <div
		// 	style={{
		// 		background: `url(${poster})`
		// 	}}
		// 	className={styles.banner}
		// >
		// 	{name}
		// 	{description}
		// 	<button>
		// 		<Link href={`/movies/${link}`}>Смотреть</Link>
		// 	</button>
		// </div>
		<>
			<section className={styles.banner}>
				<div className={styles.bannerContainer}>
					<div className={styles.content}>
						<div>
							<h1>Семь смертных грехов!</h1>
							<p className={styles.rating}>
								<span className={styles.season}>1 сезон </span>
								<span className={styles.stars}>
									<Rating />
								</span>
							</p>
						</div>
						<div>
							<p className={styles.description}>
								Один случайный матч зажёг в Сёё Хинате безумную любовь к
								волейболу. Хоть в его волейбольном клубе изначально не было даже
								участников, упорством и стараниями
							</p>
						</div>
						<Button className={styles.watch}>
							Cмотреть
							<span>
								<MaterialIcon name={"MdPlayArrow"} />
							</span>
						</Button>
					</div>
					<Slider />
				</div>
			</section>
		</>
	)
}

export default MainBanner
