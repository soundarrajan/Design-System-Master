import { Routes } from '@angular/router';
import { ApprovalListComponent } from './approval-list/approval-list.component';


export const ApprovalListRoutes: Routes = [
    {
        path: 'approvallistscreen',        
        component: ApprovalListComponent,
        data : {breadCrumb1 : 'Approval List'}
    }
   
];