import { Component } from '@angular/core';
import { Player } from '../../services/player';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [],
  templateUrl: './hud.html',
  styleUrls: ['./hud.css']
})
export class Hud {
  constructor(public player: Player) {}
}
