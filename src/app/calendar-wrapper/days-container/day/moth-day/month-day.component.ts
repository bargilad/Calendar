import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CalendarService} from '../../../../core/services/calendar.service';
import {IDay} from '../../../../core/interfaces/IDay';
import {IMeeting} from '../../../../core/interfaces/IMeeting';
import {MatDialog} from '@angular/material';
import {MeetingDialogComponent} from '../meeting/meeting-dialog/meeting-dialog.component';

@Component({
  selector: 'app-month-day',
  templateUrl: './month-day.component.html',
  styleUrls: ['./month-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthDayComponent implements OnInit {
  @Input() todayData : IDay;
  participants: string;
  time: Date;
  topic: string;
  addingMeetingsIsEnabled: boolean;
  constructor(public dialog: MatDialog,
              public cdr: ChangeDetectorRef,
              public calendarService: CalendarService) { }

  ngOnInit() {
   this.sortMeetingsByTime();
   this.addingMeetingsIsEnabled = !this.todayData.isDisabled && this.todayData.meetings.length < 5;
  }

  private sortMeetingsByTime() {
    this.todayData.meetings.sort((a: IMeeting, b: IMeeting) => {
      return a.time.getTime() - b.time.getTime();
    });
  }

  addNewMeeting() {
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      width: '250px',
      data: {participants: this.participants, topic: this.topic, time: this.time}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createNewMeeting(result);
    });
  }

  private createNewMeeting(result) {
    const meetingDateAndTime = new Date(this.todayData.today);
    const meetingTime = result.time.split(':');
    meetingDateAndTime.setHours(meetingTime[0], meetingTime[1]);
    this.todayData.meetings.push({participants: result.participants, topic: result.topic, time: meetingDateAndTime});
    this.sortMeetingsByTime();
    this.calendarService.meetingsMap.set(this.todayData.today, this.todayData.meetings);
    this.addingMeetingsIsEnabled = !this.todayData.isDisabled && this.todayData.meetings.length < 5;
    this.cdr.markForCheck();
  }
}
