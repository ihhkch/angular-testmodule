import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserReport } from '../../../shared/models/user-report';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { MenuLoaded } from '../../../core/auth';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	reportsReady = false;
	serviceError = false;
	reportList: UserReport[] = [];
	menuSociety: string;
	reportsIds = environment.id_reports;

	showLoadReport = false;
	showOperationlPracticesReport = false;
	showRoadReport = false;
	showMonitoringReport = false;
	showOloaReport = false;
	showEsaReport = false;






	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>,
	) {
	}

	ngOnInit(): void {
		this.loadMenu();
	}

	loadMenu() {
		this.authService.getCurrentReports().subscribe(
			(result: UserReport[]) => {
				this.reportList = result;
				this.store.dispatch(new MenuLoaded({ menu: result }));
				this.reportsReady = true;
				if (result.some(report => report.idSociety == 'KCH')) {
					this.menuSociety = 'KCH';
				}
				else if (result.some(report => report.idSociety == 'KRCC')) {
					this.menuSociety = 'KRCC';
				}
				result.forEach(societyReports => {
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.load_report)) {
						this.showLoadReport = true;
					}
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.operational_practices_report)) {
						this.showOperationlPracticesReport = true;
					}
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.road_report)) {
						this.showRoadReport = true;
					}
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.monitoring_report)) {
						this.showMonitoringReport = true;
					}
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.oloa_report)) {
						this.showOloaReport = true;
					}
					if (societyReports.reports.some(report => report.idReport == this.reportsIds.esa_report)) {
						this.showEsaReport = true;
					}
				});
			},
			err => {
				this.serviceError = true;
				this.reportsReady = true;
			}
		);
	}


	redirectToReport(idReport: number) {

		switch (idReport) {
			case environment.id_reports.load_report:
				this.router.navigateByUrl('dashboard/load-report/' + idReport);
				break;
			case environment.id_reports.operational_practices_report:
				this.router.navigateByUrl('dashboard/operational-practices-report');
				break;
			case environment.id_reports.road_report:
				this.router.navigateByUrl('dashboard/road-condition-report');
				break;
			case environment.id_reports.monitoring_report:
				this.router.navigateByUrl('dashboard/monitoring-report');
				break;
			case environment.id_reports.oloa_report:
				this.router.navigateByUrl('dashboard/oloa-report');
				break;
			case environment.id_reports.esa_report:
				this.router.navigateByUrl('dashboard/esa-report');
				break;
			default:
				break;
		}

	}
}
