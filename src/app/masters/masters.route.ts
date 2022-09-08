import { Routes } from '@angular/router';
import { NewVesselComponent } from './new-vessel/new-vessel.component';
import { SiteMasterHomeComponent } from './site-master-home/site-master-home.component';


export const MastersRoutes: Routes = [
    {
        path: 'sitemaster',        
        component: SiteMasterHomeComponent,
        data : {breadCrumb1 : 'Masters',breadCrumb2 : 'Site Master'}
    },
    {
        path: 'vesselmaster',        
        component: NewVesselComponent,
        data : {breadCrumb1 : 'Masters',breadCrumb2 : 'Vessel Master'}
    }   
];