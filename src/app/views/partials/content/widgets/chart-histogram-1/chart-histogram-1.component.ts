// Angular
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// Charts
import { Chart } from 'chart.js';

@Component({
	selector: 'kt-charthistogram1',
	templateUrl: './chart-histogram-1.component.html',
	styleUrls: ['./chart-histogram-1.component.css'],
})
export class ChartHistogram1Component implements OnInit {
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
					"<200", "[200, 210)", "[210, 220)", "[220, 230)", "[230, 240)",
					"[240, 250)", "[250, 260)", "[260, 270)", "[270, 280)",
					"[280, 290)", "[290, 300)", "[300, 310)", "[310, 320)",
					"[320, 330)", "[330, 340)", "[340, 350)", "[350, 360)",
					"[360, 370)", "[>370]"
				],
				datasets: [
					{
						label: '% acumulado de Ciclos',
						type: "line",
						borderColor: "#000000",
						fill: false,
						data: [ 0.32, 0.51, 0.63, 0.76, 1.19, 2.59, 4.56, 10.07, 21.51, 36.26, 57.52, 77.06, 88.76, 96.19, 98.86, 99.64, 99.91, 100, 100 ]
					}, {
						label: "% de Ciclos",
						type: "bar",
						backgroundColor: "rgba(205, 220, 57, 0.9)",
						data: [ 0.49, 0.27, 0.15, 0.17, 0.52, 1.61, 2.22, 6.03, 12.11, 15.2, 21.26, 18.86, 11, 6.77, 2.35, 0.67, 0.22, 0.07, 0]
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
				responsive: false,
				maintainAspectRatio: false,
				title: {
					display: false,
				},
				legend: {
					display: false
				},
				scales: {
					/*
					xAxes: [{
						display: false,
						gridLines: false,
						stacked: true
					}],*/
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: "Ciclos"
						},
						ticks: {
							min: 0,
							max: 100
						}
					}]
				}
			}
		});
	}
}
