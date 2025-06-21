import { Component, inject, Input, OnInit } from '@angular/core';
import { ImagesService, UnsplashImage } from '../../../shared/models/club/service/images.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../models/user/services/user.service';
import { paylod } from '../../models/paylod';
import { jwtDecode } from 'jwt-decode';
import { ClubAdministrator } from '../../models/member/entities/ClubAdministrator';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home-club',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-club.component.html',
  styleUrl: './home-club.component.css'
})
export class HomeClubComponent {
  @Input() public typeUser: string = '';
    public id: number = 0;
  
    private cookieService = inject(CookieService);
    private sportsImageService = inject(ImagesService);
    private userService = inject(UserService);
    private dataService = inject(DataService);

    private token: string;
    public clubAdministratorId: number;
    public currentImage: UnsplashImage | null = null;
    public paylod: paylod;
  
    constructor() { }
  
    ngOnInit() {
      this.loadRandomImage();
      this.getClubAministrator();
    }
  
    loadRandomImage() {
      this.sportsImageService.getRandomSportsImage().subscribe({
        next: (image) => {
          this.currentImage = image;
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }

    getClubAministrator(){
      let username = this.paylod.username;
      
      this.userService.getByUsername(username, this.token ).subscribe({
        next: (data) => {
          console.log('Club Administrator:', data);
        }
      });
    }
}
