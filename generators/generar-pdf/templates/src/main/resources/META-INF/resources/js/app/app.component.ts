import { Component } from '@angular/core';
import { DataTable } from 'primeng-wl/primeng';
import { TranslateService, LiferayService } from '../../services/shared.module';

import * as moment from 'moment';
import { NgFor } from '@angular/common';

declare const pdfMake: any;

@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {



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

	ngOnInit() {

    }

    generatePDF() {
      // create & open the PDF in a new window
      //var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

      var docDefinition = {

        pageSize: 'A5',

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 40, 60, 40, 60 ],

        content: [
              {text: 'A simple table with nested elements', style: 'subheader'},
              'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
              {
                style: 'tableExample',
                table: {
                  body:  [
                    ['Column 1', 'Column 2', 'Column 3'],
                    [
                      {
                        stack: [
                          'Let\'s try an unordered list',
                          {
                            ul: [
                              'item 1',
                              'item 2'
                            ]
                          }
                        ]
                      },
                      [
                        'or a nested table',
                        {
                          table: {
                            body: [
                              ['Col1', 'Col2', 'Col3'],
                              ['1', '2', '3'],
                              ['1', '2', '3']
                            ]
                          },
                        }
                      ],
                      {text: [
                          'Inlines can be ',
                          {text: 'styled\n', italics: true},
                          {text: 'easily as everywhere else', fontSize: 10}]
                      }
                    ]
                  ]
                }
              },
              {

                image:'data:image/png;base64,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',
                fit: [100, 100]

              },
              {
                 image:'data:image/png;base64,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',
                 fit: [100, 100],
               },
          ]
      };


      pdfMake.createPdf(docDefinition,"report.pdf").open();

    }
}
