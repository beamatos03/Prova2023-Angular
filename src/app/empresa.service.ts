import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = "http://localhost:8080/empresas";
  constructor(private http: HttpClient) { }


  save(empresa: Empresa): Observable<Empresa>{

    return this.http.post<Empresa>(this.url, empresa);

  }

  getEmpresas(): Observable<Empresa[]>{

    return this.http.get<Empresa[]>(this.url);
  }


 remove(empresa: Empresa): Observable<void>{
  return this.http.delete<void>(`${this.url}/${empresa.id}`);
 }

}
