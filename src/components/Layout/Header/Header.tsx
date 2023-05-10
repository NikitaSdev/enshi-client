import { useState } from "react"

import { firstMenu } from "@/components/Layout/Header/MenuContainer/menu.data"
import Search from "@/components/Layout/Header/Search/Search"
import Logo from "@/components/ui/Logo/Logo"

import styles from "./Header.module.scss"
import Menu from "./MenuContainer/Menu"
import Profile from "./Profile/Profile"

const Header = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(true)

	return (
		<header className={styles.header}>
			<div>
				<Logo />
				<Menu menu={firstMenu} />
				<div className={"flex gap-10"}>
					<Search />
					<Profile />
				</div>
			</div>
			{/*<Burger*/}
			{/*	onClick={() => setIsMenuOpened((prev) => !prev)}*/}
			{/*	active={isMenuOpened}*/}
			{/*/>*/}
			{/*<MobileMenu active={isMenuOpened} />*/}
		</header>
	)
}

export default Header
