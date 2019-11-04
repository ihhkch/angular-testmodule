import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { RoadConditionService } from '../../../shared/services/road-condition.service';
import { CriticalZone } from '../../../shared/models/critical-zone';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';



@Component({
	selector: 'kt-road-condition-report',
	templateUrl: './road-condition-report.component.html',
	styleUrls: ['./road-condition-report.component.scss'],
})
export class RoadConditionReportComponent implements OnInit {

	endDate = new Date();
	startDate = new Date();
	criticalZonesMap: any = '';
	topCriticalZonesMap: any = '';
	displayedColumns: string[] = ['zone', 'zoneName', 'xCoordinate', 'yCoordinate', 'zCoordinate', 'xDelta', 'yDelta'];
	dataSource = new MatTableDataSource<CriticalZone>();
	loadingCriticalZonesMap = true;
	loadingTopCriticalZonesMap = true;
	loadingCriticalZonesTable = true;
	loadingHistoricalEvolutionTable = true;
	survey: string;
	loadedTab2 = false;

	constructor(
		private roadConditionService: RoadConditionService,
		private authService: AuthService,
		private translate: TranslateService,
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
		this.startDate.setDate(this.endDate.getDate() - 1);
		this.loadSurvey();
	}

	loadSurvey() {
		this.authService.getCurrentReports().subscribe(
			reports => {
				let reportsBySociety = reports.filter(report => report.idSociety == 'KCH');
				let selectedReport = reportsBySociety[0].reports.filter(report => report.idReport == environment.id_reports.road_report);
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
		this.loadData(0);
	}

	onLinkClick(event: MatTabChangeEvent) {
		if (event.index === 1 && this.loadedTab2 === false) {
			this.loadData(event.index);
			this.loadedTab2 = true;
		}
	}

	loadData(tabIndex) {
		if (tabIndex === 0) {
			this.loadingTopCriticalZonesMap = this.loadingCriticalZonesTable = true;
			this.loadTopCriticalZonesMap();
			this.loadCriticalZonesTable();
		}
		if (tabIndex === 1) {
			this.loadingCriticalZonesMap = this.loadingTopCriticalZonesMap = this.loadingHistoricalEvolutionTable = true;
			this.loadCriticalZonesMap();
			this.loadTopCriticalZonesMap();
			this.loadHistoricalEvolutionTable();
		}
	}

	loadCriticalZonesMap() {
		this.roadConditionService.getCritialZonesMap(this.getStartDate()).subscribe(
			result => {
				this.criticalZonesMap = result;
				this.loadingCriticalZonesMap = false;
			},
			err => {
				this.loadingCriticalZonesMap = false;
			}
		);
	}

	loadTopCriticalZonesMap() {
		this.roadConditionService.getTopCritialZonesMap(this.getStartDate()).subscribe(
			result => {
				this.topCriticalZonesMap = result;
				this.loadingTopCriticalZonesMap = false;
			},
			err => {
				this.loadingTopCriticalZonesMap = false;
			}
		);
	}

	loadCriticalZonesTable() {
		this.roadConditionService.getCritialZonesTable(this.getStartDate()).subscribe(
			criticalZones => {
				this.dataSource.connect().next(criticalZones);
				this.loadingCriticalZonesTable = false;
			},
			err => {
				this.loadingCriticalZonesTable = false;
			}
		);
	}

	loadHistoricalEvolutionTable() {
		let max = 0;
		const parseData = (results) => {
			results.data.forEach(rows => {
				rows.forEach(cell => {
					max = max < cell ? cell : max;
				});
			});
			return results;
		};

		const drawTitles = results => {
			let box = document.getElementById(boxId);
			if (box === null) {
				return;
			}
			let table = box.getElementsByTagName('table')[0];
			let thead = table.getElementsByTagName('thead')[0];
			// Título de la tabla
			let th = document.createElement('th');
			th.colSpan = results.titles.cols.length + 1;
			th.innerText = thead.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML;
			thead.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].remove();
			thead.getElementsByTagName('tr')[0].appendChild(th);
			// Títulos de columnas
			let col = 0;
			results.titles.cols.forEach(fecha => {
				let td = document.createElement('th');
				td.innerHTML = fecha;
				thead.getElementsByTagName('tr')[1].appendChild(td);
				col++;
			});
			// Títulos de filas
			results.titles.rows.forEach(zona => {
				let tr = document.createElement('tr');
				let td = tr.insertCell();
				td.innerText = zona;
				table.getElementsByTagName('tbody')[0].appendChild(tr);
			});
		};

		const drawGraph = (results) => {
			let box = document.getElementById(boxId);
			if (box === null) {
				return;
			}
			let table = box.getElementsByTagName('table')[0];
			let tbody = table.getElementsByTagName('tbody')[0];
			for (let i = 0; i < results.data.length; i++) {
				let tr = tbody.getElementsByTagName('tr')[i];
				for (let j = 0; j < results.data[i].length; j++) {
					let td = tr.insertCell();
					td.innerText = results.data[i][j] !== null ? results.data[i][j] : '-';
					tr.appendChild(td);
				}
			}
		};

		const decorateTable = () => {
			let box = document.getElementById(boxId);
			if (box === null) {
				return;
			}
			let table = box.getElementsByTagName('table')[0];
			let thead = table.getElementsByTagName('thead')[0];
			for (let i = 0, row; row = thead.rows[i]; i++) {
				for (let j = 0, col; col = row.cells[j]; j++) {
					if (i > 0 && j > 0) {
						col.className = 'text-right';
					}
				}
			}
			let tbody = table.getElementsByTagName('tbody')[0];
			for (let i = 0, row; row = tbody.rows[i]; i++) {
				for (let j = 0, col; col = row.cells[j]; j++) {
					if (j > 0) {
						col.className = 'text-right';
						if (col.innerText !== '-') {
							let n = parseFloat(col.innerText);
							let pc = Math.round(n / max * 100) / 100;
							col.style.background = `rgba(${RGB_RED.join(', ')}, ${pc})`;
							col.title = n;
						}
					}
				}
			}
		};

		const cleanTable = () => {
			let box = document.getElementById(boxId);
			if (box === null) {
				return;
			}
			let table = box.getElementsByTagName('table')[0];
			let thead = table.getElementsByTagName('thead')[0];
			// THEAD tiene 2 TR. En ambos hay que eliminar todas las celdas excepto la primera
			let tr1 = thead.rows[0];
			tr1.cells[0].colSpan = null;
			let numCells1 = tr1.cells.length;
			for (let i = 1; i < numCells1; i++) {
				tr1.removeChild(tr1.cells[1]);
			}
			let tr2 = thead.rows[1];
			let numCells2 = tr2.cells.length;
			for (let i = 1; i < numCells2; i++) {
				tr2.removeChild(tr2.cells[1]);
			}
			let tbody = table.getElementsByTagName('tbody')[0];
			tbody.innerText = '';
		};

		this.roadConditionService.getHistoricalEvolution(this.getStartDate()).subscribe(
			r => {
				cleanTable();
				parseData(r);
				drawTitles(r);
				drawGraph(r);
				decorateTable();
				this.loadingHistoricalEvolutionTable = false;
			},
			err => {
				this.loadingHistoricalEvolutionTable = false;
			}
		);
	}

	getColourToMap(grsev: number) {
		let i = this.criticalZonesMap.titles.indexOf(grsev);
		return "rgba(" + colors[i % 16][0] + "," + colors[i % 16][1] + "," + colors[i % 16][2] + ",0.8)";
	}
	getColourToTopMap(grsev: number) {
		let i = this.topCriticalZonesMap.titles.indexOf(grsev);
		return "rgba(" + colors[i % 16][0] + "," + colors[i % 16][1] + "," + colors[i % 16][2] + ",0.8)";
	}

	getDotTitle(datapoint, graph) {
		// graph = 'critical-zones' | 'top-critical-zones'
		let title1 = graph === 'top-critical-zones' ? 'Group_road_sev' : 'Severidad';
		let title2 = graph === 'top-critical-zones' ? 'EquipoGroupDay' : 'Equipo, Zona, Día';
		return `${title1}: ${datapoint.grsev} \n${title2}: ${datapoint.gday} \n \nEasting = ${datapoint.x} \nNorthing: ${datapoint.y}`;
	}


	getStartDate() {
		return this.startDate.toISOString().substring(0, 10);
	}

	filter() {
		this.loadData(0);
		this.loadData(1);
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

const boxId = 'historicalEvolutionTable';


const MIN_X = 160000;
const MAX_X = 168000;
const MIN_Y = 4468000;
const MAX_Y = 4474000;

const colors = [
	[255, 0, 41],
	[55, 126, 184],
	[102, 166, 30],
	[152, 78, 163],
	[0, 210, 213],
	[255, 127, 0],
	[175, 141, 0],
	[127, 128, 205],
	[179, 233, 0],
	[196, 46, 96],
	[166, 86, 40],
	[247, 129, 191],
	[141, 211, 199],
	[190, 186, 218],
	[251, 128, 144],
	[128, 177, 211],
];

const RGB_RED = [220, 53, 69];
