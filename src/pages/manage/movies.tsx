import React from "react"

import MovieList from "@/screens/admin/movies/MovieList"

import { NextPageAuth } from "@/shared/types/auth.types"

const MoviesPage: NextPageAuth = () => {
	return <MovieList />
}
MoviesPage.isOnlyAdmin = true
export default MoviesPage
