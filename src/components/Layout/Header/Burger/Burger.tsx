import cn from "classnames"
import { FC } from "react"

import MaterialIcon from "@/ui/MaterialIcon"

import styles from "./Burger.module.scss"

const Burger: FC<{ onClick: () => void; active: boolean }> = ({
	onClick,
	active
}) => {
	return (
		<div
			className={cn(styles.burger, { [styles.active]: !active })}
			onClick={onClick}
		>
			<span />
			<span />
			<span />
		</div>
	)
}

export default Burger
