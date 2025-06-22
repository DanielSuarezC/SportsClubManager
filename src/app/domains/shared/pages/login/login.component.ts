import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI, BlockUIModule } from 'ng-block-ui';
import { DialogModule } from '@angular/cdk/dialog';
import { BtnComponent } from '../../components/btn/btn.component';
import { MensajeService } from '../../components/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';
import { paylod } from '../../models/paylod';
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
    this.dataService.login(this.form1.get('username')?.value, CryptoJS.MD5(this.form1.get('password')?.value)).subscribe({
      next: (data: User) => {
        for (let rol of data.roles) {
          if (rol.name === 'ROLE_ADMIN') {
            this.form1.reset();
            this.route.navigate([`/admin/club/${data.id}`]);
            this.mensaje.toastMessage(`Bienvenido administrador del club`, 'success', 'bottom-end', 4000);
            return;
          } else if (rol.name === 'ROLE_PLAYER') {
            this.form1.reset();
            this.route.navigate(['/player/events']);
            this.mensaje.toastMessage(`Bienvenido jugador del club`, 'success', 'bottom-end', 4000);
            return;
          }
        }
        this.blockUI?.stop();
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.blockUI?.stop();
        this.mensaje.showMessage('Error de validación', 'Credenciales incorrectas', 'error');
      }
    });
    this.blockUI?.stop();
  }

  hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
  }
}
