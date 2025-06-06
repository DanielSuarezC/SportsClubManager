import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export class AppComponent implements OnInit {
  title = 'SportsClubManager';

  private baseUrl = environment.urlAplicacion;
  cookieService = inject(CookieService);
  route = inject(Router);
  token = '';

  ngOnInit(){
    if(window.location.toString() === this.baseUrl || window.location.toString() === this.baseUrl + '/') {
      this.route.navigate(['/home']);
    }
  }
}
