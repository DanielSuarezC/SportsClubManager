import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MensajeService } from '../../../shared/components/mensaje/mensaje.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { DefaultPaginationValue, Pagination } from '../../../shared/models/paginated.interface';
import { User } from '../../../shared/models/user/entities/User';
import { SearchArray } from '../../../shared/models/searchArray.interface';
import { environment } from '../../../../../environments/environment';
import { InputComponent } from '../../../shared/components/input/input.component';
import { DataService } from '../../../shared/services/data.service';
import { AffiliationStatus } from '../../../shared/models/user/entities/AffiliationStatus';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, OverlayModule, InputComponent,ReactiveFormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit, AfterViewInit {
  mensaje = inject(MensajeService);
  cookieService = inject(CookieService);
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  public modal: Modal;
  data: User[] = [];
  token: string | undefined;


  public form1: FormGroup = this.fb.group({
    affiliationStatus: [''],
  });
  public form2: FormGroup = this.fb.group({
    roles: [''],
  });

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

  loadData() {
    this.dataService.getUsersWithRoles('').subscribe({
      next: (response) => {
        this.data = response;
        setTimeout(() => this.inicializarDropdowns()); 
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      closable: true
    };

    const instanceOptions: InstanceOptions = {
      id: 'statusModal',
      override: true
    };

    const buttonModal: HTMLElement = document.getElementById('buttonStatusModal');
    const filterModal: HTMLElement = document.getElementById('statusModal');
    this.modal = new Modal(filterModal, modalOptions, instanceOptions);
    // buttonModal.addEventListener('click', () => this.modal.show());
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

  OnSubmit1() {
   
  }
  OnSubmit2() {
   
  }

  private getPedidos() {
   
  }

  /* Buscar Pedidos */
  searchUsers(search: any): void {
    this.dataService.getUsersWithRoles(search).subscribe({
      next: (response) => {
        this.data = response;
        this.pagination.meta.totalItems = response.length;
        this.pagination.meta.totalPages = Math.ceil(response.length / this.pagination.meta.itemsPerPage);
        this.pagination.meta.currentPage = 1; // Reset to first page
      }
    });
    this.terminos = [];
    if(search) this.terminos.push(search);
    this.getPedidos();
  }

  resetFilter(){
    this.terminos = [];
    this.getPedidos();
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
    this.getPedidos();
  }

  /* Cerrar modal de filtros */
  public closeModal(): void {
    this.modal.hide();
  }
}
