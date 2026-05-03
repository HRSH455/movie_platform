import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Booking } from 'src/app/models/booking.model';
import { Movie } from 'src/app/models/movie.model';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-userbookingmovie',
  templateUrl: './userbookingmovie.component.html',
  styleUrls: ['./userbookingmovie.component.css']
})
export class UserbookingmovieComponent implements OnInit {
  movieId!: number;
  movie!: Movie;
  selectedSeats: number = 1;
  maxSeats: number = 10;
  userId!: number;
  totalCost: number = 0;
  errorMessage: string = '';
  seatGrid: boolean[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService,
    private userStorageService: UserStoreService
  ) { }

  ngOnInit(): void {
    const movieIdParam = this.route.snapshot.paramMap.get('movieId');
    this.movieId = movieIdParam ? +movieIdParam : 0;
    this.userId = this.userStorageService.authUser?.userId ?? 0;

    if (this.movieId) {
      this.loadMovieDetails();
      this.initializeSeatGrid();
    }
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
        this.calculateTotalCost();
      },
      (error) => {
        this.errorMessage = 'Error loading movie details';
        console.error('Load movie error', error);
      }
    );
  }

  initializeSeatGrid(): void {
    const rows = 5;
    const cols = 10;
    this.seatGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );
  }

  incrementSeats(): void {
    if (this.selectedSeats < this.maxSeats) {
      this.selectedSeats++;
      this.calculateTotalCost();
    }
  }

  decrementSeats(): void {
    if (this.selectedSeats > 1) {
      this.selectedSeats--;
      this.calculateTotalCost();
    }
  }

  calculateTotalCost(): void {
    if (this.movie) {
      this.totalCost = this.selectedSeats * this.movie.price;
    }
  }

  toggleSeat(row: number, col: number): void {
    const currentSelectedSeats = this.countSelectedSeats();
    if (!this.seatGrid[row][col] && currentSelectedSeats < this.selectedSeats) {
      this.seatGrid[row][col] = true;
    } else if (this.seatGrid[row][col]) {
      this.seatGrid[row][col] = false;
    }
  }

  countSelectedSeats(): number {
    return this.seatGrid.reduce((total, row) =>
      total + row.filter(seat => seat).length, 0);
  }

  rowLabel(rowIndex: number): string {
    return String.fromCharCode(65 + rowIndex);
  }

  createBooking(): void {
    // Validation: Check if user is logged in
    if (!this.userId || this.userId <= 0) {
      this.errorMessage = 'User ID is invalid. Please login again.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if movie is loaded
    if (!this.movie || !this.movie.id) {
      this.errorMessage = 'Movie not loaded. Please refresh and try again.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if movie price is valid
    if (!this.movie.price || this.movie.price <= 0) {
      this.errorMessage = 'Invalid movie price.';
      alert(this.errorMessage);
      return;
    }

    // Validation: Check if selectedSeats is valid
    if (this.selectedSeats <= 0 || this.selectedSeats > this.maxSeats) {
      this.errorMessage = `Seat count must be between 1 and ${this.maxSeats}.`;
      alert(this.errorMessage);
      return;
    }

    const selectedSeatCount = this.countSelectedSeats();

    // Validation: Check if correct number of seats are selected
    if (selectedSeatCount !== this.selectedSeats) {
      this.errorMessage = `Please select exactly ${this.selectedSeats} seats`;
      alert(this.errorMessage);
      return;
    }

    // Validation: Verify totalCost calculation
    const expectedCost = this.selectedSeats * this.movie.price;
    if (Math.abs(this.totalCost - expectedCost) > 0.01) {
      this.errorMessage = 'Total cost calculation mismatch. Please refresh and try again.';
      alert(this.errorMessage);
      return;
    }

    const booking: Booking = {
      userId: this.userId,
      movieId: this.movieId,
      seatCount: this.selectedSeats,
      totalCost: this.totalCost
    };

    this.bookingService.addBooking(this.movieId, this.userId, booking).subscribe(
      () => {
        alert('Booking Added Successfully!');
        this.router.navigate(['/user/view/Movies']);
      },
      (error) => {
        this.errorMessage = 'Error creating booking: ' + (error?.error?.message || 'Unknown error');
        console.error('Booking error', error);
        alert(this.errorMessage);
      }
    );
  }
}