import React from "react"

import AdminNavItem from "@/ui/admin/admin-navigation/AdminNavItem"
import { navItems } from "@/ui/admin/admin-navigation/admin-navigation.data"

import styles from "./AdminNavigation.module.scss"

const AdminNavigation = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map((item) => (
					<AdminNavItem item={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
