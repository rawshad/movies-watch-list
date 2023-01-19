import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/movies';
import { MoviesService } from 'src/app/services/movies-service.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss']
})
export class MoviesHomeComponent implements OnInit {
  movies: Movies[] = [];
  yetToWatchMovies: Movies[] = [];
  watchedMovies: Movies[] = [];


  constructor (private moviesService : MoviesService) {
    
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => this.movies = movies);
    console.log('movies', this.movies);
  }

  ngDoCheck() {
    if (this.movies.length && !this.watchedMovies.length) {
      this.yetToWatchMovies = this.movies.filter((m) => !m.isFav && !m.isWatched);
      this.watchedMovies = this.movies.filter((m) => m.isWatched);
    }
  }

  onFavClick(movie: Movies): void {
    this.moviesService.updateMovie({...movie, isFav: !movie.isFav, isWatched: movie.isFav ? true : movie.isWatched})
      .subscribe((updateMovie) => {
        if(updateMovie.isWatched) {
          const alreadyWatched = this.watchedMovies.find(movie => movie.id === updateMovie.id);
          if(alreadyWatched) {
            alreadyWatched.isFav = updateMovie.isFav
            this.watchedMovies = this.watchedMovies.map((m) => {
              if(m.id === updateMovie.id) {
                return updateMovie;
              }
              return m;
            })
          }
          else {
            this.watchedMovies.push(updateMovie);
          }
          this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id != updateMovie.id);
        }
      })
  }
  onWatchedClick(movie: Movies): void {
    const payLoadMovie = { ...movie, isWatched: !movie.isWatched};
    payLoadMovie.isFav = payLoadMovie.isWatched ? payLoadMovie.isFav: false;
    this.moviesService.updateMovie(payLoadMovie).subscribe((updatedMovie) => {
      if (updatedMovie.isWatched) {
        this.watchedMovies.push(updatedMovie);
        this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id !== updatedMovie.id)
      } else {
        this.watchedMovies = this.yetToWatchMovies.filter((m) => m.id !== updatedMovie.id);
        this.yetToWatchMovies.push(updatedMovie);
      }
    })
  }
}
