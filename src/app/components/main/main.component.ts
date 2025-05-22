import { Component, signal } from '@angular/core';
import { GreetingsComponent } from '../greetings/greetings.component';
import { SuggestionsComponent } from '../suggestions/suggestions.component';
import { TextboxComponent } from '../textbox/textbox.component';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-main',
  imports: [GreetingsComponent,SuggestionsComponent,TextboxComponent,ChatboxComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
   
}
