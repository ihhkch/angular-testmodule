import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";
import { BrakeFilters } from '../models/brakeFilters';

@Injectable()
export class OperationalPracticesService {

    public static OPERATIONAL_PRACTICES_API_ENDPOINT = environment.LOAD_API_ENDPOINT;
    public static ID_OPERATIONAL_PRACTICES_REPORT = environment.id_reports.road_report;


    constructor(private http: HttpClient) { }


    getServiceBrakeOptions(startDate: string, endDate: string): Observable<BrakeFilters> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        return this.http.get<BrakeFilters>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/options', {
            params: params
        });
    }

    getServiceEventsByDay(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o1', {
            params: params
        });
    }

    getServiceEventsByGroup(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o2', {
            params: params
        });
    }

    getServiceEventsByWorkShift(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o3', {
            params: params
        });
    }

    getServiceEventsBySpeed(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o4', {
            params: params
        });
    }

    getServiceEventsByLocation(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/servicio/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o5', {
            params: params
        });
    }

    //Parking brake services

    getParkingBrakeOptions(startDate: string, endDate: string): Observable<BrakeFilters> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        return this.http.get<BrakeFilters>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/options', {
            params: params
        });
    }

    getParkingEventsByDay(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o1', {
            params: params
        });
    }

    getParkingEventsByGroup(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o2', {
            params: params
        });
    }

    getParkingEventsByWorkShift(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o3', {
            params: params
        });
    }

    getParkingEventsBySpeed(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o4', {
            params: params
        });
    }

    getParkingEventsByLocation(startDate: string, endDate: string, selectedWorkShift: string, selectedGroup: string, selectedWorker: string, selectedSpeed: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        params = params.append('date2', endDate);
        if (selectedWorkShift) params = params.append('jornada', selectedWorkShift);
        if (selectedGroup) params = params.append('turno', selectedGroup);
        if (selectedWorker) params = params.append('operador', selectedWorker);
        if (selectedSpeed) params = params.append('velocidad', selectedSpeed);
        return this.http.get<any>(OperationalPracticesService.OPERATIONAL_PRACTICES_API_ENDPOINT + '/api/v1/practicas/estacionamiento/' + OperationalPracticesService.ID_OPERATIONAL_PRACTICES_REPORT + '/o5', {
            params: params
        });
    }

}