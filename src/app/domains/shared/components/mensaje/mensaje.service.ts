import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }
  
  showMessage(titulo: string, text: string, icon: any) {
    Swal.fire({
      title: titulo,
      text: text,
      icon: icon,
      confirmButtonColor: "#C69D75",
      confirmButtonText: "Aceptar"
    });
  }

  toastMessage(title: string, icon: any, position: any, timer: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: `${title}`
    });
  }
}
