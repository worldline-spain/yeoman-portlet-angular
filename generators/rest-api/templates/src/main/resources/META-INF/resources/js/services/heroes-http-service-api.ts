import { Inject, Injectable, Optional } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Api, HEROE_API } from './api.service';

@Injectable()
export class HeroesHttpApi {
  constructor(
    @Inject(HEROE_API) private api: Api,
    @Optional() private defaultOptions: RequestOptions) {
  }

  getHeroes(): Observable<any[]> {
    let defaultOptions = this.defaultOptions
    defaultOptions.headers.set('Accept', 'application/json')
    return this.api.get('public/characters', defaultOptions.merge({
      params: {
        limit: 20,
        offset: 0,
        ts: 1,
        apikey: "01c115c226d5b59b41763a9042339f57",
        hash: "bc60ad6d3b45d4124b579413088cb6d5"
      }
    }))
      .map((res:any) => res.json())
      .map((response:any) => response.data.results as any[])
      .map((heroes:any) => heroes);
  }
}
