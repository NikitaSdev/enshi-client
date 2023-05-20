import styles from "@/components/Layout/Header/MenuContainer/Menu.module.scss"
import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"
import GenreMenu from "@/components/Layout/Header/MenuContainer/genres/GenreMenu"
import {
	firstMenu,
	mobileMenu
} from "@/components/Layout/Header/MenuContainer/menu.data"

import Menu from "./Menu"

const MenuContainer = () => {
	return (
		<>
			<Menu menu={mobileMenu} />
		</>
	)
}

export default MenuContainer
