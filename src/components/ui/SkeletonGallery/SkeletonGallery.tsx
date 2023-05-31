import Skeleton from "react-loading-skeleton"

import styles from "./SkeletonGallery.module.scss"

const SkeletonGallery = () => {
	return (
		<div className={styles.container}>
			<div className={styles.skeleton}>
				<div className={styles.bigSkeleton}>
					<Skeleton count={1} width={200} height={270} baseColor={"#F1F1F1"} />
					<Skeleton
						count={1}
						width={200}
						height={40}
						baseColor={"#E3E3E3"}
						highlightColor={"#F1F1F1"}
						className={styles.rounded}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
				</div>
			</div>
			<div className={styles.skeleton}>
				<div className={styles.bigSkeleton}>
					<Skeleton
						count={1}
						width={200}
						height={270}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={40}
						baseColor={"#E3E3E3"}
						highlightColor={"#F1F1F1"}
						className={styles.rounded}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
				</div>
			</div>
			<div className={styles.skeleton}>
				<div className={styles.bigSkeleton}>
					<Skeleton
						count={1}
						width={200}
						height={270}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={40}
						baseColor={"#E3E3E3"}
						highlightColor={"#F1F1F1"}
						className={styles.rounded}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
				</div>
			</div>
			<div className={styles.skeleton}>
				<div className={styles.bigSkeleton}>
					<Skeleton
						count={1}
						width={200}
						height={270}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={40}
						baseColor={"#E3E3E3"}
						highlightColor={"#F1F1F1"}
						className={styles.rounded}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
				</div>
			</div>
			<div className={styles.skeleton}>
				<div className={styles.bigSkeleton}>
					<Skeleton
						count={1}
						width={200}
						height={270}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={40}
						baseColor={"#E3E3E3"}
						highlightColor={"#F1F1F1"}
						className={styles.rounded}
					/>
				</div>
				<div>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
					<Skeleton
						count={1}
						width={200}
						height={17}
						baseColor={"#F1F1F1"}
						highlightColor={"#E3E3E3"}
					/>
				</div>
			</div>
		</div>
	)
}

export default SkeletonGallery
