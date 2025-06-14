import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from '../../components/btn/btn.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MensajeService } from '../../components/mensaje/mensaje.service';
import { environment } from '../../../../../environments/environment';
import { User } from '../../models/user/entities/User';
import { Role } from '../../models/user/entities/Role';
import { Club } from '../../models/club/entities/club';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  @Input()
  public id: number;
  public clubs = signal<Club[]>([]);

  private cookieService = inject(CookieService);
  public route = inject(Router);
  private mensaje = inject(MensajeService);
  private fb = inject(FormBuilder);

  public form1 = this.fb.group({
    nationalId: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    roles: ['', Validators.required],
    club: ['', Validators.required],
  });

  token?: string;

  ngOnInit() {
    this.token = this.cookieService.get(environment.nombreCookieToken);
    this.getClubs();
  }

  onSubmit() {
    switch (this.id) {
      case undefined:
        if (this.form1.invalid) {
          this.mensaje.showMessage('Error', 'Formulario inválido', 'error');
          return;
        }
        this.createUser();
        break;
      default:
        this.editUser();
        break;
    }
  }

  /* Crear Usuario */
  private createUser() {
    const userData: User = {
      nationalId:  +this.form1.value.nationalId!,
      name:  this.form1.value.name!,
      lastName:  this.form1.value.lastName!,
      phoneNumber:  +this.form1.value.phoneNumber!,
      email:  this.form1.value.email!,
      username:  this.form1.value.username!,
      password:  this.form1.value.password!,
      roles:  [new Role(this.form1.value.roles!) ],//La idea es más adelante modificar el correcto typing de datos
    };
  }

  /* Modificar Usuario */
  private editUser() {
    const userData: User = {
      nationalId:  +this.form1.value.nationalId!,
      name:  this.form1.value.name!,
      lastName:  this.form1.value.lastName!,
      phoneNumber:  +this.form1.value.phoneNumber!,
      email:  this.form1.value.email!,
      username:  this.form1.value.username!,
      password:  this.form1.value.password!,
      roles:  [new Role(this.form1.value.roles!) ],//La idea es más adelante modificar el correcto typing de datos
    };
  }

  private getClubs(){

  }
}
