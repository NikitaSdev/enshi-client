import React, { FC } from "react"

import Description from "@/components/ui/heading/Description"
import Heading from "@/components/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

import CollectionItem from "./CollectionItem"
import styles from "./Collections.module.scss"
import { ICollection } from "./collections.types"

const title = "Подборки по жанрам"
const description = "Здесь вы найдете всевозможные жанры и фильмы"

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<>
			<Meta title={title} description={description}></Meta>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</>
	)
}

export default Collections
