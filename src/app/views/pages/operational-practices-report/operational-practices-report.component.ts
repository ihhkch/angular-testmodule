import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';

import { OperationalPracticesService } from '../../../shared/services/operational-practices.service';
import { BrakeFilters } from '../../../shared/models/brakeFilters';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'kt-operational-practices-report',
	templateUrl: './operational-practices-report.component.html',
	styleUrls: ['./operational-practices-report.component.scss']
})
export class OperationalPracticesReportComponent implements OnInit {

	serviceBrakeEndDate = new Date();
	serviceBrakeStartDate = new Date();
	parkingBrakeEndDate = new Date();
	parkingBrakeStartDate = new Date();

	serviceBrakeFilters = new BrakeFilters();
	parkingBrakeFilters = new BrakeFilters();

	selectedServiceWorkShift: string;
	selectedServiceGroup: string;
	selectedServiceWorker: string;
	selectedServiceSpeed: string;
	selectedParkingWorkShift: string;
	selectedParkingGroup: string;
	selectedParkingWorker: string;
	selectedParkingSpeed: string;

	loadingServiceFilters = true;
	loadingParkingFilters = true;

	serviceBrakeBySpeedData: any;
	serviceBrakeByLocationData: any = '';
	parkingBrakeBySpeedData: any;
	parkingBrakeByLocationData: any = '';

	loadingServiceBrakeByDay = true;
	loadingServiceBrakeByGroup = true;
	loadingServiceBrakeByWorkShift = true;
	loadingServiceBrakeBySpeed = true;
	loadingServiceBrakeByLocation = true;
	loadingParkingBrakeByDay = true;
	loadingParkingBrakeByGroup = true;
	loadingParkingBrakeByWorkShift = true;
	loadingParkingBrakeBySpeed = true;
	loadingParkingBrakeByLocation = true;

	brakeServiceByWorkShiftChart: any;
	brakeServiceByGroupChart: any;
	brakeServiceByDayChart: any;
	brakeParkingByWorkShiftChart: any;
	brakeParkingByGroupChart: any;
	brakeParkingByDayChart: any;

	serviceDataSource = new MatTableDataSource<any>();
	serviceDisplayedColumns: string[] = ['index', 'worker', 'caex', 'speed', 'total', '20', '2030', '3040', '4050', '50'];
	brakeServiceMaxValues: any;
	parkingDataSource = new MatTableDataSource<any>();
	parkingDisplayedColumns: string[] = ['index', 'worker', 'caex', 'speed', 'total', '16', '1624', '2432', '32'];
	brakeParkingMaxValues: any;

	loadedParkingBrakeTab = false;

	rgbaYellow: string = 'rgba(244,180,0,0.9)';
	rgbaGreen: string = 'rgba(21,151,31,0.9)';
	rgbaBlue: string = 'rgba(49,109,163,0.9)';
	rgbaRed: string = 'rgba(220, 53, 69, 0.9)';
	miningGroups: string[] = ['G1', 'G2', 'G3', 'G4'];
	workShifts: string[] = ['D', 'N'];

	survey: string;

	constructor(
		private operationalPracticesService: OperationalPracticesService,
		private translate: TranslateService,
		private authService: AuthService,
	) {
		// If KCH reports are not visited (road condition, load and operationol practices)
		// sets language to 'es'
		let visitedKchReports = localStorage.getItem('visited-kch-reports');
		if (!visitedKchReports) {
			this.translate.use('es');
			localStorage.setItem('language', 'es');
			localStorage.setItem('visited-kch-reports', 'es');
		}
	}

	ngOnInit() {
		this.serviceBrakeEndDate.setDate(this.serviceBrakeEndDate.getDate() - 1);
		this.serviceBrakeStartDate.setDate(this.serviceBrakeStartDate.getDate() - 8);
		this.parkingBrakeEndDate.setDate(this.parkingBrakeEndDate.getDate() - 1);
		this.parkingBrakeStartDate.setDate(this.parkingBrakeStartDate.getDate() - 8);
		chartOptions.LineByDay.scales.yAxes[0].scaleLabel.labelString = this.translate.instant('OPERATIONAL_PRACTICES.NUMBER_OF_EVENTS');
		this.loadSurvey();
	}

	loadSurvey() {
		this.authService.getCurrentReports().subscribe(
			reports => {
				let reportsBySociety = reports.filter(report => report.idSociety == 'KCH');
				let selectedReport = reportsBySociety[0].reports.filter(report => report.idReport == environment.id_reports.operational_practices_report);
				if (selectedReport[0]['surveys']) {
					this.survey = selectedReport[0]['surveys'];
				}
			}
		);
	}

