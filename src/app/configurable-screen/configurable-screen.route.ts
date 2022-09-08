import { Routes } from '@angular/router';
import { ConfigurableListingComponent } from './configurable-listing/configurable-listing.component';
import { ConfigurableScreenHomeComponent } from './configurable-screen-home/configurable-screen-home.component';


export const ConfigurableScreenRoutes: Routes = [
    {
        path: '**',        
        component: ConfigurableListingComponent,
        data : {breadCrumb1 : 'Configurable UI List'} 
    }
];