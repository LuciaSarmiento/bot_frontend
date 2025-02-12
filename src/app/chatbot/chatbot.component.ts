/* import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

}
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true, // ✅ Indicar que es un componente standalone
  imports: [FormsModule, CommonModule], 
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  apiUrl = 'http://localhost:8000'; // URL del backend
  uploadedFiles: File[] = [];
  question: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = []; // Historial de mensajes

  constructor(private http: HttpClient, public authService: AuthService) {}

  onFileSelected(event: any) {
    this.uploadedFiles = event.target.files;
  }

  uploadFiles() {
    if (this.uploadedFiles.length === 0) {
      alert('Por favor, sube al menos un archivo.');
      return;
    }

    const formData = new FormData();
    for (let file of this.uploadedFiles) {
      formData.append('files', file, file.name);
    }

    this.http.post(`${this.apiUrl}/upload`, formData)
      .subscribe(
        (res: any) => alert(res.message),
        (err) => alert('Error al subir archivos.')
      );
  }

  updateQuestion(event: Event) {
    this.question = (event.target as HTMLInputElement).value;
  }

  sendQuestion() {
    if (!this.question.trim()) {
      alert('Por favor, escribe una pregunta.');
      return;
    }

    // Agregar pregunta al historial
    this.messages.push({ text: this.question, sender: 'user' });

    this.http.post(`${this.apiUrl}/query`, { question: this.question })
      .subscribe(
        (res: any) => {
          this.messages.push({ text: res.response, sender: 'bot' }); // Agregar respuesta del bot al historial
          this.question = ''; // Limpiar input
        },
        (err) => alert('Error al obtener respuesta.')
      );
  }
  logout() {
    this.authService.logout();
  }
}
