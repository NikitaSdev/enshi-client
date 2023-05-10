import cn from "classnames"
import { FC } from "react"

import SearchList from "@/components/Layout/Header/Search/SearchList/SearchList"
import { useSearch } from "@/components/Layout/Header/Search/UseSearch"

import SearchField from "@/ui/search-filed/SearchField"

import styles from "./Search.module.scss"

const Search: FC<{ className?: string }> = ({ className }) => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div className={cn(styles.wrapper, className)}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data?.list || []} />}
		</div>
	)
}

export default Search
