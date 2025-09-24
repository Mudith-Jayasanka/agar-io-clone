import { Injectable } from '@angular/core';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root'
})
export class Player {
  position: Vector;
  velocity: Vector;
  private direction: Vector;
  radius = 20;
  speed = 3;
  foodEaten = 0;

  constructor() {
    this.position = new Vector(0, 0); // Start at the world origin
    this.velocity = new Vector(0, 0);
    this.direction = new Vector(0, 0);
  }

  update(): void {
    const acceleration = 0.1; // A value between 0 and 1; lower is slower acceleration

    let targetVelocity = new Vector(0, 0);
    // Set a target velocity if the mouse is outside the dead zone
    if (this.direction.magnitude > this.radius) {
        targetVelocity = this.direction.normalize().multiply(this.speed);
    }

    // Smoothly interpolate the current velocity towards the target velocity
    this.velocity = this.velocity.lerp(targetVelocity, acceleration);

    // Update the player's position
    this.position = this.position.add(this.velocity);
  }

  eatFood(): void {
    this.foodEaten++;
    // We will add logic to grow the player later
    console.log('Food Eaten:', this.foodEaten);
  }

  updateDirection(direction: Vector): void {
    this.direction = direction;
  }
}