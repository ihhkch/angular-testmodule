import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";
import { TanD } from '../models/tand';
import { ReportDetail } from '../models/report-detail';
import { Gill } from '../models/gill';
import { Kelk } from '../models/kelk';
import { Parker } from '../models/parker';
import { RMS } from '../models/rms';
import { BPFO } from '../models/bpfo';
import { Correlation } from '../models/correlation';


@Injectable()
export class OloaService {
    public static OLOA_API_ENDPOINT = environment.OLOA_API_ENDPOINT;

    constructor(private http: HttpClient) { }

    getOloaGrants(): Observable<ReportDetail[]> {
        return this.http.get<ReportDetail[]>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/' + environment.id_reports.oloa_report);
    }

    getEsaGrants(): Observable<ReportDetail[]> {
        return this.http.get<ReportDetail[]>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/' + environment.id_reports.esa_report);
    }

    //OLOA SERVICES

    getTanDData(idMineSite: number, idEquipment: number, idComponent: string): Observable<TanD> {
        return this.http.get<TanD>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/tanD/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }

    getGillData(idMineSite: number, idEquipment: number, idComponent: string): Observable<Gill> {
        return this.http.get<Gill>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/gill/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }


    getKelkData(idMineSite: number, idEquipment: number, idComponent: string): Observable<Kelk> {
        return this.http.get<Kelk>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/kelk/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }


    getParkerData(idMineSite: number, idEquipment: number, idComponent: string): Observable<Parker> {
        return this.http.get<Parker>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/parker/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }

    //ESA SERVICES

    getRMSData(idMineSite: number, idEquipment: number, idComponent: string): Observable<RMS> {
        return this.http.get<RMS>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/rms/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }

    getBPFOData(idMineSite: number, idEquipment: number, idComponent: string): Observable<BPFO> {
        return this.http.get<BPFO>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/bpfo/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }


    getCorrelationData(idMineSite: number, idEquipment: number, idComponent: string): Observable<Correlation> {
        return this.http.get<Correlation>(OloaService.OLOA_API_ENDPOINT + '/api/v1/reports/krcc/corr/month', {
            params: this.getKRCCParams(idMineSite, idEquipment, idComponent)
        });
    }




    getKRCCParams(idMineSite: number, idEquipment: number, idComponent: string) {
        let params = new HttpParams();
        params = params.append('mineSite', idMineSite.toString());
        params = params.append('equipment', idEquipment.toString());
        params = params.append('component', idComponent);
        return params;
    }

}
