// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-charthbar1',
	templateUrl: './chart-hbar-1.component.html',
	styleUrls: ['./chart-hbar-1.component.css'],
})
export class ChartHbar1Component implements OnInit {
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
				labels: [
					'2001', '2002', '2003', '2004', '2005', '2006',
					'2305', '2308', '2350', 'K2084', 'L2816'
				],
				datasets: [
					{
						label: 'Tons',
						backgroundColor: "rgba(23, 162, 184, 0.75)",
						data: [
							293.19, 292.01, 293.95, 291.85, 295.32,
							292.54, 297.22, 290.64, 296.71, 290, 292.38
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
			type: 'horizontalBar',
			data: this.data,
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						ticks: {min: 270, max: 310}
					}]
				}
			}
		});
	}
}
