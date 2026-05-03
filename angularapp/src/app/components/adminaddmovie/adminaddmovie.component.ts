import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrls: ['./adminaddmovie.component.css']
})
export class AdminaddmovieComponent implements OnInit {
  movie: Movie = { id: 0, title: '', duration: 0, genre: '', price: 0, totalSeats: 0 };
  isEditing: boolean = false;
  errorMessage: string = '';
  movieId?: number ;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params['id'];
    })
    if (this.movieId) {
      console.log(this.movieId);
      this.isEditing = true;
      this.loadMovie(this.movieId);
    }
  }
  loadMovie(id: number): void {
    this.movieService.getMovieById(id).subscribe(
      (data) => (this.movie = data),
      (error) => (this.errorMessage = 'Error loading movie')
    );
  }
  addOrUpdateMovie(): void {
    // Validation: Check if title is provided
    if (!this.movie.title || this.movie.title.trim().length === 0) {
      this.errorMessage = 'Movie title is required.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check title length
    if (this.movie.title.trim().length > 100) {
      this.errorMessage = 'Movie title must be less than 100 characters.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if genre is provided
    if (!this.movie.genre || this.movie.genre.trim().length === 0) {
      this.errorMessage = 'Movie genre is required.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if price is valid
    if (!this.movie.price || this.movie.price <= 0) {
      this.errorMessage = 'Movie price must be greater than 0.';
      alert(this.errorMessage);
      return;
    }

    if (this.movie.price > 10000) {
      this.errorMessage = 'Movie price is too high. Maximum allowed is 10000.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if totalSeats is valid
    if (!this.movie.totalSeats || this.movie.totalSeats <= 0) {
      this.errorMessage = 'Total seats must be greater than 0.';
      alert(this.errorMessage);
      return;
    }

    if (this.movie.totalSeats > 1000) {
      this.errorMessage = 'Total seats cannot exceed 1000.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if duration is valid
    if (!this.movie.duration || this.movie.duration <= 0) {
      this.errorMessage = 'Duration must be greater than 0 minutes.';
      alert(this.errorMessage);
      return;
    }

    if (this.movie.duration > 300) {
      this.errorMessage = 'Duration cannot exceed 300 minutes (5 hours).';
      alert(this.errorMessage);
      return;
    }

    if (this.isEditing) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
        () => this.closeModal(),
        (error) => {
          this.errorMessage = 'Error updating movie: ' + (error?.error?.message || 'Unknown error');
          console.error('Update error', error);
          alert(this.errorMessage);
        }
      );
    }
    else {
      this.movieService.addMovie(this.movie).subscribe(
        () => this.closeModal(),
        (error) => {
          this.errorMessage = 'Error adding movie: ' + (error?.error?.message || 'Unknown error');
          console.error('Add error', error);
          alert(this.errorMessage);
        }
      )
    }
  }

  closeModal(): void {
    alert(this.isEditing ? "Movie updated Successfully" : "Movie Added Successfully");
    this.router.navigate(['admin/view/Movies'])
  }
  cancelOperation(): void {
    this.router.navigate(['admin/view/Movies'])

  }



}


