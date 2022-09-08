import { Routes } from '@angular/router';

import { PipelineComponent } from './pipeline-scheduling.component';
import { PipelineHomeComponent } from './pipeline-home/pipeline-home.component';
import { PipelineScheduleComponent } from './pipeline-schedule/pipeline-schedule.component';
import { DropshipListComponent } from './dropship-list/dropship-list.component';
import { BookoutListComponent } from './bookout-list/bookout-list.component';
import { NetoutListComponent } from './netout-list/netout-list.component';
import {ScrollTestComponent} from './scroll-test/scroll-test.component';

export const PipelineRoutes: Routes = [
{
  path: 'pipeline',
  component: PipelineComponent,
  data: {
    breadcrumb: 'Pipeline',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
},
{
  path: 'pipelinehome',
  component: PipelineHomeComponent,
  data : {breadCrumb1 : 'Scheduling',breadCrumb2 : 'Pipeline Scheduling'}
},
{
  path: 'pipelineschedule',
  component: PipelineScheduleComponent,
  data: {
    breadcrumb: 'Pipeline Schedule',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
},
{
  path: 'dropshiplist',
  component: DropshipListComponent,
  data: {
    breadcrumb: 'Dropship-List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
},
{
  path: 'bookoutlist',
  component: BookoutListComponent,
  data: {
    breadcrumb: 'Book-Out List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
},
{
  path: 'netoutlist',
  component: NetoutListComponent,
  data: {
    breadcrumb: 'Net-Out List',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
},
{
  path: 'scrolltest',
  component: ScrollTestComponent
}
];
