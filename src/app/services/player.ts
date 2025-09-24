import { Injectable } from '@angular/core';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root'
})
export class Player {
  position: Vector;
  velocity: Vector;
  private direction: Vector;
  mass: number;
  speed = 3;
  foodEaten = 0;

  get radius(): number {
    // Radius is the square root of the mass, which creates a non-linear growth effect.
    return Math.sqrt(this.mass);
  }

  constructor() {
    this.position = new Vector(0, 0); // Start at the world origin
    this.velocity = new Vector(0, 0);
    this.direction = new Vector(0, 0);
    this.mass = 400; // Initial mass, corresponds to a radius of 20
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
    this.mass += 50; // Each food pellet adds 10 to the mass
    console.log('Food Eaten:', this.foodEaten);
  }

  updateDirection(direction: Vector): void {
    this.direction = direction;
  }
}