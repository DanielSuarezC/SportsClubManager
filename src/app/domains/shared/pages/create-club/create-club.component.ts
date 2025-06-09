import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MensajeService } from '../../components/mensaje/mensaje.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-club',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-club.component.html',
  styleUrl: './create-club.component.css'
})
export class CreateClubComponent {
  private cookieService = inject(CookieService);
  public route = inject(Router);
  private mensaje = inject(MensajeService);
  private fb = inject(FormBuilder);

  public form1 = this.fb.group({
    nameCLub: ['', Validators.required],
    addres: ['', Validators.required],
    phoneNumberClub: ['', Validators.required],
    nationalId: ['', Validators.required],
    nameAdmin: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumberAdmin: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  token?: string;

  ngOnInit() {
    this.token = this.cookieService.get(environment.nombreCookieToken);
  }

  onSubmit() {
    this.createClub();
  }

  /* Crear Club */
  private createClub() {
    /* const userData: User = {
      nationalId: +this.form1.value.nationalId!,
      name: this.form1.value.name!,
      lastName: this.form1.value.lastName!,
      phoneNumber: +this.form1.value.phoneNumber!,
      email: this.form1.value.email!,
      username: this.form1.value.username!,
      password: this.form1.value.password!,
      roles: [new Role(this.form1.value.roles!)],//La idea es más adelante modificar el correcto typing de datos
    }; */
  }
}
