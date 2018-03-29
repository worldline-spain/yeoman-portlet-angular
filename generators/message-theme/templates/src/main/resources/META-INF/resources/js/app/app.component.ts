import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import {Message} from 'primeng-wl/components/common/api';
import {MessageService} from 'primeng-wl/components/common/messageservice';



@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	msgs: Message[] = [];
	msgs_growl: Message[] = [];

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService
	) {
		this.initTranslate();
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}

	show() {
		this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
	}

	hide() {
		this.msgs = [];
	}

	show_growl() {
		this.msgs_growl.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
	}

	hide_growl() {
		this.msgs_growl = [];
	}
}