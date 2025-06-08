import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent{

constructor() { }

isOpenMenuMovil = false;
clubs = [];

}
