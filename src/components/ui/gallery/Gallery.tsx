import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
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
	items: any
	heading: string
	icon?: any
	singleMovie?: boolean
	announced?: boolean
}> = ({ items, heading, singleMovie, icon, announced }) => {
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
	const title = (title: string) => {
		return title.length > 34 ? title.slice(0, 30) + "..." : title.slice(0, 34)
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
					breakpoints={{
						0: {
							slidesPerView: 1
						},
						360: {
							slidesPerView: 2
						},
						700: {
							slidesPerView: 3
						},
						1050: {
							slidesPerView: 4
						},
						1250: {
							slidesPerView: 5
						}
					}}
					slidesPerView={5}
					scrollbar={{ draggable: true }}
					onSlideChange={() =>
						setSwiperNavigationAllowed({
							prevButtonDisabled: swiperRef?.current?.isBeginning,
							nextButtonDisabled: swiperRef?.current
								? swiperRef?.current?.activeIndex ===
								  swiperRef?.current?.slides?.length
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
					spaceBetween={20}
					className={styles.swiper}
				>
					{items.list.map((item: IMovie) => (
						<SwiperSlide key={uuidv4()} className={styles.swiperItem}>
							<Link href={singleMovie ? item.code : `movies/${item.code}`}>
								<div className={styles.item}>
									<div className={styles.favourite}>
										<MaterialIcon name={"MdBookmark"} />
									</div>
									{announced && (
										<div className={styles.announce}>Анонсировано</div>
									)}
									<img
										alt={item.names.ru}
										src={`${announced ? "" : anilibria}${
											item.posters.original.url
										}`}
										className={styles.slide}
										draggable={false}
									/>
									{announced ? (
										<div className={styles.release}>{item.release}</div>
									) : (
										<div className={styles.description}>
											<h3>{title(item.names.ru)}</h3>
											<div>
												<div className={styles.year}>
													<p>{item.season.year}</p>
												</div>

												<div className={styles.genre}>
													{item.genres[1] ? (
														<>
															<p>{item.genres[0]}/</p> <p>{item.genres[1]}</p>
														</>
													) : (
														<p>{item.genres[0]}</p>
													)}
												</div>
											</div>
										</div>
									)}
								</div>
							</Link>
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
