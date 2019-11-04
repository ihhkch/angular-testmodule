// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { Store, select } from "@ngrx/store";
import { AppState } from '../../../../core/reducers';
import { currentMenu } from '../../../auth/_selectors/menu.selectors';
import { UserReport } from '../../../../shared/models/user-report';

@Injectable()
export class MenuAsideService {
	// Public properties
	classes: string;
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service Constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 * @param store: Store<AppState>
	 */
	constructor(
		private menuConfigService: MenuConfigService,
		private store: Store<AppState>
	) {
		this.loadMenu();
	}

	/**
	 * Load menu
	 */
	loadMenu() {
		// get menu list
		/*
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		this.menuList$.next(menuItems);*/

		this.store
			.pipe(select(currentMenu))
			.subscribe((response: any) => {
				if (response !== null && response.isAllMenuLoaded) {
					const menuItems: any[] = objectPath.get(
						this.menuConfigService.getMenus(),
						"aside.items"
					);
					this.menuList$.next(menuItems);
				}
			});
	}
}
