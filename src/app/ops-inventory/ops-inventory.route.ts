import { Routes } from '@angular/router';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { TankSummaryComponent } from './tank-summary/tank-summary.component';

export const OpsInventoryRoute: Routes = [
    {
      path: 'inventorydetails',
      component: InventoryDetailsComponent,
      data : {breadCrumb1 : 'Ops Inventory',breadCrumb2 : 'Inventory Details'}
    },
    {
      path: 'tankSummary',
      component: TankSummaryComponent,
      data : {breadCrumb1 : 'Ops Inventory',breadCrumb2 : 'Inventory Details'}
    }
];
