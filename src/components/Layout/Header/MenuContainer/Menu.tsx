import dynamic from "next/dynamic"
import { FC } from "react"

import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"
import { IMenu } from "@/components/Layout/Header/MenuContainer/menu.interface"
import Profile from "@/components/Layout/Header/Profile/Profile"

import { useAuth } from "@/hooks/useAuth"

import styles from "./Menu.module.scss"

const DynamicAuthItems = dynamic(
	() => import("../MenuContainer/Auth/AuthItems"),
	{
		ssr: false
	}
)
const Menu: FC<{ menu: IMenu; mobile?: boolean }> = ({
	menu: { items },
	mobile
}) => {
	const { user } = useAuth()
	return (
		<div className={styles.menu}>
			<ul className={styles.ul}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link} />
				))}
				{mobile && <Profile />}
			</ul>
		</div>
	)
}

export default Menu
