import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Dismiss warm-up splash once Angular has fully booted
    if ((window as any).__cinebookDismissWarmup) {
      (window as any).__cinebookDismissWarmup();
    }
  }
}
