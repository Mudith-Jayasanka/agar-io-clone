import { Injectable } from '@angular/core';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root'
})
export class Player {
  position: Vector;
  velocity: Vector;
  private target: Vector;
  radius = 20;
  speed = 3;

  constructor() {
    this.position = new Vector(window.innerWidth / 2, window.innerHeight / 2);
    this.velocity = new Vector(0, 0);
    this.target = new Vector(window.innerWidth / 2, window.innerHeight / 2);
  }

  update(): void {
    const direction = this.target.subtract(this.position);
    const distance = direction.magnitude;

    // Stop moving if the distance is negligible to prevent shaking
    if (distance < 0.5) {
      return;
    }

    // Ensure the player doesn't overshoot the target
    const moveDistance = Math.min(this.speed, distance);
    this.velocity = direction.normalize().multiply(moveDistance);
    this.position = this.position.add(this.velocity);
  }

  updateTarget(x: number, y: number): void {
    this.target.x = x;
    this.target.y = y;
  }
}