export const APP_URL = `https://kodikapi.com/`
export const API_SERVER_URL = `https://kodikapi.com/`
export const NEST_API = "http://localhost:5000/api"
// export const NEST_API =
// 	"https://9408-2a00-1fa0-c498-2a12-b9fd-ad59-8583-a742.ngrok-free.app/api"
export const getGenresUrl = (string: string) => `/genres${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getActorsUrl = (string: string) => `/actor${string}`
export const getMoviesUrl = (page: number) =>
	`/title/search/advanced?query={season.year} > 2016&limit=15&page=${page}`
export const getMoviesList = (
	genres: Array<{ value: string; label: string }>,
	statuses: Array<{ value: string; label: string }>,
	years: Array<{ value: number; label: number }>
) => {
	const genreFilter =
		genres && genres.length
			? `&genres=${genres.map((item, index) =>
					index === genres.length ? item.value + "," : item.value
			  )}`
			: ""

	const statusFilter =
		statuses && statuses.length
			? `&all_status=${statuses.map((item, index) =>
					index === statuses.length ? item.value + "," : item.value
			  )}`
			: ""
	const yearFilter =
		years && years.length
			? `&year=${years.map((item, index) =>
					index === years.length
						? item.value.toString() + ","
						: item.value.toString()
			  )}`
			: ""

	return `/list?token=d046caa991d8b228f8d0a1a2f990cce5&with_material_data=true&types=anime-serial${statusFilter}${genreFilter}${yearFilter}&limit=15`
}
export const getMovie = () =>
	`/list?token=d046caa991d8b228f8d0a1a2f990cce5&with_material_data=true&types=anime-serial&limit=15`

export const getMoviesUrlBySlug = (string: string) =>
	`/search?token=d046caa991d8b228f8d0a1a2f990cce5&id=${string}&with_material_data=true&strict=true&limit=8`
export const getMoviesUrlByName = (string: string) =>
	`/search?token=d046caa991d8b228f8d0a1a2f990cce5&title=${string}&with_material_data=true&types=anime-serial&limit=100`
export const getSimilar = (genres: Array<string>, year: string) =>
	`/list?token=d046caa991d8b228f8d0a1a2f990cce5&types=anime-serial&anime_genres=${genres.join(
		","
	)}&year=${year}&with_material_data=true`

export const getAnnounced = (string: string) =>
	`/title/list?code_list=${string}`
export const getByMovieId = (string: string) => `/title?code=${string}`
export const getTopList = (string: string) =>
	`/search?token=d046caa991d8b228f8d0a1a2f990cce5&id=${string}&with_material_data=true`
export const getRatingsUrl = (string: string) => `/ratings${string}`
