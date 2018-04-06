import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TranslateService, LiferayService } from '../../services/shared.module';

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

  numClicks = 0;

  constructor(
    private translate: TranslateService,
    private liferayService: LiferayService
  ) {
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

    // Set your language here
    this.translate.use(this.liferayService.getLanguageLiferay());
  }

  clicked() {
    this.numClicks++;
  }
}
