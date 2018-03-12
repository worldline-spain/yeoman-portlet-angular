import { Component } from '@angular/core';
import { TranslateService } from '../../libs/libs';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= title %>/js/app/app.html'
})
export class AppComponent {

	caption = 'Hello world!';

	constructor(
		private translate: TranslateService
	) {
		this.initTranslate();
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang('es');

		if (this.translate.getBrowserLang() !== undefined) {
			this.translate.use(this.translate.getBrowserLang());
		} else {
			this.translate.use('es'); // Set your language here
		}
	}
}