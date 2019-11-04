import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';

import { OloaService } from '../../../shared/services/oloa.service';
import { ReportDetail } from '../../../shared/models/report-detail';
import { RMS } from '../../../shared/models/rms';
import { BPFO } from '../../../shared/models/bpfo';
import { Correlation } from '../../../shared/models/correlation';

@Component({
	selector: 'kt-esa-report',
	templateUrl: './esa-report.component.html',
	styleUrls: ['./esa-report.component.scss']
})
export class EsaReportComponent implements OnInit {
	oloaGrants: ReportDetail = new ReportDetail();
	loadingFilters = true;
	selectedMineSite: number;
	selectedEquipment: number;
	selectedComponent: string;
	//RMS
	showRMS = false;
	loadingRMS = false;
	rmsChart: any;
	rmsData: RMS;

	//BPFO
	showBPFO = false;
	loadingBPFO = false;
	bpfoChart: any;
	bpfoData: BPFO;

	//Correlation
	showCorrelation = false;
	loadingCorrelation = false;
	correlationChart: any;
	correlationData: Correlation;

	constructor(
		private oloaService: OloaService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		Chart.defaults.global.elements.line.borderWidth = 2;
		this.loadReport();
	}

	loadReport() {
		this.oloaService.getEsaGrants().subscribe(
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
			this.loadingRMS = this.loadingBPFO = this.loadingCorrelation = true;
			this.loadRMSData();
			this.loadBPFOData();
			this.loadCorrelationData();
		}
	}

	loadRMSData() {
		this.oloaService.getRMSData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			rmsData => {
				this.loadingRMS = false;
				this.rmsData = rmsData;
				if (rmsData.phase1_rms.length > 0 && rmsData.phase2_rms.length > 0 && rmsData.phase3_rms.length > 0) {
					this.showRMS = true;
					this.drawRMSChart();
				}
				else {
					this.showRMS = false;
				}
			},
			error => {
				this.loadingRMS = false;
			}
		);
	}

	loadBPFOData() {
		this.oloaService.getBPFOData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			bpfoData => {
				this.loadingBPFO = false;
				this.bpfoData = bpfoData;
				if (bpfoData.phase1_rms.length > 0 && bpfoData.phase2_rms.length > 0 && bpfoData.phase3_rms.length > 0) {
					this.showBPFO = true;
					this.drawBPFOChart();
				}
				else {
					this.showBPFO = false;
				}
			},
			error => {
				this.loadingBPFO = false;
			}
		);
	}

	loadCorrelationData() {
		this.oloaService.getCorrelationData(this.selectedMineSite, this.selectedEquipment, this.selectedComponent).subscribe(
			correlationData => {
				this.loadingCorrelation = false;
				this.correlationData = correlationData;

				if (correlationData.correlationRatio12.length > 0 && correlationData.correlationRatio13.length > 0) {
					this.showCorrelation = true;
					this.drawCorrelationChart();
				}
				else {
					this.showCorrelation = false;
				}
			},
			error => {
				this.loadingCorrelation = false;
			}
		);
	}


	drawRMSChart() {
		if (this.rmsChart instanceof Chart) {
			this.rmsChart.destroy();
		}
		this.rmsChart = new Chart('rmsChart', {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'RMS A',
						data: this.rmsData.phase1_rms,
						fill: false,
						borderColor: colours[0],
						pointStyle: shapes[0],
					},
					{
						label: 'RMS B',
						data: this.rmsData.phase2_rms,
						fill: false,
						borderColor: colours[1],
						pointStyle: shapes[1],
					},
					{
						label: 'RMS C',
						data: this.rmsData.phase3_rms,
						fill: false,
						borderColor: colours[2],
						pointStyle: shapes[2],
					}
				]
			},
			options: {
				legend: customLeyend,
				responsive: true,
				title: {
					display: true,
				},
				scales: {
					xAxes: [{
						type: "time",
						time: timeFormat,
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('OLOA.DATE')
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('ESA.CURRENT') + ', A'
						}
					}]
				},
				pan: panOptions,
				zoom: zoomOptions
			}
		});
	}

	drawBPFOChart() {
		if (this.bpfoChart instanceof Chart) {
			this.bpfoChart.destroy();
		}
		this.bpfoChart = new Chart('bpfoChart', {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'A',
						data: this.bpfoData.phase1_rms,
						fill: false,
						borderColor: colours[0],
						pointStyle: shapes[0],
					},
					{
						label: 'B',
						data: this.bpfoData.phase2_rms,
						fill: false,
						borderColor: colours[1],
						pointStyle: shapes[1],
					},
					{
						label: 'C',
						data: this.bpfoData.phase3_rms,
						fill: false,
						borderColor: colours[2],
						pointStyle: shapes[2],
					},
				]
			},
			options: {
				legend: customLeyend,
				responsive: true,
				title: {
					display: true,
				},
				scales: {
					xAxes: [{
						type: "time",
						time: timeFormat,
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('OLOA.DATE')
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('ESA.CURRENT') + ', A'
						}
					}]
				},
				pan: panOptions,
				zoom: zoomOptions
			}
		});
	}

	drawCorrelationChart() {
		if (this.correlationChart instanceof Chart) {
			this.correlationChart.destroy();
		}
		this.correlationChart = new Chart('correlationChart',
			{
				type: 'line',
				data: {
					datasets: [
						{
							label: '(A,B)',
							data: this.correlationData.correlationRatio12,
							fill: false,
							borderColor: colours[0],
							pointStyle: shapes[0],
						},
						{
							label: '(A,C)',
							data: this.correlationData.correlationRatio13,
							fill: false,
							borderColor: colours[1],
							pointStyle: shapes[1],
						},

					]
				},
				options: {
					legend: customLeyend,
					responsive: true,
					title: {
						display: true,
					},
					scales: {
						xAxes: [{
							type: "time",
							time: timeFormat,
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('OLOA.DATE')
							}
						}],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: this.translate.instant('ESA.CORRELATION_RATIO')
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

const timeFormat = {
	parser: 'DD/MM/YYYY HH:mm',
	tooltipFormat: 'll',
	unit: 'day'
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