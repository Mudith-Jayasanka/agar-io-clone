import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class Game {
  private animationFrameId!: number;

  constructor(private player: Player) {}

  startGameLoop(gameLoop: () => void): void {
    const loop = () => {
      this.player.update();
      gameLoop();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  stopGameLoop(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}