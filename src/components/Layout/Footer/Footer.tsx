import Image from "next/image"
import React from "react"

import styles from "./Footer.module.scss"
import telegram from "./telegram.svg"
import vk from "./vk.svg"
import youtube from "./youtube.svg"

const Logos = () => {
	return (
		<div className={styles.logos}>
			<a href="https://vk.com/enshii" target={"_blank"} rel="noreferrer">
				<Image src={vk} height={22} />
			</a>
			{/*<Image src={telegram} height={29} />*/}
			{/*<Image src={youtube} height={24} />*/}
		</div>
	)
}
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<Logos />
				<div className={styles.nav}>
					<a
						href={"https://vk.com/topic-168163353_49354344"}
						target={"_blank"}
						rel="noreferrer"
					>
						<p>Правообладателям</p>
					</a>

					<a href={"mailto:enshi-ru@mail.ru"}>
						<p>Служба поддержки</p>
					</a>
				</div>
				<div className={styles.copyright}>
					<p>© 2023 Enshi.com.</p>
					<p> Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
