import { FC } from "react"
import * as MaterialIcons from "react-icons/md"

import { useRenderClient } from "@/hooks/useRenderClient"

import { TypeMaterialIconName } from "@/shared/types/icons.types"

export const MaterialIcon: FC<{
	name: TypeMaterialIconName
	className?: string
}> = ({ name, className }) => {
	const { isRenderClient } = useRenderClient()
	const IconComponent = MaterialIcons[name]

	if (isRenderClient) {
		if (IconComponent === undefined) {
			return <MaterialIcons.MdDragIndicator className={className} />
		}
		return <IconComponent className={className} />
	} else {
		return null
	}
}
export default MaterialIcon
