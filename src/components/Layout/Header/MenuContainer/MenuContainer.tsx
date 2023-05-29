import { FC } from "react"

import styles from "@/components/Layout/Header/MenuContainer/Menu.module.scss"
import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"
import GenreMenu from "@/components/Layout/Header/MenuContainer/genres/GenreMenu"
import {
	firstMenu,
	mobileMenu
} from "@/components/Layout/Header/MenuContainer/menu.data"
import Profile from "@/components/Layout/Header/Profile/Profile"

import Menu from "./Menu"

const MenuContainer: FC<{ setIsAuthFormOpened: (arg: boolean) => void }> = ({
	setIsAuthFormOpened
}) => {
	return (
		<>
			<Menu
				menu={mobileMenu}
				mobile
				setIsAuthFormOpened={setIsAuthFormOpened}
			/>
		</>
	)
}

export default MenuContainer
