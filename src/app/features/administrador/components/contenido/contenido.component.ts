import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationType, CellType } from 'src/app/shared/components/table/interface/table';
import { AlertsService } from 'src/app/shared/services/services/alert.service';

@Component({
  selector: 'rizo-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

   loader!: boolean;
  dataSourse = new MatTableDataSource<any>;
  paginationType = PaginationType.CLIENT;
  form!: FormGroup;

  
  columnHeader = {
    nombreContenido: { label: 'Nombre' },
    estado: { label: 'Estado' },
    idMapa: { label: 'Mapa' },
    idTipoContenido:  {label: 'Tipo contenido'},
    action: {label: "Acciones", type: CellType.ACTIONS}
  };

  constructor(private formBuilder: FormBuilder, private alertService: AlertsService){
    this.createForm()
  }

  ngOnInit(): void {
  }
  
  //creacion de formulario reactivo
  createForm(): void {
    this.form = this.formBuilder.group({
      nombreContenido: ['', Validators.required],
      descripcion:['',Validators.required],
      estado: ['', Validators.required],
      idMapa: ['', Validators.required],
      idTipoContenido:['' , Validators.required],
      archivo: ['', Validators.required]
    });
  }
}
