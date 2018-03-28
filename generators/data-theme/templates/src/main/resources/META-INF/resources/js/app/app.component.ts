import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';

import { Message } from 'primeng-wl/components/common/api';
import { Router } from '@angular/router';
import { Car } from './car';
import { TreeNode } from 'primeng-wl/api';

declare const google: any;

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	carsC: Car[];

	msgs: Message[];

	cars: Car[];
	selectedCar1: Car;

	selectedCar: Car;

	displayDialog: boolean;

	carsList: Car[];

	carsScroll: Car[];

	carsOrder: Car[];

	data: TreeNode[];

	sourceCars: Car[];

	targetCars: Car[];

	events: any[];

	header: any;

	filesTree: TreeNode[];

	files: TreeNode[];

	options: any;

	overlays: any[];

	dialogVisible: boolean;

	markerTitle: string;

	selectedPosition: any;

	infoWindow: any;

	draggable: boolean;

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService
	) {
		this.initTranslate();

		this.msgs = [];
		this.carsC = [
			{ vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
			{ vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
			{ vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
			{ vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
			{ vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
			{ vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
			{ vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
			{ vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
			{ vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
		];

		this.cars = [
			{ "vin": "a1653d4d", "brand": "VW", "year": 1998, "color": "White", "price": 10000 },
			{ "vin": "ddeb9b10", "brand": "Mercedes", "year": 1985, "color": "Green", "price": 25000 },
			{ "vin": "d8ebe413", "brand": "Jaguar", "year": 1979, "color": "Silver", "price": 30000 },
			{ "vin": "aab227b7", "brand": "Audi", "year": 1970, "color": "Black", "price": 12000 },
			{ "vin": "631f7412", "brand": "Volvo", "year": 1992, "color": "Red", "price": 15500 },
			{ "vin": "7d2d22b0", "brand": "VW", "year": 1993, "color": "Maroon", "price": 40000 },
			{ "vin": "50e900ca", "brand": "Fiat", "year": 1964, "color": "Blue", "price": 25000 },
			{ "vin": "4bbcd603", "brand": "Renault", "year": 1983, "color": "Maroon", "price": 22000 },
			{ "vin": "70214c7e", "brand": "Renault", "year": 1961, "color": "Black", "price": 19000 },
			{ "vin": "ec229a92", "brand": "Audi", "year": 1984, "color": "Brown", "price": 36000 },
			{ "vin": "1083ee40", "brand": "VW", "year": 1984, "color": "Silver", "price": 215000 },
			{ "vin": "6e0da3ab", "brand": "Volvo", "year": 1987, "color": "Silver", "price": 32000 },
			{ "vin": "5aee636b", "brand": "Jaguar", "year": 1995, "color": "Maroon", "price": 20000 },
			{ "vin": "7cc43997", "brand": "Jaguar", "year": 1984, "color": "Orange", "price": 14000 },
			{ "vin": "88ec9f66", "brand": "Honda", "year": 1989, "color": "Maroon", "price": 36000 },
			{ "vin": "f5a4a5f5", "brand": "BMW", "year": 1986, "color": "Blue", "price": 28000 },
			{ "vin": "15b9a5c9", "brand": "Mercedes", "year": 1986, "color": "Orange", "price": 14000 },
			{ "vin": "f7e18d01", "brand": "Mercedes", "year": 1991, "color": "White", "price": 25000 },
			{ "vin": "cec593d7", "brand": "VW", "year": 1992, "color": "Blue", "price": 36000 },
			{ "vin": "d5bac4f0", "brand": "Renault", "year": 2001, "color": "Blue", "price": 25000 },
			{ "vin": "56b527c8", "brand": "Jaguar", "year": 1990, "color": "Yellow", "price": 52000 },
			{ "vin": "1ac011ff", "brand": "Audi", "year": 1966, "color": "Maroon", "price": 45000 },
			{ "vin": "fc074185", "brand": "BMW", "year": 1962, "color": "Blue", "price": 54000 },
			{ "vin": "606ba663", "brand": "Honda", "year": 1982, "color": "Blue", "price": 22000 },
			{ "vin": "d05060b8", "brand": "Mercedes", "year": 2003, "color": "Silver", "price": 15000 },
			{ "vin": "46e4bbe8", "brand": "Mercedes", "year": 1986, "color": "White", "price": 18000 },
			{ "vin": "c29da0d7", "brand": "BMW", "year": 1983, "color": "Brown", "price": 32000 },
			{ "vin": "24622f70", "brand": "VW", "year": 1973, "color": "Maroon", "price": 36000 },
			{ "vin": "7f573d2c", "brand": "Mercedes", "year": 1991, "color": "Red", "price": 21000 },
			{ "vin": "b69e6f5c", "brand": "Jaguar", "year": 1993, "color": "Yellow", "price": 16000 }
		];

		this.carsList = [
			{ "vin": "a1653d4d", "brand": "VW", "year": 1998, "color": "White", "price": 10000 },
			{ "vin": "ddeb9b10", "brand": "Mercedes", "year": 1985, "color": "Green", "price": 25000 },
			{ "vin": "d8ebe413", "brand": "Jaguar", "year": 1979, "color": "Silver", "price": 30000 },
			{ "vin": "aab227b7", "brand": "Audi", "year": 1970, "color": "Black", "price": 12000 },
			{ "vin": "631f7412", "brand": "Volvo", "year": 1992, "color": "Red", "price": 15500 },
			{ "vin": "7d2d22b0", "brand": "VW", "year": 1993, "color": "Maroon", "price": 40000 },
			{ "vin": "50e900ca", "brand": "Fiat", "year": 1964, "color": "Blue", "price": 25000 },
			{ "vin": "4bbcd603", "brand": "Renault", "year": 1983, "color": "Maroon", "price": 22000 },
			{ "vin": "70214c7e", "brand": "Renault", "year": 1961, "color": "Black", "price": 19000 },
			{ "vin": "ec229a92", "brand": "Audi", "year": 1984, "color": "Brown", "price": 36000 },
			{ "vin": "1083ee40", "brand": "VW", "year": 1984, "color": "Silver", "price": 215000 },
			{ "vin": "6e0da3ab", "brand": "Volvo", "year": 1987, "color": "Silver", "price": 32000 },
			{ "vin": "5aee636b", "brand": "Jaguar", "year": 1995, "color": "Maroon", "price": 20000 },
			{ "vin": "7cc43997", "brand": "Jaguar", "year": 1984, "color": "Orange", "price": 14000 }
		];

		this.carsScroll = [{ "vin": "a1653d4d", "brand": "VW", "year": 1998, "color": "White", "price": 10000 },
		{ "vin": "ddeb9b10", "brand": "Mercedes", "year": 1985, "color": "Green", "price": 25000 },
		{ "vin": "d8ebe413", "brand": "Jaguar", "year": 1979, "color": "Silver", "price": 30000 },
		{ "vin": "aab227b7", "brand": "Audi", "year": 1970, "color": "Black", "price": 12000 },
		{ "vin": "631f7412", "brand": "Volvo", "year": 1992, "color": "Red", "price": 15500 },
		{ "vin": "7d2d22b0", "brand": "VW", "year": 1993, "color": "Maroon", "price": 40000 },
		{ "vin": "50e900ca", "brand": "Fiat", "year": 1964, "color": "Blue", "price": 25000 },
		{ "vin": "4bbcd603", "brand": "Renault", "year": 1983, "color": "Maroon", "price": 22000 },
		{ "vin": "70214c7e", "brand": "Renault", "year": 1961, "color": "Black", "price": 19000 },
		{ "vin": "ec229a92", "brand": "Audi", "year": 1984, "color": "Brown", "price": 36000 },
		{ "vin": "1083ee40", "brand": "VW", "year": 1984, "color": "Silver", "price": 215000 },
		{ "vin": "6e0da3ab", "brand": "Volvo", "year": 1987, "color": "Silver", "price": 32000 },
		{ "vin": "5aee636b", "brand": "Jaguar", "year": 1995, "color": "Maroon", "price": 20000 },
		{ "vin": "7cc43997", "brand": "Jaguar", "year": 1984, "color": "Orange", "price": 14000 },
		{ "vin": "88ec9f66", "brand": "Honda", "year": 1989, "color": "Maroon", "price": 36000 },
		{ "vin": "f5a4a5f5", "brand": "BMW", "year": 1986, "color": "Blue", "price": 28000 },
		{ "vin": "15b9a5c9", "brand": "Mercedes", "year": 1986, "color": "Orange", "price": 14000 },
		{ "vin": "f7e18d01", "brand": "Mercedes", "year": 1991, "color": "White", "price": 25000 },
		{ "vin": "cec593d7", "brand": "VW", "year": 1992, "color": "Blue", "price": 36000 },
		{ "vin": "d5bac4f0", "brand": "Renault", "year": 2001, "color": "Blue", "price": 25000 },
		{ "vin": "56b527c8", "brand": "Jaguar", "year": 1990, "color": "Yellow", "price": 52000 },
		{ "vin": "1ac011ff", "brand": "Audi", "year": 1966, "color": "Maroon", "price": 45000 },
		{ "vin": "fc074185", "brand": "BMW", "year": 1962, "color": "Blue", "price": 54000 },
		{ "vin": "606ba663", "brand": "Honda", "year": 1982, "color": "Blue", "price": 22000 },
		{ "vin": "d05060b8", "brand": "Mercedes", "year": 2003, "color": "Silver", "price": 15000 },
		{ "vin": "46e4bbe8", "brand": "Mercedes", "year": 1986, "color": "White", "price": 18000 },
		{ "vin": "c29da0d7", "brand": "BMW", "year": 1983, "color": "Brown", "price": 32000 },
		{ "vin": "24622f70", "brand": "VW", "year": 1973, "color": "Maroon", "price": 36000 },
		{ "vin": "7f573d2c", "brand": "Mercedes", "year": 1991, "color": "Red", "price": 21000 },
		{ "vin": "b69e6f5c", "brand": "Jaguar", "year": 1993, "color": "Yellow", "price": 16000 }
		];

		this.carsOrder = [
			{ vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
			{ vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
			{ vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
			{ vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
			{ vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
			{ vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
			{ vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
			{ vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
			{ vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
		];


		this.sourceCars = [
			{ vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
			{ vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
			{ vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
			{ vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
			{ vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
			{ vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
			{ vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
			{ vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
			{ vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
		];

		this.targetCars = [];

		this.filesTree = [
			{
				"label": "Documents",
				"data": "Documents Folder",
				"expandedIcon": "fa-folder-open",
				"collapsedIcon": "fa-folder",
				"children": [{
					"label": "Work",
					"data": "Work Folder",
					"expandedIcon": "fa-folder-open",
					"collapsedIcon": "fa-folder",
					"children": [{ "label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document" }, { "label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document" }]
				},
				{
					"label": "Home",
					"data": "Home Folder",
					"expandedIcon": "fa-folder-open",
					"collapsedIcon": "fa-folder",
					"children": [{ "label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month" }]
				}]
			},
			{
				"label": "Pictures",
				"data": "Pictures Folder",
				"expandedIcon": "fa-folder-open",
				"collapsedIcon": "fa-folder",
				"children": [
					{ "label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo" },
					{ "label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo" },
					{ "label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo" }]
			},
			{
				"label": "Movies",
				"data": "Movies Folder",
				"expandedIcon": "fa-folder-open",
				"collapsedIcon": "fa-folder",
				"children": [{
					"label": "Al Pacino",
					"data": "Pacino Movies",
					"children": [{ "label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie" }]
				},
				{
					"label": "Robert De Niro",
					"data": "De Niro Movies",
					"children": [{ "label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie" }, { "label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie" }]
				}]
			}
		];

		this.files = [
			{
				"data": {
					"name": "Documents",
					"size": "75kb",
					"type": "Folder"
				},
				"children": [
					{
						"data": {
							"name": "Work",
							"size": "55kb",
							"type": "Folder"
						},
						"children": [
							{
								"data": {
									"name": "Expenses.doc",
									"size": "30kb",
									"type": "Document"
								}
							},
							{
								"data": {
									"name": "Resume.doc",
									"size": "25kb",
									"type": "Resume"
								}
							}
						]
					},
					{
						"data": {
							"name": "Home",
							"size": "20kb",
							"type": "Folder"
						},
						"children": [
							{
								"data": {
									"name": "Invoices",
									"size": "20kb",
									"type": "Text"
								}
							}
						]
					}
				]
			},
			{
				"data": {
					"name": "Pictures",
					"size": "150kb",
					"type": "Folder"
				},
				"children": [
					{
						"data": {
							"name": "barcelona.jpg",
							"size": "90kb",
							"type": "Picture"
						}
					},
					{
						"data": {
							"name": "primeui.png",
							"size": "30kb",
							"type": "Picture"
						}
					},
					{
						"data": {
							"name": "optimus.jpg",
							"size": "30kb",
							"type": "Picture"
						}
					}
				]
			}
		];
	}

	ngOnInit() {

		this.data = [{
			label: 'Jane Doe',
			expanded: true,
			children: [
				{
					label: 'John Doe',
					expanded: true,
					children: [
						{
							label: 'Johnny Doe'
						},
						{
							label: 'Janie Doe'
						}
					]
				},
				{
					label: 'Jane Poe',
					expanded: true,
					children: [
						{
							label: 'Richard Roe'
						},
						{
							label: 'Paula Poe'
						}
					]
				}
			]
		}];


		//Gmap
		this.options = {
			center: { lat: 36.890257, lng: 30.707417 },
			zoom: 12
		};


		this.initOverlays();
		this.infoWindow = new google.maps.InfoWindow();
		//fin Gmap


		//schedule
		this.events = [
			{
				"id": 1,
				"title": "All Day Event",
				"start": "2017-02-01"
			},
			{
				"id": 2,
				"title": "Long Event",
				"start": "2017-02-07",
				"end": "2017-02-10"
			},
			{
				"id": 3,
				"title": "Repeating Event",
				"start": "2017-02-09T16:00:00"
			},
			{
				"id": 4,
				"title": "Repeating Event",
				"start": "2017-02-16T16:00:00"
			}
		];

		this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};


	}

	selectCarC(car: Car) {
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: 'Brand:' + car.brand + ' Vin:' + car.vin });
	}


	selectCar(car: Car) {
		this.selectedCar = car;
		this.displayDialog = true;
	}

	onDialogHide() {
		this.selectedCar = null;
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}

	// gmap
	handleMapClick(event: any) {
		this.dialogVisible = true;
		this.selectedPosition = event.latLng;
	}

	handleOverlayClick(event: any) {
		this.msgs = [];
		let isMarker = event.overlay.getTitle != undefined;

		if (isMarker) {
			let title = event.overlay.getTitle();
			this.infoWindow.setContent('<div>' + title + '</div>');
			this.infoWindow.open(event.map, event.overlay);
			event.map.setCenter(event.overlay.getPosition());

			this.msgs.push({ severity: 'info', summary: 'Marker Selected', detail: title });
		}
		else {
			this.msgs.push({ severity: 'info', summary: 'Shape Selected', detail: '' });
		}
	}

	addMarker() {
		this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
		this.markerTitle = null;
		this.dialogVisible = false;
	}

	handleDragEnd(event: any) {
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
	}

	initOverlays() {


		if (!this.overlays || !this.overlays.length) {
			this.overlays = [
				new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
				new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
				new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
				new google.maps.Polygon({
					paths: [
						{ lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
					], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
				}),
				new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
				new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
			];
		}
	}

	zoomIn(map: any) {
		map.setZoom(map.getZoom() + 1);
	}

	zoomOut(map: any) {
		map.setZoom(map.getZoom() - 1);
	}

	clear() {
		this.overlays = [];
	}

	//End Gmap
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}