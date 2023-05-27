import cn from "classnames"
import Image from "next/image"
import React, { FC } from "react"

import SkeletonLoader from "@/ui/SkeletonLoader"
import { useUpload } from "@/ui/form-elements/UploadField/useUpload"
import { IUploadField } from "@/ui/form-elements/form.interface"

import styles from "../Form.module.scss"

const UploadFile: FC<IUploadField> = ({
	onChange,
	error,
	folder,
	placeholder,
	isNoImage = false,
	style,
	value
}) => {
	const { isLoading, uploadImage } = useUpload(onChange, folder)
	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<p className={styles.label}>{placeholder}</p>
			<div className={styles.uploadFlex}>
				<div className={styles.inputContainer}>
					<div>
						<p>Выбрать файл</p>
					</div>
					<label>
						<input type={"file"} onChange={uploadImage} />
						{error && <div className={styles.error}>{error.message}</div>}
					</label>
				</div>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className={"w-full h-full"} />
						) : (
							value && (
								<Image alt={" "} src={value} layout={"fill"} unoptimized />
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadFile
