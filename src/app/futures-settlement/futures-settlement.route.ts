
import { Routes } from '@angular/router';
import { FuturesSettlementHomeComponent } from './futures-settlement-home/futures-settlement-home.component';


export const FuturesSettlementRoute: Routes = [
  {
    path: 'list', component: FuturesSettlementHomeComponent,
    data: { breadCrumb1: 'Futures Settlement' }
  }
];

