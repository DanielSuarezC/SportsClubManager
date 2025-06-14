import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MensajeService } from '../../../shared/components/mensaje/mensaje.service';
import { environment } from '../../../../../environments/environment';
import { Datepicker, DatepickerOptions, InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-events-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './events-create.component.html',
  styleUrl: './events-create.component.css'
})
export class EventsCreateComponent {
  @Input()
  public eventType: string;

  private cookieService = inject(CookieService);
  public route = inject(Router);
  private mensaje = inject(MensajeService);
  private fb = inject(FormBuilder);

  private datepicker: Datepicker;

  public form1 = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    eventVisibility: ['', Validators.required],
    maximumParticipants: ['', Validators.required],
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

   initializeDatePicker() {
    const datepickerEl: HTMLInputElement = document.getElementById('startDate') as HTMLInputElement;
    // optional options with default values and callback functions
    const options: DatepickerOptions = {
      format: 'yyyy-mm-dd',
      autohide: true,
      orientation: 'bottom',
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'startDate',
      override: true
    };

    if (datepickerEl) {
      const datepicker = new Datepicker(
        datepickerEl,
        options,
        instanceOptions
    );
    this.datepicker = datepicker;
    }
  }

  ngAfterViewInit() {
    // this.initializeDatePicker();
  }


    hasErrors(controlName: string, errorType: string) {
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
  }
}
