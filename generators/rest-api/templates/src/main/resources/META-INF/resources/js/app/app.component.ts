import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { HeroesHttpStore } from '../stores/heroes-http.store';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	data:any;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private heroesHttpStore: HeroesHttpStore
	) {
		this.initTranslate();
	}

	ngOnInit() {
		this.heroesHttpStore.getHeroes().subscribe((data:any) => {
			this.data = data;
		})
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}
}