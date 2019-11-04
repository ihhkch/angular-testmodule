// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { LoadReportComponent } from '../../pages/load-report/load-report.component';
import { EsaReportComponent } from '../../pages/esa-report/esa-report.component';
import { OloaReportComponent } from '../../pages/oloa-report/oloa-report.component';
import { OperationalPracticesReportComponent } from '../../pages/operational-practices-report/operational-practices-report.component';
import { RoadConditionReportComponent } from '../../pages/road-condition-report/road-condition-report.component';
import { CmdicRoadConditionReportComponent } from '../../pages/cmdic-road-condition-report/cmdic-road-condition-report.component';
import { MonitoringReportComponent } from '../../pages/monitoring-report/monitoring-report.component';
// Auth
// import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: '',
				loadChildren: 'app/views/pages/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'load-report/:idReport',
				component: LoadReportComponent
			},
			{
				path: 'operational-practices-report',
				component: OperationalPracticesReportComponent
			},
			{
				path: 'road-condition-report',
				component: RoadConditionReportComponent
			},
			{
				path: 'cmdic/road-condition-report',
				component: CmdicRoadConditionReportComponent
			},
			{
				path: 'monitoring-report',
				component: MonitoringReportComponent
			},
			{
				path: 'esa-report',
				component: EsaReportComponent
			},
			{
				path: 'oloa-report',
				component: OloaReportComponent
			},

			// {
			// 	path: 'builder',
			// 	loadChildren: 'app/views/themes/demo1/content/builder/builder.module#BuilderModule'
			// },
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
