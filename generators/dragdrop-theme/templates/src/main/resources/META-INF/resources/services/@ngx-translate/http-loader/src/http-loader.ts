import {Http, Response} from "@angular/http";
import {TranslateLoader} from "../../core/index";
import "rxjs/add/operator/map";

export class TranslateHttpLoader implements TranslateLoader {
    constructor(private http: Http, private prefix: string = "/assets/i18n/", private suffix: string = ".json") {}

    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string): any {
        return this.http.get(`${this.prefix}${lang}${this.suffix}`)
            .map((res: Response) => res.json());
    }
}
