import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng-wl/api';
import { Language, Month } from '../models/models';


declare const _: any;

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})

export class AppComponent {

  languages: Language[] = [];

	msgs: Message[] = [];

  companyReportForm: FormGroup;

	submitted: boolean;

  companyTypes: SelectItem[] = [];
  companyFromCif: String;
  months: Month[];
  years: SelectItem[] = [];

	currentLanguage: string;
  defaultLanguage: string;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private fb: FormBuilder
	) {
		this.initTranslate();
	}

	ngOnInit() {
    this.companyReportForm = this.fb.group({
			'companyType': new FormControl('', Validators.required),
      'cif': new FormControl('', Validators.required),
      'companyName': new FormControl('', Validators.required),
      'startingMonth': new FormControl('', Validators.required),
      'yearPeriod': new FormControl('', Validators.required),
      'graphIndex': new FormControl('', Validators.required),
      'complements': new FormControl(null)
		});
    this.companyReportForm.value.complements = false;
    this.years.push({ label: '2017', value: '2017' });
    this.years.push({ label: '2016', value: '2016' });
    this.years.push({ label: '2015', value: '2015' });
    this.years.push({ label: '2014', value: '2014' });
    this.years.push({ label: '2013', value: '2013' });
    this.years.push({ label: '2012', value: '2012' });
    this.years.push({ label: '2011', value: '2011' });
    this.years.push({ label: '2010', value: '2010' });
  }

	onSubmit(value: string) {
		this.submitted = true;
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Report generated' });
	}


  initTranslate() {

    // Set the default language for translation strings, and the current language.
     this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

     // Set your language here
     this.translate.use(this.liferayService.getLanguageLiferay());

     //Dropdown translated values
     this.months = [];
     this.translate.get([
       'companyType.type1',
       'companyType.type2',
       'companyType.type3',
       'startingMonth.jan',
       'startingMonth.feb',
       'startingMonth.mar',
       'startingMonth.apr',
       'startingMonth.may',
       'startingMonth.jun',
       'startingMonth.jul',
       'startingMonth.aug',
       'startingMonth.sep',
       'startingMonth.oct',
       'startingMonth.nov',
       'startingMonth.dec',
     ]).subscribe((object: Object) => {
       this.companyTypes.push({ label: object['companyType.type1'], value: 'type1' });
       this.companyTypes.push({ label: object['companyType.type2'], value: 'type2' });
       this.companyTypes.push({ label: object['companyType.type3'], value: 'type3' });
       this.months.push({ label: object['startingMonth.jan'], value: 'jan' });
       this.months.push({ label: object['startingMonth.feb'], value: 'feb' });
       this.months.push({ label: object['startingMonth.mar'], value: 'mar' });
       this.months.push({ label: object['startingMonth.apr'], value: 'apr' });
       this.months.push({ label: object['startingMonth.may'], value: 'may' });
       this.months.push({ label: object['startingMonth.jun'], value: 'jun' });
       this.months.push({ label: object['startingMonth.jul'], value: 'jul' });
       this.months.push({ label: object['startingMonth.aug'], value: 'aug' });
       this.months.push({ label: object['startingMonth.sep'], value: 'sep' });
       this.months.push({ label: object['startingMonth.oct'], value: 'oct' });
       this.months.push({ label: object['startingMonth.nov'], value: 'nov' });
       this.months.push({ label: object['startingMonth.dec'], value: 'dec' });
     });
   }


  searchCompany() {

  }
}
