import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-rack-marketing-home',
  templateUrl: './rack-marketing-home.component.html',
  styleUrls: ['./rack-marketing-home.component.scss']
})
export class RackMarketingHomeComponent {
  tabs = [];
  selected = new FormControl(0);
  
  ngOnInit() {
    let drafttab = document.querySelector('mat-tab-header');
    if(drafttab.classList.contains('draft-border'))    
      drafttab.classList.remove('draft-border');    
  }

  addTab() {
    // add blue border in header
    const drafttab = document.querySelector('mat-tab-header');
    // drafttab.classList.add('draft-border');
   
    this.tabs.push('DRAFT');
  }

  headerBorder(a){
   //alert(a.index);
   const drafttab = document.querySelector('mat-tab-header');
   if(a.index == 0){
    drafttab.classList.remove('draft-border');
   }
   else{
    drafttab.classList.add('draft-border');
   }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  selectTab(evt){
    let drafttab = document.querySelector('mat-tab-header');
    if(evt.index==0){
      drafttab.classList.remove('draft-border');
    }
    else{
      drafttab.classList.add('draft-border');
     }
  }

}
