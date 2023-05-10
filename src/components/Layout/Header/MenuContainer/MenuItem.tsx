import cn from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import  { FC } from "react"


import styles from "./Menu.module.scss"
import {IMenuItem} from "@/components/Layout/Header/MenuContainer/menu.interface";

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()
	return (
		<li className={cn({ [styles.active]: asPath === item.link })}>
			<Link href={item.link}>
				<a>
					<span>{item.title}</span>
				</a>
			</Link>
		</li>
	)
}

export default MenuItem
