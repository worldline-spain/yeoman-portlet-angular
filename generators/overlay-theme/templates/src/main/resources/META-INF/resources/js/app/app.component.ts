import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import {ConfirmDialogModule} from 'primeng-wl/confirmdialog';
import {ConfirmationService} from 'primeng-wl/api';

import { Message } from 'primeng-wl/components/common/api';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

  caption = 'Hello world!';
	images: any[];
	display_dialog: boolean = false;
	display_sidebar: boolean = false;

	constructor(
		private translate: TranslateService,
    private liferayService: LiferayService,
    private confirmationService: ConfirmationService
	) {
		this.initTranslate();

    this.images = [];
        this.images.push({source:'https://misanimales.com/wp-content/uploads/2016/10/crecen-los-gatos.jpg', thumbnail:"https://t1.ea.ltmcdn.com/es/images/5/4/7/img_por_que_mi_gato_no_se_deja_tocar_22745_paso_0_600.jpg", title:'Sopranos 1'});
        this.images.push({source:'https://misanimales.com/wp-content/uploads/2016/10/crecen-los-gatos.jpg', thumbnail:"https://t1.ea.ltmcdn.com/es/images/5/4/7/img_por_que_mi_gato_no_se_deja_tocar_22745_paso_0_600.jpg", title:'Sopranos 2'});
        this.images.push({source:'https://misanimales.com/wp-content/uploads/2016/10/crecen-los-gatos.jpg', thumbnail:"https://t1.ea.ltmcdn.com/es/images/5/4/7/img_por_que_mi_gato_no_se_deja_tocar_22745_paso_0_600.jpg", title:'Sopranos 3'});
        this.images.push({source:'https://misanimales.com/wp-content/uploads/2016/10/crecen-los-gatos.jpg', thumbnail:"https://t1.ea.ltmcdn.com/es/images/5/4/7/img_por_que_mi_gato_no_se_deja_tocar_22745_paso_0_600.jpg", title:'Sopranos 4'});

	}

  showDialog() {
    this.display_dialog = true;
  }

  confirm() {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        header: 'Confirmation',
        icon: 'fa-question-circle',
              accept: () => {
              },
              reject: () => {
              }
          });
  }

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());
	}
}
