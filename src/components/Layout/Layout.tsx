import Script from "next/script"
import { FC } from "react"

import Footer from "@/components/Layout/Footer/Footer"
import Header from "@/components/Layout/Header/Header"

import styles from "./Layout.module.scss"

const Layout: FC = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<Header />
				<div className={styles.center}>{children}</div>
				<Footer />
			</div>
		</>
	)
}

export default Layout
