import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',

})
export class NotFoundComponent {
  private router = inject(Router);
  private token;
  private cookieService = inject(CookieService);
  
  ngOnInit(){
    this.token = this.cookieService.get(environment.nombreCookieToken);
    // this.paylod = jwtDecode(this.token);
  }

  navigateToHome(){
 /*    if(this.paylod.rol === 'ADMINISTRADOR'){
      this.router.navigate(['/admin/club']);
    }else if(this.paylod.rol === 'VENDEDOR'){
      this.router.navigate(['/player/events']);
    }else{
      this.router.navigate(['/']);
    } */
   this.router.navigate(['/']);
  }
}
