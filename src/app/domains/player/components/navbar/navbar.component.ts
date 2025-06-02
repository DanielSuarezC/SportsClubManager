import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, OverlayModule, RouterLinkActive,],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpenCart = false;
  isOpenMenuMovil = false;
  isOpenAccount = false;

/*   route = inject(Router);

  private cartService = inject(CartService);
  cart = this.cartService.cart; //signal<Product[]>([]);
  subTotal = this.cartService.subTotal; //computed();
  total = this.cartService.total; //computed(0); */

  cantidadEspecifica(idProducto: number | undefined) {
    // return this.cartService.cantidadEspecifica(idProducto);
  }

  removeItemProduct(productId: number | undefined) {
    // return this.cartService.removeItem(productId);
  }

  navigateToCarritoDetalle(): void{
    this.isOpenCart = false;
    // this.route.navigate(['/vendedor/cart']);
  }

  clearCart(): void{
    // this.cartService.clearCart();
  }

  openMenus(overlay: string){
    if(overlay === 'account') {
      this.isOpenAccount = !this.isOpenAccount; 
      this.isOpenMenuMovil = false; 
      this.isOpenCart = false;
    }
    if(overlay === 'cart'){
      this.isOpenCart = !this.isOpenCart; 
      this.isOpenMenuMovil = false; 
      this.isOpenAccount = false;
    } 
    if(overlay === 'menuMovil'){
      this.isOpenMenuMovil = !this.isOpenMenuMovil; 
      this.isOpenAccount = false; 
      this.isOpenCart = false;
    } 
  }

  cerrarMenus(){
    if(this.isOpenCart || this.isOpenMenuMovil || this.isOpenAccount){
      this.isOpenCart = false;
      this.isOpenMenuMovil = false;
      this.isOpenAccount = false;
    }
  }
}
