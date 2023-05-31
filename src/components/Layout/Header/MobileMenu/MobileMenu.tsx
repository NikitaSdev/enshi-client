import cn from "classnames"
import { FC } from "react"

import { useOutsideClick } from "@/components/Layout/Header/useClickOutside"

import MenuContainer from "../MenuContainer/MenuContainer"

import styles from "./MobileMenu.module.scss"

const MobileMenu: FC<{
	active: boolean
	setIsAuthFormOpened: (arg: boolean) => void
}> = ({ active, setIsAuthFormOpened }) => {
	return (
		<div
			className={cn(styles.menu, {
				[styles.active]: !active
			})}
		>
			<MenuContainer setIsAuthFormOpened={setIsAuthFormOpened} />
		</div>
	)
}

export default MobileMenu
