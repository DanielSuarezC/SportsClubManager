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
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  baseUrl = environment.urlAplicacion;

  @BlockUI() blockUI?: NgBlockUI;

  constructor() { }

  ngOnInit(): void {
    // let token = this.cookieService.get(environment.nombreCookieToken);
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
    if(newUserLoginDto.username === 'admin' || newUserLoginDto.password === 'admin2025') {
      this.form1.reset();
      this.route.navigate(['/admin/club']);
      this.mensaje.toastMessage(`Bienvenido administrador del club`, 'success', 'bottom-end', 4000);
      this.blockUI?.stop();
      return;
    }else if(newUserLoginDto.username === 'player' || newUserLoginDto.password === 'player2025'){
      this.form1.reset();
      this.route.navigate(['/player/events']);
      this.mensaje.toastMessage(`Bienvenido jugador`, 'success', 'bottom-end', 4000);
      this.blockUI?.stop();
      return;
    }
    // this.authService.login(newUserLoginDto).subscribe(value => {
    //   if (value != null) {
    //     /* leyendo el token decodificado */
    //     this.paylod = jwtDecode(value.access_token);

    //     /* Asignación del token a las cookieService */
    //     const fecha = new Date();
    //     fecha.setMinutes(fecha.getMinutes() + environment.duracionMinutosCookieToken);
    //     this.cookieService.set(environment.nombreCookieToken, value.access_token, fecha);
    //     this.blockUI?.stop();

    //     switch (this.paylod.rol) {
    //       case 'ADMINISTRADOR':
    //         this.form1.reset();
    //         this.route.navigate(['/administrador/inventarios']);
    //         this.mensaje.toastMessage(`Bienvenido ${this.paylod.rol}`, 'success', 'bottom-end', 4000);
    //         break;
    //         case 'VENDEDOR':
    //           this.form1.reset();
    //           this.route.navigate(['/vendedor/catalog']);
    //           this.mensaje.toastMessage(`Bienvenido ${this.paylod.rol}`, 'success', 'bottom-end', 4000);
    //         break;
    //     }
    //   } else {
    //     this.mensaje.showMessage('Error de validación', `${value}`, 'error');
    //   }
    //   this.blockUI?.stop();
    // }, error => {
    //   this.blockUI?.stop();
    //   this.mensaje.showMessage('Error de validacion', error.error.message, 'error');
    //   console.log(error);
    // });
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
    
  }
}
