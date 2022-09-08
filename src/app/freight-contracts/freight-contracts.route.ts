import { Routes } from '@angular/router';
import { FreightContractsHomeComponent } from './freight-contracts-home/freight-contracts-home.component';


export const FreightContractsRoutes: Routes = [
    {
        path: 'freightcontractsmasters',        
        component: FreightContractsHomeComponent,
        data : {breadCrumb1 : 'Freight Contracts'}
    }
   
];