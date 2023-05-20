import Heading from "@/ui/heading/Heading"

import Meta from "@/utils/meta/Meta"

export default function Error500() {
	return (
		<>
			<Meta title={"Страница не найдена"}>
				<Heading title={"505 - Ошибка на сервере"} />
			</Meta>
			<div className={"text-3xl text-white text-center "}>
				505 - Ошибка на сервере 123
			</div>
		</>
	)
}
