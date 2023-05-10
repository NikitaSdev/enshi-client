import React, { FC } from "react"

import LogoutButton from "@/components/Layout/Header/MenuContainer/Auth/LogoutButton"
import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"

import { useAuth } from "@/hooks/useAuth"

import { getAdminHomeUrl } from "../../../../../config/url.config"

const AuthItems: FC = () => {
	const { user } = useAuth()

	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							link: "/profile",
							title: "Профиль"
						}}
					/>
					<LogoutButton />
				</>
			) : (
				<>
					<MenuItem
						item={{
							link: "/AuthPage",
							title: "Войти"
						}}
					/>
				</>
			)}
			{user?.isAdmin && (
				<MenuItem
					item={{
						link: getAdminHomeUrl(),
						title: "Admin panel"
					}}
				/>
			)}
		</>
	)
}

export default AuthItems
