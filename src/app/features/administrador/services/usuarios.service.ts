import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../core/services/web-request.service';
import { createRole, user } from '../interfaces/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  path: string = 'api/cuentas';
  constructor(private webRequest: WebRequestService) {}

  register(payload: user): Observable<user> {
    return this.webRequest.post(`${this.path}/registrar`, payload);
  }

  createAdmin(payload: createRole): Observable<createRole> {
    return this.webRequest.post(`${this.path}/CrearAdmin`, payload);
  }

  createStudent(payload: createRole): Observable<createRole> {
    return this.webRequest.post(`${this.path}/CrearEstudiante`, payload);
  }

  createDocente(payload: createRole): Observable<createRole> {
    return this.webRequest.post(`${this.path}/CrearDocente`, payload);
  }

  deleteAdmin(payload: createRole): Observable<createRole> {
    return this.webRequest.delete(`${this.path}/CrearAdmin`, payload);
  }

  deleteStudent(payload: createRole): Observable<createRole> {
    return this.webRequest.delete(`${this.path}/CrearEstudiante`, payload);
  }

  deleteDocente(payload: createRole): Observable<createRole> {
    return this.webRequest.delete(`${this.path}/CrearDocente`, payload);
  }

  createByFile(payload: any): Observable<any> {
    return this.webRequest.post('api/Excel', payload);
  }
}
