import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FigmaLinksScreenComponent } from './figma-links-screen/figma-links-screen.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { HelpersModule } from '../shared/helper.module';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { FigmaLinkScreenRoutes } from './figma-links.route';



@NgModule({
  declarations: [FigmaLinksScreenComponent],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    HelpersModule,
    RouterModule.forChild(FigmaLinkScreenRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent])
  ]
})
export class FigmaLinksModule { }
