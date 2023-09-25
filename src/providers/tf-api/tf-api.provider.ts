import { environment } from 'src/environments/environment';
import { IBaseProvider, IBaseRequestOptions } from '../provider.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TfApiProvider implements IBaseProvider {
  baseUrl: string;
  private token: string = '';

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.token = localStorage.getItem('tf_bo_at') || '';
  }

  getFullUrl(url: string, ...params: string[]): string {
    return `${this.baseUrl}${url}${params.length? `/${params.join('/')}` : ''}`
  }
  isAuth(idToken: string): Observable<{ user: unknown, accessToken: string }> {
    return this.http.post<{ user: unknown, accessToken: string }>(`${this.baseUrl}/auth`, {
      idToken
    }, { withCredentials: true });
  }

  getById(id: string, options: IBaseRequestOptions): unknown {
    throw new Error('Method not implemented.');
  }

  get(url: string, options?: IBaseRequestOptions) {
    return this.http.get(`${this.baseUrl}${url}`)
  }

  post(url: string, data: unknown, options?: IBaseRequestOptions) {
    return this.http.post(this.getFullUrl(url), data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    })
  }
  
  patch(url: string, id: string, data: unknown, options?: IBaseRequestOptions) {
    return this.http.patch(this.getFullUrl(url, id), data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    });
  }

  delete(url: string, id: string, options?: IBaseRequestOptions) {
    return this.http.delete(this.getFullUrl(url, id), {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    });
  }
}
