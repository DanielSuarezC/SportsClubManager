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
  this.getClubs();
}

public clubs: any[] = [];
public events: any[] = [];

isOpenMenuMovil = false;

getClubs(){
  this.dataService.getData('clubs').subscribe({
    next: (data) => {
      this.clubs = data;
    },
    error: (error) => {
      console.error('Error fetching clubs:', error);
    }
  });
}

getEvents(){
  this.dataService.getData('events').subscribe({
    next: (data) => {
      this.events = data;
    },
    error: (error) => {
      console.error('Error fetching events:', error);
    }
  });
}

}
