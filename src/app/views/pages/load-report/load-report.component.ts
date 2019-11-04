import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {LoadReportFilterModel} from '../../../shared/models/filtroProductividadCicloCarguio.model';
import {GraficosService} from '../../../shared/services/graficos.service';
import {AuthService} from '../../../shared/services/auth.service';
import {environment} from "../../../../environments/environment";


@Component({
	selector: 'kt-load-report',
	templateUrl: './load-report.component.html',
	styleUrls: ['./load-report.component.scss']
})
export class LoadReportComponent implements OnInit {

	public imgLogoKomatsu = 'assets/komatsu.jpg';
	public imgLogoSierraGorda = 'assets/sierraGorda.jpg';
	public actualizarGrafico: boolean;

	public loadingGrafico1 = false;
	public loadingGrafico2 = false;
	public loadingGrafico3 = false;
	public loadingGrafico4 = false;
	public loadingGrafico5 = false;
	public loadingGrafico6 = false;
	public loadingGrafico7 = false;

	public grafico1: any = null; // mixed plot
	public grafico2: any = null; // bar chart
	public grafico3: any = null; // bar chart
	public grafico4: any = null; // horizontal bar chart
	public grafico5: any = null; // horizontal bar chart
	public grafico6: any = null; // scatter plot
	public grafico7: any = null; // scatter plot

	public scorcard1: any = null;
	public scorcard2: any = null;
	public scorcard3: any = null;
	public scorcard4: any = null;
	public scorcard5: any = null;

	// Page 2
	public loadingPage2HorizontalBarChart1 = false;
	public loadingPage2HorizontalBarChart2 = false;
	public loadingPage2PieChart1 = false;
	public loadingPage2PieChart2 = false;
	public loadingPage2PieChart3 = false;
	public loadingPage2Table1 = false;
	public loadingPage2Table2 = false;
	public loadingPage2Table3 = false;
	public loadingPage2Table4 = false;

	public graph8: any = null; // pie
	public graph9: any = null; // pie
	public graph10: any = null; // pie
	public graph11: any = null; // horizontal bar chart
	public graph12: any = null; // horizontal bar chart
	public scorcard6: any = null;

	idReport: number = 0;

	survey: string;


	constructor(private graficosService: GraficosService,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private authService: AuthService,
	) {
		this.actualizarGrafico = false;
		// If KCH reports are not visited (road condition, load and operationol practices)
		// sets language to 'es'
		let visitedKchReports = localStorage.getItem('visited-kch-reports');
		if (!visitedKchReports) {
			this.translate.use('es');
			localStorage.setItem('language', 'es');
			localStorage.setItem('visited-kch-reports', 'es');
		}
	}

	public ngOnInit() {
		this.idReport = Number(this.route.snapshot.paramMap.get('idReport'));
		this.initPage1Scorcard();
		this.initPage1MixedChart();
		this.initPage1BarCharts();
		this.initPage1HorizontalBarCharts();
		this.initPage1ScatterCharts();
		this.initPage2Scorcard();
		this.initPage2PieCharts();
		this.initPage2HorizontalBarCharts();
		this.loadSurvey();
	}

	loadSurvey() {
		this.authService.getCurrentReports().subscribe(
			reports => {
				let reportsBySociety = reports.filter(report => report.idSociety == 'KCH');
				let selectedReport = reportsBySociety[0].reports.filter(report => report.idReport == environment.id_reports.load_report);
				if (selectedReport[0]['surveys']) {
					this.survey = selectedReport[0]['surveys'];
				}
			}
		);
	}

	goToSurvey() {
		window.open(this.survey);
	}

	public onChangeFilterPage1(filtro: LoadReportFilterModel) {
		this.loadingGrafico1 = this.loadingGrafico2 = this.loadingGrafico3 = this.loadingGrafico4
			= this.loadingGrafico5 = this.loadingGrafico6 = this.loadingGrafico7 = true;
		this.loadPage1Scorcard(filtro);
		this.loadPage1MixedChart(filtro);
		this.loadPage1BarCharts(filtro);
		this.loadPage1HorizontalBarCharts(filtro);
		this.loadPage1ScatterCharts(filtro);
	}

