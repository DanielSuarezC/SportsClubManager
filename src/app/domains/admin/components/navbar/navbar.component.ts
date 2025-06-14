import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, OverlayModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpenAccount = false;
  isOpenMenuMovil = false;

  openMenus(overlay: string){
    if(overlay === 'account') {
      this.isOpenAccount = !this.isOpenAccount; 
      this.isOpenMenuMovil = false; 
    }
    if(overlay === 'menuMovil'){
      this.isOpenMenuMovil = !this.isOpenMenuMovil; 
      this.isOpenAccount = false; 
    } 
  }

  cerrarMenus(){
    if(this.isOpenMenuMovil || this.isOpenAccount){
      this.isOpenMenuMovil = false;
      this.isOpenAccount = false;
    }
  }
}
