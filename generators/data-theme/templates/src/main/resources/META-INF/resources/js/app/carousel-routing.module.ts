import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{path:'home',component: AppComponent }
		])
	],
	exports: [
		RouterModule
	]
})
export class CarouselRoutingModule {}