	public onChangeFilterPage2(filtro: LoadReportFilterModel) {
		this.loadingPage2HorizontalBarChart1 = this.loadingPage2HorizontalBarChart2
			= this.loadingPage2PieChart1 = this.loadingPage2PieChart2 = this.loadingPage2PieChart3
			= this.loadingPage2Table1 = this.loadingPage2Table2 = this.loadingPage2Table3
			= this.loadingPage2Table4 = true;
		this.loadPage2Scorcard(filtro);
		this.loadPage2PieCharts(filtro);
		this.loadPage2HorizontalBarCharts(filtro);
		this.loadPage2TableCharts(filtro);
	}

	private initPage1Scorcard() {
		this.scorcard1 = this.scorcard2 = this.scorcard3 = this.scorcard4 = this.scorcard5 = {};
	}

	private loadPage1Scorcard(filtro: LoadReportFilterModel) {
		this.graficosService.getDataScorcard1(this.idReport, filtro).subscribe(r => {
			this.scorcard1 = {
				title: r['report'],
				num: r['data'],
			};
			this.actualizarGrafico = !this.actualizarGrafico;
		});
		this.graficosService.getDataScorcard2(this.idReport, filtro).subscribe(r => {
			this.scorcard2 = {
				title: r['report'],
				num: r['data'],
			};
			this.actualizarGrafico = !this.actualizarGrafico;
		});
		this.graficosService.getDataScorcard3(this.idReport, filtro).subscribe(r => {
			this.scorcard3 = {
				title: r['report'],
				num: r['data'],
			};
		});
		this.graficosService.getDataScorcard4(this.idReport, filtro).subscribe(r => {
			this.scorcard4 = {
				title: r['report'],
				num: r['data'],
			};
		});
		this.graficosService.getDataScorcard5(this.idReport, filtro).subscribe(r => {
			this.scorcard5 = {
				title: r['report'],
				num: r['data'],
			};
		});
	}

