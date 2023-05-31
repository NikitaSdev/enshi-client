import Skeleton from "react-loading-skeleton"

import styles from "./MainBanner.module.scss"

const SkeletonBanner = () => {
	return (
		<div className={styles.skeleton}>
			<Skeleton
				width={"100%"}
				height={593}
				baseColor={"#333238"}
				highlightColor={"#1F1F25"}
				className={styles.background}
			/>
			<div className={styles.container}>
				<div>
					<Skeleton
						width={355}
						height={86}
						baseColor={"#1F1F25"}
						highlightColor={"#333238"}
					/>
					<Skeleton
						width={192}
						height={28}
						baseColor={"#1F1F25"}
						highlightColor={"#333238"}
					/>
				</div>
				<div>
					<Skeleton
						width={355}
						height={86}
						baseColor={"#1F1F25"}
						highlightColor={"#333238"}
					/>
					<Skeleton
						width={192}
						height={28}
						baseColor={"#1F1F25"}
						highlightColor={"#333238"}
					/>
				</div>
			</div>
			<div className={styles.skeletonSlider}>
				<Skeleton
					width={191}
					height={285}
					baseColor={"#1F1F25"}
					highlightColor={"#333238"}
				/>
				<Skeleton
					width={191}
					height={285}
					baseColor={"#1F1F25"}
					highlightColor={"#333238"}
				/>
				<Skeleton
					width={191}
					height={285}
					baseColor={"#1F1F25"}
					highlightColor={"#333238"}
				/>
				<Skeleton
					width={191}
					height={285}
					baseColor={"#1F1F25"}
					highlightColor={"#333238"}
				/>
			</div>
		</div>
	)
}

export default SkeletonBanner
