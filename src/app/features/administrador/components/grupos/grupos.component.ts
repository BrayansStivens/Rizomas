import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CellType, PaginationType } from 'src/app/shared/components/table/interface/table';
import { AlertsService } from 'src/app/shared/services/services/alert.service';
import { GruposService } from '../../services/grupos.service';
import { SelectionStrategy } from '../../../../shared/components/table/interface/table';

@Component({
  selector: 'rizo-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {

  loader!: boolean;
  isUpdate!: boolean;
  dataSourse = new MatTableDataSource<any>;
  paginationType = PaginationType.CLIENT;
  selectStrategy = SelectionStrategy.NONE
  form!: FormGroup;
  idGroup!:number;
  
  columnHeader = {
    nombreGrupo: { label: 'Nombre' },
    nombreMateria: { label: 'Asignatura' },
    nombreDocente:{label: "Docente"},
    semestre:{label: "Semestre"},
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private gruposService: GruposService
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    
    this.fillTable();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      nombreGrupo:['', Validators.required],
      nombreMateria:['', Validators.required]
    })
  }

  updateOrDelete():void{
      if(this.isUpdate){
        this.actualizar();
      }else{
        this.registrar();
      }
    }

  registrar():void{
    const {nombreGrupo, nombreMateria} = this.form.value;
    const payload = {
      id:6,
      nombreGrupo: nombreGrupo,
      nombreMateria: nombreMateria,
      total_estudiantes: 0,
      total_Personas: 0,
      total_Aspirantes: 0,
    }

    this.loader= true;
   if(this.form.valid){
     this.gruposService.createGrupo(payload).subscribe(()=>{
      this.loader=false;
      this.alertService.mensajeCorrecto('REGISTRO EXITOSO',"Grupo creado con exito 😇 ")
      this.form.reset();
      this.fillTable();
    },()=>{
      this.loader=false;
      this.alertService.mensajeError('REGISTRO FALLIDO',"Lo sentimos intenta nuevamente 😢 ") 
    })
   }else{
    this.form.markAllAsTouched();
    this.loader=false;
   }
  }

  actualizar():void{
    this.loader=true;
     const {nombreGrupo, nombreMateria} = this.form.value;
    const payload = {
      id: this.idGroup,
      nombreGrupo: nombreGrupo,
      nombreMateria: nombreMateria,
      total_estudiantes: 0,
      total_Personas: 0,
      total_Aspirantes: 0,
    }
    this.gruposService.updateGrupo(this.idGroup,payload).subscribe(()=>{
      this.isUpdate = false;
      this.loader=false;
      this.alertService.mensajeCorrecto('REGISTRO EXITOSO',"Grupo actualizado con exito 😇 ")
      this.form.reset();
      this.fillTable();
    },()=>{
      this.loader=false;
      this.alertService.mensajeError('REGISTRO FALLIDO',"Lo sentimos intenta nuevamente 😢 ") 
    })
  }

  eliminar():void{
    this.alertService.confirmDialog("ELIMINAR GRUPO", "¿En realidad quiere eliminar este grupo?", 'ACEPTAR').then((response)=>{
      if(response.isConfirmed){
        this.gruposService.deleteGrupo(this.idGroup).subscribe(()=>{
          this.loader= false;
          this.isUpdate = false;
          this.alertService.mensajeCorrecto('GRUPO ELIMINADO', 'Grupo eliminado con exito');
          this.fillTable();
        },()=>{
          this.alertService.mensajeError('GRUPO NO ELIMINADO', 'Vuelve a intentarlo');
        });
      }
       
      }).catch(()=> this.loader = false)
  }



  fillTable(): void{
    this.gruposService.getGrupos().subscribe((response)=>{
        this.dataSourse.data = response;
        this.dataSourse.data.forEach((element)=>{
      element.action =[{name: 'create'}, {name:'delete'}]
    })
      })
  }


  limpiar():void{
    this.isUpdate=false;
    this.form.reset();
  }

  actionEvent(event:any): void{
    if(event.action==='create'){
      this.isUpdate = true;
      this.idGroup = event.row.id;
      this.form.patchValue(event.row)
    }
    if(event.action ==="delete"){
      this.idGroup = event.row.id;
      this.eliminar();
    }
  }

  sortData(event: any): void{
    const sortData = this.dataSourse.data;
    if(!event.active || event.direction === ''){
      this.dataSourse.data = sortData;
      return
    }   
    this.dataSourse.data = sortData.sort((a:any, b:any)=>{
      const isAsc = event.direction === 'asc';
      switch (event.active){
        case 'nombreGrupo':
          return this.compare(a.nombreGrupo, b.nombreGrupo, isAsc);
        case 'nombreMateria':
          return this.compare(a.nombreMateria, b.nombreMateria, isAsc);
        default:
          return 0
      }
    })
    
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
}