	goToSurvey() {
		window.open(this.survey);
	}

	ngAfterViewInit() {
		this.loadServiceBrakeFilters();
		this.loadServiceBrakeData();
	}

	get titleFilters(): Observable<string> {
		if (this.translate) {
			const filters: any = this.translate.get('ROAD_CONDITION.FILTERS');
			return filters;
		}
		return of('');
	}

	onLinkClick(event: MatTabChangeEvent) {
		if (event.index === 1 && this.loadedParkingBrakeTab === false) {
			this.loadParkingBrakeFilters();
			this.loadParkingBrakeData();
			this.loadedParkingBrakeTab = true;
		}
	}

	loadServiceBrakeFilters() {
		this.loadingServiceFilters = true;
		this.operationalPracticesService.getServiceBrakeOptions(this.getServiceStartDate(), this.getServiceEndDate()).subscribe(
			filters => {
				this.serviceBrakeFilters = filters;
				this.loadingServiceFilters = false;
			}, err => {
				this.loadingServiceFilters = false;
			}
		);
	}

	loadServiceBrakeData() {
		this.loadingServiceBrakeByDay = this.loadingServiceBrakeByGroup = this.loadingServiceBrakeByWorkShift = this.loadingServiceBrakeBySpeed = this.loadingServiceBrakeByLocation = true;
		let sd = this.getServiceStartDate();
		let ed = this.getServiceEndDate();
		let sws = this.selectedServiceWorkShift;
		let sg = this.selectedServiceGroup;
		let sw = this.selectedServiceWorker;
		let ss = this.selectedServiceSpeed;
		this.operationalPracticesService.getServiceEventsByDay(sd, ed, sws, sg, sw, ss).subscribe(
			response => {
				if (this.brakeServiceByDayChart instanceof Chart) {
					this.brakeServiceByDayChart.destroy();
				}
				this.brakeServiceByDayChart = null;
				this.miningGroups.forEach(group => {
					if (!response.data[group]) {
						response.data[group] = [];
					}
				});
				let _colorByGroup = {
					G1: this.rgbaYellow,
					G2: this.rgbaGreen,
					G3: this.rgbaBlue,
					G4: this.rgbaRed,
				};
				let _datasets = [];
				this.miningGroups.forEach(group => {
					_datasets.push({
						label: group,
						data: response.data[group],
						fill: false,
						borderColor: _colorByGroup[group]
					});
				});
				this.brakeServiceByDayChart = new Chart('brakeServiceByDayChart', {
					type: 'line',
					data: { datasets: _datasets },
					options: chartOptions.LineByDay
				});
				this.loadingServiceBrakeByDay = false;
			}, err => {
				this.loadingServiceBrakeByDay = false;
			}
		);
		this.operationalPracticesService.getServiceEventsByGroup(sd, ed, sws, sg, sw, ss).subscribe(
			response => {
				if (this.brakeServiceByGroupChart instanceof Chart) {
					this.brakeServiceByGroupChart.destroy();
				}
				this.brakeServiceByGroupChart = null;
				let _colors = [this.rgbaYellow, this.rgbaGreen, this.rgbaBlue, this.rgbaRed];
				let _values = [];
				this.miningGroups.forEach(group => {
					let value = response.data[group] ? response.data[group] : 0;
					_values.push(value);
				});
				this.brakeServiceByGroupChart = new Chart('brakeServiceByGroupChart', {
					type: 'horizontalBar',
					data: {
						labels: this.miningGroups,
						datasets: [{
							label: this.translate.instant('OPERATIONAL_PRACTICES.EVENTS'),
							data: _values,
							backgroundColor: _colors,
							borderWidth: 0
						}],
					},
					options: chartOptions.BarByGroups
				});
				this.loadingServiceBrakeByGroup = false;
			}, err => {
				this.loadingServiceBrakeByGroup = false;
			}
		);
		this.operationalPracticesService.getServiceEventsByWorkShift(sd, ed, sws, sg, sw, ss).subscribe(
			response => {
				if (this.brakeServiceByWorkShiftChart instanceof Chart) {
					this.brakeServiceByWorkShiftChart.destroy();
				}
				this.brakeServiceByWorkShiftChart = null;
				let _colors = [this.rgbaYellow, this.rgbaRed];
				let _values = [];
				this.workShifts.forEach(workshift => {
					let value = response.data[workshift] ? response.data[workshift] : 0;
					_values.push(value);
				});
				this.brakeServiceByWorkShiftChart = new Chart('brakeServiceByWorkShiftChart', {
					type: 'horizontalBar',
					data: {
						labels: this.workShifts,
						datasets: [{
							label: this.translate.instant('OPERATIONAL_PRACTICES.EVENTS'),
							data: _values,
							backgroundColor: _colors,
							borderWidth: 0
						}]
					},
					options: chartOptions.BarByWorkshift
				});
				this.loadingServiceBrakeByWorkShift = false;
			}, err => {
				this.loadingServiceBrakeByWorkShift = false;
			}
		);
		this.operationalPracticesService.getServiceEventsBySpeed(sd, ed, sws, sg, sw, ss).subscribe(
			response => {
				this.serviceBrakeBySpeedData = response.data;
				this.serviceDataSource.connect().next(response.data);
				this.brakeServiceMaxValues = this.getBrakeServiceMaxValues(response.data);
				this.loadingServiceBrakeBySpeed = false;
			}, err => {
				this.loadingServiceBrakeBySpeed = false;
			}
		);
		this.operationalPracticesService.getServiceEventsByLocation(sd, ed, sws, sg, sw, ss).subscribe(
			response => {
				this.serviceBrakeByLocationData = response;
				this.serviceBrakeByLocationData.titles = ['<20', '20-30', '30-40', '40-50', '>50'];
				this.loadingServiceBrakeByLocation = false;
			}, err => {
				this.loadingServiceBrakeByLocation = false;
			}
		);
	}

