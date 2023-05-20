import Image from "next/image"
import React from "react"

import styles from "./Footer.module.scss"
import telegram from "./telegram.svg"
import vk from "./vk.svg"
import youtube from "./youtube.svg"

const Logos = () => {
	return (
		<div className={styles.logos}>
			<Image src={vk} height={22} />
			<Image src={telegram} height={29} />
			<Image src={youtube} height={24} />
		</div>
	)
}
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<Logos />
				<div className={styles.nav}>
					<a href={"/"}>
						<p>Правообладателям</p>
					</a>
					<a href={"/"}>
						<p>Сотрудничество</p>
					</a>
					<a href={"/"}>
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
