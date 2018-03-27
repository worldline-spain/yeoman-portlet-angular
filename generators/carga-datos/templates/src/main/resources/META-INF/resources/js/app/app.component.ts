import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import {Message,SelectItem} from 'primeng-wl/api';

// Declare Liferay 
declare const Liferay: any;

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	listItems: SelectItem[];

	msgs: Message[];
    
    uploadedFiles: any[] = [];

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService
	) {
		this.initTranslate();  


		this.listItems = [];
        this.listItems.push({label:'Item 1', value:'1'});
        this.listItems.push({label:'Item 2', value:'2'});
		this.listItems.push({label:'Item 3', value:'3'});
	}

	onUpload(event:any) {

        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.msgs = [];
		this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
		
    }
	

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}
}