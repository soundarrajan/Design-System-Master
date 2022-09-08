import { Routes } from '@angular/router';
import { CreditActualisationScreenComponent } from './credit-actualisation-screen/credit-actualisation-screen.component';


export const CreditListRoutes: Routes = [
    {
        path: 'creditactualisationscreen',        
        component: CreditActualisationScreenComponent,
        data : {breadCrumb1 : 'Credit Actualisation'}
    }
   
];