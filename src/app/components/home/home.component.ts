import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery = '';
  countries: any[] = [];
  randomCountries: any[] = [];
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .getAllCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.countries = data;
          this.service
            .getRandomCountries(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe((item) => {
              this.randomCountries = item;
            });
        },
        error: (error) => (this.errorMessage = error),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  selectCountry(country: any) {
    this.router.navigate(['/country', country.countryCode]);
  }

  searchCountries() {
    this.service
      .getAllCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.countries = data.filter((country: any) =>
          country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    console.log(this.searchQuery);
  }
}
