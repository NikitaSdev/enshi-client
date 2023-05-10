import React from "react"

import ActorEdit from "@/screens/admin/actor/ActorEdit"
import GenreEdit from "@/screens/admin/genre/GenreEdit"

import { NextPageAuth } from "@/shared/types/auth.types"

const GenreEditPage: NextPageAuth = () => {
	return <ActorEdit />
}
GenreEditPage.isOnlyAdmin = true
export default GenreEditPage
