import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI, BlockUIModule } from 'ng-block-ui';
import { DialogModule } from '@angular/cdk/dialog';
import { BtnComponent } from '../../components/btn/btn.component';
import Swal from 'sweetalert2';
import { MensajeService } from '../../components/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';

import { UsuarioAuth } from '../../models/auth/entities/UsuarioAuth';
import { AuthService } from '../../models/auth/services/auth.service';
import { UsuarioLoginDto } from '../../models/auth/dto/UsuarioLoginDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, DialogModule, BtnComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private mensaje = inject(MensajeService);
  private route = inject(Router);
  public form1: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  baseUrl = environment.urlAplicacion;

  @BlockUI() blockUI?: NgBlockUI;

  constructor() { }

  ngOnInit(): void {
    let token = this.cookieService.get(environment.nombreCookieToken);
    // this.cookieService.delete(environment.nombreCookieToken);
    this.form1.get('username')?.setValue('');
    this.form1.get('password')?.setValue('');
  }
  validar() {
    this.blockUI?.start();
    if (this.form1.invalid) {
      /* Marcar todos los campos como tocados para mostrar los errores */
      this.form1.markAllAsTouched();
      Swal.fire('Formulario invalido', 'Formulario inválido', 'error');
      this.blockUI?.stop();
      return;
    }

    const newUserLoginDto = new UsuarioLoginDto();
    newUserLoginDto.username = this.form1.get('username')?.value;
    newUserLoginDto.password = this.form1.get('password')?.value;

    this.authService.login(newUserLoginDto).subscribe( value => {
      console.log(value);
      this.blockUI?.stop();
    })
    this.blockUI?.stop();
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
  }
}
