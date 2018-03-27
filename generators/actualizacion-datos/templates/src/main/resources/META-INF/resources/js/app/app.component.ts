import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng-wl/api';

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})

export class AppComponent {


	languages: SelectItem[];

	msgs: Message[] = [];

	userform: FormGroup;

	submitted: boolean;

	genders: SelectItem[];

	description: string;

	currentLanguage: string;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private fb: FormBuilder
	) {

		this.languages = [];
		this.languages.push({ label: 'Spanish', value: 'es_ES' });
		this.languages.push({ label: 'English', value: 'en_US' });
		this.currentLanguage = this.languages[0].value;

		this.initTranslate();

	}

	ngOnInit() {
		this.userform = this.fb.group({
			'firstname': new FormControl('', Validators.required),
			'lastname': new FormControl('', Validators.required),
			'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
			'description': new FormControl(''),
			'gender': new FormControl('', Validators.required)
		});

		this.genders = [];
		this.genders.push({ label: 'Select Gender', value: '' });
		this.genders.push({ label: 'Male', value: 'Male' });
		this.genders.push({ label: 'Female', value: 'Female' });



	}

	onSubmit(value: string) {
		this.submitted = true;
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
	}

	get diagnostic() { return JSON.stringify(this.userform.value); }

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.currentLanguage);

		// Set your language here
		this.translate.use(this.currentLanguage);
	}

	changeLanguage(language: string) {
		this.translate.use(language);
	}
}