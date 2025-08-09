import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game3 } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game3;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game3();
    console.log('New game started:', this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() ?? '';
      this.pickCardAnimation = true;
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; 

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      // Spieler nur hinzufügen, falls ein Name eingegeben wurde
      if (result && result.trim().length > 0) {
        this.game.players.push(result.trim());
      }
    });
  }
}