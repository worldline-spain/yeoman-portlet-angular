import { Component, OnInit } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { SelectItem } from 'primeng-wl/primeng';
import { MenuItem } from 'primeng-wl/components/common/api';
import { Message } from 'primeng-wl/components/common/api';
import { Router } from '@angular/router';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	clicks: number = 0
	msgs: Message[] = [];
	items: MenuItem[];

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private router: Router
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
        this.items = [
            {label: 'Update', icon: 'fa-refresh', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: 'fa-close', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
        ];
    }

	count() {
		this.clicks++;
	}

	save() {
		this.msgs = [];
		this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
	}

	update() {
        this.msgs = [];
        this.msgs.push({severity:'warning', summary:'Success', detail:'Data Updated'});
    }
    
    delete() {
        this.msgs = [];
        this.msgs.push({severity:'danger', summary:'Success', detail:'Data Deleted'});
    }
}