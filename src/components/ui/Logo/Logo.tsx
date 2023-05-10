import Image from "next/image"
import Link from "next/link"

import logoImage from "@/assets/images/logo.svg"

import styles from "./Logo.module.scss"

const Logo = () => {
	return (
		<Link href={"/"}>
			<a className={styles.logo}>
				<Image
					src={logoImage}
					alt={"Home"}
					draggable={false}
					width={129}
					height={33}
				/>
			</a>
		</Link>
	)
}

export default Logo
