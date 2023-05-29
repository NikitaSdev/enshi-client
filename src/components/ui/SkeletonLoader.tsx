import { height, width } from "@mui/system"
import cn from "classnames"
import dynamic from "next/dynamic"
import React, { FC } from "react"
import Skeleton, { SkeletonProps } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const SkeletonLoader: FC<SkeletonProps> = ({
	className,
	width,
	height,
	...rest
}) => {
	return (
		<Skeleton
			{...rest}
			baseColor={"#1F2125"}
			highlightColor={"#292a2e"}
			width={width}
			height={height}
			className={cn("rounded-br-xl", className)}
		/>
	)
}

export default SkeletonLoader
