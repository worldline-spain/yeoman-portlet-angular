/* CORE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';

/* Prime NG dependencies */
import { InputTextModule, ButtonModule, RadioButtonModule,ChartModule, DropdownModule, CalendarModule,
	CardModule, DialogModule } from 'primeng-wl/primeng';

import { TableModule } from 'primeng-wl/table';
import { MultiSelectModule } from 'primeng-wl/multiselect';
import {InputMaskModule} from 'primeng-wl/inputmask';

/* Main component */
import { AppComponent } from './app.component';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http, './o/<%= portletName %>/js/assets/i18n/locale-', '.json');
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		SharedModule.forRoot(),
    BrowserAnimationsModule,
    InputTextModule,
		ButtonModule,
		RadioButtonModule,
		FormsModule,
		ChartModule,
		DropdownModule,
		CalendarModule,
		CardModule,
		TableModule,
		DialogModule,
		MultiSelectModule,
		InputMaskModule,
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
	providers: [],
	exports: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}
