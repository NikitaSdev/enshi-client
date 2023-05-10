import React, { FC } from "react"

import Menu from "@/components/Layout/Navigation/MenuContainer/Menu"
import { usePopularGenres } from "@/components/Layout/Navigation/MenuContainer/genres/usePopularGenres"

import SkeletonLoader from "@/ui/SkeletonLoader"

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className={"mx-11 mb-6"}>
			<SkeletonLoader count={5} className={"h-7 mt-6"} />
		</div>
	) : (
		<Menu menu={{ title: "Популярные жанры", items: data || [] }} />
	)
}

export default GenreMenu
