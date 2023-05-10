import Catalog from "@/ui/catalog-movies/Catalog"
import Pagination from "@/ui/pagination/Pagination"
import { usePagination } from "@/ui/pagination/usePagination"

const FreshPage = () => {
	const { isLoading, page, movies, setPage, scrollToTop } =
		usePagination("movies")
	return (
		!isLoading &&
		movies && (
			<>
				<Catalog
					movies={movies}
					title={"Новинки"}
					description={"Коллекция новых фильмов на сайте"}
				/>
				<Pagination
					movies={movies}
					page={page}
					setPage={setPage}
					scrollToTop={scrollToTop}
				/>
			</>
		)
	)
}

// export const getStaticProps: GetStaticProps = async () => {
// 	try {
// 		const { data: movies } = await MovieService.getAll()
// 		return {
// 			props: {
// 				movies
// 			},
// 			revalidate: 60
// 		}
// 	} catch (error) {
// 		return {
// 			notFound: true
// 		}
// 	}
// }
export default FreshPage
