import { Component } from '@angular/core';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= title %>/js/app/app.html'
})
export class AppComponent {

	caption = 'Hello world!';

	constructor() {
		
	}
	
}