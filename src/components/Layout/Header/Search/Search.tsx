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
	}, [expandedInput])
	return (
		<div
			className={cn(styles.wrapper, className)}
			onClick={() => setIsSearchListOpened(true)}
			ref={ref}
		>
			<SearchField
				onClick={() => setExpandedInput((prev) => !prev)}
				expandedInput={expandedInput}
				searchTerm={searchTerm}
				handleSearch={handleSearch}
			/>
			{expandedInput && isSuccess && isSearchListOpened && (
				<SearchList movies={data?.list || []} />
			)}
		</div>
	)
}

export default Search
