import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { /* PRIME NG MODULES*/ } from 'primeng-wl/primeng';

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';


//import * as Quill from 'quill';
//import 'chart.js/dist/Chart.min';
import { AppComponent } from './app.component';

//window['Quill'] = Quill;

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http, './o/<%= portletName %>/js/assets/i18n/locale-', '.json');
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		SharedModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [Http]
			}
		})
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