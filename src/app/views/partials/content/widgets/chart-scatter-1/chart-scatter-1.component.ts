// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-chartscatter1',
	templateUrl: './chart-scatter-1.component.html',
	styleUrls: ['./chart-scatter-1.component.css'],
})
export class ChartScatter1Component implements OnInit {
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
							{'x': 0.06, 'y': 0.62},
							{'x': 0.04, 'y': 1.01},
							{'x': 0.1, 'y': 0.25},
							{'x': -0.01, 'y': 1.24},
							{'x': -0.13, 'y': 0.47},
							{'x': 0, 'y': 0.98},
							{'x': 0.1, 'y': 1.13},
							{'x': -0.04, 'y': 0},
							{'x': -0.04, 'y': 0.6},
							{'x': -0.16, 'y': 0.21},
							{'x': 0, 'y': 0.8},
							{'x': 0.28, 'y': 0.6},
							{'x': -0.04, 'y': 0.85},
							{'x': 0.28, 'y': 0.43},
							{'x': 0.06, 'y': 1.07},
							{'x': 0, 'y': 0.63},
							{'x': 0.11, 'y': 0.91},
							{'x': -0.02, 'y': 0.72},
							{'x': 0.1, 'y': 1.05},
							{'x': -0.05, 'y': 0.78},
							{'x': 0.1, 'y': 1.15}]
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
