// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Module reducers and selectors
import { AppState} from '../../../core/reducers/';
import { MenuConfigService } from '../../_base/layout';
import { currentAuthUser } from '../_selectors/auth.selectors';
import { AuthUser } from '../_models/auth.model';

@Injectable()
export class ModuleGuard implements CanActivate {
	constructor(private store: Store<AppState>, private router: Router,
		private menuConfigService: MenuConfigService) {	}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

		if (!route) {
			return of(false);
		}

		const moduleName = route.url[0].path as string;
        if (!moduleName) {
            return of(false);
        }

        return this.store
            .pipe(
                select(currentAuthUser),
                map((auth: AuthUser) => {
					const menus: any = this.menuConfigService.getMenus();
					if (!menus) {
						return false;
					}
                    const _perm = menus.aside.items.find((menu: any) => {
						return menu.page.toLocaleLowerCase() === moduleName.toLocaleLowerCase();
					});
                    return _perm ? true : false;
                }),
                tap(hasAccess => {
                    if (!hasAccess) {
                        this.router.navigateByUrl('/backoffice/error/403');
                    }
                })
            );
    }
}
