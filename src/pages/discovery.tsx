import { GetStaticProps, NextPage } from "next"

import Collections from "@/screens/collections/Collections"
import { ICollection } from "@/screens/collections/collections.types"

import Pagination from "@/ui/pagination/Pagination"
import { usePagination } from "@/ui/pagination/usePagination"

import { GenreService } from "@/services/genre.service"

const DiscoveryPage: NextPage<{ collections: ICollection[] }> = ({
	collections
}) => {
	return (
		<>
			<Collections collections={collections || []} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()

		return {
			props: { collections }
		}
	} catch (e) {
		return {
			props: {},
			revalidate: 60
		}
	}
}

export default DiscoveryPage
