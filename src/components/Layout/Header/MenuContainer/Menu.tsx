import dynamic from "next/dynamic"
import { FC } from "react"



import styles from "./Menu.module.scss"
import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem";
import {IMenu} from "@/components/Layout/Header/MenuContainer/menu.interface";

const DynamicAuthItems = dynamic(
	() => import("../MenuContainer/Auth/AuthItems"),
	{
		ssr: false
	}
)
const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<div className={styles.menu}>
			<ul className={styles.ul}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link} />
				))}
			</ul>
		</div>
	)
}

export default Menu
