import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  template: `<main>
      @if (user()) {
        <h1>Hello, {{ user()?.name }}!</h1>
      } @else {
        <button (click)="login()">Login to Box</button>
      }
    </main>`,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';
  userName = '';
  user = signal<{ name: string } | null>(null);
  http = inject(HttpClient);
  constructor() {
     window.addEventListener('message', (event) => {
      if (event.data?.accessToken) {
        localStorage.setItem('boxToken', event.data.accessToken);
        this.user.set({ name: event.data.name });
      }
    });

    const token = localStorage.getItem('boxToken');
    if (token) {
      // optionally call backend to fetch user
    }
    
  }
   login() {
    this.http.get<{ url: string }>('api/box/auth-url').subscribe((res) => {
      window.open(res.url, '_blank', 'popup,width=500,height=600');
    });
  }
}
