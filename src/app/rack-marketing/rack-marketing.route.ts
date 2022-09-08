import { Routes } from '@angular/router';
import{SetPriceComponent} from './set-price/set-price.component';
import{OtherComponentsComponent} from './other-components/other-components.component';
import{RackMarketingHomeComponent} from './rack-marketing-home/rack-marketing-home.component';
export const RackMarketingRoutes: Routes = [
    {
        path: 'rackmarketinghome',        
        component: RackMarketingHomeComponent,
        data : {breadCrumb1 : 'Rack Marketing'}
    },
    {
        path: 'setprice',        
        component: SetPriceComponent
    },
    {
        path: 'rackothercomponents',        
        component: OtherComponentsComponent
    }
];