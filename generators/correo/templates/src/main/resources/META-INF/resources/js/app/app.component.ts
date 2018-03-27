import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {Message,SelectItem} from 'primeng-wl/api';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	msgs: Message[] = [];

    userform: FormGroup;

    submitted: boolean;

	areas: SelectItem[];
		
    description: string;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private fb: FormBuilder
	) {
		this.initTranslate();
	}

	ngOnInit() {
        this.userform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'entity': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl(''),
			'area': new FormControl('', Validators.required),
			'detail': new FormControl('', Validators.required)
        });

        this.areas = [];
        this.areas.push({label:'', value:''});
        this.areas.push({label:'Value 1', value:'1'});
		this.areas.push({label:'Value 2', value:'2'});
		this.areas.push({label:'Value 3', value:'3'});
		this.areas.push({label:'Value 4', value:'4'});
					
    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Email sent.'});
    }

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}
}