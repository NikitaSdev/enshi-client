import Image from "next/image"
import Link from "next/link"

import logoImage from "@/assets/images/logo.svg"

import styles from "./Logo.module.scss"

const Logo = () => {
	return (
		<Link href={"/"}>
			<a>
				<Image
					src={logoImage}
					alt={"Home"}
					draggable={false}
					width={129}
					height={33}
					className={styles.logo}
				/>
			</a>
		</Link>
	)
}

export default Logo
