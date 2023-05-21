import Image from "next/image"
import Link from "next/link"

import styles from "./SocialBanner.module.scss"
import girl from "./girl.png"
import telegram from "./telegram.svg"
import vk from "./vk.svg"
import youtube from "./youtube.svg"

const SocialBanner = () => {
	return (
		<section className={styles.banner}>
			<div className={styles.bannerContainer}>
				<div className={styles.contentWrapper}>
					<div className={styles.heading}>
						<h1>Cледите за нами в социальных сетях</h1>
						<h3>
							Чтобы быть в курсе последних новостей,
							<br /> и крутых розыгрышей{" "}
						</h3>
					</div>
					<div className={styles.logos}>
						<div>
							<Link href={"https://vk.com/enshii"}>
								<a
									href="https://vk.com/enshii"
									target={"_blank"}
									rel={"noreferrer"}
								>
									<Image draggable={false} src={vk} />
								</a>
							</Link>
							<Link href={""}>
								<Image draggable={false} src={youtube} />
							</Link>
						</div>

						<div>
							<Link href={""}>
								<Image
									draggable={false}
									src={telegram}
									className={styles.telegram}
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.girl}>
					<Image draggable={false} src={girl} />
				</div>
			</div>
		</section>
	)
}

export default SocialBanner
