import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutesModule } from './game.routing';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutesModule
  ],
  declarations: [ BoardComponent ]
})
export class GameModule { }
