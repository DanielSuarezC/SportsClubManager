import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() placeholder: string = '';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(){
    this.debouncerSubscription = this.debouncer
    .pipe(debounceTime(500))
    .subscribe((value: string) => this.onDebounce.emit(value));
  }

  ngOnDestroy(){
    this.debouncerSubscription?.unsubscribe();
  }
  
  onKeyPress(dato: string){
    this.debouncer.next(dato);
  }
}
