import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';

import { ChartModule } from 'primeng-wl/chart';
import { GalleriaModule } from 'primeng-wl/galleria';

import { AppRoutingModule } from './app-routing.module';
import 'chart.js/dist/Chart.min';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		ChartModule,
		GalleriaModule
	],
	declarations: [
		AppComponent,
		AboutComponent,
		HomeComponent
	],
	entryComponents: [
		AppComponent,
		AboutComponent,
		HomeComponent
	],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}
