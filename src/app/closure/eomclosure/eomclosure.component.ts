import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { EomclosuredetailsComponent } from '../eomclosuredetails/eomclosuredetails.component';

@Component({
  selector: 'app-eomclosure',
  templateUrl: './eomclosure.component.html',
  styleUrls: ['./eomclosure.component.scss']
})
export class EomclosureComponent implements OnInit {

  tabs = [];
  selected = new FormControl(0);
  isShow: boolean = false;
  showcancelEom:  boolean = false;
  eomDone:  boolean = false;
  btnText:string;
  eomAction:string;
  headerCollapse:  boolean = false;
  @ViewChild(EomclosuredetailsComponent) child: EomclosuredetailsComponent;
  public eomType:any;
  public eomState:any;
    

  ngOnInit() {
    let drafttab = document.querySelector('mat-tab-header');
    if(drafttab.classList.contains('draft-border'))    
      drafttab.classList.remove('draft-border'); 

      this.btnText = 'runEom';

    var eomActiontxt = history.state.eomAction;
    this.eomType = eomActiontxt;
    var eomActionStage = history.state.eomStage;
    this.eomState = eomActionStage;

      
  }

  genPNL(text){
    //alert(text);
    if (text == 'genPL')
    this.btnText = 'genPL';
    

    if (text =='acceptClose')
    this.btnText = '';

    if (text =='eomDone')
    this.acceptCloseClick();
  }

  acceptCloseClick(){
    //alert("");
    this.showcancelEom = false;
    this.eomDone = true;
  }

  runEom(){
    this.child.runEOM();
    
    //var eomActiontxt = history.state.eomAction;
    //alert(eomActiontxt);
    //this.eomType = eomActiontxt
    //alert(this.eomType);
    //this.child.eomActionType(eomActiontxt);

    // if(eomActiontxt == 'View EOM'){
    // this.child.generatePNL();
    // // this.child.runEOM();
    // // this.child.runEOM();
    // }else{
    //   this.child.runEOM(); 
    // }

    // if(eomActiontxt == 'Run EOM')
    // this.child.runEOM();

    this.showcancelEom = true;
  }
  cancelEom(){
    this.child.cancelEom();
  }

  addTab() {
    // add blue border in header
    const drafttab = document.querySelector('mat-tab-header');
    // drafttab.classList.add('draft-border');
   
    this.tabs.push('P&L');
    this.tabs.push('ACCURAL');
    this.isShow=true;
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

  

  selectTab(evt){
    let drafttab = document.querySelector('mat-tab-header');
    if(evt.index==0){
      drafttab.classList.remove('draft-border');
    }
    else{
      drafttab.classList.add('draft-border');
     }
  }
  toggleCollapse(){
    //alert("");
    this.headerCollapse = !this.headerCollapse;
    this.child.headerToggling();
  }
}
