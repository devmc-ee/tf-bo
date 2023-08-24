import { environment } from 'src/environments/environment';
import { ITfApiProvider } from './tf-api.type';
import { IBaseProvider, IBaseRequestOptions } from '../provider.type';
import { Injectable } from '@angular/core';
import { AbstractBaseProvider } from '../abstract-base.provier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TfApiProvider implements IBaseProvider {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  isAuth(idToken: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth`, {
      idToken
    }, { withCredentials: true });
  }
  
  getById(id: string, options: IBaseRequestOptions): unknown {
    throw new Error('Method not implemented.');
  }
  getCsrf() {
    console.log('HEAD')
    return this.http.head(`${this.baseUrl}/auth`, {
      withCredentials: true,
    });
  }
  get(options: IBaseRequestOptions): unknown[] {
    throw new Error('Method not implemented.');
  }
   post(data: unknown, options: IBaseRequestOptions): unknown {
    throw new Error('Method not implemented.');
  }
   patch(id: string, data: unknown, options: IBaseRequestOptions): unknown {
    throw new Error('Method not implemented.');
  }
}
