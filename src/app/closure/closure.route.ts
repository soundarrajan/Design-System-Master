import { EomclosureComponent } from './eomclosure/eomclosure.component';

import { Routes} from '@angular/router';
import { EomlistComponent } from './eomlist/eomlist.component';
import { EomListComponent } from './eom-list/eom-list.component';
import { EomClosureComponent } from './eom-closure/eom-closure.component';


export const ClosureRoutes: Routes = [
  {
    path: 'eomscreen',
    component: EomlistComponent,
    data : {breadCrumb1 : 'Closure',breadCrumb2 : 'EOM List'}
  },
  {
    path: 'eomclosure',
    component: EomclosureComponent,
    data : {breadCrumb1 : 'Closure',breadCrumb2 : 'EOM Closure'}
  },
  {
    path: 'eom-list',
    component: EomListComponent,
    data : {breadCrumb1 : 'Closure',breadCrumb2 : 'EOM List'}
  },
  {
    path: 'eom-closure',
    component: EomClosureComponent,
    data : {breadCrumb1 : 'Closure',breadCrumb2 : 'EOM Closure'}
  }
];

