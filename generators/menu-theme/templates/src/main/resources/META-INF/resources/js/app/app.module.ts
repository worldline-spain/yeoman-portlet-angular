/* CORE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';

/* Prime NG dependencies */
import {TabMenuModule, SlideMenuModule, MenubarModule, MegaMenuModule, BreadcrumbModule, TieredMenuModule,
	StepsModule, PanelMenuModule, ContextMenuModule, InputTextModule, ButtonModule, RadioButtonModule,ChartModule,
	CardModule, MenuModule } from 'primeng-wl/primeng';

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
		RouterModule.forRoot([{ path: "home", component: AppComponent}]),
		TabMenuModule,
		SlideMenuModule,
		MenubarModule,
		BreadcrumbModule,
		MegaMenuModule,
		TieredMenuModule,
		PanelMenuModule,
		StepsModule,
		InputTextModule,
		ContextMenuModule,
		ButtonModule,
		CardModule,
		MenuModule,
		RadioButtonModule,
		FormsModule,
		ChartModule,
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
	providers: [],
	exports: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}