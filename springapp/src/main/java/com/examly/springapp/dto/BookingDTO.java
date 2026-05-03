package com.examly.springapp.dto;

public class BookingDTO {
    private Long id;
    private int userId;
    private Long movieId;
    private int seatCount;
    private double totalCost;

    public BookingDTO() {
    }

    public BookingDTO(Long id, int userId, Long movieId, int seatCount, double totalCost) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.seatCount = seatCount;
        this.totalCost = totalCost;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }
}