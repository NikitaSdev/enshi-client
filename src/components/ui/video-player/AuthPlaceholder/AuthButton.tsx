import Link from "next/link"

import styles from "./AuthPlaceholder.module.scss"

const AuthButton = () => {
	return (
		<Link href={"/"}>
			<a className={styles.btn}>Sign in</a>
		</Link>
	)
}

export default AuthButton
