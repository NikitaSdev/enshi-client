export interface IGalleryItem {
	posters: any
	[x: string]: any
	posterPath: string
	name: string
	link: string
	content?: {
		title: string
		subTitle?: string
	}
}
export interface IGalleryItemProps {
	item: IGalleryItem
	variant: "vertical" | "horizontal"
}
