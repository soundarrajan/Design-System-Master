import { Routes } from '@angular/router';
import { CustomComponentsHomeComponent } from './custom-components-home/custom-components-home.component';

export const CustomcomponentsRoutes: Routes = [
    {
        path: 'v2Components',        
        component: CustomComponentsHomeComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V2'}
    },
    {
        path: 'v1Components',        
        loadChildren: './v1-components/v1-comps.module#DesignSystemCompsModule' 
    },
    {
        path: 'mapComponents',        
        loadChildren: '../planning-dashboard/planning-dashboard.module#PlanningDashboardModule' 
    }  
];