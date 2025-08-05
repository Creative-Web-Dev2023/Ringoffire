import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game'; 

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  game!: Game;  //! Definite assignment assertion dass die Variable nicht undefined oder null ist

constructor() { }

ngOnInit(): void {
  this.newGame();
}

newGame() {
  this.game = new Game();
  console.log('New game started:', this.game);
}

takeCard() {
  this.pickCardAnimation = true;
}
}