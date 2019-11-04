import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';

import { OloaService } from '../../../shared/services/oloa.service';
import { ReportDetail } from '../../../shared/models/report-detail';

@Component({
	selector: 'kt-oloa-report',
	templateUrl: './oloa-report.component.html',
	styleUrls: ['./oloa-report.component.scss']
})
export class OloaReportComponent implements OnInit {
	oloaGrants: ReportDetail = new ReportDetail();
	loadingFilters = true;
	selectedMineSite: number;
	selectedEquipment: number;
	selectedComponent: string;
	//TanD
	showTanD = false;
	loadingTanD = false;
	tandOilTemp: any;
	tandOilCondition: any;
	tandChart: any;
	//Gill
	showGill = false;
	loadingGill = false;
	gillCoarse: any;
	gillFine: any;
	gillChart: any;
	//Kelk
	showKelk = false;
	loadingKelk = false;
	kelkOilCondition: any;
	kelkChart: any;
	//Parker
	showParker = false;
	loadingParker = false;
	parkerOilCondition: any;
	parkerChart: any;

	constructor(
		private oloaService: OloaService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		Chart.defaults.global.elements.line.borderWidth = 2;
		this.loadReport();
	}

	loadReport() {
		this.oloaService.getOloaGrants().subscribe(
			grants => {
				this.oloaGrants = grants[0];
				this.loadingFilters = false;
			},
			err => {
				this.loadingFilters = false;
			}
		);
	}

	loadChart() {
		if (this.selectedMineSite && this.selectedEquipment && this.selectedComponent) {
			this.loadingTanD = this.loadingGill = this.loadingKelk = this.loadingParker = true;
			this.loadTanDData();
			this.loadGillData();
			this.loadKelkData();
			this.loadParkerData();
		}
	}

