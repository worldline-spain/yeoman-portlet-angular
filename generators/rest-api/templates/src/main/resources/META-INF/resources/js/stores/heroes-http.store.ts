import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HeroesHttpApi } from '../services/heroes-http-service-api';

@Injectable()
export class HeroesHttpStore {

    constructor(
        private heroesHttpApi: HeroesHttpApi
    ) { }

    getHeroes(): Observable<any[]> {
        return this.heroesHttpApi.getHeroes()
    }
}