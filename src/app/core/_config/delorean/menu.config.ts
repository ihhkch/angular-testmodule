import { UserReport } from "../../../shared/models/user-report";
import { environment } from "../../../../environments/environment";

let redirectToReport = (idReport: number) => {
	let uri = '';

	switch (idReport) {
		case environment.id_reports.load_report:
			uri = './load-report/' + idReport;
			break;
		case environment.id_reports.operational_practices_report:
			uri = './operational-practices-report';
			break;
		case environment.id_reports.road_report:
			uri = './road-condition-report';
			break;
		case environment.id_reports.cmdic_road_report:
			uri = './cmdic/road-condition-report';
			break;
		case environment.id_reports.monitoring_report:
			uri = './monitoring-report';
			break;
		case environment.id_reports.oloa_report:
			uri = './oloa-report';
			break;
		case environment.id_reports.esa_report:
			uri = './esa-report';
			break;
		default:
			break;
	}

	return uri;

};

export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
			]
		},
	};

	public configs(reportList: UserReport[]): any {
		reportList.forEach(report => {
			let submenu = [];
			report.reports.forEach(child => {
				submenu.push(
					{
						title: child.reportName,
						icon: 'timeline',
						page: redirectToReport(child.idReport)
					}
				);
			});
			this.defaults.aside.items.push(
				{
					title: report.societyName,
					root: true,
					icon: 'flaticon2-graph',
					bullet: 'dot',
					submenu: submenu
				}
			);
		});

		return this.defaults;
	}
}
