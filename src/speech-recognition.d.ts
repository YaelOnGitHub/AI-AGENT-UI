interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    interpretation: any;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;

// Optional: Define a minimal type for recognition
interface ISpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onend: ((this: ISpeechRecognition, ev: Event) => any) | null;
    start(): void;
    stop(): void;
    abort(): void;
}
