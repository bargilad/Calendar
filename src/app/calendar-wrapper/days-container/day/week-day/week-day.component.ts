import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-week-day',
  templateUrl: './week-day.component.html',
  styleUrls: ['./week-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekDayComponent implements OnInit {
  @Input() today: string;
  constructor() { }

  ngOnInit() {
  }

}
