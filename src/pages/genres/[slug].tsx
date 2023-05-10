import { GetStaticPaths, GetStaticProps, NextPage } from "next"

import Catalog from "@/ui/catalog-movies/Catalog"
import Pagination from "@/ui/pagination/Pagination"
import { useGenrePagination } from "@/ui/pagination/useGenrePagination"

import { IGenre, IMovie } from "@/shared/types/movie.types"

import { GenreService } from "@/services/genre.service"

import Error404 from "../404"

interface IGenrePage {
	movies: IMovie[]
	genre: IGenre
}
const GenrePage: NextPage<IGenrePage> = ({ genre }) => {
	const { isLoading, page, movies, setPage, scrollToTop } = useGenrePagination(
		genre._id
	)

	console.log(movies, genre._id)
	return genre ? (
		<>
			<Catalog
				movies={movies || []}
				title={genre.name}
				description={genre.description}
			/>
			<Pagination
				setPage={setPage}
				movies={movies}
				page={page}
				scrollToTop={scrollToTop}
			/>
		</>
	) : (
		<Error404 />
	)
}
export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()
		const paths = genres.map((g) => ({
			params: { slug: g.slug }
		}))
		return { paths, fallback: "blocking" }
	} catch (e) {
		return {
			paths: [],
			fallback: false
		}
	}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug))
		return {
			props: {
				genre
			},
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}
export default GenrePage
