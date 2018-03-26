import { Component } from '@angular/core';
import { DataTable } from 'primeng-wl/primeng';
import { TranslateService, LiferayService } from '../../services/shared.module';
import * as moment from 'moment';

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {


	dateFrom: Date;
	dateTo: Date;

	valStatus: string;
	vinFilter: string;

	colors: ValuesDropdown[];
	selectedColor: ValuesDropdown;

	brands: ValuesDropdown[];
	selectedBrand: ValuesDropdown;

	displayDialog: boolean;

	cars: Car[];
	tableFiltered:Car[];

	selectedCar: Car;

	newCar: boolean;

	car: Car;

	cols: any[];


	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService
	) {

		this.initTranslate();

		this.cols = [
			{ field: 'vin', header: 'vin' },
			{ field: 'regDate', header: 'regDate' },
			{ field: 'brand', header: 'brand' },
			{ field: 'color', header: 'color' },
			{ field: 'status', header: 'status' },
		];

	}

	ngOnInit() {

		this.colors = [
			{ label: "Todos", value: null },
			{ label: "Blanco", value: "Blanco" },
			{ label: "Negro", value: "Negro" },
			{ label: "Rojo", value: "Rojo" },
			{ label: "Azul", value: "Azul" },
			{ label: "Gris", value: "Gris" },
			{ label: "Amarillo", value: "Amarillo" },
			{ label: "Plata", value: "Plata" }
		];

		this.brands = [
			{ label: 'Todas', value: null },
			{ label: 'Audi', value: 'Audi' },
			{ label: 'BMW', value: 'BMW' },
			{ label: 'Fiat', value: 'Fiat' },
			{ label: 'Honda', value: 'Honda' },
			{ label: 'Jaguar', value: 'Jaguar' },
			{ label: 'Mercedes', value: 'Mercedes' },
			{ label: 'Renault', value: 'Renault' },
			{ label: 'VW', value: 'VW' },
			{ label: 'Volvo', value: 'Volvo' }
		];

		this.cars = [
			{
				"vin": "a1653d4d",
				"status": "alta",
				"brand": "VW",
				"regDate": new Date("01/01/2018"),
				"color": "Blanco",
				"price": 10000
			},
			{
				"vin": "ddeb9b10",
				"status": "alta",
				"brand": "Mercedes",
				"regDate": new Date("01/01/2015"),
				"color": "Blanco",
				"price": 25000
			},
			{
				"vin": "d8ebe413",
				"status": "baja",
				"brand": "Jaguar",
				"regDate": new Date("01/01/2012"),
				"color": "Negro",
				"price": 30000
			},
			{
				"vin": "aab227b7",
				"status": "alta",
				"brand": "Audi",
				"regDate": new Date("01/01/2011"),
				"color": "Rojo",
				"price": 12000
			},
			{
				"vin": "631f7412",
				"status": "baja",
				"brand": "Volvo",
				"regDate": new Date("01/01/2010"),
				"color": "Rojo",
				"price": 15500
			},
			{
				"vin": "7d2d22b0",
				"status": "alta",
				"brand": "VW",
				"regDate": new Date("01/01/2018"),
				"color": "Azul",
				"price": 40000
			},
			{
				"vin": "50e900ca",
				"status": "baja",
				"brand": "Fiat",
				"regDate": new Date("01/01/2013"),
				"color": "Plata",
				"price": 25000
			},
			{
				"vin": "4bbcd603",
				"status": "alta",
				"brand": "Renault",
				"regDate": new Date("01/01/2016"),
				"color": "Amarillo",
				"price": 22000
			},
			{
				"vin": "70214c7e",
				"status": "alta",
				"brand": "Renault",
				"regDate": new Date("01/01/2010"),
				"color": "Negro",
				"price": 19000
			},
			{
				"vin": "ec229a92",
				"status": "alta",
				"brand": "Audi",
				"regDate": new Date("01/01/2018"),
				"color": "Gris",
				"price": 36000
			},
			{
				"vin": "1083ee40",
				"status": "alta",
				"brand": "VW",
				"regDate": new Date("01/01/2001"),
				"color": "Gris",
				"price": 215000
			}
			,
			{
				"vin": "1088eee40",
				"status": "baja",
				"brand": "Audi",
				"regDate": new Date("01/01/1998"),
				"color": "Rojo",
				"price": 215000
			}
		];

		this.tableFiltered = Object.assign([], this.cars);

	}

	showDialogToAdd() {
		this.newCar = true;
		this.car = {};
		this.displayDialog = true;
	}

	save() {
		let cars = [...this.tableFiltered];
		if (this.newCar)
			cars.push(this.car);
		else
			cars[this.tableFiltered.indexOf(this.selectedCar)] = this.car;

		this.tableFiltered = cars;
		this.car = null;
		this.displayDialog = false;
	}

	delete() {
		let index = this.tableFiltered.indexOf(this.selectedCar);
		this.tableFiltered = this.tableFiltered.filter((val, i) => i != index);
		this.car = null;
		this.displayDialog = false;
	}

	onRowSelect(event: any) {
		this.newCar = false;
		this.car = this.cloneCar(event.data);
		this.displayDialog = true;
	}

	cloneCar(c: Car): Car {
		let car = {};
		for (let prop in c) {
			car[prop] = c[prop];
		}
		return car;
	}

	filterRadioButton(dt: DataTable) {

		dt.filter(this.valStatus, 'status', 'equals');

	}

	filterDate(dt: DataTable) {
		this.tableFiltered = Object.assign([], this.cars);
		if (this.dateFrom && !this.dateTo) {
			this.tableFiltered = this.tableFiltered.filter(row => {
				return moment(row.regDate).isAfter(moment(this.dateFrom)) ||
					moment(row.regDate).isSame(moment(this.dateFrom));
			});
		}
		if (this.dateTo && !this.dateFrom) {
			this.tableFiltered = this.tableFiltered.filter(row => {
				return moment(row.regDate).isBefore(moment(this.dateTo)) ||
					moment(row.regDate).isSame(moment(this.dateTo));
			});
		}
		if (this.dateFrom && this.dateTo) {
			this.tableFiltered = this.tableFiltered.filter(row => {
				return moment(row.regDate).isBetween(moment(this.dateFrom), moment(this.dateTo)) ||
					moment(row.regDate).isSame(moment(this.dateFrom)) ||
					moment(row.regDate).isSame(moment(this.dateTo))
			});
		}
	}

	clean(dt: DataTable) {

		this.vinFilter = null;
		this.valStatus = null;
		this.dateFrom = null;
		this.dateTo = null;
		this.selectedBrand = null;
		this.selectedColor = null;

		this.tableFiltered = Object.assign([], this.cars);
		dt.reset()
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



export interface Car {
	vin?: string;
	brand?: string;
	regDate?: Date;
	color?: string;
	price?: number;
	status?: string;
}
