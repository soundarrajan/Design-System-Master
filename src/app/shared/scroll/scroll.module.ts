import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlimScroll} from './slimscroll.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SlimScroll],
  exports: [SlimScroll],
  entryComponents:[]
})
export class ScrollModule { }
