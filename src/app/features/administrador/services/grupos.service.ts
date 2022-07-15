import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../core/services/web-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  path: string = 'api/Grupos';
  constructor(private webRequest: WebRequestService) {}

  getGrupos(): Observable<any> {
    return this.webRequest.getWithHeaders(this.path);
  }

  createGrupo(payload: any): Observable<any> {
    return this.webRequest.postWithHeaders(this.path, payload);
  }

  updateGrupo(id: number, payload: any): Observable<any> {
    return this.webRequest.putWithHeaders(`${this.path}/${id}`, payload);
  }

  deleteGrupo(id: number): Observable<any> {
    return this.webRequest.deleteWithHeaders(`${this.path}/${id}`);
  }
}
