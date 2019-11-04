// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	HttpClientModule,
	HTTP_INTERCEPTORS
} from '@angular/common/http';
// NgBootstrap
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { LoadReportComponent } from './load-report/load-report.component';
import { OloaReportComponent } from './oloa-report/oloa-report.component';
import { EsaReportComponent } from './esa-report/esa-report.component';

import { AuthService } from '../../shared/services/auth.service';
import { AdInterceptor } from '../../shared/interceptor/ad-interceptor';
import { OloaService } from '../../shared/services/oloa.service';
import { MaterialModule } from '../../shared/material/material.module';
import { RoadConditionService } from '../../shared/services/road-condition.service';
import { GraficoComponent } from './load-report/grafico/grafico.component';
import { FilterPage1Component } from './load-report/filter-page-1/filter-page-1.component';
import { ScorcardComponent } from './load-report/scorcard/scorcard.component';
import { RoadConditionReportComponent } from './road-condition-report/road-condition-report.component';
import { CmdicRoadConditionReportComponent } from './cmdic-road-condition-report/cmdic-road-condition-report.component';
import { OperationalPracticesReportComponent } from './operational-practices-report/operational-practices-report.component';
import { MonitoringReportComponent } from './monitoring-report/monitoring-report.component';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { CustomDateAdapter } from '../../shared/date-adapter/custom-date-adapter';
import { OperationalPracticesService } from '../../shared/services/operational-practices.service';

@NgModule({
	declarations: [
		LoadReportComponent,
		OloaReportComponent,
		EsaReportComponent,
		GraficoComponent,
		// FiltrosComponent,
		FilterPage1Component,
		RoadConditionReportComponent,
		CmdicRoadConditionReportComponent,
		OperationalPracticesReportComponent,
		MonitoringReportComponent,
		ScorcardComponent
	],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		MaterialModule,
		PartialsModule,
		TranslateModule.forChild(),
	],
	providers: [
		AuthService,
		OloaService,
		RoadConditionService,
		OperationalPracticesService,
		{ provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
		{ provide: DateAdapter, useClass: CustomDateAdapter },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AdInterceptor,
			multi: true
		},
	]
})
export class PagesModule {
}
