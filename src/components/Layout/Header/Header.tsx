import { useState } from "react"

import Burger from "@/components/Layout/Header/Burger/Burger"
import { firstMenu } from "@/components/Layout/Header/MenuContainer/menu.data"
import MobileMenu from "@/components/Layout/Header/MobileMenu/MobileMenu"
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
				<div className={styles.container}>
					<Search />
					<Profile />
					<Burger
						onClick={() => setIsMenuOpened((prev) => !prev)}
						active={isMenuOpened}
					/>
				</div>
			</div>
			<MobileMenu active={isMenuOpened} />
		</header>
	)
}

export default Header
