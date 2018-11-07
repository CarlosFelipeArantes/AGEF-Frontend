import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab0Root: any = 'VendaHomePage';
    tab1Root: any = 'EstoqueHomePage';
    tab2Root: any = 'FaturamentoHomePage';
    tab3Root: any = 'ModeloHomePage';
    tab4Root: any = 'DefeitoHomePage';

    constructor() {
    }
}
