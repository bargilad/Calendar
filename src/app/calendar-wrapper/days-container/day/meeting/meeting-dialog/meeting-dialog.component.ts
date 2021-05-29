import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {IMeeting} from '../../../../../core/interfaces/IMeeting';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingDialogComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<MeetingDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: IMeeting) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