	public getServiceEventsCellBgColorByValue(value: number, column: string) {
		if (value === 0) {
			return 'transparent';
		}
		let maxValue = this.brakeServiceMaxValues[column];
		let opacity = value / maxValue;
		return `rgba(${COLORS_SERVICE_EVENTS[column].join(',')},${opacity})`;
	}

	getBrakeServiceMaxValues(dataset) {
		let maxValues = {
			rng20: 0,
			rng2030: 0,
			rng3040: 0,
			rng4050: 0,
			rng50: 0
		};
		dataset.forEach(row => {
			Object.keys(maxValues).forEach(col => {
				if (row[col] > maxValues[col]) {
					maxValues[col] = row[col];
				}
			});
		});
		return maxValues;
	}

	getServiceStartDate() {
		return this.serviceBrakeStartDate.toISOString().substring(0, 10);
	}

	getServiceEndDate() {
		return this.serviceBrakeEndDate.toISOString().substring(0, 10);
	}

	getServiceBrakeCumulativeTotal(key: string) {
		if (this.serviceBrakeBySpeedData) {
			return this.serviceBrakeBySpeedData.map(t => t[key]).reduce((acc, value) => acc + value, 0);
		} else {
			return 0;
		}
	}

	getServiceBrakeAverageSpeed() {
		if (this.serviceBrakeBySpeedData && this.serviceBrakeBySpeedData.length) {
			return (this.serviceBrakeBySpeedData.map(t => t.velocidad).reduce((acc, value) => acc + value, 0) / this.serviceBrakeBySpeedData.length).toFixed(2);
		} else {
			return 0;
		}
	}

	getColourToServiceBrakeMap(range: string) {
		return `rgba(${COLORS_SERVICE_EVENTS_MAP[range].join(',')},0.8)`;
	}

	// REPEATED CODE TO BRAKE FILTERS -----------------------------------------

	loadParkingBrakeFilters() {
		this.loadingParkingFilters = true;
		this.operationalPracticesService.getParkingBrakeOptions(this.getParkingStartDate(), this.getParkingEndDate()).subscribe(
			filters => {
				this.parkingBrakeFilters = filters;
				this.loadingParkingFilters = false;
			}, err => {
				this.loadingParkingFilters = false;
			}
		);
	}

