// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// RxJS
import { Subscription, Observable } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuConfigService, PageConfigService } from '../../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../../core/_config/demo1/layout.config';
import { MenuConfig } from '../../../../core/_config/demo1/menu.config';
import { PageConfig } from '../../../../core/_config/demo1/page.config';
// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { Profile, currentProfile, isProfileLoaded, AuthNoticeService, ProfileRequested, currentAuthUser, AuthUser, Login, MenuLoaded } from '../../../../core/auth';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserReport } from '../../../../shared/models/user-report';
import { currentMenu } from '../../../../core/auth';
import { QueryResultsModel } from '../../../../core/_base/crud';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
	// Public constructor
	selfLayout: string;
	asideDisplay: boolean;
	asideSecondary: boolean;
	subheaderDisplay: boolean;

	loggedIn: boolean;

	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	// private currentUserPermissions$: Observable<Permission[]>;


	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param menuConfigService: MenuConfifService
	 * @param pageConfigService: PageConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private pageConfigService: PageConfigService,
		private htmlClassService: HtmlClassService,
		private store: Store<AppState>,
		private permissionsService: NgxPermissionsService,
		private authService: MsalService,
		private router: Router,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private authServiceCustom: AuthService,) {
		// this.loadRolesWithPermissions();

		this.loadUser();

		// register configs by demos
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);

		this.store.pipe(select(currentMenu)).subscribe((response: any) => {
			if (typeof response !== undefined && response.isAllMenuLoaded) {
				this.menuConfigService.loadConfigs(new MenuConfig().configs(response.menu));
			}
		});

		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);

		// setup element classes
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const layoutSubdscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubdscription);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');

		// let the layout type change
		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(layoutConfigSubscription);

		this.loadMenu();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/**
	 * NGX Permissions, init roles
	 */
	// loadRolesWithPermissions() {
	// 	this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
	// 	const subscr = this.currentUserPermissions$.subscribe(res => {
	// 		if (!res || res.length === 0) {
	// 			return;
	// 		}

	// 		this.permissionsService.flushPermissions();
	// 		res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
	// 	});
	// 	this.unsubscribe.push(subscr);
	// }

	loadUser() {
		const user = this.authService.getUser();
		if (user) {
			this.store.dispatch(new Login({ authToken: user.idToken.toString() }));

			this.store
				.pipe(select(currentAuthUser))
				.subscribe((response: AuthUser) => {
					if (response != null) {
						if (response.profile.id !== 1 &&
							response.profile.id !== 2 &&
							response.profile.id !== 3) {
							this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_GRANT'), 'danger');
							this.router.navigateByUrl('/login');
						}
					}
				});
			this.loggedIn = true;
		} else {
			this.loggedIn = false;
		}
	}

	loadMenu() {
		const user = this.authService.getUser();
		if (this.loggedIn) {
			this.authServiceCustom.getCurrentReports().subscribe(
				(result: UserReport[]) => {
					this.store.dispatch(new MenuLoaded({ menu: result }));
				},
				err => {
				}
			);
		}
	}

}
