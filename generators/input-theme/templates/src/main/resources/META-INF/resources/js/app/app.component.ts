import { Component, OnInit } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { SelectItem } from 'primeng-wl/primeng';
import { MenuItem } from 'primeng-wl/components/common/api';
import { Message } from 'primeng-wl/components/common/api';
import { Router } from '@angular/router';
import { City } from '../models/City';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	countries: string[] = ['Albania', 'Alemania', 'Andorra', 'Armenia', 'Austria', 'Azerbaiyán', 'Bélgica', 'Bielorrusia', 'Bosnia y Herzegovina',
		'Bulgaria', 'Chipre', 'Ciudad del Vaticano', 'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia',
		'Finlandia', 'Francia', 'Georgia', 'Grecia', 'Hungría', 'Irlanda', 'Islandia', 'Italia', 'Kazajistán', 'Letonia', 'Liechtenstein',
		'Lituania', 'Luxemburgo', 'Macedonia', 'Malta', 'Moldavia', 'Mónaco', 'Montenegro', 'Noruega', 'Países Bajos', 'Polonia',
		'Portugal', 'Reino Unido', 'República Checa', 'Rumanía', 'Rusia', 'San Marino', 'Serbia', 'Suecia', 'Suiza', 'Turquía', 'Ucrania'];

	filteredCountries: any[];

	countriesAdv: string[] = ['Albania', 'Alemania', 'Andorra', 'Armenia', 'Austria', 'Azerbaiyán', 'Bélgica', 'Bielorrusia', 'Bosnia y Herzegovina',
		'Bulgaria', 'Chipre', 'Ciudad del Vaticano', 'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia',
		'Finlandia', 'Francia', 'Georgia', 'Grecia', 'Hungría', 'Irlanda', 'Islandia', 'Italia', 'Kazajistán', 'Letonia', 'Liechtenstein',
		'Lituania', 'Luxemburgo', 'Macedonia', 'Malta', 'Moldavia', 'Mónaco', 'Montenegro', 'Noruega', 'Países Bajos', 'Polonia',
		'Portugal', 'Reino Unido', 'República Checa', 'Rumanía', 'Rusia', 'San Marino', 'Serbia', 'Suecia', 'Suiza', 'Turquía', 'Ucrania'];

	filteredCountriesAdv: any[];

	cities: City[];

	selectedCity: City;

	text: string;
	text1: string;

	checked1: boolean = false;
	checked2: boolean = false;

	val1: string;
	val2: string;
	val3: string;
	val4: number;
	val5: number;

	value: any;

	cars: SelectItem[];

	selectedCars1: string[] = [];

	types: SelectItem[];
	selectedType: string;

	clicks: number = 0;

	items: MenuItem[];

	msgs: Message[] = [];

	textEditor: string;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private router: Router
	) {
		this.initTranslate();
		router.navigate(['home'], { skipLocationChange: true });

		this.cities = [
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];

		this.cars = [
			{ label: 'Audi', value: 'Audi' },
			{ label: 'BMW', value: 'BMW' },
			{ label: 'Fiat', value: 'Fiat' },
			{ label: 'Ford', value: 'Ford' },
			{ label: 'Honda', value: 'Honda' },
			{ label: 'Jaguar', value: 'Jaguar' },
			{ label: 'Mercedes', value: 'Mercedes' },
			{ label: 'Renault', value: 'Renault' },
			{ label: 'VW', value: 'VW' },
			{ label: 'Volvo', value: 'Volvo' }
		];

		this.types = [
			{ label: 'Paypal', value: 'PayPal', icon: 'fa fa-fw fa-cc-paypal' },
			{ label: 'Visa', value: 'Visa', icon: 'fa fa-fw fa-cc-visa' },
			{ label: 'MasterCard', value: 'MasterCard', icon: 'fa fa-fw fa-cc-mastercard' }
		];
	}

	ngOnInit() {
		this.items = [
			{
				label: 'Update', icon: 'fa-refresh', command: () => {
					this.update();
				}
			},
			{
				label: 'Delete', icon: 'fa-close', command: () => {
					this.delete();
				}
			},
			{ label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io' },
			{ label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming'] }
		];
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}

	clear() {
		this.selectedType = null;
	}


	filterCountries(event: any) {
		this.filteredCountries = [];
		for (let i = 0; i < this.countries.length; i++) {
			let country = this.countries[i];
			if (country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.filteredCountries.push(country);
			}
		}
	}

	filterCountriesAdv(event: any) {
		this.filteredCountriesAdv = [];
		for (let i = 0; i < this.countriesAdv.length; i++) {
			let country = this.countriesAdv[i];
			if (country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.filteredCountriesAdv.push(country);
			}
		}
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
		this.msgs.push({ severity: 'warning', summary: 'Success', detail: 'Data Updated' });
	}

	delete() {
		this.msgs = [];
		this.msgs.push({ severity: 'danger', summary: 'Success', detail: 'Data Deleted' });
	}
}