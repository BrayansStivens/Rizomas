import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/features/administrador/services/usuarios.service';
import { CellType, PaginationType } from 'src/app/shared/components/table/interface/table';
import { AlertsService } from 'src/app/shared/services/services/alert.service';

@Component({
  selector: 'rizo-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {


  loader!: boolean;
  dataSourse = new MatTableDataSource<any>;
  paginationType = PaginationType.CLIENT;
  form!: FormGroup;
  mensajeError!: string;
  mensajeBoton!: string;
  archivoExcel!: Array<any>;

  
  columnHeader = {
    nombre: { label: 'Nombre' },
    correo: { label: 'Email' },
    grupo: { label: 'Grupo' },
    action: {label: "Acciones", type: CellType.ACTIONS}
  };

  
  constructor( 
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private alertService: AlertsService,) {this.createForm() }

  ngOnInit(): void {
    this.createForm();
  }

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
      file: ['',Validators.pattern('^.*\.(.xlsx)$')],
    });
  }

  createStudent():void{
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
        this.form.reset();        
        this.usuariosService.createStudent({email: email}).subscribe(()=>{
            this.alertService.mensajeCorrecto(
              'REGISTRO EXITOSO',
              'Estudiante creado con exito 😇 '
            );
        })
      });
    } else {
      this.loader = false;
      this.form.markAllAsTouched();
    }
    this.loader = false;
  }


  cargarArchivo(event: any) {
    this.archivoExcel = event.target.files[0];
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
