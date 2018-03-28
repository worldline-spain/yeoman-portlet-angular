/* CORE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router'

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';

/* Prime NG dependencies */
import {
	InputTextModule, ButtonModule, RadioButtonModule, ChartModule, AutoCompleteModule,
	CheckboxModule, CardModule, CalendarModule, ChipsModule, ColorPickerModule, DropdownModule,
	EditorModule, InputSwitchModule, InputTextareaModule, ListboxModule, InputMaskModule, MultiSelectModule,
	PasswordModule, RatingModule, SliderModule, SpinnerModule, SelectButtonModule, ToggleButtonModule,
	MessagesModule, MessageModule
} from 'primeng-wl/primeng';

import { TriStateCheckboxModule } from 'primeng-wl/tristatecheckbox';
import { SplitButtonModule } from 'primeng-wl/splitbutton';

/* Main component */
import { AppComponent } from './app.component';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http, './o/<%= portletName %>/js/assets/i18n/locale-', '.json');
}

@NgModule({
	imports: [
		HttpModule,
		BrowserModule,
		BrowserAnimationsModule,
		InputTextModule,
		ButtonModule,
		RadioButtonModule,
		FormsModule,
		ChartModule,
		AutoCompleteModule,
		CheckboxModule,
		CardModule,
		CalendarModule,
		ChipsModule,
		ColorPickerModule,
		DropdownModule,
		EditorModule,
		InputSwitchModule,
		InputTextareaModule,
		ListboxModule,
		InputMaskModule,
		MultiSelectModule,
		PasswordModule,
		RatingModule,
		SliderModule,
		SpinnerModule,
		SelectButtonModule,
		ToggleButtonModule,
		TriStateCheckboxModule,
		MessagesModule,
		MessageModule,
		SplitButtonModule,
		RouterModule.forRoot([
            { path: 'home', component: AppComponent }
        ]),
		SharedModule.forRoot(),
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