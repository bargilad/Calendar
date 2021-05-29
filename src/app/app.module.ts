import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarWrapperComponent } from './calendar-wrapper/calendar-wrapper.component';
import { NavigatorComponent } from './calendar-wrapper/navigator/navigator.component';
import { DatePickerComponent } from './calendar-wrapper/date-picker/date-picker.component';
import { DaysContainerComponent } from './calendar-wrapper/days-container/days-container.component';
import { MeetingComponent } from './calendar-wrapper/days-container/day/meeting/meeting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { WeekDayComponent } from './calendar-wrapper/days-container/day/week-day/week-day.component';
import {MonthDayComponent} from './calendar-wrapper/days-container/day/moth-day/month-day.component';
import { MeetingDialogComponent } from './calendar-wrapper/days-container/day/meeting/meeting-dialog/meeting-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarWrapperComponent,
    MonthDayComponent,
    NavigatorComponent,
    DatePickerComponent,
    DaysContainerComponent,
    MeetingComponent,
    WeekDayComponent,
    MeetingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  entryComponents: [MeetingDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
