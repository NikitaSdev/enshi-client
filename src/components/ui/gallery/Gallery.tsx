import classNames from "classnames"
import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuidv4 } from "uuid"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie } from "@/shared/types/movie.types"

import { ANILIBRIA_URL } from "../../../config/api.config"

import styles from "./Gallery.module.scss"
import poster from "./poster.png"

const Gallery: FC<{
	items: IMovie[]
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
	console.log(swiperNavigationAllowed.nextButtonDisabled)
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

				<span>
					<Image src={icon} />
				</span>
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

							nextButtonDisabled:
								swiperRef?.current?.activeIndex ===
								swiperRef?.current?.slides?.length - 5
						})
					}
					onReachEnd={() => {
						console.log("end")
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
					{/*{items.map((item: any) => (*/}
					{/*	<SwiperSlide key={uuidv4()}>*/}
					{/*		<img src={`${anilibria}${item.posterPath}`} alt={item.name} />*/}
					{/*		{item.name}*/}
					{/*	</SwiperSlide>*/}
					{/*))}*/}
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className={styles.swiperItem}>
						<div className={styles.favourite}>
							<MaterialIcon name={"MdBookmark"} />
						</div>
						<Image src={poster} />
						<div className={styles.description}>
							<h3>О моём перерождении в слизь: Алые узы </h3>
							<div>
								<div className={styles.year}>
									<p>2023</p>
								</div>
								<div className={styles.genre}>
									<p>Комедия/Экшен</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
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
