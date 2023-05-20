import cn from "classnames"
import { FC, RefObject, useEffect, useState } from "react"

import MenuItem from "@/components/Layout/Header/MenuContainer/MenuItem"

import MenuContainer from "../MenuContainer/MenuContainer"
import Search from "../Search/Search"

import styles from "./MobileMenu.module.scss"

const MobileMenu: FC<{ active: boolean }> = ({ active }) => {
	return (
		<div
			className={cn(styles.menu, {
				[styles.active]: !active
			})}
		>
			<MenuContainer />
		</div>
	)
}

export default MobileMenu
