import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-player',
  standalone: true,
  imports: [RouterLink, CommonModule, OverlayModule, RouterLinkActive,],
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
