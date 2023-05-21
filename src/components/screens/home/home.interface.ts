import { IBanner } from "@/ui/mainBanner/MainBanner"

import { IMovie, IMovieList } from "@/shared/types/movie.types"

export interface IHome {
	trendingMovies: IMovie[]
	announcedMovies: IMovie[]
}
