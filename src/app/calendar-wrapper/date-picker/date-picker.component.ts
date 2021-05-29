import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarService} from '../../core/services/calendar.service';
import {FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, OnDestroy {
  months = [
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'December'},
  ];

  years: number[] = [];
  selectedMonth: any;
  selectedYear: any;
  private subscriptions = [];
  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  constructor(public calendarService: CalendarService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    for (let i = 1950; i < 2050; i++) {
      this.years.push(i);
    }
    this.updatePickers();
    this.sub = this.calendarService.getDateController().valueChanges.subscribe(_ => {
      this.updatePickers();
    });
  }

  private updatePickers() {
    this.selectedMonth = this.calendarService.getDateControllerValue().getMonth() + 1;
    this.selectedYear = this.calendarService.getDateControllerValue().getFullYear();
    this.cdr.markForCheck();
  }

  changeMonth() {
    const newDate = new Date(this.calendarService.getDateControllerValue().getFullYear(), this.selectedMonth - 1, this.calendarService.getDateControllerValue().getDate());
    this.calendarService.getDateController().setValue(newDate);
  }

  changeYear() {
    const newDate = new Date(this.selectedYear, this.calendarService.getDateControllerValue().getMonth(), this.calendarService.getDateControllerValue().getDate());
    this.calendarService.getDateController().setValue(newDate);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
