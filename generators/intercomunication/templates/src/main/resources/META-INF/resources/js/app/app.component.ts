import { Component, ApplicationRef } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	caption = 'Hello world!';

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private applicationRef: ApplicationRef
	) {
		this.initTranslate();
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}

	ngOnInit() {
		this.liferayService.on('test', (data: any) => {
			console.log('do something');
			this.caption = data.test;
			this._propagateEventToDOM();
		});

		setTimeout(()=> {
			this.liferayService.fire('test', {test:'cosa2'});
		}, 1000);
	}

	_propagateEventToDOM() {
		this.applicationRef.tick();
	}
}