import { IBaseProvider } from '../provider.type';

export interface ITfApiProvider extends IBaseProvider {
  isAuth(idToken: string): boolean
}