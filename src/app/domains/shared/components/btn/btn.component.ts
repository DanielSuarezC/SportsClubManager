import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './btn.component.html'
})
export class BtnComponent {
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() color: string;
    @Input() routerLink: string = '';

    @Output() clicked = new EventEmitter<void>();

      //los colores disponibles son en base a la paleta de colores de la marca sports club manager:
      /* sports:{
                bluedark: '#3C5775',
                blue: '#3585BA',
                bluelight: '#9AC6DF',
                gray: '#8F99A3',
                graylight: '#D2D1CF'
              } */
  get colors(){
    return {
      'text-sports-graylight bg-sports-bluedark hover:bg-sports-blue': this.color === 'bluedark',
      'focus:ring-sports-blue ': this.color === 'bluedark',
      'dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800': this.color ==='bluedark',
      ' text-white bg-sports-blue hover:bg-sports-bluelight': this.color === 'blue',
      ' focus:ring-sports-bluelight ': this.color === 'blue',
      ' dark:bg-tiaras-wine dark:hover:bg-primary-700 dark:focus:ring-primary-800': this.color ==='blue',
    };
  }

  onClick() {
    this.clicked.emit(); // Emite el evento
  }
}
