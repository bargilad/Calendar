import {Injectable} from '@angular/core';
import {IMeeting} from '../interfaces/IMeeting';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  meetingsMap: Map<string, IMeeting[]> = new Map<string, IMeeting[]>();
  dateFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.initService();
  }


  public getAmountOfDaysInCurrentMonth(): number {
    const month = this.getDateControllerValue().getMonth() + 1;
    const year = this.getDateControllerValue().getFullYear();
    return new Date(year, month, 0).getDate();
  }

  private initService() {
    const newDate = new Date();
    this.dateFormGroup = this.fb.group({
      date : [new Date()],
    });
  }

  getDateController(): AbstractControl {
    return this.dateFormGroup.get('date');
  }

  getDateControllerValue(): Date {
    return this.dateFormGroup.get('date').value;
  }

  moveToPrevMonth() {
    const currentDate = this.getDateControllerValue();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    this.getDateController().setValue(newDate);
  }

  moveToNextMonth() {
    const currentDate = this.getDateControllerValue();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    this.getDateController().setValue(newDate);
  }
}
