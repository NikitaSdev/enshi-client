import React, { ChangeEvent, FC } from "react"

import AdminCreateButton from "@/ui/admin/admin-table/AdminHeader/AdminCreateButton"
import SearchField from "@/ui/search-filed/SearchField"

import styles from "./AdminHeader.module.scss"

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	handleSearch,
	searchTerm
}) => {
	return (
		<div className={"flex justify-between"}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}

export default AdminHeader
