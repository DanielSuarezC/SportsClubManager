import { Component, Input, OnInit } from '@angular/core';
import { ImagesService, UnsplashImage } from '../../../shared/models/club/service/images.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  
    currentImage: UnsplashImage | null = null;
    imageGallery: UnsplashImage[] = [];
    loading = false;
    error: string | null = null;
  
    constructor(private sportsImageService: ImagesService) { }
  
    ngOnInit() {
      this.loadRandomImage();
    }
  
    loadRandomImage() {
      this.loading = true;
      this.error = null;
  
      this.sportsImageService.getRandomSportsImage().subscribe({
        next: (image) => {
          this.currentImage = image;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar la imagen. Verifica tu API key.';
          this.loading = false;
          console.error('Error:', err);
        }
      });
    }
}
