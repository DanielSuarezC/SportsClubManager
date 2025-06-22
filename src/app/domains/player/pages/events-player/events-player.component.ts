import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { MensajeService } from '../../../shared/components/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';
import { Dropdown, InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { DefaultPaginationValue, Pagination } from '../../../shared/models/paginated.interface';
import { User } from '../../../shared/models/user/entities/User';
import { SearchArray } from '../../../shared/models/searchArray.interface';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-events-player',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './events-player.component.html',
  styleUrl: './events-player.component.css'
})
export class EventsPlayerComponent {
   private mensaje = inject(MensajeService);
    private cookieService = inject(CookieService);
    private fb = inject(FormBuilder);
    private dataService = inject(DataService);
    data: any[] = [];
  
    public modal: Modal;
  
    token: string | undefined;
    public EventId: number;
  
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
      this.loadData();
    }
  
    ngAfterViewInit(): void {
      const modalOptions: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        closable: true
      };
  
      const instanceOptions: InstanceOptions = {
        id: 'visibilityModal',
        override: true
      };
  
      const buttonModal: HTMLElement = document.getElementById('buttonModal');
      const filterModal: HTMLElement = document.getElementById('visibilityModal');
      this.modal = new Modal(filterModal, modalOptions, instanceOptions);
    }
  
    loadData() {
      this.dataService.getData('events').subscribe({
        next: (response) => {
          this.data = response;
          setTimeout(() => this.inicializarDropdowns()); 
        },
        error: (error) => {
          console.error('Error al cargar datos:', error);
        }
      });
    }
  
    // Ejemplo de crear un nuevo elemento
    createUser(userData: any) {
      this.dataService.create('users', userData).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.loadData(); // Recargar datos
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
        }
      });
    }
  
    setEventId(eventId: number) {
      this.EventId = eventId;
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
  
    /* Buscar Eventos */
    searchEvents(search: any): void {
      this.terminos = [];
      if (search) this.terminos.push({ term: 'cliente', search: search });
    }
  
    resetFilter() {
      this.terminos = [];
    }
  
    /* Páginas */
    generateNumbers(): number[] {
      const numbers: number[] = [];
      for (let i = 1; i <= this.pagination?.meta.totalPages; i++) {
        numbers.push(i);
      }
  
      return numbers;
    }
  
    /* Cerrar modal de filtros */
    public closeModal(): void {
      this.modal.hide();
    }
}
