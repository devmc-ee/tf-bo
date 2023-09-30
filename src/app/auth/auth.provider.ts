import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';

@Injectable()
export class AuthProvider extends TfApiProvider {
  url = '/auth/refresh-token';

  refreshToken() {
    return this.post(this.url, {})
  }
}