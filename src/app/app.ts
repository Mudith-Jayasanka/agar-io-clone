import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hud } from './components/hud/hud';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('agar-io-clone');
}
