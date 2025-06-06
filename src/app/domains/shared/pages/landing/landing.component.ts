import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterLink, OverlayModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent{

constructor() { }

isOpenMenuMovil = false;
clubs = [];

}
