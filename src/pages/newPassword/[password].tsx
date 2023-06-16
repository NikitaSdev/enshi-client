import { useRouter } from "next/router"

import Meta from "@/utils/meta/Meta"

import styles from "./password.module.scss"

const Password = () => {
	const router = useRouter()
	const password =
		typeof router.query.password === "string" ? router.query.password : ""

	return (
		<>
			<Meta title={"Восстановление пароля"} />
			<main className={styles.main}>
				<section className={styles.container}>
					<h1>
						Готово! Пароль <br /> был успешно <span>изменен</span>
					</h1>
					<div>
						<p>
							<span>Новый пароль:</span> {password}
						</p>
					</div>
					<p>
						Если нужна помощь, напишите нам во{" "}
						<a
							href={"https://vk.com/enshii"}
							target={"_blank"}
							rel={"noreferrer"}
						>
							Вконтакте
						</a>
					</p>
					<p>
						На связи 24/7 <br />C уважением команда ENSHI.
					</p>
				</section>
			</main>
		</>
	)
}

export default Password
