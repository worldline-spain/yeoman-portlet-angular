import { Injectable } from '@angular/core';
import { LiferayService } from './Liferay.interface';

/* Liferay service constants */
import { LIFERAY_SERVICE_CONSTATNS } from './Liferay.constants';

/* Liferay instance */
declare const Liferay: any;

@Injectable()
export class LiferayServiceImpl implements LiferayService {

    private liferay: any;

    constructor() {
        try {
            this.liferay = Liferay;
        }
        catch (e) {
            this.liferay = undefined;
        }
    }

    public getUserLiferay(): string {
        if (this.liferay) {
            return this.liferay.ThemeDisplay.getUserName();
        }
        return LIFERAY_SERVICE_CONSTATNS.DEFAULT_USER;
    }

    public getLanguageLiferay(): string {
        if (this.liferay) {
            return this.liferay.ThemeDisplay.getLanguageId();
        }
        return LIFERAY_SERVICE_CONSTATNS.DEFAULT_LANGUAGE
    }
}