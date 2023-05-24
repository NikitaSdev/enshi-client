export const APP_URL = `https://kodikapi.com`
export const API_SERVER_URL = `https://kodikapi.com/`
export const ANILIBRIA_URL = "https://ww.anilibria.org.ru"
export const getGenresUrl = (string: string) => `/genres${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getActorsUrl = (string: string) => `/actor${string}`
export const getMoviesUrl = (page: number) =>
	`/title/search/advanced?query={season.year} > 2016&limit=15&page=${page}`
export const getMoviesList = () =>
	`/list?token=d046caa991d8b228f8d0a1a2f990cce5&with_material_data=true&types=anime-serial&limit=15`
export const getMoviesUrlBySlug = (string: string) =>
	`/search?token=d046caa991d8b228f8d0a1a2f990cce5&id=${string}&with_material_data=true`
export const getMoviesUrlByName = (string: string) =>
	`/title/search?search=${string}`
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
