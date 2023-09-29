import { IWorkingTime, WeekDay } from '../working-time.type';

export class UpdateWorkingTimeDto {
  isOpen = true;
  start = '';
  end = '';
  comment = '';

  constructor(data: IWorkingTime) {
    const entries = [];
    for (const key in this) {
      if (typeof data[key as keyof IWorkingTime] !== 'undefined') {
        entries.push([key, data[key as keyof IWorkingTime]]);
      }
    }
  
    Object.assign<Partial<IWorkingTime>, IWorkingTime>(this, Object.fromEntries(entries));
  }
}