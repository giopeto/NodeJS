import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dummy } from '../models/Dummy';

@Injectable()
export class DummyComponentService {

	private apiUrl = 'http://localhost:3000/api/';  // URL to web api

	constructor(private http: HttpClient) { }

	get(): Observable<Dummy> {
		return this.http.get<Dummy>(this.apiUrl);
	}
}
