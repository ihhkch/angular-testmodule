import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";
import { CriticalZone } from '../models/critical-zone';

@Injectable()
export class RoadConditionService {
    public static ROAD_CONDITION_API_ENDPOINT = environment.LOAD_API_ENDPOINT;
    public static ID_ROAD_REPORT = environment.id_reports.road_report;


    constructor(private http: HttpClient) { }

    getCritialZonesTable(startDate: string): Observable<CriticalZone[]> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        return this.http.get<CriticalZone[]>(RoadConditionService.ROAD_CONDITION_API_ENDPOINT + '/api/v1/caminos/zonas/' + RoadConditionService.ID_ROAD_REPORT + '/o2', {
            params: params
        });
    }

    getHistoricalEvolution(startDate: string): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        return this.http.get<any[]>(RoadConditionService.ROAD_CONDITION_API_ENDPOINT + '/api/v1/caminos/condicion/' + RoadConditionService.ID_ROAD_REPORT + '/o3', {
            params: params
        });
    }

    getCritialZonesMap(startDate: string): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        return this.http.get<any[]>(RoadConditionService.ROAD_CONDITION_API_ENDPOINT + '/api/v1/caminos/condicion/' + RoadConditionService.ID_ROAD_REPORT + '/o1', {
            params: params
        });
    }

    getTopCritialZonesMap(startDate: string): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('date1', startDate);
        return this.http.get<any[]>(RoadConditionService.ROAD_CONDITION_API_ENDPOINT + '/api/v1/caminos/zonas/' + RoadConditionService.ID_ROAD_REPORT + '/o1', {
            params: params
        });
    }

}
