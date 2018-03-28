import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { DynamicLoader } from './app/dynamic.loader';
import { AppComponent } from './app/app.component';

export default function (rootId: any) {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then((injector: any) => {
			const dynamicLoader = new DynamicLoader(injector);

			dynamicLoader.loadComponent(AppComponent, rootId);
		});
}