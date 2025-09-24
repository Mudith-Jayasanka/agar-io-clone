import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Game } from '../../services/game';
import { Player } from '../../services/player';
import { FoodService } from '../../services/food';
import { Food } from '../../models/food';
import { Vector } from '../../models/vector';

@Component({
  selector: 'app-game-canvas',
  standalone: true,
  imports: [],
  templateUrl: './game-canvas.html',
  styleUrls: ['./game-canvas.css']
})
export class GameCanvas implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;

  constructor(private game: Game, private player: Player, private foodService: FoodService) {}

  ngAfterViewInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.gameCanvas.nativeElement.width = this.width;
    this.gameCanvas.nativeElement.height = this.height;
    this.game.startGameLoop(() => this.draw());
  }

  ngOnDestroy(): void {
    this.game.stopGameLoop();
  }

  onMouseMove(event: MouseEvent): void {
    const direction = new Vector(
      event.clientX - this.width / 2,
      event.clientY - this.height / 2
    );
    this.player.updateDirection(direction);
  }

  onMouseLeave(): void {
    this.player.updateDirection(new Vector(0, 0));
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Save the canvas state
    this.ctx.save();

    // Translate to center the player
    const translateX = this.width / 2 - this.player.position.x;
    const translateY = this.height / 2 - this.player.position.y;
    this.ctx.translate(translateX, translateY);

    this.drawGrid();
    this.drawFood();
    this.drawPlayer();

    // Restore the canvas state
    this.ctx.restore();
  }

  private drawGrid(): void {
    this.ctx.strokeStyle = '#ccc';
    const gridSize = 50;
    const buffer = 200; // The buffer to draw outside the viewport

    const playerX = this.player.position.x;
    const playerY = this.player.position.y;

    // Calculate the top-left corner of the buffered drawing area
    const viewX = playerX - (this.width / 2) - buffer;
    const viewY = playerY - (this.height / 2) - buffer;
    const bufferedWidth = this.width + buffer * 2;
    const bufferedHeight = this.height + buffer * 2;

    // Align to the grid
    const startX = viewX - (viewX % gridSize);
    const startY = viewY - (viewY % gridSize);

    // Draw vertical lines across the buffered area
    for (let x = startX; x < viewX + bufferedWidth + gridSize; x += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, startY);
        this.ctx.lineTo(x, startY + bufferedHeight + gridSize);
        this.ctx.stroke();
    }

    // Draw horizontal lines across the buffered area
    for (let y = startY; y < viewY + bufferedHeight + gridSize; y += gridSize) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, y);
        this.ctx.lineTo(startX + bufferedWidth + gridSize, y);
        this.ctx.stroke();
    }
  }

  private drawFood(): void {
    this.foodService.foods.forEach(food => {
      this.ctx.fillStyle = food.color;
      this.ctx.beginPath();
      this.ctx.arc(food.position.x, food.position.y, food.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  private drawPlayer(): void {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.player.position.x, this.player.position.y, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
