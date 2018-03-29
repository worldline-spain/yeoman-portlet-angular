/* CORE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';

/* Prime NG dependencies */
import { /* PRIME NG MODULES*/ } from 'primeng-wl/primeng';

/* Main component */
import { AppComponent } from './app.component';

//HTTP 
import { Api, BASE_URL_SERVER, HEROE_API } from '../services/api.service';
import { HeroesHttpApi } from '../services/heroes-http-service-api';

//STORES
import { HeroesHttpStore } from '../stores/heroes-http.store';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http, './o/<%= portletName %>/js/assets/i18n/locale-', '.json');
}

function apiFactory(http: Http, baseUrl: any, contextUri = '', requestOptions?: RequestOptions) {
	return new Api(http, `${baseUrl}${contextUri}`, requestOptions);
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		SharedModule.forRoot(),
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [Http]
			}
		}),
	],
	declarations: [AppComponent],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [
		// REST
		{ provide: BASE_URL_SERVER, useValue: 'http://gateway.marvel.com/v1' },
		{ provide: HEROE_API, useFactory: apiFactory, deps: [Http, BASE_URL_SERVER] },
		
		//API
		HeroesHttpApi,

		// STORES
		HeroesHttpStore
	],
	exports: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}