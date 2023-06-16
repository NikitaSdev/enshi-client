import React from "react"

import Profile from "@/screens/profile/Profile"

import { NextPageAuth } from "@/shared/types/auth.types"

import Meta from "@/utils/meta/Meta"

const ProfilePage: NextPageAuth = () => {
	return (
		<>
			<Meta title={"Профиль"} description={"Профиль"} />
			<Profile />
		</>
	)
}
ProfilePage.isOnlyUser = true
export default ProfilePage
