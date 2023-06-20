import { EmpresaService } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from '../empresa';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit{
  ramo: any = ['Entretenimento', 'Educação', 'Saúde'];

  empresas: Empresa[] = [];
  formGroupEmpresa: FormGroup;

  changeRamo(e: any){
    this.ramo?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get RamoName() {
    return this.formGroupEmpresa.get('ramo');
  }

  constructor (private empresaService: EmpresaService,
    private formBuilder: FormBuilder)
    {
      this.formGroupEmpresa = formBuilder.group({
        id : [''],
        nome : [''],
        cnpj: [''],
        email: [''],
        telefone: [''],
        ramo: [''],
        endereco: ['']
      });
    }

  ngOnInit(): void {
    this.loadEmpresas();
  }
  loadEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      {
      next: dados => this.empresas = dados,
      error: (msg) => console.log("Opa! Houve um erro na chamada do endpoint: " + msg)
    }

    )
  }

  save(){
    this.empresaService.save(this.formGroupEmpresa.value).subscribe(
      {
        next: dados => {
          this.empresas.push(dados);
          this.formGroupEmpresa.reset();
        }
      }

    )
  }
  remove(empresa : Empresa): void{
    this.empresaService.remove(empresa).subscribe(
       {
         next : () => this.loadEmpresas()
       })

   }

}
