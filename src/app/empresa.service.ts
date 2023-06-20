import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = "http://localhost:3000/empresas";
  constructor(private http: HttpClient) { }

  save(empresa: Empresa): Observable<Empresa>{

    return this.http.post<Empresa>(this.url, empresa);

  }
}
