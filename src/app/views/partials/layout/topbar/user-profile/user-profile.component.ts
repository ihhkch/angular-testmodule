// Angular
import { Component, OnInit, Input } from '@angular/core';
// RxJS
//import { Observable } from 'rxjs';
// NGRX
//import { select, Store } from '@ngrx/store';
// State
//import { AppState } from '../../../../../core/reducers';
//import { currentAuthUser, AuthUser, currentUser, Logout, User } from '../../../../../core/auth';
import { MsalService} from "@azure/msal-angular";



@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	// user$: Observable<User>;

	@Input() showAvatar: boolean = true;
	@Input() showHi: boolean = true;
	@Input() showBadge: boolean = false;
	userName: string;

	//user$: Observable<AuthUser>;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private authService: MsalService,
		/*private store: Store<AppState>*/) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		//this.user$ = this.store.pipe(select(currentAuthUser));
		this.userName = this.authService.getUser().name;
	}

	/**
	 * Log out
	 */
	logout() {
		this.authService.logout();
	}
}
