import { Routes } from '@angular/router';
import { ControlTowerHomeNewComponent } from '../shiptech-control-tower/control-tower-home-new/control-tower-home-new.component';
import { ControlTowerHomeComponent } from '../shiptech-control-tower/control-tower-home/control-tower-home.component';
import { ShiptechDeliveryComponent } from '../shiptech-delivery/shiptech-delivery.component';
import { InvoiceScreenComponent } from '../shiptech-invoice/invoice-screen/invoice-screen.component';
import { SpotNegotiationHomeComponent } from '../shiptech-spot-negotiation/spot-negotiation-home/spot-negotiation-home.component';
import { CustomComponentsHomeComponent } from './custom-components-home/custom-components-home.component';
import {ShiptechContractHomeComponent} from './shiptech-contract/shiptech-contract-home/shiptech-contract-home.component';

export const ShipTechRoutes: Routes = [
    {
        path: 'shiptechcomponents',
        component: CustomComponentsHomeComponent,
        data : {breadCrumb1 : 'ShipTech UI Components',breadCrumb2 : 'ShipTech UI Components'}
    },
    // {
    //     path: 'invoice',        
    //     component: InvoiceScreenComponent,
    //     data : {breadCrumb1 : 'Invoice List'}
    // },
    // {
    //     path: 'delivery',        
    //     component: ShiptechDeliveryComponent,
    //     data : {breadCrumb1 : 'Delivery List'}
    // },
    // {
    //     path: 'contract',        
    //     component: ShiptechContractHomeComponent,
    //     data : {breadCrumb1 : 'Contract List'}
    // },
    {
        path: 'controlTower',        
        component: ControlTowerHomeComponent,
        data : {breadCrumb1 : 'Control Tower'}
    },
    {
        path: 'controlTowerNew',        
        component: ControlTowerHomeNewComponent,
        data : {breadCrumb1 : 'Control Tower - New'}
    },
    {
        path: 'spotnegotiation/:companyName',        
        component: SpotNegotiationHomeComponent,
        data : {breadCrumb1 : 'Spot Negotiation'}
    },
    {
        path: 'spotnegotiation',        
        component: SpotNegotiationHomeComponent,
        data : {breadCrumb1 : 'Spot Negotiation'}
    },
    {
        path: ':name',        
        component: InvoiceScreenComponent,
        data : {breadCrumb1 : 'Invoice List'}
    },
];