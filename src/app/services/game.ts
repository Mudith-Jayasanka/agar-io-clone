import { Injectable } from '@angular/core';
import { Player } from './player';
import { FoodService } from './food';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class Game {
  private animationFrameId!: number;

  constructor(private player: Player, private foodService: FoodService) {}

  startGameLoop(gameLoop: () => void): void {
    const loop = () => {
      this.player.update();
      this.checkCollisions();
      gameLoop();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  stopGameLoop(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  private checkCollisions(): void {
    const foodsToRemove: Food[] = [];

    for (const food of this.foodService.foods) {
      const distance = this.player.position.subtract(food.position).magnitude;
      if (distance < this.player.radius + food.radius) {
        foodsToRemove.push(food);
      }
    }

    for (const food of foodsToRemove) {
      this.foodService.removeFood(food);
      this.player.eatFood();
    }
  }
}