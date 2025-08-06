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
  currentCard: string = '';
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
  if(!this.pickCardAnimation){  // nur wenn pickCardAnimation false ist, kann eine Karte genommen werden
  this.currentCard = this.game.stack.pop() ?? ''; // ?? '' bedeuten dass, wenn der Wert undefined ist, ein leerer String verwendet wird
 
  this.pickCardAnimation = true;
 
   console.log('new Card:'+ this.currentCard);
  console.log('Game is:' ,this.game);


  setTimeout(() => { 
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = false;
  }, 1000); 
}
}
}