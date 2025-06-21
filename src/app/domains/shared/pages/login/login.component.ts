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
import { Authority, paylod } from '../../models/paylod';
import { jwtDecode } from 'jwt-decode';
import { DataService } from '../../services/data.service';
import * as CryptoJS from 'crypto-js';
import { User } from '../../models/user/entities/User';


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
  private dataService = inject(DataService);
  private cookieService = inject(CookieService);
  private mensaje = inject(MensajeService);
  private route = inject(Router);
  public form1: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  paylod?: paylod;
  baseUrl = environment.urlAplicacion;

  @BlockUI() blockUI?: NgBlockUI;

  constructor() { }

  ngOnInit(): void {
    let token = this.cookieService.get(environment.nombreCookieToken);
    this.cookieService.delete(environment.nombreCookieToken);
    this.form1.get('username')?.setValue('');
    this.form1.get('password')?.setValue('');
  }
  async login() {
    this.blockUI?.start();
    /* if (this.form1.invalid) {
      
      this.form1.markAllAsTouched();
      Swal.fire('Formulario invalido', 'Formulario inválido', 'error');
      this.blockUI?.stop();
      return;
    } */
    /* try{
      const newUserLoginDto = new UsuarioLoginDto();
      newUserLoginDto.username = this.form1.get('username')?.value;
      newUserLoginDto.password = this.form1.get('password')?.value;
  
      await this.authService.login(newUserLoginDto);
      this.form1.reset();
      this.route.navigate(['/admin/club/admin']);
      this.blockUI?.stop();
    }catch (error) {
      this.blockUI?.stop();
      console.error('Error during login:', error);
      this.mensaje.showMessage('Error de validación', 'Credenciales incorrectas', 'error');
      return;
    } */

    const newUserLoginDto = new UsuarioLoginDto();
    newUserLoginDto.username = this.form1.get('username')?.value;
    newUserLoginDto.password = this.form1.get('password')?.value;

    this.dataService.login(this.form1.get('username')?.value, CryptoJS.MD5(this.form1.get('password')?.value)).subscribe({
      next: (data: User) => {
        this.dataService.getUsersWithRoles(data.name).subscribe({
          next: (response) => {
            let roles = response;
            for (let rol of roles) {
              if (rol.roles.some(role => role.name === 'ROLE_ADMIN')) {
                this.form1.reset();
                this.route.navigate(['/admin/club/admin']);
                this.mensaje.toastMessage(`Bienvenido administrador del club`, 'success', 'bottom-end', 4000);
                return;
              } else if (rol.roles.some(role => role.name === 'ROLE_PLAYER')) {
                this.form1.reset();
                this.route.navigate(['/player/events']);
                this.mensaje.toastMessage(`Bienvenido jugador del club`, 'success', 'bottom-end', 4000);
                return;
              }
            }
          },
          error: (error) => {
            console.error('Error al cargar datos:', error);
          }
        });
        this.blockUI?.stop();
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.blockUI?.stop();
        this.mensaje.showMessage('Error de validación', 'Credenciales incorrectas', 'error');
      }
    });
    /*    this.authService.login(newUserLoginDto).subscribe(value => {
         console.log('value', value);
         if (value != null) {
           
           this.paylod = jwtDecode(value.access_token);
           const authorities: Authority[] = JSON.parse(this.paylod.authorities);
    
           const fecha = new Date();
           fecha.setMinutes(fecha.getMinutes() + environment.duracionMinutosCookieToken);
           this.cookieService.set(environment.nombreCookieToken, value.access_token, fecha);
           this.blockUI?.stop();
           console.log('paylod',this.paylod);
           for (const authority of authorities) {
               if( authority.authority === 'ROLE_ADMIN') {
                 this.form1.reset();
                 this.route.navigate(['/admin/club/admin']);
                 this.mensaje.toastMessage(`Bienvenido administrador del club`, 'success', 'bottom-end', 4000);
                 return;
               }
               else if( authority.authority === 'ROLE_PLAYER') {
                 this.form1.reset();
                 this.route.navigate(['/player/events']);
                 this.mensaje.toastMessage(`Bienvenido administrador del club`, 'success', 'bottom-end', 4000);
                 return;
               }
           }
    
         } else {
           this.mensaje.showMessage('Error de validación', `${value}`, 'error');
         }
         this.blockUI?.stop();
       }, error => {
         this.blockUI?.stop();
         this.mensaje.showMessage('Error de validacion', error.error.message, 'error');
         console.log(error);
       }); */
    this.blockUI?.stop();
  }

  public getUser() {

  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
  }
}
