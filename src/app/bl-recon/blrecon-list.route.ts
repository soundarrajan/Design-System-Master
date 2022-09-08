
import {BlListHomeComponent} from './bl-list-home/bl-list-home.component'
import { Routes } from '@angular/router';
import { BlreconHomeComponent } from './blrecon-home/blrecon-home.component';
import { reconciliationHomeComponent } from './reconciliation-home/reconciliation-home.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';


export const BLReconRoutes: Routes = [
    {
        path: 'blreconlistscreen',        
        component: BlreconHomeComponent,
        data : {breadCrumb1 : 'Recon',breadCrumb2 : 'BL Recon'}
    },
    {
        path: 'bllistscreen',        
        component: BlListHomeComponent,
        data : {breadCrumb1 : 'Recon',breadCrumb2 : 'BL List'}
    },
    {
        path: 'reconciliationscreen',        
        component: reconciliationHomeComponent,
        data : {breadCrumb1 : 'Recon',breadCrumb2 : 'Reconciliation'}
    },
    {
        path: 'journaldetail',        
        component: JournalDetailComponent,
        data : {breadCrumb1 : 'Recon',breadCrumb2 : 'Inventory Reconciliation'}
    }  
];