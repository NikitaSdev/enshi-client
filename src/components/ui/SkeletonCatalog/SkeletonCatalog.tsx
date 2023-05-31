import Skeleton from "react-loading-skeleton"

import styles from "./SkeletonCatalog.module.scss"

const SkeletonGallery = () => {
	const array = new Array(15).fill(1)
	return (
		<div className={styles.skeleton}>
			{array.map(() => (
				<div key={Math.random()}>
					<div className={styles.bigSkeleton}>
						<Skeleton width={200} height={270} baseColor={"#E3E3E3"} />
						<Skeleton
							width={200}
							height={20}
							baseColor={"#E3E3E3"}
							highlightColor={"#F1F1F1"}
							className={styles.rounded}
						/>
					</div>
					<div>
						<Skeleton
							width={200}
							height={17}
							baseColor={"#F1F1F1"}
							highlightColor={"#E3E3E3"}
						/>
						<Skeleton
							width={200}
							height={17}
							baseColor={"#F1F1F1"}
							highlightColor={"#E3E3E3"}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default SkeletonGallery
