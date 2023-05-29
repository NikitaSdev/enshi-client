import { useState } from "react"

import Burger from "@/components/Layout/Header/Burger/Burger"
import { firstMenu } from "@/components/Layout/Header/MenuContainer/menu.data"
import MobileMenu from "@/components/Layout/Header/MobileMenu/MobileMenu"
import Search from "@/components/Layout/Header/Search/Search"
import Logo from "@/components/ui/Logo/Logo"

import SearchField from "@/ui/search-filed/SearchField"

import styles from "./Header.module.scss"
import Menu from "./MenuContainer/Menu"
import Profile, { AuthForm } from "./Profile/Profile"

const Header = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(true)
	const [isAuthFormOpened, setIsAuthFormOpened] = useState(false)
	return (
		<>
			<header className={styles.header}>
				<div>
					<Logo />
					<Menu menu={firstMenu} setIsAuthFormOpened={setIsAuthFormOpened} />
					<div className={styles.container}>
						<Search />
						<Profile setIsAuthFormOpened={setIsAuthFormOpened} />
						<Burger
							onClick={() => setIsMenuOpened((prev) => !prev)}
							active={isMenuOpened}
						/>
					</div>
				</div>
				<MobileMenu
					active={isMenuOpened}
					setIsAuthFormOpened={setIsAuthFormOpened}
				/>
			</header>
			{isAuthFormOpened && (
				<AuthForm setIsAuthFormOpened={() => setIsAuthFormOpened(false)} />
			)}
		</>
	)
}

export default Header
