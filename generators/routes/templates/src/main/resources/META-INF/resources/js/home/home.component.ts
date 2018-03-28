import { Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: '/o/<%=portletName%>/js/home/home.html'
})
export class HomeComponent {

	images: any[];

	constructor() { }

	ngOnInit() {
		this.images = [];
		this.images.push({ source: 'https://www.mundogato.net/wp-content/uploads/alternativas-al-cascabel-de-los-gatos.jpg', alt: 'Description for Image 1', title: 'Title 1' });
		this.images.push({ source: 'https://misanimales.com/wp-content/uploads/2016/10/crecen-los-gatos.jpg', alt: 'Description for Image 2', title: 'Title 2' });
		this.images.push({ source: 'https://t1.ea.ltmcdn.com/es/images/7/1/2/img_cuidados_de_gatos_cachorros_21217_600.jpg', alt: 'Description for Image 3', title: 'Title 3' });
	}
}