import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from 'src/app/core/index/modals/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/index/services/login.service';

@Component({
  selector: 'rizo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() tittle: string = '';
  @Input() btnLogin: boolean = true;
  @Input() btnStart: boolean = true;
  @Input() btnLogOut: boolean = false;
  @Input() btnMenu: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(): MatDialogRef<LoginModalComponent> {
    return this.dialog.open(LoginModalComponent, {
      disableClose: true,
    });
  }

  logOut(): void {
    if (this.loginService.getToken()) {
      this.loginService.logout();
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('');
    }
  }

  arbol(): void {
    this.router.navigateByUrl('invitados');
  }
}
