import React, { FC } from "react"

import Button from "@/ui/form-elements/Button"

import styles from "./Pagination.module.scss"

const Pagination: FC<{
	movies: any
	handlePrev: () => void
	handleNext: () => void
}> = ({ movies, handlePrev, handleNext }) => {
	return (
		<div className={styles.pagination}>
			{movies && (
				<Button onClick={handlePrev} disabled={movies.prev_page == null}>
					Предыдущая страница
				</Button>
			)}

			<Button onClick={handleNext}>Следующая страница</Button>
		</div>
	)
}

export default Pagination