	private initPage1MixedChart() {
		this.grafico1 = {
			type: 'bar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_HISTOGRAM_Y1_LABEL'),
					type: 'line',
					borderColor: '#333333',
					data: null,
					fill: false,
					yAxisID: 'ciclos_acum',
				}, {
					label: this.translate.instant('LOAD.GRAPH_HISTOGRAM_Y2_LABEL'),
					type: 'bar',
					backgroundColor: 'rgb(205, 220, 57)',
					data: null,
					yAxisID: 'ciclos',
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				title: {
					display: true,
					text: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
					fontStyle: 'normal',
					position: 'bottom',
					padding: 0,
				},
				legend: {
					labels: {
						usePointStyle: true,
						boxWidth: 5,
						fontSize: 11,
						padding: 20
					}
				},
				scales: {
					yAxes: [
						{
							id: 'ciclos',
							position: 'left',
							type: 'linear',
							scaleLabel: {
								labelString: this.translate.instant('LOAD.GRAPH_HISTOGRAM_Y2_LABEL'),
								display: true,
							},
							ticks: {
								min: 0,
								max: 25,
								fontSize: 10,
							}
						},
						{
							id: 'ciclos_acum',
							position: 'right',
							type: 'linear',
							scaleLabel: {
								labelString: this.translate.instant('LOAD.GRAPH_HISTOGRAM_Y1_LABEL'),
								display: true,
							},
							ticks: {
								min: 0,
								max: 100,
								fontSize: 10,
							}
						},
					],
					xAxes: [{
						ticks: {
							fontSize: 10
						}
					}]
				},
				// plugins: { datalabels: false }
			}
		};
	}

	private loadPage1MixedChart(filtro: LoadReportFilterModel) {
		this.graficosService.getDataToneladasNetas(this.idReport, filtro).subscribe(
			(data) => {
				let dataBar: Array<number> = [];
				let dataLine: Array<number> = [];
				let labelGraphic = Object.keys(data['data']);
				labelGraphic.forEach(i => {
					dataBar.push(data['data'][i].porcAcum);
					dataLine.push(data['data'][i].porcCount);
				});
				this.grafico1.data.datasets[0].data = dataBar;
				this.grafico1.data.datasets[1].data = dataLine;
				this.grafico1.data.datasets[1].backgroundColor = 'rgb(205, 220, 57)';
				this.grafico1.data.labels = labelGraphic;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico1 = false;
			},
			err => {
				this.loadingGrafico1 = false;
			}
		);
	}

	private initPage1BarCharts() {
		this.grafico2 = {
			type: 'bar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
						},
						ticks: { min: 275, max: 300, fontSize: 10 }
					}],
					xAxes: [{
						ticks: { fontSize: 10 }
					}]
				}
			}
		};
		this.grafico3 = {
			type: 'bar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
						},
						ticks: { min: 275, max: 300, fontSize: 10 }
					}],
					xAxes: [{
						ticks: { fontSize: 10 }
					}]
				}
			}
		};
	}

	private loadPage1BarCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataPromedioCargaJornada(this.idReport, filtro).subscribe(
			(data) => {
				let dataValues: Array<number> = [];
				let labelGraphic = Object.keys(data['data']);
				labelGraphic.forEach(i => {
					dataValues.push(data['data'][i]);
				});
				this.grafico2.data.datasets[0].data = dataValues;
				this.grafico2.data.datasets[0].backgroundColor = 'rgba(23, 162, 184, 0.75)';
				this.grafico2.data.labels = labelGraphic;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico2 = false;
			},
			err => {
				this.loadingGrafico2 = false;
			});
		this.graficosService.getDataPromedioCargaGrupoMinero(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<number> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				this.grafico3.data.labels = Object.keys(r['data']);
				this.grafico3.data.datasets[0].data = dataValues;
				this.grafico3.data.datasets[0].backgroundColor = 'rgba(220, 53, 69, 0.75)';
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico3 = false;
			},
			err => {
				this.loadingGrafico3 = false;
			});
	}

	private initPage1HorizontalBarCharts() {
		this.grafico4 = {
			type: 'horizontalBar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_NET_PAYLOAD'),
						},
						ticks: { min: 270, max: 310, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false }
			}
		};
		this.grafico5 = {
			type: 'horizontalBar',
			data: {
				labels: null,
				datasets: [{
					label: 'Pases',
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_PASS_ALLOC'),
						},
						ticks: { min: 3, max: 7, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false }
			}
		};
	}

	private loadPage1HorizontalBarCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataPromedioCargaCargadores(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<number> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				this.grafico4.data.labels = Object.keys(r['data']);
				this.grafico4.data.datasets[0].data = dataValues;
				this.grafico4.data.datasets[0].backgroundColor = 'rgba(23, 162, 184, 0.75)';
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico4 = false;
			},
			err => {
				this.loadingGrafico4 = false;
			});
		this.graficosService.getDataCantidadPasesCargadores(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<number> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				this.grafico5.data.labels = Object.keys(r['data']);
				this.grafico5.data.datasets[0].data = dataValues;
				this.grafico5.data.datasets[0].backgroundColor = 'rgba(220, 53, 69, 0.75)'; // red
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico5 = false;
			},
			err => {
				this.loadingGrafico5 = false;
			});
	}

	private initPage1ScatterCharts() {
		this.grafico6 = {
			type: 'scatter',
			data: {
				labels: null,
				datasets: [{
					labels: null,
					data: null,
					backgroundColor: `rgba(23, 162, 184, 0.75)`,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom',
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_LEFT_RIGHT'),
						},
						ticks: { min: -2, max: 2, fontSize: 10 }
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_FRONT_BACK'),
						},
						ticks: { min: -2, max: 2, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false },
				tooltips: {
					callbacks: {
						title: this.formatterScatterTooltipCaexTitle,
						label: this.formatterScatterTooltipLabel,
					}
				}
			}
		};
		this.grafico7 = {
			type: 'scatter',
			data: {
				datasets: [{
					data: null,
					backgroundColor: `rgba(23, 162, 184, 0.75)`,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom',
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_LEFT_RIGHT'),
						},
						ticks: { min: -2, max: 2, fontSize: 10 }
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_FRONT_BACK'),
						},
						ticks: { min: -2, max: 2, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false },
				tooltips: {
					callbacks: {
						title: this.formatterScatterTooltipCicloTitle,
						label: this.formatterScatterTooltipLabel,
					}
				}
			}
		};
	}

	private loadPage1ScatterCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataPresionSupensionesCaex(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<number> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				this.grafico6.data.datasets[0].labels = Object.keys(r['data']);
				this.grafico6.data.datasets[0].data = dataValues;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico6 = false;
			}, e => {
				this.loadingGrafico6 = false;
			});
		this.graficosService.getDataPresionSupensionesCiclo(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<any> = [];
				let labels: Array<any> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push({
						x: r['data'][o].x_stow_avg,
						y: r['data'][o].y_stow_avg,
					});
					labels.push({
						ia: r['data'][o].anguloInclinacion,
						readTime: r['data'][o].readTime,
						equipmentName: r['data'][o].equipmentName,
					});
				});
				this.grafico7.data.datasets[0].labels = labels;
				this.grafico7.data.datasets[0].data = dataValues;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingGrafico7 = false;
			}, e => {
				this.loadingGrafico7 = false;
			});
	}

	private initPage2Scorcard() {
		this.scorcard6 = {};
	}

	private loadPage2Scorcard(filtro: LoadReportFilterModel) {
		this.graficosService.getDataScorcard6(this.idReport, filtro).subscribe(r => {
			this.scorcard6 = {
				title: r['report'],
				num: r['data'],
			};
		});
	}

	private initPage2PieCharts() {
		this.graph8 = {
			type: 'pie',
			data: {
				labels: null, // dataLabels,
				datasets: [{
					data: null, // dataValues,
					backgroundColor: ['#edf8e9', '#bae4b3', '#74c476', '#238b45']
				}]
			},
			options: {
				legend: {
					display: true,
					position: 'bottom',
					labels: { fontSize: 10, fontColor: '#999', padding: 5, boxWidth: 10 }
				},
				/*
				plugins: {
					datalabels: {
						formatter: this.formatterPieChartLabelPercentage,
						color: '#003e0c',
					}
				},*/
				tooltips: {
					callbacks: {
						title: this.formatterPieChartTooltipTitle,
						label: this.formatterPieChartTooltipLabel,
					}
				}
			}
		};
		this.graph9 = {
			type: 'pie',
			data: {
				labels: null, // dataLabels,
				datasets: [{
					data: null, // dataValues,
					backgroundColor: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15']
				}]
			},
			options: {
				legend: {
					display: true,
					position: 'bottom',
					labels: { fontSize: 10, fontColor: '#999', padding: 5, boxWidth: 10 }
				},
				/*
				plugins: {
					datalabels: {
						formatter: this.formatterPieChartLabelPercentage,
						color: '#470609',
					}
				},*/
				tooltips: {
					callbacks: {
						title: this.formatterPieChartTooltipTitle,
						label: this.formatterPieChartTooltipLabel,
					}
				}
			}
		};
		this.graph10 = {
			type: 'pie',
			data: {
				labels: null, // dataLabels,
				datasets: [{
					data: null, // dataValues,
					backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']
				}]
			},
			options: {
				legend: {
					display: true,
					position: 'bottom',
					labels: { fontSize: 10, fontColor: '#999', padding: 5, boxWidth: 10 }
				},/*
				plugins: {
					datalabels: {
						formatter: this.formatterPieChartLabelPercentage,
						color: '#04274b',
					}
				},*/
				tooltips: {
					callbacks: {
						title: this.formatterPieChartTooltipTitle,
						label: this.formatterPieChartTooltipLabel,
					}
				}
			}
		};
	}

	private loadPage2PieCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataPieChart1(this.idReport, filtro).subscribe(
			r => {
				let dataValues = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				let dataLabels = [];
				Object.keys(r['options']).forEach(o => {
					dataLabels.push(r['options'][o]);
				});
				this.graph8.data.labels = dataLabels;
				this.graph8.data.datasets[0].data = dataValues;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingPage2PieChart1 = false;
			}, e => {
				this.loadingPage2PieChart1 = false;
			});
		this.graficosService.getDataPieChart2(this.idReport, filtro).subscribe(
			r => {
				let dataValues = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				let dataLabels = [];
				Object.keys(r['options']).forEach(o => {
					dataLabels.push(r['options'][o]);
				});
				this.graph9.data.labels = dataLabels;
				this.graph9.data.datasets[0].data = dataValues;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingPage2PieChart2 = false;
			}, e => {
				this.loadingPage2PieChart2 = false;
			});
		this.graficosService.getDataPieChart3(this.idReport, filtro).subscribe(
			r => {
				let dataValues = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				let dataLabels = [];
				Object.keys(r['options']).forEach(o => {
					dataLabels.push(r['options'][o]);
				});
				this.graph10.data.labels = dataLabels;
				this.graph10.data.datasets[0].data = dataValues;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingPage2PieChart3 = false;
			}, e => {
				this.loadingPage2PieChart3 = false;
			});
	}

	private initPage2HorizontalBarCharts() {
		this.graph11 = {
			type: 'horizontalBar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_LABEL_EFFECT_INDEX'),
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_EFFECT_INDEX'),
						},
						ticks: { min: 0, max: 1, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false }
			}
		};
		this.graph12 = {
			type: 'horizontalBar',
			data: {
				labels: null,
				datasets: [{
					label: this.translate.instant('LOAD.GRAPH_LABEL_ACULAT_TIME'),
					data: null,
					backgroundColor: null,
				}]
			},
			options: {
				legend: { display: false },
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.translate.instant('LOAD.GRAPH_LABEL_ACULAT_TIME'),
						},
						ticks: { min: 0, max: 1, fontSize: 10 }
					}]
				},
				// plugins: { datalabels: false }
			}
		};
	}

	private loadPage2HorizontalBarCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataIndiceEfectividad(this.idReport, filtro).subscribe(
			r => {
				let dataValues: Array<number> = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				// Define max value and step size for axis, based in max value returned
				let maxBoundaryValue = 5;
				let stepSize = 1;
				if (r['options'].max < 1) {
					maxBoundaryValue = Math.ceil(r['options'].max / 0.05) * 0.05;
					stepSize = 0.25;
				} else {
					maxBoundaryValue = (Math.floor(r['options'].max / 5) + 1) * 5;
					stepSize = Math.floor(r['options'].max / 3);
				}
				this.graph11.data.labels = Object.keys(r['data']);
				this.graph11.data.datasets[0].data = dataValues;
				this.graph11.data.datasets[0].backgroundColor = 'rgba(23, 162, 184, 0.75)'; // blue
				this.graph11.options.scales.xAxes[0].ticks.min = 0;
				this.graph11.options.scales.xAxes[0].ticks.max = maxBoundaryValue;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingPage2HorizontalBarChart1 = false;
			}, e => {
				this.loadingPage2HorizontalBarChart1 = false;
			});
		this.graficosService.getDataTiempoAculatamiento(this.idReport, filtro).subscribe(
			r => {
				let dataValues = [];
				Object.keys(r['data']).forEach(o => {
					dataValues.push(r['data'][o]);
				});
				// Define max value and step size for axis, based in max value returned
				let maxBoundaryValue = 5;
				let stepSize = 1;
				if (r['options'].max < 1) {
					maxBoundaryValue = Math.ceil(r['options'].max / 0.05) * 0.05;
					stepSize = 0.25;
				} else {
					maxBoundaryValue = (Math.floor(r['options'].max / 5) + 1) * 5;
					stepSize = Math.floor(r['options'].max / 3);
				}
				this.graph12.data.labels = Object.keys(r['data']);
				this.graph12.data.datasets[0].data = dataValues;
				this.graph12.data.datasets[0].backgroundColor = 'rgba(220, 53, 69, 0.9)'; // red
				this.graph12.options.scales.xAxes[0].ticks.max = maxBoundaryValue;
				this.graph12.options.scales.xAxes[0].ticks.stepSize = stepSize;
				this.actualizarGrafico = !this.actualizarGrafico;
				this.loadingPage2HorizontalBarChart2 = false;
			}, e => {
				this.loadingPage2HorizontalBarChart2 = false;
			});
	}

	private loadPage2TableCharts(filtro: LoadReportFilterModel) {
		this.graficosService.getDataTableO1(this.idReport, filtro).subscribe(
			r => {
				let tipos = ['A0', 'C0'];
				let colorsByTipo = {
					'A0': [220, 53, 69],
					'C0': [23, 162, 184]
				};
				let table = document.getElementsByClassName('reportLoadO1Table')[0].getElementsByTagName('table')[0];
				// populate table's header
				let thead = table.getElementsByTagName('thead')[0];
				thead.innerText = '';
				let thRow1 = thead.insertRow();
				thRow1.className = 'thead1';
				let th1Cell1 = thRow1.insertCell();
				th1Cell1.setAttribute('rowspan', '2');
				th1Cell1.setAttribute('valign', 'bottom');
				th1Cell1.innerText = 'Turno';
				let thRow2 = thead.insertRow();
				thRow2.className = 'thead2';
				r['options'].palas.forEach(pala => {
					let th1Cell = thRow1.insertCell();
					th1Cell.setAttribute('colspan', '2');
					th1Cell.innerText = pala;
					let th2Cell1 = thRow2.insertCell();
					th2Cell1.innerText = 'A0';
					let th2Cell2 = thRow2.insertCell();
					th2Cell2.innerText = 'C0';
				});
				// populate table's body
				let tbody = table.getElementsByTagName('tbody')[0];
				tbody.innerText = '';
				r['options'].turnos.forEach(turno => {
					let row = tbody.insertRow();
					let th = row.insertCell();
					th.className = 'font-weight-bold';
					th.innerText = turno;
					r['options'].palas.forEach(pala => {
						tipos.forEach(tipo => {
							let cell = row.insertCell();
							cell.className = 'text-right';
							let value = '-';
							if (r['data'][pala][tipo][turno] !== undefined) {
								value = r['data'][pala][tipo][turno];
								// Paint each cell (greather than 0; exclude totals row) using max number
								let _v = parseInt(value, 10);
								if (_v > 0) {
									let opacity = (_v / r['options'].max[tipo] * 100 / 90) + 0.1;
									cell.style.backgroundColor = `rgba(${colorsByTipo[tipo].join(', ')}, ${opacity})`;
								}
							}
							cell.setAttribute('title', value);
							cell.innerText = value;
						});
					});
				});
				// populate TFOOT
				let tfoot = table.getElementsByTagName('tfoot')[0];
				tfoot.innerText = '';
				let tfRow = tfoot.insertRow();
				let tfCell1 = tfRow.insertCell();
				tfCell1.className = 'font-weight-bold';
				tfCell1.innerText = 'T';
				r['options'].palas.forEach(pala => {
					tipos.forEach(tipo => {
						let tfCell = tfRow.insertCell();
						tfCell.className = 'text-right font-weight-bold';
						tfCell.setAttribute('title', r['data'][pala][tipo].total);
						tfCell.innerText = r['data'][pala][tipo].total;
					});
				});
				this.loadingPage2Table1 = false;
			}, e => {
				this.loadingPage2Table1 = false;
			});
		this.graficosService.getDataTableO2(this.idReport, filtro).subscribe(
			r => {
				let table = document.getElementsByClassName('reportLoadO2Table')[0].getElementsByTagName('table')[0];
				let tbody = table.getElementsByTagName('tbody')[0];
				// Clean current data
				tbody.innerText = '';
				// Create cells data inside <tbody>
				let i = 1;
				r['data'].forEach(item => {
					let oRow = tbody.insertRow();
					let c1 = oRow.insertCell();
					c1.innerText = i.toString();
					let c2 = oRow.insertCell();
					c2.innerText = item.operador;
					let c3 = oRow.insertCell();
					c3.innerText = item.indice;
					c3.className = 'text-right';
					c3.setAttribute('width', '5%');
					let c4 = oRow.insertCell();
					let progress = document.createElement('div');
					progress.className = 'progress';
					let progressBar = document.createElement('div');
					progressBar.className = 'progress-bar';
					progressBar.setAttribute('min', '0');
					progressBar.setAttribute('max', '100');
					progressBar.style.width = `${item.indice * 100}%`;
					progressBar.style.backgroundColor = `rgb(220, 53, 69)`;
					progress.appendChild(progressBar);
					c4.appendChild(progress);
					let c5 = oRow.insertCell();
					c5.innerText = item.ciclos.toString();
					c5.className = 'text-right';
					i++;
					this.loadingPage2Table2 = false;
				}, e => {
					this.loadingPage2Table2 = false;
				});
			});
		this.graficosService.getDataTableO3(this.idReport, filtro).subscribe(
			r => {
				let table = document.getElementsByClassName('reportLoadO3Table')[0].getElementsByTagName('table')[0];
				let thead = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
				thead.innerText = '';
				let th1 = thead.insertCell();
				th1.innerText = 'CAEX';
				r['options'].turnos.forEach(turno => {
					let th = thead.insertCell();
					th.innerText = turno;
				});
				let thn = thead.insertCell();
				thn.innerText = 'Total';
				// populate table contents
				let tbody = table.getElementsByTagName('tbody')[0];
				tbody.innerText = '';
				r['totals'].caex.forEach(totalCaex => {
					let caex = totalCaex[0];
					let row = tbody.insertRow();
					let th = row.insertCell();
					th.className = 'font-weight-bold';
					th.innerText = caex;
					r['options'].turnos.forEach(turno => {
						let cell = row.insertCell();
						cell.className = 'text-right';
						if (r['data'][caex][turno] !== undefined) {
							let value = r['data'][caex][turno];
							let opacity = value < 0.04 ? 0.04 : value;
							cell.style.backgroundColor = `rgba(220, 53, 69, ${opacity})`;
							cell.setAttribute('title', value);
							cell.innerText = value;
						} else {
							cell.innerText = '-';
						}
					});
					let lastCell = row.insertCell();
					lastCell.className = 'text-right font-weight-bold';
					lastCell.innerText = totalCaex[1];
				});
				let tfoot = table.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0];
				tfoot.innerText = '';
				let tf1 = tfoot.insertCell();
				tf1.innerText = 'Total';
				r['options'].turnos.forEach(turno => {
					let tf = tfoot.insertCell();
					tf.className = 'text-right font-weight-bold';
					tf.innerText = r['totals'].turnos[turno];
				});
				let tfx = tfoot.insertCell();
				tfx.className = 'text-right';
				tfx.innerText = r['totals'].total;
				this.loadingPage2Table3 = false;
			}, e => {
				this.loadingPage2Table3 = false;
			});
		this.graficosService.getDataTableO6(this.idReport, filtro).subscribe(
			r => {
				let table = document.getElementsByClassName('reportLoadO6Table')[0].getElementsByTagName('table')[0];
				let tbody = table.getElementsByTagName('tbody')[0];
				tbody.innerText = '';
				let i = 1;
				r['options'].palas.forEach(pala => {
					let item = r['data'][pala];
					if (item.r > 0) {
						let row = tbody.insertRow();
						let c1 = row.insertCell();
						c1.innerText = i.toString();
						let c2 = row.insertCell();
						c2.className = 'font-weight-bold';
						c2.innerText = pala;
						let c3 = row.insertCell();
						c3.className = 'text-right';
						c3.innerText = item.np;
						let c4 = row.insertCell();
						c4.className = 'text-right';
						c4.innerText = item.r;
						let c5 = row.insertCell();
						c5.className = 'text-right';
						c5.innerText = item.pt;
						let opacity = item.pt > 0 ? Math.round(item.pt / r['options'].max.pt * 100) / 100 : 0.04;
						c5.style.backgroundColor = `rgba(220, 53, 69, ${opacity})`;
					}
					i++;
				});
				let tfoot = table.getElementsByTagName('tfoot')[0];
				tfoot.innerText = '';
				let tfRow = tfoot.insertRow();
				tfRow.className = 'font-weight-bold';
				let tfCell1 = tfRow.insertCell();
				let tfCell2 = tfRow.insertCell();
				tfCell2.innerText = 'Total';
				let tfCell3 = tfRow.insertCell();
				tfCell3.className = 'text-right';
				tfCell3.innerText = r['totals'].np;
				let tfCell4 = tfRow.insertCell();
				tfCell4.className = 'text-right';
				tfCell4.innerText = r['totals'].r;
				let tfCell5 = tfRow.insertCell();
				tfCell5.className = 'text-right';
				tfCell5.innerText = r['totals'].pt;
				this.loadingPage2Table4 = false;
			}, e => {
				this.loadingPage2Table4 = false;
			});
	}

	private formatterPieChartLabelPercentage(value, ctx) {
		let datasets = ctx.chart.data.datasets;
		if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
			let sum = datasets[0].data.reduce((a, b) => a + b, 0);
			return Math.round((value / sum) * 100) + '%';
		}
		return 'null';
	}

	private formatterPieChartTooltipTitle(tooltipItem, data) {
		return data.labels[tooltipItem[0]['index']];
	}

	private formatterPieChartTooltipLabel(tooltipItem, data) {
		let sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
		let value = data.datasets[0].data[tooltipItem['index']];
		let percentage = Math.round((value / sum) * 100);
		return `${value} (${percentage} %)`;
	}

	private formatterScatterTooltipCaexTitle(tooltipItem, data) {
		if (tooltipItem[0] !== undefined && Object.keys(tooltipItem[0]).includes('index')) {
			let i = tooltipItem[0].index;
			return `Equipo: ${data.datasets[0].labels[i]}`;
		}
		return;
	}

	private formatterScatterTooltipCicloTitle(tooltipItem, data) {
		let i = tooltipItem[0].index;
		let ia = data.datasets[0].labels[i].ia;
		let ciclos = data.datasets[0].labels[i].equipmentName + ' ' + data.datasets[0].labels[i].readTime;
		let _txtLabel1 = 'Ángulo de inclinación'; // this.translate.instant('LOAD.TABLE_LABEL_INCL_ANGLE');
		let _txtLabel2 = 'Ciclos'; // this.translate.instant('LOAD.CYCLES');
		return `${_txtLabel1}: ${ia} \n${_txtLabel2}: ${ciclos}`;
	}

	private formatterScatterTooltipLabel(tooltipItem, data) {
		let _txtLabel1 = 'Izquierda / Derecha'; // this.translate.instant('LOAD.TABLE_LABEL_LEFT_RIGHT');
		let _txtLabel2 = 'Trasera / Frontal'; // this.translate.instant('LOAD.TABLE_LABEL_FRONT_BACK');
		return [`${_txtLabel1}: ${tooltipItem.xLabel}`, `${_txtLabel2}: ${tooltipItem.yLabel}`];
		// return `${_txtLabel1}: ${tooltipItem.xLabel} \n${_txtLabel2}: ${tooltipItem.yLabel}`;
	}

}
