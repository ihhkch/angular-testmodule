import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";
import { UserReport } from '../models/user-report';

@Injectable()
export class AuthService {
    public static AUTH_API_ENDPOINT = environment.AUTH_API_ENDPOINT;

    constructor(private http: HttpClient) { }

    //Main menu

    getCurrentReports(): Observable<UserReport[]> {
        return this.http.get<UserReport[]>(AuthService.AUTH_API_ENDPOINT + '/api/v1/menu');
    }

}
