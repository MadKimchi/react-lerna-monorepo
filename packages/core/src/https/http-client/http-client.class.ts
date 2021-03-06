import { Observable, from, throwError } from 'rxjs';
import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError
} from 'axios';
import { map, catchError } from 'rxjs/operators';
import { RequestAuthInterceptor } from './interceptors/request.interceptor';
import { ErrorService } from '../../services';
import {
  ResponseHandleInterceptor,
  ReponseErrorHandleInterceptor
} from './interceptors/response.interceptor';

export class HttpClient {
  private _client: AxiosInstance;

  constructor(private _errorService: ErrorService) {
    this._client = Axios.create({});
    this.setInitialInterceptors();
  }

  public get<T>(url: string): Observable<T> {
    const fromPromise = from(this._client.get(url)) as Observable<AxiosResponse<T>>;
    return fromPromise.pipe(map((response: AxiosResponse<T>) => response.data));
  }

  public put<P, T>(url: string, payload: P): Observable<T> {
    const fromPromise = from(this._client.put(url, payload)) as Observable<AxiosResponse<T>>;
    return fromPromise.pipe(map((response: AxiosResponse<T>) => response.data));
  }

  public post<P, T>(url: string, payload: P): Observable<T> {
    const fromPromise = from(this._client.post(url, payload)) as Observable<AxiosResponse<T>>;
    return fromPromise.pipe(
      catchError((error: Error) => throwError(error)),
      map((response: AxiosResponse<T>) => response.data)
    );
  }

  public delete<P, T>(url: string, payload: P): Observable<T> {
    const fromPromise = from(this._client.delete(url, payload)) as Observable<AxiosResponse<T>>
    return fromPromise.pipe(map((response: AxiosResponse<T>) => response.data));
  }

  public patch<P, T>(url: string, payload: P): Observable<T> {
    const fromPromise = from(this._client.patch(url, payload)) as Observable<AxiosResponse<T>>
    return fromPromise.pipe(map((response: AxiosResponse<T>) => response.data));
  }

  public setAuthInterceptor(jwt: string): void {
    this._client.interceptors.request.use(
      (requestConfig: AxiosRequestConfig) =>
        RequestAuthInterceptor(requestConfig, jwt),
      (error: AxiosError) => {
        console.log(error);
      }
    );
  }

  // TODO: this needs to be public with a param to take interceptor function
  private setInitialInterceptors(): void {
    this._client.interceptors.response.use(
      (response: AxiosResponse) => ResponseHandleInterceptor(response),
      (error: AxiosError) =>
        ReponseErrorHandleInterceptor(error, this._errorService.onError)
    );
  }
}