import { Routes } from '@angular/router';
import { RackSchedulingHomeComponent } from './rack-scheduling-home/rack-scheduling-home.component';


export const RackSchedulingRoutes: Routes = [
    {
        path: 'rackschedulingscreen',        
        component: RackSchedulingHomeComponent,
        data : {breadCrumb1 : 'Scheduling',breadCrumb2 : 'Rack Scheduling'}
    }
   
];