package com.examly.springapp.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.BookingDTO;
import com.examly.springapp.entity.Booking;
import com.examly.springapp.exception.BookingNotFoundException;
import com.examly.springapp.service.BookingService;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;

    private BookingDTO convertToDTO(Booking booking) {
        return new BookingDTO(
            booking.getId(),
            booking.getUser().getUserId(),
            booking.getMovie().getId(),
            booking.getSeatCount(),
            booking.getTotalCost()
        );
    }

    @GetMapping("/api/booking")
    public ResponseEntity<List<BookingDTO>> getAll(){
        List<Booking> all=bookingService.getAllBookings();
        if(all.isEmpty()){
            return ResponseEntity.status(404).body(Collections.emptyList());
        }
        else{
            List<BookingDTO> dtos = all.stream().map(this::convertToDTO).collect(Collectors.toList());
            return ResponseEntity.status(200).body(dtos);
        }
    }

    @PostMapping("/api/booking/{userId}/{movieId}")
    public ResponseEntity<BookingDTO> add(@PathVariable int userId,@PathVariable Long movieId,@RequestBody Booking book){
        Booking book1=bookingService.createBooking(userId,movieId,book);
        return ResponseEntity.status(201).body(convertToDTO(book1));

    }
    @GetMapping("/api/booking/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId){
        Booking b=bookingService.getBookingById(bookingId);
        if(b==null){
            throw new BookingNotFoundException("Booking not found");

        }
        return ResponseEntity.status(200).body(convertToDTO(b));
    }
    @PutMapping("/api/booking/{bookingId}")
    public ResponseEntity<BookingDTO> update(@PathVariable Long bookingId, @RequestBody Booking booking) {
        Booking updated = bookingService.updateBooking(bookingId, booking);
        return ResponseEntity.status(200).body(convertToDTO(updated));
    }
    @DeleteMapping("/api/booking/{bookingId}")
    public ResponseEntity<Boolean> del(@PathVariable Long bookingId){
        boolean check=bookingService.deleteBooking(bookingId);
        if(!check){
            throw new BookingNotFoundException("Booking not found");
        }
        return ResponseEntity.status(200).body(check);
    }
    @GetMapping("/api/booking/movie/{movieId}")
    public ResponseEntity<List<BookingDTO>> getBookingBymovieId(@PathVariable Long movieId){
        List<Booking> b=bookingService.getBookingbyMovie(movieId);
        if(b.isEmpty()){
            throw new BookingNotFoundException("Booking not found");

        }
        List<BookingDTO> dtos = b.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.status(200).body(dtos);
    }
    @GetMapping("/api/booking/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingbyUserId(@PathVariable int userId){
        List<Booking> b=bookingService.getBookingByUserId(userId);
        if(b.isEmpty()){
            throw new BookingNotFoundException("Booking not found");

        }
        List<BookingDTO> dtos = b.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.status(200).body(dtos);
    }


}
