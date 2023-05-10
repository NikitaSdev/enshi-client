import { IMovie } from "@/shared/types/movie.types"

export interface IHome {
	trendingMovies: IMovie[]
	announcedMovies: IMovie[]
	mainMovie: IMovie
}
