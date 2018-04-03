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

    public on(eventName: string, callback: any): any {
        if (this.liferay) {
            return Liferay.on(eventName, callback);
        } else {
            return "Portlet out of Liferay context.";
        }
    }

    public fire(eventName: string, data?: any): any {
        if (this.liferay) {
            return Liferay.fire(eventName, data);
        } else {
            return "Portlet out of Liferay context.";
        }
    }
}