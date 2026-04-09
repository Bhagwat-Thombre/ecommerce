import { Component, inject } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  chatbotService = inject(ChatbotService);

  isOpen = false;
  userMessage = '';
  messages: { from: 'user' | 'ai'; text: string }[] = [];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add user message
    this.messages.push({ from: 'user', text: this.userMessage });
    const messageToSend = this.userMessage;
    this.userMessage = '';

    // Ask AI
    const aiResponse = await this.chatbotService.askAI(messageToSend);
    this.messages.push({ from: 'ai', text: aiResponse });
  }
}
