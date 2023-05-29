import cn from "classnames"
import { forwardRef } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { IField } from "@/ui/form-elements/form.interface"

import styles from "./Form.module.scss"

const Field = forwardRef<any, IField & { label?: string }>(
	({ placeholder, label, error, type = "text", style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					{label && <p>{label}</p>}
					<input type={type} ref={ref} {...rest} placeholder={placeholder} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)
Field.displayName = "Field"
export default Field
