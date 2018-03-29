import { Component } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';
import { MenuItem } from 'primeng-wl/api';
import { Router } from '@angular/router';


@Component({
	selector: 'app',
	templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {

	items: MenuItem[];
	items_context: MenuItem[];
	items2: MenuItem[];
	items_menu: MenuItem[];
	items_panel: MenuItem[];
	items_steps: MenuItem[];
	items_mega: MenuItem[];
	items_menubar: MenuItem[];
	items_slide: MenuItem[];
	items_tab: MenuItem[];

	constructor(
		private translate: TranslateService,
		private liferayService: LiferayService,
		private router: Router
	) {
		this.initTranslate();
		router.navigate(['home'], { skipLocationChange: true })
	}

	initTranslate() {
		// Set the default language for translation strings, and the current language.
		this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

		// Set your language here
		this.translate.use(this.liferayService.getLanguageLiferay());

		this.items_tab = [
			{ label: 'Stats', icon: 'fa-bar-chart' },
			{ label: 'Calendar', icon: 'fa-calendar' },
			{ label: 'Documentation', icon: 'fa-book' },
			{ label: 'Support', icon: 'fa-support' },
			{ label: 'Social', icon: 'fa-twitter' }
		];
		this.items_slide = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'fa-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'fa-edit',
				items: [
					{ label: 'Undo', icon: 'fa-mail-forward' },
					{ label: 'Redo', icon: 'fa-mail-reply' }
				]
			}
		];
		this.items_menubar = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'fa-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'fa-edit',
				items: [
					{ label: 'Undo', icon: 'fa-mail-forward' },
					{ label: 'Redo', icon: 'fa-mail-reply' }
				]
			}
		];
		this.items_steps = [
			{ label: 'Step 1' },
			{ label: 'Step 2' },
			{ label: 'Step 3' }
		];
		this.items_panel = [
			{
				label: 'File',
				icon: 'fa-file-o',
				items: [{
					label: 'New',
					icon: 'fa-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'fa-edit',
				items: [
					{ label: 'Undo', icon: 'fa-mail-forward' },
					{ label: 'Redo', icon: 'fa-mail-reply' }
				]
			},
			{
				label: 'Help',
				icon: 'fa-question',
				items: [
					{
						label: 'Contents'
					},
					{
						label: 'Search',
						icon: 'fa-search',
						items: [
							{
								label: 'Text',
								items: [
									{
										label: 'Workspace'
									}
								]
							},
							{
								label: 'File'
							}
						]
					}
				]
			},
			{
				label: 'Actions',
				icon: 'fa-gear',
				items: [
					{
						label: 'Edit',
						icon: 'fa-refresh',
						items: [
							{ label: 'Save', icon: 'fa-save' },
							{ label: 'Update', icon: 'fa-save' },
						]
					},
					{
						label: 'Other',
						icon: 'fa-phone',
						items: [
							{ label: 'Delete', icon: 'fa-minus' }
						]
					}
				]
			}
		];
		this.items_menu = [
			{ label: 'New', icon: 'fa-plus' },
			{ label: 'Open', icon: 'fa-download' },
			{ label: 'Undo', icon: 'fa-refresh' },
		];
		this.items = [{
			label: 'File',
			items: [
				{ label: 'New', icon: 'fa-plus' },
				{ label: 'Open', icon: 'fa-download' }
			]
		},
		{
			label: 'Edit',
			items: [
				{ label: 'Undo', icon: 'fa-refresh' },
				{ label: 'Redo', icon: 'fa-repeat' }
			]
		}];
		this.items_context = [
			{
				label: 'File',
				icon: 'fa-file-o',
				items: [{
					label: 'New',
					icon: 'fa-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ separator: true },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'fa-edit',
				items: [
					{ label: 'Undo', icon: 'fa-mail-forward' },
					{ label: 'Redo', icon: 'fa-mail-reply' }
				]
			},
			{
				label: 'Help',
				icon: 'fa-question',
				items: [
					{
						label: 'Contents'
					},
					{
						label: 'Search',
						icon: 'fa-search',
						items: [
							{
								label: 'Text',
								items: [
									{
										label: 'Workspace'
									}
								]
							},
							{
								label: 'File'
							}
						]
					}
				]
			},
			{
				label: 'Actions',
				icon: 'fa-gear',
				items: [
					{
						label: 'Edit',
						icon: 'fa-refresh',
						items: [
							{ label: 'Save', icon: 'fa-save' },
							{ label: 'Update', icon: 'fa-save' },
						]
					},
					{
						label: 'Other',
						icon: 'fa-phone',
						items: [
							{ label: 'Delete', icon: 'fa-minus' }
						]
					}
				]
			},
			{ separator: true },
			{
				label: 'Quit', icon: 'fa-minus'
			}
		];

		this.items2 = [
			{
				label: 'Next',
				icon: 'fa-chevron-right'
			},
			{
				label: 'Prev',
				icon: 'fa-chevron-left'
			}
		];
		this.items_mega = [
			{
				label: 'TV', icon: 'fa-check',
				items: [
					[
						{
							label: 'TV 1',
							items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
						},
						{
							label: 'TV 2',
							items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
						}
					],
					[
						{
							label: 'TV 3',
							items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
						},
						{
							label: 'TV 4',
							items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
						}
					]
				]
			},
			{
				label: 'Sports', icon: 'fa-soccer-ball-o',
				items: [
					[
						{
							label: 'Sports 1',
							items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
						},
						{
							label: 'Sports 2',
							items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
						},

					],
					[
						{
							label: 'Sports 3',
							items: [{ label: 'Sports 3.1' }, { label: 'Sports 3.2' }]
						},
						{
							label: 'Sports 4',
							items: [{ label: 'Sports 4.1' }, { label: 'Sports 4.2' }]
						}
					],
					[
						{
							label: 'Sports 5',
							items: [{ label: 'Sports 5.1' }, { label: 'Sports 5.2' }]
						},
						{
							label: 'Sports 6',
							items: [{ label: 'Sports 6.1' }, { label: 'Sports 6.2' }]
						}
					]
				]
			}
		];
	}
}