import React from "react"
import { useSelector } from "react-redux"

import MaterialIcon from "@/ui/MaterialIcon"

import Meta from "@/utils/meta/Meta"

import styles from "./Profile.module.scss"

const Profile = () => {
	const user = useSelector((state) => state.user)
	return (
		<>
			<Meta title={"Профиль"}></Meta>
			<main>
				<section
					className={styles.banner}
					style={{
						background: `url(${user.user.wrapperURL})`,
						backgroundPosition: "center",
						backgroundSize: "cover"
					}}
				>
					<div className={styles.bannerContainer}>
						<div className={styles.user}>
							<img
								className={styles.avatar}
								src={user.user.avatarUrl}
								alt={user.user.login}
							/>
							<div>
								<h3>{user.user.pseudonim}</h3>
								<p>Новичок</p>
							</div>
						</div>
						<div className={styles.info}>
							<div>
								<h3>7</h3>
								<p>В избранном</p>
							</div>
							<div>
								<h3>32</h3>
								<p>Просмотрено</p>
							</div>
						</div>
						<div className={styles.settings}>
							<MaterialIcon name={"IoSettingsOutline"} />
						</div>
					</div>
				</section>
				<section>
					<h1>Избранное</h1>
				</section>
				<section>
					<h1>Недавно просмотренные</h1>
				</section>
			</main>
		</>
	)
}

export default Profile
