import { Component, EventEmitter, Input, isDevMode, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css', './../../game.module.scss']
})
export class WinnerComponent implements OnInit {

  @Output() action = new EventEmitter<string>()
  @Input() nextLevelAvailable = false;
  @Input() score: number = 0;

  imageUrlStars!: string;
  imageUrlCongratulations = "/assets/images/123b09c850b3342f79b01657ef72366ef8.png";

  constructor() { }

  ngOnInit() {
    this.setStars(this.interpretScore(this.score));
  }

  nextLevel() {
    this.action.emit("nextLevel");
  }

  resetLevel() {
    this.action.emit("resetLevel")
  }

  interpretScore(score: number) {
    if (score <= 30000) {
      return 5;
    }
    else if (score > 30000 && score <= 38000) {
      return 4;
    }
    else if (score > 38000 && score <= 50000) {
      return 3;
    }
    else if (score > 50000 && score <= 60000) {
      return 2;
    } else {
      return 1;
    }
  }

  setStars(count: number) {
    switch (count) {
      case 1:
        this.imageUrlStars = "/assets/images/1-stars.png";
        break;
      case 2:
        this.imageUrlStars = "/assets/images/2-stars.png";
        break;
      case 3:
        this.imageUrlStars = "/assets/images/3-stars.png";
        break;
      case 4:
        this.imageUrlStars = "/assets/images/4-stars.png";
        break;
      case 5:
        this.imageUrlStars = "/assets/images/5-stars.png";
        break;
      default:
        this.imageUrlStars = "/assets/images/1-stars.png";
        break;
    }
  }

}
