import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoadReportFilterModel} from '../../../../shared/models/filtroProductividadCicloCarguio.model';
import {GraficosService} from '../../../../shared/services/graficos.service';

@Component({
	selector: 'app-filter-page-1',
	templateUrl: './filter-page-1.component.html',
	styleUrls: ['./filter-page-1.component.scss']
})
export class FilterPage1Component implements OnInit {
	@Output() public changeFilter = new EventEmitter<LoadReportFilterModel>();

	@Input() public reportPage: number;

	_idReport: number;
	@Input()
	set idReport(_idReport: number) {
		this._idReport = _idReport;
	}

	public filterParams: LoadReportFilterModel;
	public equipos: any = null;
	public palas: any = null;
	public turnos: any = null;
	public caexs: any = null;
	public jornadas: any = null;
	public operadores: any = null;
	public velocidades: any = null;
	public startDate = new Date();
	public endDate = new Date();
	public loadingFilterPage1 = true;
	public loadingFilterPage2 = true;

	constructor(private graficosService: GraficosService) {}

	ngOnInit() {
		let now = new Date();
		this.startDate.setDate(now.getDate() - 6);
		this.endDate.setDate(now.getDate() - 1);
		this.filterParams = {
			fecha1: this.dateToStringYmd(this.startDate),
			fecha2: this.dateToStringYmd(this.endDate),
			equipo: null,
			pala: null,
			turno: null,
			caex: null,
			jornada: null,
			operador: null,
			velocidad: null,
		};
		this.filterData();
	}

	public filterData() {
		this.filterParams.fecha1 = this.dateToStringYmd(this.startDate);
		this.filterParams.fecha2 = this.dateToStringYmd(this.endDate);
		if (this.reportPage === 1) {
			this.loadingFilterPage1 = true;
		}
		if (this.reportPage === 2) {
			this.loadingFilterPage2 = true;
		}
		this.loadMenuFilter(this.filterParams, this.reportPage); // carga datos del filtro
		this.changeFilter.emit(this.filterParams);
	}

	private loadMenuFilter(filtro: LoadReportFilterModel, reportPage: number) {
		let page = '';
		if (reportPage === 1) {
			page = 'productividad';
		}
		if (reportPage === 2) {
			page = 'tiempo';
		}
		this.graficosService.getDataOptions(this._idReport, filtro, page).subscribe(
			data => {
				if (Object.keys(data['data']).includes('equipo')) {
					this.equipos = Object.keys(data['data'].equipo);
				}
				if (Object.keys(data['data']).includes('pala')) {
					this.palas = Object.keys(data['data'].pala);
				}
				if (Object.keys(data['data']).includes('turno')) {
					this.turnos = Object.keys(data['data'].turno);
				}
				if (Object.keys(data['data']).includes('caex')) {
					this.caexs = Object.keys(data['data'].caex);
				}
				if (Object.keys(data['data']).includes('jornada')) {
					this.jornadas = Object.keys(data['data'].jornada);
				}
				if (Object.keys(data['data']).includes('operador')) {
					this.operadores = Object.keys(data['data'].operador);
				}
				if (Object.keys(data['data']).includes('velocidad')) {
					this.velocidades = Object.keys(data['data'].velocidad);
				}
				if (reportPage === 1) {
					this.loadingFilterPage1 = false;
				}
				if (reportPage === 2) {
					this.loadingFilterPage2 = false;
				}
			},
			err => {
				if (reportPage === 1) {
					this.loadingFilterPage1 = false;
				}
				if (reportPage === 2) {
					this.loadingFilterPage2 = false;
				}
			}
		);
	}

	private dateToStringYmd(date: Date) {
		let y = date.getFullYear();
		let m = `0${date.getMonth() + 1}`.substr(-2);
		let d = `0${date.getDate()}`.substr(-2);
		return `${y}-${m}-${d}`;
	}
}
