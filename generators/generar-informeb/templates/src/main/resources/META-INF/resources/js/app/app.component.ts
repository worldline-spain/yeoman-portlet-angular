import { Component } from '@angular/core';
import { DataTable } from 'primeng-wl/primeng';
import { TranslateService, LiferayService } from '../../services/shared.module';
import * as moment from 'moment';

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})

export class AppComponent {


	autonomies: ValuesDropdown[];
	selectedAutonomy: ValuesDropdown;

	provinces: ValuesDropdown[];
	selectedProvince: ValuesDropdown;

  periods: ValuesDropdown[];
	selectedPeriod: ValuesDropdown;

  cifs: ValuesDropdown[];
	selectedCif: ValuesDropdown;

	data: Report[];

	cols: any[];


	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService
	) {

		this.initTranslate();

    this.cols = [
      { field: 'reportType', header: 'reportType' },
			{ field: 'numWorkers', header: 'numWorkers' },
			{ field: 'numCasualties', header: 'numCasualties' },
			{ field: 'numNewWorkers', header: 'numNewWorkers' },
      { field: 'tamDays', header: 'tamDays' },
      { field: 'realDays', header: 'realDays' },
      { field: 'incidence', header: 'incidence' },
      { field: 'jpt', header: 'jpt' },
      { field: 'absenteeismRate', header: 'absenteeismRate' },
      { field: 'companyCost', header: 'companyCost' },
      { field: 'workerCost', header: 'workerCost' },
    ];

	}

	ngOnInit() {

    this.autonomies = [
			{ label: "Todas", value: null },
			{ label: "Autonomía 1", value: "1" },
			{ label: "Autonomía 2", value: "2" },
			{ label: "Autonomía 3", value: "3" },
			{ label: "Autonomía 4", value: "4" },
			{ label: "Autonomía 5", value: "5" }
    ];

    this.provinces = [
			{ label: "Todas", value: null },
			{ label: "Provincia 1", value: "1" },
			{ label: "Provincia 2", value: "2" },
			{ label: "Provincia 3", value: "3" },
			{ label: "Provincia 4", value: "4" },
			{ label: "Provincia 5", value: "5" }
    ];

    this.periods = [
			{ label: "Todas", value: null },
			{ label: "Período 1", value: "1" },
			{ label: "Período 2", value: "2" },
			{ label: "Período 3", value: "3" },
			{ label: "Período 4", value: "4" },
			{ label: "Período 5", value: "5" }
    ];

    this.cifs = [
			{ label: "Todas", value: null },
			{ label: "Cif 1", value: "1" },
			{ label: "Cif 2", value: "2" },
			{ label: "Cif 3", value: "3" },
			{ label: "Cif 4", value: "4" },
			{ label: "Cif 5", value: "5" }
    ];


		this.data = [
			{
        "reportType": "febrero",
        "numWorkers": 1000,
        "numCasualties": 10,
        "numNewWorkers": 5,
        "tamDays": 8,
        "realDays": 20,
        "incidence": 3,
        "jpt":7,
        "absenteeismRate":2,
        "companyCost":5000,
        "workerCost":1000

      },
			{
				"reportType": "febrero",
	      "numWorkers": 1000,
	      "numCasualties": 10,
	      "numNewWorkers": 5,
	      "tamDays": 8,
        "realDays": 20,
        "incidence": 3,
        "jpt":7,
        "absenteeismRate":2,
        "companyCost":5000,
        "workerCost":1000
			},
			{
        "reportType": "marzo",
	      "numWorkers": 1000,
	      "numCasualties": 10,
	      "numNewWorkers": 5,
	      "tamDays": 8,
        "realDays": 20,
        "incidence": 3,
        "jpt":7,
        "absenteeismRate":2,
        "companyCost":5000,
        "workerCost":1000
			}
		];

	}

  initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}

}


export interface ValuesDropdown {
	label?: string;
	value?: string;
}


export interface Report {
	reportType?: string;
	numWorkers?: number;
	numCasualties?: number;
	numNewWorkers?: number;
	tamDays?: number;
  realDays?: number;
  incidence?: number;
  jpt?:number;
  absenteeismRate?:number;
  companyCost?:number;
  workerCost?:number;
}
