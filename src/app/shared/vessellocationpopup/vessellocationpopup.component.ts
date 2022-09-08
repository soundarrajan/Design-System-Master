import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import { EventEmitter } from 'protractor';
export class vesselPopupObj {
  name: string;
  destination: string;
  eta: string;
  voyageStatus: string;
  vesselType: string;
  bunkeringStatus: string;
  hsfo: string;
  dogo: string;
  ulsfo: string;
  vlsfo: string;
  notificationsCount:number;
  messagesCount:number;
}
@Component({
  selector: 'app-vessellocationpopup',
  templateUrl: './vessellocationpopup.component.html',
  styleUrls: ['./vessellocationpopup.component.scss']
})
export class VessellocationpopupComponent implements OnInit, AfterViewInit {
  @Input()status: string = "standard-status";
  
  @Output()dataChange = new EventEmitter<vesselPopupObj>();  

  constructor() { }
  
  @Input('vesselData') public popup_data:vesselPopupObj;
  ngOnInit() {
    this.popup_data = {
      name: 'Torm Lillys',
      destination: 'Marseille',
      eta: '2019-04-13',
      voyageStatus: 'Laden',
      vesselType: 'LR1',
      bunkeringStatus: 'Created',
      hsfo: '401',
      dogo: '601',
      ulsfo: '121',
      vlsfo: '364',
      notificationsCount:6,
      messagesCount:2
    }
   
  } 

  ngAfterViewInit(){
    this.dataChange.emit(this.popup_data);
  }
}
