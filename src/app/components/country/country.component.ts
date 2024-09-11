import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AppService } from '../../services/app.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent implements OnInit, OnDestroy {
  countryCode: string = '';
  countryName: string = '';
  years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020-2030
  holidays: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.countryCode = params['code'];
      this.service
        .getCountryInfo(params['code'])
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.countryName = data['officialName'];
        });
      this.service
        .getHolidaysForYear(new Date().getFullYear(), params['code'])
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.holidays = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  switchToYear(year: number): void {
    this.service
      .getHolidaysForYear(year, this.countryCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.holidays = data;
      });
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
