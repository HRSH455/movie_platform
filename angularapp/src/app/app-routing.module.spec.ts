import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule, HttpClientTestingModule
      ]
    });

    router = TestBed.inject(Router);
    router.initialNavigation(); // Initialize the router
  });


  fit('Frontend_day34_should_navigate_to_Adminaddmovie_to_load_AddMovieComponent', async () => {
    await router.navigate(['admin/add/newMovies']);
    expect(router.url).toBe('/admin/add/newMovies');
  });


  fit('Frontend_day34_should_navigate_to_userviewMybookings_to_load_UserviewbookingComponent', async () => {
    await router.navigate(['user/view/Mybookings']);
    expect(router.url).toBe('/user/view/Mybookings');

  });


});
