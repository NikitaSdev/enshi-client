import cn from "classnames"
import { FC, useEffect, useState } from "react"

import SearchList from "@/components/Layout/Header/Search/SearchList/SearchList"
import { useSearch } from "@/components/Layout/Header/Search/UseSearch"
import { useOutsideClick } from "@/components/Layout/Header/useClickOutside"

import SearchField from "@/ui/search-filed/SearchField"

import styles from "./Search.module.scss"

const Search: FC<{
	className?: string
	onClick?: () => void
}> = ({ className, onClick }) => {
	const [isSearchListOpened, setIsSearchListOpened] = useState(true)
	const ref = useOutsideClick(() => setIsSearchListOpened(false))
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	const [expandedInput, setExpandedInput] = useState(false)
	const [width, setWidth] = useState(0)
	useEffect(() => {
		setWidth(document.body.clientWidth)
		width > 480 && setExpandedInput(true)
		width > 480 && setIsSearchListOpened(true)
	}, [expandedInput])
	return (
		<div className={cn(styles.wrapper, className)} ref={ref}>
			{width > 480 ? (
				<SearchField
					setExpandedInput={() => setExpandedInput(true)}
					setIsSearchListOpened={() => setIsSearchListOpened(true)}
					expandedInput={expandedInput}
					searchTerm={searchTerm}
					handleSearch={handleSearch}
					width={"desktop"}
				/>
			) : (
				<SearchField
					setExpandedInput={() => setExpandedInput((prev) => !prev)}
					setIsSearchListOpened={() => setIsSearchListOpened(true)}
					expandedInput={expandedInput}
					searchTerm={searchTerm}
					handleSearch={handleSearch}
				/>
			)}
			{expandedInput && isSuccess && isSearchListOpened && (
				<SearchList movies={data || []} />
			)}
		</div>
	)
}

export default Search
