import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadReportFilterModel } from '../models/filtroProductividadCicloCarguio.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GraficosService {
    public static LOAD_API_ENDPOINT = environment.LOAD_API_ENDPOINT;

    constructor(private httpClient: HttpClient) { }

    public getDataOptions(idReport: number, filtros: LoadReportFilterModel, page: string) {
        let url = GraficosService.LOAD_API_ENDPOINT + `/api/v1/gestion/${page}/${idReport}/options?` + this.buildParams(filtros);
        return this.httpClient.get(url);
    }

	// Histograma de toneladas netas
    public getDataToneladasNetas(idReport: number, filtros: LoadReportFilterModel) {
        let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o1?' + this.buildParams(filtros);
        return this.httpClient.get(url);
	}

	// Promedio de carga por Jornada - bar chart
    public getDataPromedioCargaJornada(idReport: number, filtros: LoadReportFilterModel) {
        let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o2?' + this.buildParams(filtros);
        return this.httpClient.get(url);
	}

	// Promedio de carga por Grupos mineros - bar chart
	public getDataPromedioCargaGrupoMinero(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o3?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Promedio de carga por Cargadores - horizontal bar chart
	public getDataPromedioCargaCargadores(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o4?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Cantidad de pases por cargadores - horizontal bar chart
	public getDataCantidadPasesCargadores(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o5?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Distribución Presión de Suspensiones por CAEX - scatter plot
	public getDataPresionSupensionesCaex(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o6?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Distribución Presión de Suspensiones por Ciclo - scatter plot
	public getDataPresionSupensionesCiclo(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o7?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Scorcards
	public getDataScorcard1(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o8?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	public getDataScorcard2(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o9?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	public getDataScorcard3(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o10?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	public getDataScorcard4(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o11?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	public getDataScorcard5(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/productividad/' + idReport + '/o12?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// PAGE 2 Load Report ------------------------------------------------------

	// Scorcard
	public getDataScorcard6(idReport: number, filtros: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o10?' + this.buildParams(filtros);
		return this.httpClient.get(url);
	}

	// Pie charts
	public getDataPieChart1(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o7?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataPieChart2(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o8?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataPieChart3(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o9?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}

	// Tables (1, 2, 3, 6)
	public getDataTableO1(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o1?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataTableO2(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o2?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataTableO3(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o3?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataTableO6(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o6?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}

	// Horizontal Bar Graphs (4, 5)
	public getDataIndiceEfectividad(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o4?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}
	public getDataTiempoAculatamiento(idReport: number, filtro: LoadReportFilterModel) {
		let url = GraficosService.LOAD_API_ENDPOINT + '/api/v1/gestion/tiempo/' + idReport + '/o5?' + this.buildParams(filtro);
		return this.httpClient.get(url);
	}

	private buildParams(filtro: LoadReportFilterModel) {
		let params = [];
		if (filtro.fecha1) {
			params.push(`date1=${filtro.fecha1}`);
		}
		if (filtro.fecha2) {
			params.push(`date2=${filtro.fecha2}`);
		}
		['equipo', 'pala', 'turno', 'caex', 'jornada', 'operador', 'velocidad'].forEach(item => {
			if (filtro[item]) {
				params.push(`${item}=${encodeURIComponent(filtro[item])}`);
			}
		});
		return params.join('&');
	}
}
