import React from "react"

import Meta from "@/utils/meta/Meta"

const Activate = () => {
	return (
		<>
			<Meta
				title={"Аккаунт активирован"}
				description={"Активация аккаунта"}
			></Meta>
			<main style={{ marginTop: 186 }}>
				<h1
					className={"text-center"}
					style={{ fontSize: "2rem", fontWeight: 600 }}
				>
					Поздравляем ваш аккаунт успешно подтвержден!
				</h1>
			</main>
		</>
	)
}

export default Activate
