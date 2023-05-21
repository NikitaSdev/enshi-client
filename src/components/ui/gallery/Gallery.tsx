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
					allowTouchMove={false}
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
							<Link href={`movies/${item.code}`}>
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
											<h3>{item.names.ru}</h3>
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
