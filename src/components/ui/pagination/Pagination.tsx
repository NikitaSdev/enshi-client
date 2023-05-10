import { FC } from "react"

import Button from "@/ui/form-elements/Button"
import { usePagination } from "@/ui/pagination/usePagination"

import { IMovie } from "@/shared/types/movie.types"

import styles from "./Pagination.module.scss"

interface IPaginationProps {
	setPage: any
	movies: IMovie[] | undefined
	page: number
	scrollToTop: () => void
}
const Pagination: FC<IPaginationProps> = ({
	movies,
	page,
	setPage,
	scrollToTop
}) => {
	return (
		<div className={styles.wrapper}>
			{page === 0 ? null : (
				<Button
					onClick={() => {
						setPage((prev: number) => prev - 18), scrollToTop()
					}}
				>
					PrevPage
				</Button>
			)}
			{movies && movies.length < 18 ? null : (
				<Button
					onClick={() => {
						setPage((prev: number) => prev + 18), scrollToTop()
					}}
				>
					NextPage
				</Button>
			)}
		</div>
	)
}

export default Pagination
