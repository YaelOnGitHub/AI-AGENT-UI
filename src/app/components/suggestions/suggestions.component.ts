import { Component, inject, ViewChild } from '@angular/core';
import { GreetingsComponent } from '../greetings/greetings.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-suggestions',
  imports: [GreetingsComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {
  sharedService = inject(SharedService);
  isFadingOut = false;
  isHidden = false;

  SuggestFadeOut(){
    this.isFadingOut = true;
    setTimeout(() => {
      this.isHidden = true;
    }, 500);
  }
  
  constructor(){
    this.sharedService.sendSuggest.subscribe(() => {
      this.SuggestFadeOut();
    })
  }
 
}
