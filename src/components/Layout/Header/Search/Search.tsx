import cn from "classnames"
import { FC, useState } from "react"

import SearchList from "@/components/Layout/Header/Search/SearchList/SearchList"
import { useSearch } from "@/components/Layout/Header/Search/UseSearch"
import { useOutsideClick } from "@/components/Layout/Header/useClickOutside"

import SearchField from "@/ui/search-filed/SearchField"

import styles from "./Search.module.scss"

const Search: FC<{ className?: string }> = ({ className }) => {
	const [isSearchListOpened, setIsSearchListOpened] = useState(true)
	const ref = useOutsideClick(() => setIsSearchListOpened(false))
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div
			className={cn(styles.wrapper, className)}
			ref={ref}
			onClick={() => setIsSearchListOpened(true)}
		>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && isSearchListOpened && (
				<SearchList movies={data?.list || []} />
			)}
		</div>
	)
}

export default Search
