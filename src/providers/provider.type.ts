import { Observable } from 'rxjs';

export interface IBaseRequestOptions {
  limit?: number;
  offset?: number;
}

export interface IBaseProvider{
  baseUrl: string;
  getById(id: string, options: IBaseRequestOptions): unknown | null;
  get(utl: string, options: IBaseRequestOptions): Observable<unknown>;
  post(utl: string, data: unknown, options?: IBaseRequestOptions): unknown;
  patch(utl: string, id: string, data: unknown, options: IBaseRequestOptions): unknown
  delete(utl: string, id: string, options?: IBaseRequestOptions): void
}