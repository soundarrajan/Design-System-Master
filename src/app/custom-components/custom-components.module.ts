import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { CustomcomponentsRoutes } from './custom-components.route';
import { UiComponentsComponent } from './v2-components/ui-components.component';
import { CustomComponentsHomeComponent } from './custom-components-home/custom-components-home.component';

@NgModule({
  declarations: [UiComponentsComponent, CustomComponentsHomeComponent],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(CustomcomponentsRoutes)
  ]
})
export class CustomComponentsModule { }
