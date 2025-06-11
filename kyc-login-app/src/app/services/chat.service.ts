

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://4rwel4a1s5.execute-api.us-west-2.amazonaws.com/default/chatbotLambda3'; // Replace with your actual endpoint

  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(this.apiUrl, { prompt });
  }
}

