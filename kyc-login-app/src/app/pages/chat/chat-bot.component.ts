import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChatbotService } from '../../services/chat.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface ApiResponse {
  statusCode: number;
  body: string;
}
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatbotComponent {
  messages: { from: 'user' | 'bot', text: string }[] = [];
  userInput = '';
  isLoading = false;

  constructor(private chatbotService: ChatbotService,private http: HttpClient) {}

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });
    this.userInput = '';
    this.isLoading = true;


 const payload = {
      body: JSON.stringify({ prompt: message }) // "body" as string
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<ApiResponse>('https://fltq3p3i31.execute-api.us-west-2.amazonaws.com/bot/kyc-chat-bot', payload, { headers })
      .subscribe({
        next: (res) => {
          // Step 1: Parse outer body if it's a stringified JSON
          const parsedBody = JSON.parse(res.body);

          // Step 2: Extract the 'response' value
          let responseText = parsedBody.response;

          console.log('✅ Extracted response:', responseText);
          this.messages.push({ from: 'user', text: responseText });
        },
        error: (err) => {
          console.error('❌ API error:', err);
        }
       // next: res => console.log('Response:', res),
       // error: err => console.error('Error:', err)
      });
  

  }
}
