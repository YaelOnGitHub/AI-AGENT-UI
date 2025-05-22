import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-greetings',
  imports: [CommonModule],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.scss'
})
export class GreetingsComponent {
  sharedService = inject(SharedService);
  isFadingOut = false;
  isHidden = false;

  GreetFadeOut(){
    this.isFadingOut = true;
    setTimeout(() => {
      this.isHidden = true;
    }, 500);
  }
  
  constructor(){
    this.sharedService.sendSuggest.subscribe(() => {
      this.GreetFadeOut();
    })
  }
}
