export abstract class LiferayService {
    abstract getUserLiferay(): string;
    abstract getLanguageLiferay(): string;
    abstract on(eventName: string, callback:any): any;
    abstract fire(eventName: string, data?: any): any;
}