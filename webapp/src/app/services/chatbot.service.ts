import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private API_KEY = 'AIzaSyDyipTWHHwH0NBEyLWYdXc6QfVgGVQWrQ0';
  private API_URL =
    'https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-chat:generateMessage';

  async askAI(message: string): Promise<string> {
    const prompt = `
You are an eCommerce assistant.
Answer clearly and politely to the user query about products, orders, cart, or payments.

User question: ${message}
`;

    try {
      const res = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { author: 'user', content: [{ type: 'text', text: prompt }] },
          ],
          maxOutputTokens: 500,
        }),
      });

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.[0]?.text || 'No response from AI';
      return reply;
    } catch (err) {
      console.error('AI Error:', err);
      return 'Error connecting to AI';
    }
  }
}
