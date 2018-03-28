import { Component } from '@angular/core';

@Component({
	selector: 'about',
	templateUrl: '/o/<%=portletName%>/js/about/about.html'
})
export class AboutComponent {
	
	data:any;

	constructor() {
		this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };
	}
}