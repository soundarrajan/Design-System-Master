import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferMovementsComponent } from './transfer-movements/transfer-movements.component';
import { FuelActualisationScreenComponent } from './fuel-actualisation/fuel-actualisation-screen/fuel-actualisation-screen.component';
import { OtherMovementsComponent } from './other-movements/other-movements.component';
// import { AddMovementComponent } from './add-movement/add-movement.component';
import { AddDeliveryMovementComponent } from './fuel-actualisation/add-delivery-movement/add-delivery-movement.component';
import { AddTransferMovementComponent } from './add-transfer-movement/add-transfer-movement.component';
import { AddOtherMovementComponent } from './add-other-movement/add-other-movement.component';

const routes: Routes = [
  {
    path: 'delivery', component: FuelActualisationScreenComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Delivery Movements'}
  },
  { 
    path: 'transfer', component:TransferMovementsComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Transfer Movements'}
  },
  { 
    path: 'other', component:OtherMovementsComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Other Movements'}
  },
  { 
    path: 'transfer/addMovement', component:AddTransferMovementComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Add Transfer Movement'}
  },
  {
    path: 'delivery/addMovement', component: AddDeliveryMovementComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Add Delivery Movements'}
  },
  {
    path: 'other/addMovement', component: AddOtherMovementComponent,
    data : {breadCrumb1 : 'Movements',breadCrumb2 : 'Add Other Movements'}
  },
  { 
    path: '**', redirectTo:'delivery'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRouteModule { }
