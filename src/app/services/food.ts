import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foods: Food[] = [];
  private colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  private foodRadius = 7;
  private mapSize = 2000;

  constructor() {
    this.spawnInitialFood(200);
  }

  spawnInitialFood(count: number): void {
    for (let i = 0; i < count; i++) {
      this.spawnFood();
    }
  }

  spawnFood(): void {
    const position = new Vector(
      Math.random() * this.mapSize - this.mapSize / 2,
      Math.random() * this.mapSize - this.mapSize / 2
    );
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.foods.push(new Food(position, this.foodRadius, color));
  }

  removeFood(food: Food): void {
    const index = this.foods.indexOf(food);
    if (index > -1) {
      this.foods.splice(index, 1);
    }
  }
}