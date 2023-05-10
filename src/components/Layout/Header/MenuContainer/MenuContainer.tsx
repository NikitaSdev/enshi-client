import GenreMenu from "@/components/Layout/Header/MenuContainer/genres/GenreMenu"
import { firstMenu } from "@/components/Layout/Header/MenuContainer/menu.data"

import Menu from "./Menu"

const MenuContainer = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
		</div>
	)
}

export default MenuContainer
