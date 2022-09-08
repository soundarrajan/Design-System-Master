import { Routes } from '@angular/router';
import { ActualisationHomeComponent } from './actualisation-home/actualisation-home.component';


export const ActualisationRoutes: Routes = [
    {
        path: 'actualisationhome',        
        component: ActualisationHomeComponent,
        data : {breadCrumb1 : 'Actualisation'}
    }   
];