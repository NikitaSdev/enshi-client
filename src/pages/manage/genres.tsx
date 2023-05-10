import React from "react"

import GenreList from "@/screens/admin/genres/GenreList"

import { NextPageAuth } from "@/shared/types/auth.types"

const GenresPage: NextPageAuth = () => {
	return <GenreList />
}
GenresPage.isOnlyAdmin = true
export default GenresPage
