import { IBanner } from "@/ui/mainBanner/MainBanner"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

export interface IHome {
	list: IMovie[]
	ratingsMovies: IMovie[]
	recommendedMovies: IMovie[]
	trendingMovies: IMovie[]
	announcedMovies: IMovie[]
}
