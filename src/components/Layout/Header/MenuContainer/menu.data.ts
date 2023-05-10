import {IMenu} from "@/components/Layout/Header/MenuContainer/menu.interface";


export const firstMenu: IMenu = {
	title: "Меню",
	items: [
		{
			link: "/",
			title: "Главная"
		},
		{
			link: "/catalog",
			title: "Каталог"
		},
		{
			link: "/top",
			title: "Топ - 100"
		}
	]
}

