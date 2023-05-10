import { TypeMaterialIconName } from "@/shared/types/icons.types"

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface IActor {
	_id: string
	name: string

	slug: string

	photo: string
	countMovies: number
}
export interface IParameters {
	year: number

	duration: number

	country: string
}
export interface IMovieList {
	list: Array<IMovie>
}

export interface IMovie {
	list: Array<any>
	id: string
	poster: string
	bigPoster: string
	posters: any
	description: string
	names: { [key: string]: string }
	name: string
	videoUrl: string
	link: string
}
