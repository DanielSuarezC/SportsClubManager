import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

private dataService = inject(DataService);  

constructor() { }

ngOnInit() {
  this.getClubes();
}

public clubs: any[] = [];

isOpenMenuMovil = false;

getClubes(){
  this.dataService.getData('clubs').subscribe({
    next: (data) => {
      this.clubs = data;
    },
    error: (error) => {
      console.error('Error fetching clubs:', error);
    }
  });
}

}
