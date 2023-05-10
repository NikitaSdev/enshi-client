import { useQuery } from "react-query"

import { useAuth } from "@/hooks/useAuth"

import { UsersService } from "@/services/users.service"

export const useFavorites = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: favoritesMovies,
		refetch
	} = useQuery("Favourite movies", () => UsersService.getFavourites(), {
		select: ({ data }) => data,
		enabled: !!user
	})

	return { isLoading, favoritesMovies, refetch }
}
