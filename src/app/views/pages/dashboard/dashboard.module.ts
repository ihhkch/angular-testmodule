// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';

import { AuthService } from '../../../shared/services/auth.service';
import { AdInterceptor } from '../../../shared/interceptor/ad-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { menuReducer, MenuEffects } from '../../../core/auth';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		MaterialModule,
		TranslateModule,
		StoreModule.forFeature('menu', menuReducer),
		EffectsModule.forFeature([MenuEffects]),
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AdInterceptor, multi: true
		},
	],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
