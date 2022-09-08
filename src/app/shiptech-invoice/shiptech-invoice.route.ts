import { Routes } from '@angular/router';
import { InvoiceScreenComponent } from './invoice-screen/invoice-screen.component';



export const InvoiceListRoutes: Routes = [
    {
        path: '**',        
        component: InvoiceScreenComponent,
        data : {breadCrumb1 : 'Invoice List'}
    }
   
];