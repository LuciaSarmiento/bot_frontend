import { Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MetricsComponent } from './metrics/metrics.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'chatbot', pathMatch: 'full' },
];
