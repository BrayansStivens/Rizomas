import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CellType, PaginationType } from 'src/app/shared/components/table/interface/table';
import { AlertsService } from 'src/app/shared/services/services/alert.service';

@Component({
  selector: 'rizo-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {

  loader!: boolean;
  dataSourse = new MatTableDataSource<any>;
  paginationType = PaginationType.CLIENT;
  form!: FormGroup;
  
  columnHeader = {
    nombreGrupo: { label: 'Nombre' },
    nombreMateria: { label: 'Asignatura' },
    action: { label: 'Acciones', type: CellType.ACTIONS },
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertsService
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

  fillTable(): void{

  }
}
