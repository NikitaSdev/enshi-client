import classNames from "classnames"
import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuidv4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import { ANILIBRIA_URL } from "../../../config/api.config"

import styles from "./Gallery.module.scss"

const Gallery: FC<{
	items: IMovieList
	heading: string
	icon?: any
	announced?: boolean
}> = ({ items, heading, icon, announced }) => {
	const anilibria = ANILIBRIA_URL
	const swiperRef = useRef<SwiperCore>()
	const [swiperNavigationAllowed, setSwiperNavigationAllowed] = useState<any>({
		prevButtonDisabled: true,
		nextButtonDisabled: false
	})

	const nextSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext()
		}
	}
	const prevSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev()
		}
	}
	return (
		<section
			className={classNames(styles.wrapper, {
				[styles.announcedWrapper]: announced
			})}
		>
			<h1 className={styles.heading}>
				{heading}

				{icon && (
					<span>
						<Image src={icon} />
					</span>
				)}
			</h1>
			<div className={styles.swiperContainer}>
				<button
					onClick={prevSlide}
					className={styles.button}
					disabled={swiperNavigationAllowed.prevButtonDisabled}
				>
					<MaterialIcon name={"MdChevronLeft"} />
				</button>
				<Swiper
					slidesPerView={1}
					scrollbar={{ draggable: true }}
					onSlideChange={() =>
						setSwiperNavigationAllowed({
							prevButtonDisabled: swiperRef?.current?.isBeginning,
							nextButtonDisabled: swiperRef?.current
								? swiperRef?.current?.activeIndex ===
								  swiperRef?.current?.slides?.length - 5
								: false
						})
					}
					onReachEnd={() => {
						setSwiperNavigationAllowed({
							...swiperNavigationAllowed,
							nextButtonDisabled: true
						})
					}}
					onReachBeginning={() =>
						setSwiperNavigationAllowed({
							...swiperNavigationAllowed,
							prevButtonDisabled: true
						})
					}
					modules={[Navigation]}
					onBeforeInit={(swiper: SwiperCore | undefined) => {
						swiperRef.current = swiper
					}}
					spaceBetween={50}
					width={190}
					className={styles.swiper}
				>
					{items.list.map((item: IMovie) => (
						<SwiperSlide key={uuidv4()}>
							<img
								src={`${announced ? "" : anilibria}${
									item.posters.original.url
								}`}
								alt={item.names.ru}
							/>
							{item.names.ru}
							{announced ? (
								<div className={styles.release}>{item.release}</div>
							) : (
								<div>
									<div className={styles.year}>
										<p>{item.year}</p>
									</div>

									<p className={styles.genre}>
										{item.genres[1]
											? item.genres[0] + "/" + item.genres[1]
											: item.genres[0]}
									</p>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>

				<button
					onClick={nextSlide}
					className={styles.button}
					disabled={swiperNavigationAllowed.nextButtonDisabled}
				>
					<MaterialIcon name={"MdChevronRight"} />
				</button>
			</div>
		</section>
	)
}

export default Gallery
