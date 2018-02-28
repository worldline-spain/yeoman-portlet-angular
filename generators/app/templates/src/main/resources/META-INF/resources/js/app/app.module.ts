import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import 'chart.js/dist/Chart.min'


import { InputTextModule, ButtonModule, RadioButtonModule,ChartModule } from 'primeng-wl/primeng';
@NgModule({
	imports: [
		BrowserModule,
		InputTextModule,
		ButtonModule,
		RadioButtonModule,
		FormsModule,
		ChartModule
	],
	declarations: [AppComponent],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [],
	exports: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}