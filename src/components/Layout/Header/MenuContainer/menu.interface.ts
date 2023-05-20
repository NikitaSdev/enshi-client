import { TypeMaterialIconName } from "@/shared/types/icons.types"

export interface IMenuItem {
	title: string
	link: string
}

export interface IMenu {
	items: IMenuItem[]
}
