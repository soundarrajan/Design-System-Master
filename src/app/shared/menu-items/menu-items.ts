import { Injectable } from '@angular/core';

export interface BadgeItem {
	type: string;
	value: string;
}

export interface ChildrenItems {
	state: string;
	target?: boolean;
	type?: string;
	children?: ChildrenItems[];
	subIcon?: string;
	TenantId: number;
	IsPowerBI: boolean;
	ParentProduct: any;
	ModuleId: number;
	ParentMenuId: any;
	MenuUrl: string;
	MenuItemName?: string;
	ModuleDisplayName?: string;
	MainMenuDisplayName?: string;
	MenuItemId: number;
	IsVisible: boolean;
	ModuleName: string
}

export interface MainMenuItems {
	state: string;
	main_state?: string;
	target?: boolean;
	//name: string;
	type: string;
	icon?: string;
	description?: string;
	badge?: BadgeItem[];
	children?: ChildrenItems[];
	ModuleId: number;
	ModuleName: string;
	MenuItemName?: string;
	MainMenuDisplayName?: string;
	ModuleDisplayName?: string;
	ModuleUrl: string;
	IsVisible: boolean;
	ModuleOrder?: number;
	TenantId: number;
}

export interface Menu {
	// label: string;
	main: MainMenuItems[];
}



@Injectable()
export class MenuItems {
	// getAll(): Menu[] {
	// 	return MENUITEMS;
	// }

	/*add(menu: Menu) {
	  MENUITEMS.push(menu);
	}*/
}
