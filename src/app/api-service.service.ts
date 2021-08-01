import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface ServerResponse {
  success: boolean;
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiURL: string = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient) { }

  public getUserData(url?: string){
    return this.httpClient.get<any>(`${this.apiURL}/${url}`);
  }

  public postUserData(userData: any): Observable<ServerResponse> {
    let url = this.apiURL +'/posts';
    return this.httpClient.post<ServerResponse>(url, userData, {headers: this.headers})
  }
}
