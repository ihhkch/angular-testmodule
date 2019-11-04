// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-chartbar1',
	templateUrl: './chart-bar-1.component.html',
	styleUrls: ['./chart-bar-1.component.css'],
})
export class ChartBar1Component implements OnInit {
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
						label: 'Tons',
						backgroundColor: "rgba(23, 162, 184, 0.75)",
						data: [ 293.13, 291.11 ]
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
				/*
				title: {
					display: false,
				},
				tooltips: {
					intersect: false,
					mode: 'nearest',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},*/
				legend: {
					display: false
				},
				// responsive: true,
				// maintainAspectRatio: false,
				// barRadius: 4,
				scales: {
					/*
					xAxes: [{
						display: false,
						gridLines: false,
						stacked: true
					}],*/
					yAxes: [{
						// display: false,
						// stacked: true,
						// gridLines: false
						ticks: {
							min: 275,
							max: 300
						}
					}]
				}/*,
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				}*/
			}
		});
	}
}
