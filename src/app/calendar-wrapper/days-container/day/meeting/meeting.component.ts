import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IMeeting} from '../../../../core/interfaces/IMeeting';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingComponent implements OnInit {
  @Input() meetingDetails: IMeeting;
  constructor() { }

  ngOnInit() {
  }

}
