import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
