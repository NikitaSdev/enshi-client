export const APP_URL = `https://kodikapi.com`
export const API_SERVER_URL = `https://api.anilibria.tv/v3`
export const ANILIBRIA_URL = "https://ww.anilibria.org.ru"
export const getGenresUrl = (string: string) => `/genres${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getActorsUrl = (string: string) => `/actor${string}`
export const getMoviesUrl = (page: number) =>
	`/title/search/advanced?query={season.year} > 2016&limit=15&page=${page}`
export const getMoviesList = () =>
	`/title/search/advanced?query={season.year} > 2016&limit=15`
export const getMoviesUrlBySlug = (string: string) => `/title?code=${string}`
export const getMoviesUrlByName = (string: string) =>
	`/title/search?search=${string}`
export const getSimilar = (genres: Array<string>) =>
	`/title/search/advanced?query= {season.year} == 2020 and {genres[0]} == "${genres[0]}"  or {genres[1]} == "${genres[1]}"&limit=25`

export const getAnnounced = (string: string) =>
	`/title/list?code_list=${string}`
export const getByMovieId = (string: string) => `/title?code=${string}`
export const getRatingsUrl = (string: string) => `/ratings${string}`
