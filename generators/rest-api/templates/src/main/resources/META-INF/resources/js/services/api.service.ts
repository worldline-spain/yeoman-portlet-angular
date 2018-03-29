import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

export const BASE_URL_SERVER = new OpaqueToken('_baseUrlServer');
export const HEROE_API = new OpaqueToken('_catsApi');
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  constructor(
    private http: Http,
    @Inject(BASE_URL_SERVER) private baseUrl: string,
    @Optional() private defaultOptions?: RequestOptions) {
  }

  get(endpoint: string, options?: RequestOptions) {
    options = this._defaultOptions(options);
    return this.http.get(`${this.baseUrl}/${endpoint}`, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    options = this._defaultOptions(options);
    return this.http.post(`${this.baseUrl}/${endpoint}`, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    options = this._defaultOptions(options);
    return this.http.put(`${this.baseUrl}/${endpoint}`, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    options = this._defaultOptions(options);
    return this.http.delete(`${this.baseUrl}/${endpoint}`, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    options = this._defaultOptions(options);
    return this.http.put(`${this.baseUrl}/${endpoint}`, body, options);
  }

  private _defaultOptions(requestOptions?: RequestOptions) {
    if (this.defaultOptions)  {
      this.defaultOptions.headers.keys().forEach((key:any) => {
        requestOptions.headers.set(key,this.defaultOptions.headers.get(key));
      });
      return this.defaultOptions.merge(requestOptions);
    } else {
      return requestOptions;
    }
  }
}