	loadParkingBrakeData() {
		this.loadingParkingBrakeByDay = this.loadingParkingBrakeByGroup = this.loadingParkingBrakeByWorkShift = this.loadingParkingBrakeBySpeed = this.loadingParkingBrakeByLocation = true;
		let psd = this.getParkingStartDate();
		let ped = this.getParkingEndDate();
		let pws = this.selectedParkingWorkShift;
		let pg = this.selectedParkingGroup;
		let pw = this.selectedParkingWorker;
		let ps = this.selectedParkingSpeed;
		this.operationalPracticesService.getParkingEventsByDay(psd, ped, pws, pg, pw, ps).subscribe(
			response => {
				if (this.brakeParkingByDayChart instanceof Chart) {
					this.brakeParkingByDayChart.destroy();
				}
				this.brakeParkingByDayChart = null;
				this.miningGroups.forEach(group => {
					if (!response.data[group]) {
						response.data[group] = [];
					}
				});
				let _colorByGroup = {
					G1: this.rgbaYellow,
					G2: this.rgbaGreen,
					G3: this.rgbaBlue,
					G4: this.rgbaRed,
				};
				let _datasets = [];
				this.miningGroups.forEach(group => {
					_datasets.push({
						label: group,
						data: response.data[group],
						fill: false,
						borderColor: _colorByGroup[group]
					});
				});
				this.brakeParkingByDayChart = new Chart('brakeParkingByDayChart', {
					type: 'line',
					data: { datasets: _datasets },
					options: chartOptions.LineByDay
				});
				this.loadingParkingBrakeByDay = false;
			}, err => {
				this.loadingParkingBrakeByDay = false;

			}
		);
		this.operationalPracticesService.getParkingEventsByGroup(psd, ped, pws, pg, pw, ps).subscribe(
			response => {
				if (this.brakeParkingByGroupChart instanceof Chart) {
					this.brakeParkingByGroupChart.destroy();
				}
				this.brakeParkingByGroupChart = null;
				let _colors = [this.rgbaYellow, this.rgbaGreen, this.rgbaBlue, this.rgbaRed];
				let _values = [];
				this.miningGroups.forEach(group => {
					let value = response.data[group] ? response.data[group] : 0;
					_values.push(value);
				});
				this.brakeParkingByGroupChart = new Chart('brakeParkingByGroupChart', {
					type: 'horizontalBar',
					data: {
						labels: this.miningGroups,
						datasets: [{
							label: this.translate.instant('OPERATIONAL_PRACTICES.EVENTS'),
							data: _values,
							backgroundColor: _colors,
							borderWidth: 0
						}],
					},
					options: chartOptions.BarByGroups
				});
				this.loadingParkingBrakeByGroup = false;
			}, err => {
				this.loadingParkingBrakeByGroup = false;
			}
		);
		this.operationalPracticesService.getParkingEventsByWorkShift(psd, ped, pws, pg, pw, ps).subscribe(
			response => {
				if (this.brakeParkingByWorkShiftChart instanceof Chart) {
					this.brakeParkingByWorkShiftChart.destroy();
				}
				this.brakeParkingByWorkShiftChart = null;
				let _colors = [this.rgbaYellow, this.rgbaRed];
				let _values = [];
				this.workShifts.forEach(workshift => {
					let value = response.data[workshift] ? response.data[workshift] : 0;
					_values.push(value);
				});
				this.brakeParkingByWorkShiftChart = new Chart('brakeParkingByWorkShiftChart', {
					type: 'horizontalBar',
					data: {
						labels: this.workShifts,
						datasets: [{
							label: this.translate.instant('OPERATIONAL_PRACTICES.EVENTS'),
							data: _values,
							backgroundColor: _colors,
							borderWidth: 0
						}]
					},
					options: chartOptions.BarByWorkshift
				});
				this.loadingParkingBrakeByWorkShift = false;
			}, err => {
				this.loadingParkingBrakeByWorkShift = false;
			}
		);
		this.operationalPracticesService.getParkingEventsBySpeed(psd, ped, pws, pg, pw, ps).subscribe(
			response => {
				this.parkingBrakeBySpeedData = response.data;
				this.parkingDataSource.connect().next(response.data);
				this.brakeParkingMaxValues = this.getBrakeParkingMaxValues(response.data);
				this.loadingParkingBrakeBySpeed = false;
			}, err => {
				this.loadingParkingBrakeBySpeed = false;
			}
		);
		this.operationalPracticesService.getParkingEventsByLocation(psd, ped, pws, pg, pw, ps).subscribe(
			response => {
				this.parkingBrakeByLocationData = response;
				this.parkingBrakeByLocationData.titles = ['<1.6', '1.6-2.4', '2.4-3.2', '>3.2'];
				this.loadingParkingBrakeByLocation = false;
			}, err => {
				this.loadingParkingBrakeByLocation = false;
			}
		);
	}

