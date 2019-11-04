// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';

import { MsalService } from "@azure/msal-angular";

import {
	AuthNoticeService,
	Login,
	currentAuthUser,
	AuthUser
} from "../../../../core/auth";

const DEMO_PARAMS = {
	EMAIL: 'kch@kch.cl',
	PASSWORD: 'kch'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		// private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private authService: MsalService
	) {
		this.unsubscribe = new Subject();
	}


	ngOnInit(): void {

		if (this.authService.getUser()) {
			this.router.navigateByUrl('/dashboard');
		}
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		});


	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	login() {
		this.authNoticeService.setNotice(null);
		this.authService
			.loginPopup()
			.then(payload => {
				this.store.dispatch(new Login({ authToken: payload }));
				this.store.pipe(select(currentAuthUser)).subscribe((response: AuthUser) => {
					if (response != null) {
						if (response.profile.id !== 1 &&
							response.profile.id !== 2 &&
							response.profile.id !== 3) {
							this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_GRANT'), 'danger');
							this.router.navigateByUrl('/login');
						} else {
							this.router.navigateByUrl('/dashboard');
						}
					}
				});
			})
			.catch(err => {
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
			});

	}
}
