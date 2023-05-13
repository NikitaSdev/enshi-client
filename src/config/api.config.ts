export const APP_URL = `https://kodikapi.com`
export const API_SERVER_URL = `https://api.anilibria.tv/v3`
export const ANILIBRIA_URL = "https://ww.anilibria.org.ru"
export const getGenresUrl = (string: string) => `/genres${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getActorsUrl = (string: string) => `/actor${string}`
export const getMoviesUrl = (string: string) =>
	`/title/search/advanced?query={season.year} > 2016&limit=15`
export const getMoviesUrlBySlug = (string: string) =>
	`/title/search?search=${string}`
export const getAnnounced = (string: string) =>
	`/title/list?code_list=${string}`
export const getByMovieId = (string: string) => `/title?code=${string}`
export const getRatingsUrl = (string: string) => `/ratings${string}`
