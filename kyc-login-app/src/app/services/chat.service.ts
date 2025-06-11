

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://fltq3p3i31.execute-api.us-west-2.amazonaws.com/bot/kyc-chat-bot'; // Replace with your actual endpoint

  constructor(private http: HttpClient) {}

//  sendMessage(prompt: string): Observable<{ reply: string }> {
//    return this.http.post<{ reply: string }>(this.apiUrl, { prompt });
//  }

  sendMessage() {
  const payload = {
    prompt: 'Tell me a fun fact about space.'
  };

  this.http.post('https://fltq3p3i31.execute-api.us-west-2.amazonaws.com/bot/kyc-chat-bot', payload)
    .subscribe(response => {
      console.log(response);
    });
}
}

