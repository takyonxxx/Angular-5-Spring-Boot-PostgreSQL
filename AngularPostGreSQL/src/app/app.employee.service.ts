import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // replaces previous Http service
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { IEmployee } from './app.employee';

@Injectable()
export class EmployeeService {
    url = '/api';
    constructor(private http: Http) { }
    headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    getEmployees(): Observable<IEmployee[]> {
        return this.http.get(this.url, this.options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getEmployee(id: number): Observable<IEmployee[]> {
        return this.http.get(this.url + '/employee/' + id, this.options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    addEmployee(employee: IEmployee): Observable<IEmployee> {
        return this.http.post(this.url + '/add', employee, this.options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    updateEmployee(employee: IEmployee): Observable<IEmployee> {
        return this.http.post(this.url + '/update', employee, this.options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    deleteEmployee(id: number): Observable<IEmployee> {
        return this.http.post(this.url + '/delete/' + id, this.options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}
