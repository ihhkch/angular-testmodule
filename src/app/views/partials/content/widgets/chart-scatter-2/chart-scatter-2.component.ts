// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-chartscatter2',
	templateUrl: './chart-scatter-2.component.html',
	styleUrls: ['./chart-scatter-2.component.css'],
})
export class ChartScatter2Component implements OnInit {
	// Public properties
	@Input() title: string;
	@Input() desc: string;
	@Input() data: { labels: string[]; datasets: any[] };
	@ViewChild('chart') chart: ElementRef;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		if (!this.data) {
			this.data = {
				labels: ['N', 'D'],
				datasets: [
					{
						label: 'Trasera-Frontal',
						backgroundColor: 'rgba(23, 162, 184, 0.75)',
						data: [
							{'x': 0.08, 'y': 0.94},
							{'x': 0.19, 'y': 0.15},
							{'x': -0.2, 'y': -0.03},
							{'x': 0.45, 'y': -0.16},
							{'x': 0.39, 'y': -0.18},
							{'x': -0.06, 'y': -0.08},
							{'x': 0.19, 'y': -0.04},
							{'x': 0.21, 'y': 0.04},
							{'x': -0.06, 'y': 0},
							{'x': 0.08, 'y': 3.61},
							{'x': 0.08, 'y': 0.84},
							{'x': 0.02, 'y': 0.8},
							{'x': -0.19, 'y': -0.08},
							{'x': 0.06, 'y': 3.29},
							{'x': 0.02, 'y': 0.51},
							{'x': -0.21, 'y': -0.14},
							{'x': -0.11, 'y': -0.17},
							{'x': 0.04, 'y': 3.28},
							{'x': 0.22, 'y': 1.4},
							{'x': 0.14, 'y': -0.08},
							{'x': -0.04, 'y': 0.13},
							{'x': 0.13, 'y': -0.1},
							{'x': 0.18, 'y': 0.96},
							{'x': 0, 'y': -0.02},
							{'x': 0.25, 'y': 0.25},
							{'x': 0.03, 'y': 2.36},
							{'x': 0.19, 'y': 2.14},
							{'x': 0, 'y': 1.14},
							{'x': 0.12, 'y': 1.7},
							{'x': 0.05, 'y': 1.34},
							{'x': 0.15, 'y': 1.14},
							{'x': 0.04, 'y': 2.68},
							{'x': 0, 'y': 3.27},
							{'x': -0.05, 'y': -0.09},
							{'x': 0.04, 'y': 1.37},
							{'x': 0.01, 'y': 1.24},
							{'x': -0.08, 'y': 0.15},
							{'x': -0.47, 'y': 0.04},
							{'x': 0, 'y': 0.05},
							{'x': 0.07, 'y': 0.84},
							{'x': 0.89, 'y': 0.21},
							{'x': -0.17, 'y': -0.02},
							{'x': 0.12, 'y': 0.91},
							{'x': 0.05, 'y': 0.79},
							{'x': 0.05, 'y': 0},
							{'x': 0.02, 'y': 1.34},
							{'x': 0.12, 'y': 0.97},
							{'x': 0.04, 'y': 0.29},
							{'x': 0.05, 'y': 2.46},
							{'x': 0.11, 'y': 1.5},
							{'x': 0.2, 'y': 2.4},
							{'x': -0.01, 'y': 1.63},
							{'x': 0.2, 'y': 0.1},
							{'x': 0.04, 'y': 3.07},
							{'x': 0.13, 'y': 2.68},
							{'x': 0.03, 'y': 0.02},
							{'x': -0.01, 'y': 2.21},
							{'x': 0.01, 'y': 1.17},
							{'x': 0.05, 'y': 0.45},
							{'x': 0.06, 'y': 1.13},
							{'x': 0.07, 'y': 2.03},
							{'x': 0.14, 'y': 3.26},
							{'x': 0.01, 'y': 3.14},
							{'x': 0.04, 'y': 0.45},
							{'x': 0.11, 'y': 2.49},
							{'x': 0.08, 'y': 2.99},
							{'x': 0, 'y': 1.6},
							{'x': 0.12, 'y': 0.46},
							{'x': 0.11, 'y': 1.13},
							{'x': -0.31, 'y': -0.06},
							{'x': 0.14, 'y': -0.19},
							{'x': -0.01, 'y': 2.38},
							{'x': 0.09, 'y': 0.03},
							{'x': 0, 'y': 1.59},
							{'x': 0.12, 'y': 2.12},
							{'x': -0.33, 'y': -0.06},
							{'x': 0.07, 'y': 1.3},
							{'x': 0.01, 'y': 3.03},
							{'x': 0.16, 'y': 0.51},
							{'x': -0.56, 'y': 0.42},
							{'x': 0.13, 'y': 3.11},
							{'x': 0.36, 'y': 0.46},
							{'x': 0.25, 'y': 0.4},
							{'x': 0.13, 'y': 0.94},
							{'x': 0.07, 'y': 2.76},
							{'x': 0.03, 'y': 2.56},
							{'x': -0.19, 'y': -0.18},
							{'x': -0.05, 'y': -0.03},
							{'x': 0.14, 'y': 3.26},
							{'x': 0.75, 'y': -0.13},
							{'x': 0.1, 'y': 3.62},
							{'x': -0.04, 'y': -0.17},
							{'x': -0.12, 'y': -0.12},
							{'x': 0.14, 'y': 0.53},
							{'x': 0.14, 'y': 0.18},
							{'x': 0.05, 'y': 0.08},
							{'x': 0.18, 'y': 0.13},
							{'x': -0.05, 'y': 0.21},
							{'x': -0.03, 'y': -0.04},
							{'x': 0.17, 'y': 1.3},
							{'x': 0.09, 'y': 0.9},
							{'x': -0.26, 'y': -0.35},
							{'x': 0, 'y': -0.11},
							{'x': 0.1, 'y': -0.1},
							{'x': 0.15, 'y': -0.07},
							{'x': -0.03, 'y': -0.16},
							{'x': 0.03, 'y': 1.28},
							{'x': 0.14, 'y': 0.83},
							{'x': -0.22, 'y': -0.13},
							{'x': -0.09, 'y': -0.12},
							{'x': 0.11, 'y': 1.16},
							{'x': 0.08, 'y': 0.19},
							{'x': 0.01, 'y': 3.64},
							{'x': 0.09, 'y': 0.99},
							{'x': -0.02, 'y': 2.35},
							{'x': -0.14, 'y': 0.22},
							{'x': -0.74, 'y': 0.05},
							{'x': 0.13, 'y': 0.5},
							{'x': 0.17, 'y': -0.1},
							{'x': 0.18, 'y': 0.71},
							{'x': 0.16, 'y': 0.26},
							{'x': 0.01, 'y': -0.16},
							{'x': 0.13, 'y': 2.01},
							{'x': 0.01, 'y': 0.27},
							{'x': -0.03, 'y': 0.47},
							{'x': 0.1, 'y': 0.12},
							{'x': 0.16, 'y': 3.86},
							{'x': 0.08, 'y': 0.73},
							{'x': 0.15, 'y': 1.8},
							{'x': 0.11, 'y': 0.16},
							{'x': 0.18, 'y': 0.18},
							{'x': 0.07, 'y': 3.88},
							{'x': 0.25, 'y': 0.14},
							{'x': 0.06, 'y': -0.11},
							{'x': 0.08, 'y': 3.07},
							{'x': 0.11, 'y': 1.71},
							{'x': -0.04, 'y': 0.21},
							{'x': -0.08, 'y': 0.03},
							{'x': 0.02, 'y': 1.84},
							{'x': 0.05, 'y': 0.78},
							{'x': 0.02, 'y': 1.03},
							{'x': 0.16, 'y': 0.95},
							{'x': 0.03, 'y': 4.18},
							{'x': 0.3, 'y': 0.79},
							{'x': 0.01, 'y': 4.12},
							{'x': 0.03, 'y': 3.24},
							{'x': 0.13, 'y': -0.16},
							{'x': 0.13, 'y': 1.53},
							{'x': -0.19, 'y': 2.01},
							{'x': 0.08, 'y': 1},
							{'x': -0.06, 'y': 0.46},
							{'x': 0.02, 'y': 1.68},
							{'x': 0.02, 'y': 2},
							{'x': 0.09, 'y': -0.23},
							{'x': 0.03, 'y': 2.73},
							{'x': 0.4, 'y': 1.6},
							{'x': -0.03, 'y': -0.12},
							{'x': -0.15, 'y': 0.74},
							{'x': 0.05, 'y': 1.01},
							{'x': 0.1, 'y': 4.25},
							{'x': 0.11, 'y': 3.72},
							{'x': 0.25, 'y': -0.04},
							{'x': 0.05, 'y': -0.15},
							{'x': 0.18, 'y': -0.22},
							{'x': -0.23, 'y': -0.07},
							{'x': -0.08, 'y': 3.33},
							{'x': 0.04, 'y': 3.55},
							{'x': 0.16, 'y': 2.45},
							{'x': 0.15, 'y': 0.9},
							{'x': 0, 'y': 1.33},
							{'x': -0.29, 'y': -0.11},
							{'x': -0.11, 'y': -0.27},
							{'x': -0.11, 'y': -0.09},
							{'x': -0.4, 'y': -0.05},
							{'x': -0.02, 'y': -0.14},
							{'x': 0.09, 'y': 0.75},
							{'x': 0.33, 'y': -0.15},
							{'x': 0.9, 'y': 0.14},
							{'x': 0.16, 'y': 0.84},
							{'x': 0.07, 'y': 1.47},
							{'x': 0.06, 'y': 0.01},
							{'x': -0.47, 'y': -0.14},
							{'x': -0.45, 'y': -0.08},
							{'x': 0.06, 'y': -0.15},
							{'x': -0.21, 'y': 0.32},
							{'x': 0.05, 'y': 1.95},
							{'x': 0.03, 'y': 3.45},
							{'x': 0.13, 'y': 1.35},
							{'x': 0.02, 'y': 2.74},
							{'x': 0.08, 'y': 1.2},
							{'x': 0.33, 'y': 1.9},
							{'x': 0.01, 'y': 2.71},
							{'x': -0.06, 'y': -0.01},
							{'x': -0.32, 'y': 2.09},
							{'x': 0.17, 'y': 0.56},
							{'x': -0.06, 'y': 0.46},
							{'x': 0.03, 'y': 0.87},
							{'x': -0.15, 'y': 0.07},
							{'x': 0.3, 'y': -0.13},
							{'x': 0.03, 'y': 1.98},
							{'x': 0.14, 'y': 2.13},
							{'x': 0.26, 'y': -0.11},
							{'x': -0.43, 'y': -0.13},
							{'x': -0.08, 'y': -0.13},
							{'x': 0.07, 'y': 1.25},
							{'x': -0.46, 'y': -0.11},
							{'x': 0.01, 'y': 2.73},
							{'x': 0.26, 'y': -0.11},
							{'x': -0.96, 'y': -0.35},
							{'x': -0.03, 'y': -0.07},
							{'x': -0.35, 'y': -0.12},
							{'x': -0.4, 'y': -0.08},
							{'x': 0.05, 'y': 2.9},
							{'x': -0.22, 'y': -0.02},
							{'x': 0.14, 'y': 3.73},
							{'x': -0.08, 'y': -0.18},
							{'x': 0.17, 'y': 1.7},
							{'x': 0.08, 'y': -0.07},
							{'x': 0.03, 'y': -0.01},
							{'x': 0.02, 'y': 0.65},
							{'x': 0, 'y': 0.42},
							{'x': -0.35, 'y': 0.21},
							{'x': 0.07, 'y': 0.54},
							{'x': -0.01, 'y': 0.52},
							{'x': 0.07, 'y': 2.35},
							{'x': 0.05, 'y': -0.2},
							{'x': 0.04, 'y': 2.03},
							{'x': 0.1, 'y': 4.45},
							{'x': 0.19, 'y': 3.8},
							{'x': -0.26, 'y': 0.16},
							{'x': 0.11, 'y': 0.08},
							{'x': 0.06, 'y': 3.65},
							{'x': -0.06, 'y': 2.44},
							{'x': 0.09, 'y': 0.51},
							{'x': 0.04, 'y': 0.42},
							{'x': -0.02, 'y': 0.79},
							{'x': 0.22, 'y': 3.41},
							{'x': 0.09, 'y': 1.33},
							{'x': 0.09, 'y': 4.02},
							{'x': -0.04, 'y': 1.3},
							{'x': -0.09, 'y': -0.09},
							{'x': -0.01, 'y': 1.38},
							{'x': 0.09, 'y': 4.52},
							{'x': 0.08, 'y': 0.78},
							{'x': -0.06, 'y': 0.52},
							{'x': 0.11, 'y': 1.21},
							{'x': 0.05, 'y': 0.13},
							{'x': -0.17, 'y': -0.02},
							{'x': 0.09, 'y': 4.15}
						]
					}
				]
			};
		}

		this.initChartJS();
	}

	/** Init chart */
	initChartJS() {
		// For more information about the chartjs, visit this link
		// https://www.chartjs.org/docs/latest/getting-started/usage.html

		const chart = new Chart(this.chart.nativeElement, {
			type: 'scatter',
			data: this.data,
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom',
						scaleLabel: {
							display: true,
							labelString: 'Izquierda / Derecha'
						},
						ticks: {
							min: -2,
							max: 2
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Trasera / Frontal'
						},
						ticks: {
							min: -2,
							max: 2
						}
					}]
				}
			}
		});
	}
}