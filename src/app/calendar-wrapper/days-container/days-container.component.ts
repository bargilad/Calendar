import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarService} from '../../core/services/calendar.service';
import {IDay} from '../../core/interfaces/IDay';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-days-container',
  templateUrl: './days-container.component.html',
  styleUrls: ['./days-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysContainerComponent implements OnInit, OnDestroy {
  daysInMonth: IDay[] = [];
  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private currentYear: number;
  private amountOfDaysInCurrentMonth: number;
  private currentMonth: number;
  private lastDayOfMonth: Date;
  private firstDayOfMonth: Date;
  private subscriptions = [];
  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }
  constructor(public calendarService: CalendarService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initMonth();
    this.subscribeToChanges();
  }

  private initMonth() {
    this.configureParametersOfCurrentMonth();
    for (let i = 1; i <= this.amountOfDaysInCurrentMonth; i++) {
      const todayDate = new Date(this.currentYear, this.currentMonth, i).toDateString();
      const meetingThisDay = this.calendarService.meetingsMap.get(todayDate);
      meetingThisDay ? this.daysInMonth.push({today: todayDate, meetings: meetingThisDay, isDisabled: false}) :
        this.daysInMonth.push({today: todayDate, meetings: [], isDisabled: false});
    }
    this.addPaddingDays();
    this.cdr.markForCheck();
  }

  private configureParametersOfCurrentMonth() {
    this.daysInMonth = [];
    this.amountOfDaysInCurrentMonth = this.calendarService.getAmountOfDaysInCurrentMonth();
    this.currentYear = this.calendarService.getDateControllerValue().getFullYear();
    this.currentMonth = this.calendarService.getDateControllerValue().getMonth();
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.lastDayOfMonth = new Date(this.currentYear, this.currentMonth, this.amountOfDaysInCurrentMonth);
  }

  private subscribeToChanges() {
    this.sub = this.calendarService.getDateController().valueChanges.subscribe(_ => {
      this.initMonth();
    });
  }

  private addPaddingDays() {
    this.paddingDaysAtTheEnd();
    this.paddingDaysAtStart();
  }

  private paddingDaysAtStart() {
    const firstDayOfMonthInNumber = this.firstDayOfMonth.getDay() + 1;
    if (firstDayOfMonthInNumber !== 1) {
      const amountOfDaysToAdd = firstDayOfMonthInNumber - 1;
      const lastDayOfPreviousMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth(), 0).getDate();
      const newDate = new Date();
      for (let i = 0; i < amountOfDaysToAdd; i++) {
        newDate.setDate(lastDayOfPreviousMonth - i);
        this.daysInMonth.unshift({today: newDate.toDateString(), meetings: [], isDisabled: true});
      }
    }
  }

  private paddingDaysAtTheEnd() {
    const lastDayOfMonthNumber = this.lastDayOfMonth.getDay() + 1;
    const amountOfDaysToAdd = 7 - lastDayOfMonthNumber;
    for (let i = 1; i <= amountOfDaysToAdd; i++) {
      const newDate = new Date();
      newDate.setDate(this.lastDayOfMonth.getDate() + i);
      this.daysInMonth.push({today: newDate.toDateString(), meetings: [], isDisabled: true});
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
