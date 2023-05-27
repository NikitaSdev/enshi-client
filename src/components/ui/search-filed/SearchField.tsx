import classNames from "classnames"
import { ChangeEvent, FC, SetStateAction, useState } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./SearchField.module.scss"

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchField: FC<
	ISearchField & {
		expandedInput?: boolean
		setExpandedInput?: SetStateAction<boolean>
		setIsSearchListOpened?: SetStateAction<boolean>
	}
> = ({
	searchTerm,
	handleSearch,
	width,
	setIsSearchListOpened,
	setExpandedInput,
	expandedInput
}) => {
	return (
		<div className={styles.search} onClick={setIsSearchListOpened}>
			<div onClick={setExpandedInput}>
				<MaterialIcon name={"MdSearch"} className={styles.icon} />
			</div>
			<input
				className={classNames(styles.input, {
					[styles.activeInput]: expandedInput
				})}
				type="text"
				placeholder={"Поиск аниме"}
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	)
}

export default SearchField
