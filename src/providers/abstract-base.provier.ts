import { HttpClient } from '@angular/common/http';
import { IBaseProvider, IBaseRequestOptions } from './provider.type';

export abstract class AbstractBaseProvider implements IBaseProvider {
  abstract  baseUrl: string;

  constructor(protected http: HttpClient){}

  abstract get(options: IBaseRequestOptions): unknown[] 
  abstract post(data: unknown, options: IBaseRequestOptions): unknown 
  abstract patch(id: string, data: unknown, options: IBaseRequestOptions): unknown 
  abstract getById(id: string, options: IBaseRequestOptions): unknown
}