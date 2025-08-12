import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
   imports: [],
  styleUrls: ['./home.css'],
template: `
  <div class="container">
    <div class="hero">
      <h2>Welcome to the App!</h2>
      <p>This is the home page.<br><small>Enjoy exploring the SpaceX launches data.</small></p>
    </div>
  </div>
`,
styles: [''] 
})
export class HomeComponent {}