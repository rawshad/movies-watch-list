import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faNotFav, faEye as faNotWatched } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() id: number = 0;
  @Input() isWatched: boolean = false;
  @Input() isFav: boolean = false;
  @Output() favClick = new EventEmitter();
  @Output() watchedClick = new EventEmitter();

  faFav = faNotFav;
  faWatched = faNotWatched;

  constructor () {
    
  }
  ngOnInit(): void {
    this.faFav = this.faFav ? faHeart : faNotFav;
    this.faWatched = this.faWatched ? faEye: faNotWatched;
  }
  onFavClick(): void {
    this.favClick.emit();
  }
  onWatchedClick(): void {
    this.watchedClick.emit();
  }
}
