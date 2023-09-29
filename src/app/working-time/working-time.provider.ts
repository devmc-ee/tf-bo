import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';
import { IWorkingTime } from './working-time.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UpdateWorkingTimeDto } from './dto/update-working-time.dto';

@Injectable()
export class WorkingTimeProvider extends TfApiProvider {
  url = '/resto/v1/working-time';

  getWorkingTimes() {
    return this.get(`${this.url}?grouped=false`) as Observable<IWorkingTime[]> ;
  }

  editWorkingTime(id: string, data: UpdateWorkingTimeDto) {
    return this.patch(this.url, id, data);
  }
}