import classNames from "classnames"
import { ChangeEvent, FC, useState } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./SearchField.module.scss"

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchField: FC<
	ISearchField & { expandedInput?: boolean; onClick?: () => void }
> = ({ searchTerm, handleSearch, onClick, expandedInput }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon
				name={"MdSearch"}
				className={styles.icon}
				onClick={onClick}
			/>

			<input
				className={classNames({ [styles.activeInput]: expandedInput })}
				type="text"
				placeholder={"Поиск аниме"}
				value={searchTerm}
				onChange={handleSearch}
			/>
		</div>
	)
}

export default SearchField
