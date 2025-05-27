import { Component, inject, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  sharedService = inject(SharedService);
  isHidden = true;
  isFadeIn = false;
  messages: { text: string, isSuggestion: boolean }[] = [];

  getInitials(): string {
    const name = this.sharedService.userName();
    if (name === 'Guest') return 'GU';
    
    const words = name.split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  showChatbox(){
    this.isFadeIn = true;
    setTimeout(() => {
      this.isHidden = false;
    }, 500)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      const element = this.scrollContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) { }
  }

  constructor(){
    this.sharedService.sendSuggest.subscribe((text: string) => {
      if (text) {
        this.messages.push({ text, isSuggestion: true });
        this.showChatbox();
        this.sharedService.isTyping.set(true);
        
        // Show typing indicator for 2 seconds
        setTimeout(() => {
          this.sharedService.isTyping.set(false);
        }, 2000);
      }
    });

    this.sharedService.sendTextInput.subscribe((text: string) => {
      if (text) {
        this.messages.push({ text, isSuggestion: false });
        this.showChatbox();
        this.sharedService.isTyping.set(true);
        
        // Show typing indicator for 2 seconds
        setTimeout(() => {
          this.sharedService.isTyping.set(false);
        }, 2000);
      }
    });
  }
}