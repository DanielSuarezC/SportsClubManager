import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { MensajeService } from '../../../shared/components/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder } from '@angular/forms';
import { Dropdown, InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { DefaultPaginationValue, Pagination } from '../../../shared/models/paginated.interface';
import { User } from '../../../shared/models/user/entities/User';
import { SearchArray } from '../../../shared/models/searchArray.interface';
import { environment } from '../../../../../environments/environment';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [CommonModule, OverlayModule, InputComponent, RouterLink],
  templateUrl: './events-admin.component.html',
  styleUrl: './events-admin.component.css'
})
export class EventsAdminComponent {
  mensaje = inject(MensajeService);
  cookieService = inject(CookieService);
  private fb = inject(FormBuilder);

  public modal: Modal;

  token: string | undefined;

  public pagination: Pagination<User> = DefaultPaginationValue;
  public page: number = 1;
  public search: string = '';
  public sortBy: string = '';
  public terminos: SearchArray[] = [];

  /* Buttons of Dropdowns Menus */
  @ViewChildren('dropdownButton', { read: ElementRef })
  public buttons: QueryList<ElementRef<HTMLButtonElement>>;

  /* Dropdowns Menus */
  @ViewChildren('dropdownMenu', { read: ElementRef })
  public dropdownsMenu: QueryList<ElementRef<HTMLDivElement>>;

  /* Dropdowns */
  private dropdowns: Dropdown[] = [];

  ngOnInit() {
    this.token = this.cookieService.get(environment.nombreCookieToken);
    this.getEvents();
  }

  ngAfterViewInit(): void {
    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      closable: true
    };

    const instanceOptions: InstanceOptions = {
      id: 'filterModal',
      override: true
    };

    const buttonModal: HTMLElement = document.getElementById('buttonModal');
    const filterModal: HTMLElement = document.getElementById('filterModal');
    this.modal = new Modal(filterModal, modalOptions, instanceOptions);
  }

  /* Inicializar Dropdowns */
  private inicializarDropdowns(): void {
    if (this.buttons.length > 0 && this.dropdownsMenu.length > 0) {
      this.dropdowns = [];

      this.buttons.forEach((button, index) => {
        const menu = this.dropdownsMenu.get(index);
        if (menu) {
          const dropdown = new Dropdown(menu.nativeElement, button.nativeElement);
          this.dropdowns.push(dropdown);
        }
      });
    }
  }

  OnSubmit() {

  }

  private getEvents() {

  }

  /* Buscar Eventos */
  searchEvents(search: any): void {
    this.terminos = [];
    if (search) this.terminos.push({ term: 'cliente', search: search });
    this.getEvents();
  }

  resetFilter() {
    this.terminos = [];
    this.getEvents();
  }

  /* Páginas */
  generateNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= this.pagination?.meta.totalPages; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  /* Cambiar Página */
  public cambiarPagina(page: number): void {
    this.page = page;
    this.getEvents();
  }

  /* Cerrar modal de filtros */
  public closeModal(): void {
    this.modal.hide();
  }
}