	getParkingEventsCellBgColorByValue(value: number, column: string) {
		if (value === 0) {
			return 'transparent';
		}
		let maxValue = this.brakeParkingMaxValues[column];
		let opacity = value / maxValue;
		return `rgba(${COLORS_PARKING_EVENTS[column].join(',')},${opacity})`;
	}

	getBrakeParkingMaxValues(dataset) {
		let maxValues = {
			rng16: 0,
			rng1624: 0,
			rng2432: 0,
			rng32: 0
		};
		dataset.forEach(row => {
			Object.keys(maxValues).forEach(col => {
				if (row[col] > maxValues[col]) {
					maxValues[col] = row[col];
				}
			});
		});
		return maxValues;
	}

	getParkingStartDate() {
		return this.parkingBrakeStartDate.toISOString().substring(0, 10);
	}

	getParkingEndDate() {
		return this.parkingBrakeEndDate.toISOString().substring(0, 10);
	}

	getParkingBrakeCumulativeTotal(key: string) {
		if (this.parkingBrakeBySpeedData) {
			return this.parkingBrakeBySpeedData.map(t => t[key]).reduce((acc, value) => acc + value, 0);
		} else {
			return 0;
		}
	}

	getParkingBrakeAverageSpeed() {
		if (this.parkingBrakeBySpeedData && this.parkingBrakeBySpeedData.length) {
			return (this.parkingBrakeBySpeedData.map(t => t.velocidad).reduce((acc, value) => acc + value, 0) / this.parkingBrakeBySpeedData.length).toFixed(2);
		} else {
			return 0;
		}
	}

	getColourToParkingBrakeMap(range: string) {
		return `rgba(${COLORS_PARKING_EVENTS_MAP[range].join(',')},0.8)`;
	}

	calcOffsetLeft(x: number) {
		let max = MAX_X - MIN_X;
		let nx = x - MIN_X;
		let result = Math.round(nx * 100 / max * 10) / 10;
		return result + '%';
	}

	calcOffsetRight(y: number) {
		let max = MAX_Y - MIN_Y;
		let ny = y - MIN_Y;
		let result = 100 - (Math.round(ny * 100 / max * 10) / 10);
		return result + '%';
	}

}

const MIN_X = 160000;
const MAX_X = 168000;
const MIN_Y = 4468000;
const MAX_Y = 4474000;

const COLORS_SERVICE_EVENTS = {
	rng20: [255, 240, 192],
	rng2030: [240, 253, 56],
	rng3040: [251, 140, 0],
	rng4050: [183, 28, 28],
	rng50: [66, 133, 244],
};
const COLORS_SERVICE_EVENTS_MAP = {
	'<20': [255, 240, 192],
	'20-30': [240, 253, 56],
	'30-40': [251, 140, 0],
	'40-50': [183, 28, 28],
	'>50': [66, 133, 244],
};
const COLORS_PARKING_EVENTS = {
	rng16: [255, 240, 192],
	rng1624: [240, 253, 56],
	rng2432: [251, 140, 0],
	rng32: [183, 28, 28],
};
const COLORS_PARKING_EVENTS_MAP = {
	'<1.6': [255, 240, 192],
	'1.6-2.4': [240, 253, 56],
	'2.4-3.2': [251, 140, 0],
	'>3.2': [183, 28, 28],
};

let chartOptions = {
	LineByDay: {
		responsive: true,
		legend: {
			labels: {
				usePointStyle: true,
				boxWidth: 5,
				fontSize: 11,
				padding: 15,
			},
			fullWidth: false,
		},
		title: { display: false },
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					parser: 'DD/MM/YYYY',
					tooltipFormat: 'll',
					unit: 'day'
				},
				scaleLabel: { display: true },
				ticks: { fontSize: 10 }
			}],
			yAxes: [{
				scaleLabel: {
					labelString: 'Cantidad de eventos',
					display: true,
				},
				ticks: {
					fontSize: 10,
				}
			}]
		},
		elements: { line: { tension: 0 } }
	},
	BarByGroups: {
		legend: { display: false },
		scales: {
			xAxes: [{ ticks: { fontSize: 10 } }],
			yAxes: [{ ticks: { fontSize: 10 } }]
		}
	},
	BarByWorkshift: {
		legend: { display: false },
		scales: {
			xAxes: [{
				ticks: {
					beginAtZero: true,
					fontSize: 10
				}
			}],
			yAxes: [{ ticks: { fontSize: 10 } }]
		},
		responsive: true,
		maintainAspectRatio: true,
	}
};
