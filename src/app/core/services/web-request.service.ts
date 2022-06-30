import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../API/environment.interface';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
    });
  }

  post(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  postObserve(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
      observe: 'response',
    });
  }

  getObserve(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
      observe: 'response',
    });
  }

  patch(url: string, payload: any, params?: any): Observable<any> {
    return this.http.patch<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  put(url: string, payload: any, params?: any): Observable<any> {
    return this.http.put<any>(`${Constants.ROOT_URL}/${url}`, payload, {
      params: params,
    });
  }

  delete(url: string, params?: any): Observable<any> {
    return this.http.delete<any>(`${Constants.ROOT_URL}/${url}`, {
      params: params,
    });
  }
}
