import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/movies';
import { MoviesService } from 'src/app/services/movies-service.service';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss']
})
export class AddMoviesComponent implements OnInit {
  moviTitle: string = '';
  image: string = '';
  isWatched: boolean = false;
  isFav: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.moviTitle && this.image) {
      const newMovie: Movies = {
        isFav: this.isFav,
        isWatched: this.isWatched,
        image: this.image,
        title: this.moviTitle,
        id: Math.round(Math.random() * 100000)
      }
      this.moviesService.addMovie(newMovie).subscribe((movie) => this.router.navigate(['/']));
    }
  }

}
