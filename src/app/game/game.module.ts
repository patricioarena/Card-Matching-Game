import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutesModule } from './game.routing';
import { BoardComponent } from './components/board/board.component';
import { TimerComponent } from './components/timer/timer.component';
import { WinnerComponent } from './components/winner/winner.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutesModule
  ],
  declarations: [ BoardComponent, TimerComponent, WinnerComponent ]
})
export class GameModule { }
