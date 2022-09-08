import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
//import { EventEmitter } from 'protractor';

export interface vesselPopupObj {
  name: string,
  destination: string,
  eta: string,
  hsfo:string,
}

@Component({
  selector: 'app-vesseldetailspopup',
  templateUrl: './vesseldetailspopup.component.html',
  styleUrls: ['./vesseldetailspopup.component.scss']
})
export class VesseldetailspopupComponent implements OnInit {
  @Input()status: string = "standard-status";

  @Output()dataChange = new EventEmitter<vesselPopupObj>();

  constructor() { }

  @Input('vesselData') public popup_desti_data:vesselPopupObj;
  ngOnInit() {
    this.popup_desti_data = {
      name: 'Merille',
      eta: '2019-04-11',
      destination: 'Merille',
      hsfo:'10'
    }
  }

  fueltable = [
    {
      "fuel_type": "HSFO",
      "fuel_price_data": "$489.00",
      "fuel_indication_value": "1.5"
    },
    {
      "fuel_type": "VLSFO",
      "fuel_price_data": "$496.00",
      "fuel_indication_value": "0.5"
    },
    {
      "fuel_type": "ULSFO",
      "fuel_price_data": "$588.00",
      "fuel_indication_value": "1.5"
    },
    {
      "fuel_type": "DOGO",
      "fuel_price_data": "$677.34",
      "fuel_indication_value": "2.0"
    }];
    fueltable2=[
    {
      "fuel_type": "ULSFO",
      "fuel_price_data": "$588.00",
      "fuel_indication_value": "1.5"
    },
    {
      "fuel_type": "DOGO",
      "fuel_price_data": "$677.34",
      "fuel_indication_value": "2.0"
    },
  ];

 
  
  ngAfterViewInit(){
    this.dataChange.emit(this.popup_desti_data);
  }

}
