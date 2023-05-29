import classNames from "classnames"
import { ChangeEvent, FC, SetStateAction, useEffect, useState } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./SearchField.module.scss"

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchField: FC<
	ISearchField & {
		expandedInput?: boolean
		width?: "desktop"
		setExpandedInput?: (arg: boolean) => void
		setIsSearchListOpened?: (arg: boolean) => void
	}
> = ({
	searchTerm,
	handleSearch,
	setIsSearchListOpened,
	setExpandedInput,
	expandedInput,
	width
}) => {
	return (
		<div
			className={styles.search}
			onClick={() => {
				// @ts-ignore
				setIsSearchListOpened(true)
				// @ts-ignore
				width && setExpandedInput(true)
			}}
		>
			<div>
				{width ? (
					<MaterialIcon name={"MdSearch"} className={styles.icon} />
				) : (
					<MaterialIcon
						name={"MdSearch"}
						className={styles.icon}
						onClick={() =>
							// @ts-ignore
							setExpandedInput((prev) => !prev)
						}
					/>
				)}

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
		</div>
	)
}

export default SearchField
