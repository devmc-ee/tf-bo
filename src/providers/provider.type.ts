export interface IBaseRequestOptions {
  limit?: number;
  offset?: number;
}

export interface IBaseProvider {
  baseUrl: string;
  getById(id: string, options: IBaseRequestOptions): unknown | null;
  get(options: IBaseRequestOptions): unknown[];
  post(data: unknown, options: IBaseRequestOptions): unknown;
  patch(id: string, data: unknown, options: IBaseRequestOptions): unknown
}