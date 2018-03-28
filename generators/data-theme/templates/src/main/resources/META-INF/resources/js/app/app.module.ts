/* CORE */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

/* Shared Modules */
import { SharedModule, BrowserAnimationsModule, TranslateHttpLoader, TranslateModule, TranslateLoader } from '../../services/shared.module';

/* Prime NG dependencies */
import {
	InputTextModule, ButtonModule, RadioButtonModule, ChartModule, AutoCompleteModule,
	CheckboxModule, CardModule, CalendarModule, ChipsModule, ColorPickerModule, DropdownModule,
	EditorModule, InputSwitchModule, InputTextareaModule, ListboxModule, InputMaskModule, MultiSelectModule,
	PasswordModule, RatingModule, SliderModule, SpinnerModule, SelectButtonModule, ToggleButtonModule,
	MessagesModule, MessageModule, CarouselModule, DataListModule, DataScrollerModule, DataTableModule,
	OrganizationChartModule, OrderListModule, GMapModule, TabViewModule, PaginatorModule,
	PickListModule, ScheduleModule, TreeModule, TreeTableModule
} from 'primeng-wl/primeng';

import { GrowlModule } from 'primeng-wl/growl';
import { DataGridModule } from 'primeng-wl/datagrid';
import { DialogModule } from 'primeng-wl/dialog';
import { PanelModule } from 'primeng-wl/panel';

/* Main component */
import { AppComponent } from './app.component';

import { CarouselRoutingModule } from './carousel-routing.module';
import { DataGridRoutingModule } from './datagrid-routing.module';
import { DataScrollerRoutingModule } from './datascroller-routing.module';
import { OrderListRoutingModule } from './orderlist-routing.module';
import { GmapRoutingModule } from './gmap-routing.module';
import { PaginatorRoutingModule } from './paginator-routing.module';
import { PickListRoutingModule } from './picklist-routing.module';
import { ScheduleRoutingModule } from './schedule-routing.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http, './o/<%= portletName %>/js/assets/i18n/locale-', '.json');
}

@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
		RadioButtonModule,
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
		MessagesModule, 
		MessageModule,
		CarouselModule,
		GrowlModule,
		CarouselRoutingModule,
		DataGridModule,
		DataGridRoutingModule,
		DialogModule,
		PanelModule,
		DataListModule,
		DataScrollerModule,
		DataScrollerRoutingModule,
		DataTableModule,
		OrganizationChartModule,
		OrderListModule,
		OrderListRoutingModule,
		GMapModule,
		GmapRoutingModule,
		TabViewModule,
		PaginatorModule,
		PickListModule,
		PickListRoutingModule,
		ScheduleRoutingModule,
		ScheduleModule,
		TreeModule,
		TreeTableModule,
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
	providers: [],
	exports: []
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() { }
}