import { Component, isDevMode, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css', './../../game.module.scss']
})
export class TimerComponent implements OnInit {

  @Output() score = new EventEmitter<number>()

  interval: any;

  miliseconds: number = 0;
  seconds: number = 0;
  minutes: number = 0;

  constructor() { }

  ngOnInit() {
    this.score.emit(0)
  }

  startTimer() {
    if (typeof this.interval == 'undefined') {
      this.interval = setInterval(() => {
        if (this.miliseconds > 0) {
          this.miliseconds++;
          if (this.miliseconds == 100) {
            this.seconds++;
            this.miliseconds = 0;
            if (this.seconds == 60) {
              this.minutes++;
              this.seconds = 0;
            }
          }
        } else {
          this.miliseconds = 1;
        }
      }, 10);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.calculateScore();
  }

  resetTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
  }

  calculateScore() {
    this.score.emit((this.miliseconds + (this.seconds * 1000) + (this.minutes * 60000)))
  }

}
