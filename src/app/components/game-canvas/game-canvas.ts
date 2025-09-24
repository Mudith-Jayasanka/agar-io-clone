import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Game } from '../../services/game';
import { Player } from '../../services/player';

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

  constructor(private game: Game, private player: Player) {}

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
    this.player.updateTarget(event.clientX, event.clientY);
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawPlayer();
  }

  private drawGrid(): void {
    this.ctx.strokeStyle = '#ccc';
    for (let x = 0; x <= this.width; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.height; y += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  private drawPlayer(): void {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.player.position.x, this.player.position.y, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
