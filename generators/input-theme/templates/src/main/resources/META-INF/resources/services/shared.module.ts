/* CORE */
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Services to share */
import { BrowserAnimationsModule } from './animations/src/animations';
import { TranslateModule, TranslateLoader } from './@ngx-translate/core/index'
import { TranslateHttpLoader } from './@ngx-translate/http-loader/index';

/* Providers */
import { LiferayService } from './LiferayService/Liferay.interface';
import { LiferayServiceImpl } from './LiferayService/Liferay.serviceImpl';

/* JS imports */
import 'chart.js/dist/Chart.min';
import * as Quill from 'quill';
import * as _ from 'underscore';

/* Windows adds */
window['Quill'] = Quill;
window['_'] = _;

const providers: Provider[] = [
    { provide: LiferayService, useValue: new LiferayServiceImpl() }
];

@NgModule({
    imports: [
        CommonModule
    ]
})

/* Exports */
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...providers]
        }
    };
}
export * from './@ngx-translate/core/index';
export * from './@ngx-translate/http-loader/index';
export * from './animations/src/animations';
export * from './LiferayService/Liferay.interface';
