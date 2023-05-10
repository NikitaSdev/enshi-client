import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

export default function Error404() {
	return (
		<>
			<Meta title={"Страница не найдена"}>
				<Heading title={"404 - Страница не найдена"} />
			</Meta>
			<div className={"text-3xl text-white text-center "}>
				404 - Страница не найдена
			</div>
		</>
	)
}
