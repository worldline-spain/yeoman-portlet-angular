import { Component, ApplicationRef } from '@angular/core';
import { TranslateService, LiferayService } from '../../services/shared.module';

import { TreeNode } from 'primeng-wl/api';
import { TreeTable } from 'primeng-wl/primeng';
import { Message, SelectItem } from 'primeng-wl/api';

@Component({
    selector: 'app',
    templateUrl: '/o/<%= portletName %>/js/app/app.html'
})
export class AppComponent {


    files: TreeNode[];
    treefiltered: TreeNode[]
    treeSearch: string;
    languages: SelectItem[];

    constructor(
        private translate: TranslateService,
        private liferayService: LiferayService,
        private applicationRef: ApplicationRef
    ) {

        this.initTranslate();

        this.languages = [];
        this.languages.push({ label: 'Spanish', value: 'es_ES' });
        this.languages.push({ label: 'English', value: 'en_US' });

        this.files = [
            {
                data: {
                    name: 'Documents',
                    size: '75kb',
                    type: 'Folder'
                },
                type: 'root',
                children: [
                    {
                        data: {
                            'name': 'Work',
                            'size': '55kb',
                            'type': 'Folder'
                        },
                        children: [
                            {
                                data: {
                                    name: 'Expenses.doc',
                                    size: '30kb',
                                    type: 'Document'
                                }
                            },
                            {
                                data: {
                                    name: 'Resume.doc',
                                    size: '25kb',
                                    type: 'Document'
                                }
                            }
                        ]
                    },
                    {
                        data: {
                            name: 'Home',
                            size: '20kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                data: {
                                    name: 'Invoices',
                                    size: '20kb',
                                    type: 'Text'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                data: {
                    name: 'Pictures',
                    size: '150kb',
                    type: 'Folder'
                },
                type: 'root',
                children: [
                    {
                        data: {
                            name: 'place.jpg',
                            size: '90kb',
                            type: 'Picture'
                        }
                    },
                    {
                        data: {
                            name: 'img.png',
                            size: '30kb',
                            type: 'Picture'
                        }
                    },
                    {
                        data: {
                            name: 'city.jpg',
                            size: '30kb',
                            type: 'Picture'
                        }
                    }
                ]
            }
        ];
        this.treefiltered = JSON.parse(JSON.stringify(this.files));

        /**
		 * Liferay stops the propagation of the event. 
		 * We have to force change detection, so that component property values 
		 * that have changed get propagated to the DOM 
		 */
        this.applicationRef.tick(); 
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang(this.liferayService.getLanguageLiferay());

        // Set your language here
        this.translate.use(this.liferayService.getLanguageLiferay());
    }

    changeLanguage(language: string) {
        this.translate.use(language);
    }

    search() {
        this.treefiltered = [];
        if (this.treeSearch) {
            let treecopy: TreeNode[] = JSON.parse(JSON.stringify(this.files));
            treecopy.forEach((node) => {
                if (node.data.name.toLowerCase().includes(this.treeSearch.toLowerCase())) {
                    this.treefiltered.push(node);
                } else {
                    this.searchRecursive(node, this.treefiltered);
                }

            });

        } else {
            this.treefiltered = JSON.parse(JSON.stringify(this.files));
        }
    }

    private searchRecursive(node: TreeNode, treefiltered: TreeNode[]) {
        if (node.data.name.toLowerCase().includes(this.treeSearch.toLowerCase())) {
            //Base case-> Child with a match found 
            return node;
        } else {
            // Recursive case
            if (node.children) {
                //Save children of the current parent
                let children = node.children;

                //Remove children from parent
                node.children = [];

                //for each child saved
                children.forEach((nodeChildren: TreeNode) => {

                    //If child found -> NodeTree, else
                    let childFound = this.searchRecursive(nodeChildren, treefiltered);
                    if (childFound) {
                        // Push child into the parent
                        node.children.push(childFound);
                    }
                });

                // If node.type is root and the node has childen
                if (node.type === "root" && node.children.length) {

                    //Push root node on the result array
                    treefiltered.push(node);
                
                //If it is NOT root and the node has childen
                } else if (node.children.length) {

                    //return node to be allocated on the parent childen array
                    return node;
                }
            } else {
                // node without match with the user input
                return;
            }
        }
    }

}
