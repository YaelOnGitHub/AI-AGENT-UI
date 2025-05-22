import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sendSuggest = new Subject<string>();
  sendTextInput = new Subject<string>();
  userName = signal('Guest');

  
  constructor() { }
}
