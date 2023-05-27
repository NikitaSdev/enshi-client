import cn from "classnames"
import classNames from "classnames"
import Link from "next/link"
import { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"
import { IGalleryItemProps } from "@/ui/gallery/gallery.interface"

import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter"

import styles from "./Gallery.module.scss"

const GalleryItem: FC<IGalleryItemProps> = ({ item, catalog, variant }) => {
	const title = (title: string) => {
		return title.length > 34 ? title.slice(0, 30) + "..." : title.slice(0, 34)
	}
	return (
		<div
			className={classNames(styles.item, {
				[styles.catalogItem]: catalog
			})}
		>
			<div className={styles.favourite}>
				<MaterialIcon name={"MdBookmark"} />
			</div>
			<Link href={`movies/${item.link}`}>
				<a>
					<img alt={item.name} src={item.posterPath} draggable={false} />
				</a>
				{item.content && (
					<div className={styles.description}>
						<h3>{title(item.content.title)}</h3>
						<div>
							<div className={styles.year}>
								<p>{item.year}</p>
							</div>

							<div className={styles.genre}>
								{item.genres[0] && item.genres[1] ? (
									<>
										<p>{capitalizeFirstLetter(item.genres[0])}/</p>{" "}
										<p>{capitalizeFirstLetter(item.genres[1])}</p>
									</>
								) : (
									<p>{capitalizeFirstLetter(item.genres[0])}</p>
								)}
							</div>
						</div>
					</div>
				)}
			</Link>
		</div>
	)
}

export default GalleryItem
