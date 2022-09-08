import { Routes } from '@angular/router';
import{TransactionListComponent} from './transaction-list/transaction-list.component';


export const TransactionListRoutes: Routes = [
    {
        path: 'transactionlistscreen',        
        component: TransactionListComponent,
        data : {breadCrumb1 : 'Transaction List'}
    }
   
];