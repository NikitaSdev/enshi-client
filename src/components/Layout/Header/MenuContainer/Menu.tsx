import dynamic from "next/dynamic"
import { FC } from "react"

import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"
import { IMenu } from "@/components/Layout/Header/MenuContainer/menu.interface"

import styles from "./Menu.module.scss"

const DynamicAuthItems = dynamic(
	() => import("../MenuContainer/Auth/AuthItems"),
	{
		ssr: false
	}
)
const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
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
