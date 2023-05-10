import { FC } from "react"



import styles from "./Layout.module.scss"
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

const Layout: FC = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<Header/>
				<div className={styles.center}>{children}</div>
				<Footer/>
			</div>
		</>
	)
}

export default Layout
