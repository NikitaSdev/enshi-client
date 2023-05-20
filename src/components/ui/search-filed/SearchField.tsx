import classNames from "classnames"
import { ChangeEvent, FC, useState } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./SearchField.module.scss"

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	const [expandedInput, setExpandedInput] = useState(false)
	return (
		<div className={styles.search}>
			<MaterialIcon
				name={"MdSearch"}
				className={styles.icon}
				onClick={() => setExpandedInput((prev) => !prev)}
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
