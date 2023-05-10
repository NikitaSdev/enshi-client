import React, { MouseEvent } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import { useActions } from "@/hooks/useActions"

import { logout } from "@/store/user/user.actions"

const LogoutButton = () => {
	const { logout } = useActions()

	const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
	}

	return (
		<li>
			<a onClick={logoutHandler}>
				<MaterialIcon name="MdLogout" />
				<span>Выйти</span>
			</a>
		</li>
	)
}
export default LogoutButton
