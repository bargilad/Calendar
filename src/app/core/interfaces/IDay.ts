import {IMeeting} from './IMeeting';

export interface IDay {
  today: string;
  isDisabled: boolean;
  meetings: IMeeting[];
}
