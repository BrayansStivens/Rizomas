import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

import { AlertsService } from '../../../../shared/services/services/alert.service';
import { UsuariosService } from '../../services/usuarios.service';

import { Role } from '../../interfaces/usuarios';
import { PaginationType, CellType } from '../../../../shared/components/table/interface/table';

@Component({
  selector: 'rizo-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  //Variables
  loader!: boolean;
  dataSourse = new MatTableDataSource<any>;
  paginationType = PaginationType.CLIENT;
  form!: FormGroup;
  mensajeError!: string;
  mensajeBoton!: string;
  archivoExcel!: Array<any>;
  /* archivoRuta!: string; */

  roles: Array<Role> = [
    { role: 'Administrador', value: 'administrador' },
    { role: 'Estudiante', value: 'estudiante' },
    { role: 'Docente', value: 'docente' },
  ];

  columnHeader = {
    nombre: { label: 'Nombre' },
    correo: { label: 'Email' },
    grupo: { label: 'Grupo' },
    role:  {label: 'Role'},
    action: {label: "Acciones", type: CellType.ACTIONS}
  };

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private alertService: AlertsService,
    private sanitizer: DomSanitizer
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fillTable()
  }

  //creacion de formulario reactivo
  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-])([A-Za-z\d$@$!%*?&-]|[^ ]){8,15}$/
          ),
        ],
      ],
      role: [''],
      file: ['',Validators.pattern('^.*\.(.xlsx)$')],
    });
  }

    //llenado de tabla
  fillTable(): void {
    this.dataSourse.data = [
      {nombre: "Jhon Jairo", correo: "JhonJairo@mail.com", grupo: "GCM-001", role: "Estudiante"}
    ]
    this.dataSourse.data.forEach((element)=>{
      element.action =[{name: ' create'}, {name:'delete'}]
    })
  }


  //creacion de usuarios
  createUser(): void {
    this.loader = true;
    if (this.form.get('file')?.value) {
      this.subirArchivo()
    } else if (this.form.valid) {
      const { email, password } = this.form.value;
      const payload = {
        email: email,
        password: password,
      };
      this.usuariosService.register(payload).subscribe(() => {
        this.loader = false;
        this.createRole();
      });
    } else {
      this.loader = false;
      this.form.markAllAsTouched();
    }
    this.loader = false;
  }

  createRole(): void {
    this.loader = true;
    const role = this.form.get('role')?.value;
    const email = { email: this.form.get('email')?.value };
    if (role) {
      if (role === 'administrador') {
        this.usuariosService.createAdmin(email).subscribe(
          () => {
            this.loader = false;
            this.alertService.mensajeCorrecto(
              'REGISTRO EXITOSO',
              'Administrador creado con exito 😇 '
            );
          },
          () => (this.loader = false)
        );
      }
      if (role === 'estudiante') {
        this.usuariosService.createStudent(email).subscribe(
          () => {
            this.loader = false;
            this.alertService.mensajeCorrecto(
              'REGISTRO EXITOSO',
              'Estudiante creado con exito 😇 '
            );
          },
          () => (this.loader = false)
        );
      }
      if (role === 'docente') {
        this.usuariosService.createDocente(email).subscribe(
          () => {
            this.loader = false;
            this.alertService.mensajeCorrecto(
              'REGISTRO EXITOSO',
              'Docente creado con exito 😇 '
            );
          },
          () => (this.loader = false)
        );
      }
    } else {
      this.loader = false;
      this.alertService.mensajeCorrecto(
        'REGISTRO EXITOSO',
        'Usuario creado con exito 😇 '
      );
    }
    this.loader = false;
    this.form.reset();
  }

  cargarArchivo(event: any) {
    this.archivoExcel = event.target.files[0];
    console.log(this.archivoExcel);
  }

  subirArchivo(){
    this.usuariosService.createByFile({archivo: this.archivoExcel}).subscribe(()=>{
      this.loader=false;
      this.alertService.mensajeCorrecto(
              'REGISTRO EXITOSO',
              'Usuarios creados con exito 😇 ')
    },()=>{
      this.loader=false;
      this.alertService.mensajeError(
        "REGISTRO NO CREADO",
        "Ocurrio un error inesperado, vuelve a intentarlo 😢")  
    })
  }

  //Control de mensajes HTML
  errorEmail(): string {
    this.mensajeError = '';
    if (
      this.form.get('email')?.hasError('email') &&
      !this.form.get('email')?.hasError('required')
    ) {
      this.mensajeError = 'Email no valido';
    }
    if (this.form.get('email')?.hasError('required')) {
      this.mensajeError = 'Campo requerido';
    }

    return this.mensajeError;
  }

  errorPassword(): string {
    this.mensajeError = '';
    if (
      this.form.get('password')?.hasError('pattern') &&
      !this.form.get('password')?.hasError('required')
    ) {
      this.mensajeError = 'Mayúscula, Minúscula, Número, Caracter';
    }
    if (this.form.get('email')?.hasError('required')) {
      this.mensajeError = 'Campo requerido';
    }

    return this.mensajeError;
  }

  errorFile():string{
    this.mensajeError = '';
    if(this.form.get('file')?.value){
      if(this.form.get('file')?.hasError('pattern')){
        this.mensajeError = 'Sólo archivos XLSX'
      }
    }
    return this.mensajeError;
  }

}
