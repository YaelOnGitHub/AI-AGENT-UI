import { Component, EventEmitter, inject, Output, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-textbox',
  standalone: true,              
  imports: [FormsModule],     
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss'
})
export class TextboxComponent {
  sharedService = inject(SharedService);
  inputText: string = '';
  isMicEnable: boolean = false;
  recognition: any;
  finalTranscript: string = '';

  @Output() sendMessage = new EventEmitter<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize speech recognition only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              this.finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          // Update textarea immediately with both final and interim results
          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.value = this.finalTranscript + interimTranscript;
            this.inputText = textarea.value;
          }
        };

        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isMicEnable = false;
        };

        this.recognition.onend = () => {
          if (this.isMicEnable) {
            this.recognition.start();
          }
        };
      }
    }
  }

  toggleMic() {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return;
    }

    if (this.isMicEnable) {
      this.recognition.stop();
      this.isMicEnable = false;
      // Clear textarea and input when stopping voice recognition
      this.inputText = '';
      this.finalTranscript = '';
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = '';
        textarea.placeholder = 'Ask anything';
      }
    } else {
      this.inputText = '';
      this.finalTranscript = '';
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = '';
        textarea.placeholder = 'Listening...';
      }
      this.recognition.start();
      this.isMicEnable = true;
    }
  }

  handleSend() {
    if (this.inputText.trim()) {
      // Stop voice recognition if it's active
      if (this.isMicEnable) {
        this.recognition.stop();
        this.isMicEnable = false;
      }

      this.sharedService.sendTextInput.next(this.inputText.trim());
      this.sharedService.sendSuggest.next('');
      this.inputText = '';
      this.finalTranscript = '';
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = '';
        textarea.placeholder = 'Ask anything';
        textarea.focus();
      }
    }
  }
}
