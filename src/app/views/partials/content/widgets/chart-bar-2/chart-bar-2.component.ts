// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-chartbar2',
	templateUrl: './chart-bar-2.component.html',
	styleUrls: ['./chart-bar-2.component.css'],
})
export class ChartBar2Component implements OnInit {
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
				labels: ['G1', 'G2', 'G3', 'G4'],
				datasets: [
					{
						label: 'Tons',
						backgroundColor: "rgba(220, 53, 69, 0.75)",
						data: [ 293.63, 292.69, 292.39, 296.25 ]
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
			type: 'bar',
			data: this.data,
			options: {
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							min: 275,
							max: 300
						}
					}]
				}
			}
		});
	}
}
