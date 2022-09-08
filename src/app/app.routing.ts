import {Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import { CustomComponentsHomeComponent } from './custom-components/custom-components-home/custom-components-home.component';
import { HelpComponent } from './shared/designsystem-v2/help/help.component';
import { LoginComponent } from './login/login.component';
import { DesignSystemComponent } from './flat_nav/design-system.component';
import { AuthGaurdService } from './services/auth-guard.service';
import { RouteAccessGaurdService } from './services/route-access-guard.service';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: DesignSystemComponent, canActivate: [AuthGaurdService] },
  {
  path: '',
  canActivate: [AuthGaurdService],
  children: [
     {
      path: 'techoil/pipeline',
      loadChildren: './pipeline-scheduling/pipeline-scheduling.module#PipelineModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/trade',
      loadChildren: './trade/trade.module#TradeModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/opsinventory',
      loadChildren: './ops-inventory/ops-inventory.module#OpsInventoryModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'smarttrader/planningdashboard',
      loadChildren: './planning-dashboard/planning-dashboard.module#PlanningDashboardModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/rackmarketing',
      loadChildren: './rack-marketing/rack-marketing.module#RackMarketingModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/freightcontracts',
      loadChildren: './freight-contracts/freight-contracts.module#FreightContractsModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/rackscheduling',
      loadChildren: './rack-scheduling/rack-scheduling.module#RackSchedulingModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/transactionlist',
      loadChildren: './transaction-list/transaction-list.module#TransactionListModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/blrecon',
      loadChildren: './bl-recon/blrecon.module#BlreconModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/actualisation',
      loadChildren: './actualisation/actualisation.module#ActualisationModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/creditactualisation',
      loadChildren: './credit-actualisation/credit-actualisation.module#CreditActualisationModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/movements',
      loadChildren: './movements/movements.module#MovementsModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/derivative-settlement',
      loadChildren: './derivative-settlement/derivative-settlement.module#DerivativeSettlementModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/futures-settlement',
      loadChildren: './futures-settlement/futures-settlement.module#FuturesSettlementModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    // {
    //   path: 'transfermovements',
    //   loadChildren: './movements/transfer-movements/transfer-movements.module#TransferMovementsModule'
    // },
    {
      path: 'techoil/closure',
      loadChildren: './closure/closure.module#ClosureModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    // {
    //   path: 'techoilcomponents',
    //   loadChildren: './techoil-components/techoil-components.module#TechoilComponentsModule'
    // },
    {
      path: 'techoil/masters',
      loadChildren: './masters/masters.module#MastersModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'techoil/approvallist',
      loadChildren: './approval-list/approval-list.module#ApprovalListModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'shiptech',
      loadChildren: './ship-tech/ship-tech.module#ShipTechModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'invoice',
      loadChildren: './shiptech-invoice/shiptech-invoice.module#ShiptechInvoiceModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'dsComponents',
      loadChildren: './custom-components/custom-components.module#CustomComponentsModule',
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'config/configUI',        
      loadChildren: './configurable-screen/configurable-screen.module#ConfigurableScreenModule' ,
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    {
      path: 'config/figmaLink',        
      loadChildren: './figma-links/figma-links.module#FigmaLinksModule' ,
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },  
    {
      path: 'help',
      component: HelpComponent,
      canActivate: [AuthGaurdService],
      canActivateChild: [RouteAccessGaurdService]
    },
    // {
    //   path: 'v1Components',        
    //   loadChildren: './v1-components/v1-comps.module#DesignSystemCompsModule' 
    // },
    // {
    //   path: 'v2Components',        
    //   loadChildren: './custom-components/custom-components.module#CustomComponentsModule'
    // },
    // {
    //   path: 'DS-Components',
    //   loadChildren: './design-system-components/custom-components/custom-components.module#CustomComponentsModule'
    // },
    // {
    //   path: 'v1components',
    //   loadChildren: './design-system-components/design-system-comps.module#DesignSystemCompsModule'
    // },
    

  ]
}, 
{
  path: '**',
  component: ErrorComponent
}];