	loadTanDData() {
		this.oloaService.getTanDData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			tandData => {
				this.loadingTanD = false;
				this.tandOilCondition = tandData.oilCond;
				this.tandOilTemp = tandData.oilTemp;
				if (tandData.oilCond.length > 0 || tandData.oilTemp.length > 0) {
					this.showTanD = true;
					this.drawTanDChart();
				}
				else {
					this.showTanD = false;
				}
			},
			error => {
				this.loadingTanD = false;
			}
		);
	}

	loadGillData() {
		this.oloaService.getGillData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			gillData => {
				this.loadingGill = false;
				this.gillCoarse = gillData.coarse;
				this.gillFine = gillData.fine;
				if (gillData.coarse.length > 0 || gillData.fine.length > 0) {
					this.showGill = true;
					this.drawGillChart();
				}
				else {
					this.showGill = false;
				}
			},
			error => {
				this.loadingGill = false;
			}
		);
	}

	loadKelkData() {
		this.oloaService.getKelkData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			kelkData => {
				this.loadingKelk = false;
				this.kelkOilCondition = kelkData.oilCond;
				if (kelkData.oilCond.length > 0) {
					this.showKelk = true;
					this.drawKelkChart();
				}
				else {
					this.showKelk = false;
				}
			},
			error => {
				this.loadingKelk = false;
			}
		);
	}

	loadParkerData() {
		this.oloaService.getParkerData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			parkerData => {
				this.loadingParker = false;
				this.parkerOilCondition = parkerData.oilCond;
				if (parkerData.oilCond.length > 0) {
					this.showParker = true;
					this.drawParkerChart();
				}
				else {
					this.showParker = false;
				}
			},
			error => {
				this.loadingParker = false;
			}
		);
	}


	drawTanDChart() {
		if (this.tandChart instanceof Chart) {
			this.tandChart.destroy();
		}
		this.tandChart = new Chart('tandChart', {
			type: 'line',
			data: {
				datasets: [
					{
						label: this.translate.instant('OLOA.OIL_CONDITION_LABEL'),
						data: this.tandOilCondition,
						fill: false,
						borderColor: colours[0],
						pointStyle: shapes[0],
						yAxisID: "oilCondition",
					},
					{
						label: this.translate.instant('OLOA.OIL_TEMPERATURE_LABEL'),
						data: this.tandOilTemp,
						fill: false,
						borderColor: colours[1],
						pointStyle: shapes[1],
						yAxisID: "oilTemperature",
					}
				]
			},
			options: {
				legend: customLeyend,
				responsive: true,
				title: {
					display: true,
					// text: "TanD"
				},
				scales: {
					xAxes: [{
						type: "time",
						time: {
							parser: 'DD/MM/YYYY HH:mm',
							tooltipFormat: 'll',
							unit: 'day'
						},
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('OLOA.DATE')
						}
					}],
					yAxes: [
						{
							id: "oilCondition",
							display: true,
							position: "left",
							type: "linear",
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.OIL_CONDITION_LABEL') + ' (TDN)',
								beginAtZero: true,
							},

						},
						{
							id: "oilTemperature",
							display: true,
							position: 'right',
							type: "linear",
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.OIL_TEMPERATURE_LABEL') + ' (°C)',
								beginAtZero: true,
							},
							gridLines: {
								display: false
							},
						}


					]
				},
				pan: panOptions,
				zoom: zoomOptions
			}
		}
		);
	}

	drawGillChart() {
		if (this.gillChart instanceof Chart) {
			this.gillChart.destroy();
		}
		this.gillChart = new Chart('gillChart',
			{
				type: 'line',
				data: {
					datasets: [
						{
							label: this.translate.instant('OLOA.COARSE'),
							data: this.gillCoarse,
							fill: false,
							borderColor: colours[0],
							pointStyle: shapes[0],
						},
						{
							label: this.translate.instant('OLOA.FINE'),
							data: this.gillFine,
							fill: false,
							borderColor: colours[1],
							pointStyle: shapes[1],
						}
					]
				},
				options: {
					legend: customLeyend,
					responsive: true,
					title: {
						display: true,
						// text: "Gill"
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								parser: 'DD/MM/YYYY HH:mm',
								tooltipFormat: 'll',
								unit: 'day'
							},
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.DATE')
							}
						}],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.FERROUS_DEBRIS') + ' (%)'
							}
						}]
					},
					pan: panOptions,
					zoom: zoomOptions
				}
			}
		);
	}

	drawKelkChart() {
		if (this.kelkChart instanceof Chart) {
			this.kelkChart.destroy();
		}
		this.kelkChart = new Chart('kelkChart', {
			type: 'line',
			data: {
				datasets: [
					{
						label: this.translate.instant('OLOA.OIL_OPTICAL_CONDITION'),
						data: this.kelkOilCondition,
						fill: false,
						borderColor: colours[0],
						pointStyle: shapes[0],
					}
				]
			},
			options: {
				legend: customLeyend,
				responsive: true,
				title: {
					display: true,
					// text: "Ferrous particle ()"
				},
				scales: {
					xAxes: [{
						type: "time",
						time: {
							parser: 'DD/MM/YYYY HH:mm',
							tooltipFormat: 'll',
							unit: 'day'
						},
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('OLOA.DATE')
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('OLOA.OIL_OPTICAL_CONDITION')
						}
					}]
				},
				pan: panOptions,
				zoom: zoomOptions
			}
		}
		);
	}

	drawParkerChart() {
		if (this.parkerChart instanceof Chart) {
			this.parkerChart.destroy();
		}
		this.parkerChart = new Chart('parkerChart',
			{
				type: 'line',
				data: {
					datasets: [
						{
							label: this.translate.instant('OLOA.PARTICLES'),
							data: this.parkerOilCondition,
							fill: false,
							borderColor: colours[0],
							pointStyle: shapes[0],
						}
					]
				},
				options: {
					legend: customLeyend,
					responsive: true,
					title: {
						display: true,
						// text: "Particle amount"
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								parser: 'DD/MM/YYYY HH:mm',
								tooltipFormat: 'll',
								unit: 'day'
							},
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.DATE')
							}
						}],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.PARTICLES')
							}
						}]
					},
					pan: panOptions,
					zoom: zoomOptions
				}
			}
		);
	}
}

const shapes = ['circle', 'cross', 'star', 'triangle']
const colours = ['blue', 'red', 'black', 'gray']

const customLeyend = {
	labels: {
		usePointStyle: true
	}
}

const zoomOptions = {
	enabled: true,
	drag: false,
	mode: "x",
	limits: {
		max: 10,
		min: 0.5
	}
}

const panOptions = {
	enabled: true,
	mode: "x",
	speed: 10,
	threshold: 10
}