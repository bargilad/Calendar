import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CalendarService} from '../../core/services/calendar.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorComponent implements OnInit {
  @Input() isLeftSide: boolean;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
  }

  moveMonth() {
    this.isLeftSide ?
      this.calendarService.moveToPrevMonth() :
      this.calendarService.moveToNextMonth();
  }
}
