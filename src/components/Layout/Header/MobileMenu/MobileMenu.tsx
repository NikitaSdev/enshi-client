import cn from "classnames"
import { FC, RefObject, useEffect, useState } from "react"

import MenuContainer from "../MenuContainer/MenuContainer"
import Search from "../Search/Search"

import styles from "./MobileMenu.module.scss"

const MobileMenu: FC<{ active: boolean }> = ({ active }) => {
	const [height, setHeight] = useState(0)
	useEffect(() => {
		setHeight(document.body.scrollHeight)
	}, [])
	return (
		<div
			style={{ height: height }}
			className={cn(styles.menu, {
				[styles.active]: !active
			})}
		>
			<Search className={styles.search} />
			<MenuContainer />
		</div>
	)
}

export default MobileMenu
