import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { FC, useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuidv4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"
import SkeletonLoader from "@/ui/SkeletonLoader"

import { IMovie } from "@/shared/types/movie.types"

import styles from "./Gallery.module.scss"

const HomeGallery: FC<{
	items: any
	heading: string
	icon?: any
	singleMovie?: boolean
	announced?: boolean
}> = ({ items, heading, singleMovie, icon, announced }) => {
	const swiperRef = useRef<SwiperCore>()
	const [swiperNavigationAllowed, setSwiperNavigationAllowed] = useState<any>({
		prevButtonDisabled: false,
		nextButtonDisabled: false
	})
	console.log(items)
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
			<div>
				<div className={styles.headContainer}>
					<h1 className={styles.heading}>
						{heading}

						{icon && (
							<span>
								<Image src={icon} />
							</span>
						)}
					</h1>
				</div>
				<div className={styles.swiperContainer}>
					<button
						onClick={prevSlide}
						className={styles.button}
						disabled={swiperNavigationAllowed.prevButtonDisabled}
					>
						<MaterialIcon name={"MdChevronLeft"} />
					</button>
					{
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
							modules={[Navigation]}
							onBeforeInit={(swiper: SwiperCore | undefined) => {
								swiperRef.current = swiper
							}}
							spaceBetween={20}
							className={styles.swiper}
						>
							{items ? (
								items.list.map((item: IMovie) => (
									<SwiperSlide key={uuidv4()} className={styles.swiperItem}>
										<div className={styles.item}>
											{!announced && (
												<div className={styles.favourite}>
													<MaterialIcon name={"MdBookmark"} />
												</div>
											)}

											<img
												alt={item.title}
												src={
													announced
														? item.posters.original.url
														: item.material_data.poster_url
												}
												draggable={false}
											/>
											{announced && (
												<div className={styles.announce}>Анонсировано</div>
											)}
											{announced ? (
												<div className={styles.description}>
													<h3>{title(item.names.ru)}</h3>
													<div className={styles.release}>
														<p>{item.release}</p>
													</div>
												</div>
											) : (
												<div className={styles.description}>
													<h3>{title(item.title)}</h3>
													<div>
														<div className={styles.year}>
															<p>{item.year}</p>
														</div>

														<div className={styles.genre}>
															{announced ? null : item.material_data
																	.anime_genres[1] ? (
																<>
																	<p>{item.material_data.anime_genres[0]}/</p>{" "}
																	<p>{item.material_data.anime_genres[1]}</p>
																</>
															) : (
																<p>{item.material_data.anime_genres[0]}</p>
															)}
														</div>
													</div>
												</div>
											)}
										</div>
									</SwiperSlide>
								))
							) : (
								<SkeletonLoader width={190} height={250} count={1} />
							)}
						</Swiper>
					}

					<button
						onClick={nextSlide}
						className={styles.button}
						disabled={swiperNavigationAllowed.nextButtonDisabled}
					>
						<MaterialIcon name={"MdChevronRight"} />
					</button>
				</div>
			</div>
		</section>
	)
}

export default HomeGallery
