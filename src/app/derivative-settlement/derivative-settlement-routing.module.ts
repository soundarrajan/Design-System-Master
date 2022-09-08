import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementScreenComponent } from './settlement-screen/settlement-screen.component';


const routes: Routes = [
  {
    path: 'swaps', component: SettlementScreenComponent,
    data : {breadCrumb1 : 'Derivative Settlement',breadCrumb2 : 'Swaps'}
  },
  { 
    path: '**', redirectTo:'settlement'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DerivativeSettlementRoutingModule { }
