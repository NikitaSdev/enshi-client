import Image from "next/image"
import React, { FC } from "react"

import Button from "@/ui/form-elements/Button"

import styles from "./Banner.module.scss"

interface IBanner {
	image: string
	Detail?: FC | null
}
const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<div>
				<Image
					className={styles.poster}
					src={image}
					alt={""}
					width={312}
					height={445}
					draggable={false}
					unoptimized
					priority
				/>
				<Button className={styles.addToFavourite}><p>Добавить в избранное</p></Button>
			</div>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
