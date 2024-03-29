import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, isDevMode, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { TimerComponent } from "../timer/timer.component";

export interface Card {
  imageUrl: string;
  state: 'default' | 'flipped' | 'matched';
  value: string;
  seleccion: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', './../../game.module.scss'],
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      state(
        "matched",
        style({
          visibility: "false",
          transform: "scale(0.05)",
          opacity: 0
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")]),
      transition("* => matched", [animate("400ms")])
    ])
  ]
})
export class BoardComponent implements OnInit {
  isProduction = environment.production;

  @ViewChild(TimerComponent) timer!: TimerComponent;

  imageUrlFirstTime = "/assets/images/d36bf21bac71e6b64a9fb10a24a29319.png";
  imageUrlBackOfCard = "/assets/images/2540e00cdb975e70dee4f346b027451b.jpg";
  level: number = 1;
  plays: number = 0;
  score: number = 0;
  selections: Card[] = [];
  coincidences: number = 0;
  initialTime: number = 1500;
  visionTime: number = 0;
  nextLevelAvailable:boolean = false;
  winner:boolean = false;
  firstTime:boolean = true;
  buttonStopClicked:boolean = false;

  cards: Card[] = [
    { imageUrl: "/assets/images/9afd9a7771d5ebe534e7ff93f5aad005.jpg", state: "default", value: '1', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/602edcc9136ac24d84c5632c3ed5a704.jpg", state: "default", value: '2', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/768b09c850b422f79b01657ef7866ef8.jpg", state: "default", value: '3', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/3471c186ac4286f0cf4c6bc95b2013a4.jpg", state: "default", value: '4', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/152053a6c324931e42fab6b05213dc77.jpg", state: "default", value: '5', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/594315c2b8927d172491c6e3fde034b6.jpg", state: "default", value: '6', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/12205145e41304ecb3e6fa5d667728ff.jpg", state: "default", value: '7', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/c8a3005eb16729382a97c71cb405b91e.jpg", state: "default", value: '8', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/be26e22ed59bd348d0ed03140fcda3a0.jpg", state: "default", value: '9', seleccion: false, disabled: false },

    { imageUrl: "/assets/images/9afd9a7771d5ebe534e7ff93f5aad005.jpg", state: "default", value: '1', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/602edcc9136ac24d84c5632c3ed5a704.jpg", state: "default", value: '2', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/768b09c850b422f79b01657ef7866ef8.jpg", state: "default", value: '3', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/3471c186ac4286f0cf4c6bc95b2013a4.jpg", state: "default", value: '4', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/152053a6c324931e42fab6b05213dc77.jpg", state: "default", value: '5', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/594315c2b8927d172491c6e3fde034b6.jpg", state: "default", value: '6', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/12205145e41304ecb3e6fa5d667728ff.jpg", state: "default", value: '7', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/c8a3005eb16729382a97c71cb405b91e.jpg", state: "default", value: '8', seleccion: false, disabled: false },
    { imageUrl: "/assets/images/be26e22ed59bd348d0ed03140fcda3a0.jpg", state: "default", value: '9', seleccion: false, disabled: false }
  ]

  constructor() { }

  ngOnInit(): void {
    this.visionTime = this.initialTime;
    this.shuffleDelay();

    let x = environment.production;
     isDevMode() && console.log({ x });

  }

  cardClicked(card: Card) {
    if (!card.seleccion) {
      card.seleccion = true;
      card.disabled = true;
      this.plays++;

      if (card.state === "default") {
        card.state = "flipped";
      }

      if (this.plays < 3) {
        if (this.selections.length < 3) {
          this.selections.push(card)
        }
      }

      if (this.plays == 2) {
        if (this.selections[0].value != this.selections[1].value) {
          this.selections.forEach(card => {
            setTimeout(() => {
              card.seleccion = false;
              card.disabled = false;
              card.state = "default"
            }, this.visionTime);
          });
          this.plays = 0;
          this.selections = [];
        }
        else {
          this.coincidences++;
          this.plays = 0;
          this.selections = [];
        }
      }
    }

    this.winningPlayer();

  }

  checkAciertos() {
    return (this.coincidences == (this.cards.length / 2)) ? true : false;
  }

  _shuffle(array: Card[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  autoWinner() {
    this.cards.forEach((card) => {
      card.seleccion = true;
      card.state = "flipped"
    })

    this.coincidences = (this.cards.length / 2);
    this.winningPlayer();
  }

  winningPlayer() {
    if (this.checkAciertos()) {
      this.timer.stopTimer();
      setTimeout(() => {
        this.nextLevelAvailable = true;
        this.winner = true;
      }, 500);
    }
  }

  resetGame() {
    this.cardsInitialized();
    this.shuffleDelay();

    this.level = 1;
    this.plays = 0
    this.selections = [];
    this.coincidences = 0;
    this.visionTime = this.initialTime;
    this.nextLevelAvailable = false;
    this.winner = false;

    this.timer.resetTimer();
    this.timer.startTimer();
  }



  resetLevel() {
    this.cardsInitialized();
    this.shuffleDelay();

    this.plays = 0
    this.selections = [];
    this.coincidences = 0;
    this.nextLevelAvailable = false;
    this.winner = false;

    this.timer.resetTimer();
    this.timer.startTimer();
  }

  nextLevel() {
    this.level++;
    this.cardsInitialized();
    this.shuffleDelay();

    this.plays = 0
    this.selections = [];
    this.coincidences = 0;
    this.visionTime = (this.visionTime > 500) ? this.visionTime - 100 : this.visionTime;
    this.nextLevelAvailable = false;
    this.winner = false;

    this.timer.resetTimer();
    this.timer.startTimer();
  }

  cardsInitialized() {
    this.cards.forEach((card) => {
      card.state = "default"
      card.seleccion = false;
      card.disabled = false;
    })
  }

  cardsDisabled() {
    this.cards.forEach((card) => {
      card.state = "default"
      card.seleccion = false;
      card.disabled = true;
    })
  }

  shuffleDelay() {
    setTimeout(() => {
      this.cards = this._shuffle(this.cards);
    }, 300)
  }

  startGame() {
    this.firstTime = false;
    this.timer.startTimer();
  }

  stopGame() {
    this.resetLevel();
    this.cardsDisabled();
    this.timer.stopTimer();
    this.buttonStopClicked = true;
  }

  startTimer() {
    this.timer.startTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }

  resetTimer() {
    this.buttonStopClicked = false;
    this.timer.resetTimer();
  }

  toTransferScore(score: number) {
    this.score = score;
  }

  executeAction(action: string) {
    (action === 'nextLevel')? this.nextLevel() : this.resetLevel()
  }

  printCards(){
     isDevMode() && console.log(this.cards);
  }

  resetTextorStartText(){
    return this.buttonStopClicked? 'Start Game': 'Reset Level';
  }
}
