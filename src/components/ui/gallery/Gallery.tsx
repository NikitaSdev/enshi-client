import axios from "axios"
import classNames from "classnames"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { FC, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import SwiperCore, { Navigation } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { v4 as uuidv4 } from "uuid"

import { AuthForm } from "@/components/Layout/Header/Profile/Profile"

import MaterialIcon from "@/ui/MaterialIcon"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

import { UsersService } from "@/services/users.service"

import { ANILIBRIA_URL } from "../../../config/api.config"

import styles from "./Gallery.module.scss"

const Gallery: FC<{
	items: any
	heading: string
	icon?: any
	singleMovie?: boolean
	announced?: boolean
}> = ({ items, heading, singleMovie, icon, announced }) => {
	const swiperRef = useRef<SwiperCore>()
	const [swiperNavigationAllowed, setSwiperNavigationAllowed] = useState<any>({
		prevButtonDisabled: true,
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
	const user = useSelector((state) => state.user)
	const [refetch, setRefetch] = useState(true)
	const [favoriteMovies, setFavoriteMovies] =
		useState<Array<string | undefined>>()
	useEffect(() => {
		const _id = user.user && user.user._id
		const getFavorite = async () => {
			const { data: favouriteMovies } = await axios.post(
				"http://localhost:5000/api/users/profile/favourites",
				{
					_id
				}
			)
			setFavoriteMovies(favouriteMovies)
		}
		user.user && getFavorite()
	}, [refetch])
	const [isModalOpened, setIsModalOpened] = useState(false)
	const toggleFavourites = async (id: string) => {
		if (user.user) {
			setRefetch((prev) => !prev)
			const refreshToken = Cookies.get("refreshToken")
			await UsersService.toggleFavourite(id, refreshToken)
		} else {
			setIsModalOpened(true)
		}
	}
	return (
		<>
			{isModalOpened && (
				<AuthForm setIsAuthFormOpened={() => setIsModalOpened(false)} />
			)}
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
					{items.results && (
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
							{items.results.map((item: IMovie) => (
								<SwiperSlide key={uuidv4()} className={styles.swiperItem}>
									<div className={styles.item}>
										<div
											className={classNames(styles.favourite, {
												[styles.activeFavourite]: favoriteMovies?.includes(
													item.id
												)
											})}
											onClick={() => toggleFavourites(item.id)}
										>
											<MaterialIcon name={"MdBookmark"} />
										</div>
										<a href={singleMovie ? item.id : `movies/${item.id}`}>
											<img
												alt={item.title}
												src={item.material_data.poster_url}
												className={styles.slide}
												draggable={false}
											/>
											{announced ? (
												<div className={styles.release}>{item.release}</div>
											) : (
												<div className={styles.description}>
													<h3>{title(item.title)}</h3>
													<div>
														<div className={styles.year}>
															<p>{item.year}</p>
														</div>

														<div className={styles.genre}>
															{item.material_data.anime_genres[1] ? (
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
										</a>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}

					<button
						onClick={nextSlide}
						className={styles.button}
						disabled={swiperNavigationAllowed.nextButtonDisabled}
					>
						<MaterialIcon name={"MdChevronRight"} />
					</button>
				</div>
			</section>
		</>
	)
}

export default Gallery
