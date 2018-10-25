import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab0Root: any = 'VendaHomePage';
    tab1Root: any = 'EstoquePage';
    tab2Root: any = 'ModelosPage';
    tab3Root: any = 'ModelosPage';
    tab4Root: any = 'manageDefeitosPage';

    constructor() {
    }
}
