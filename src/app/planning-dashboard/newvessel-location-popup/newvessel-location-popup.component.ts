import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newvessel-location-popup',
  templateUrl: './newvessel-location-popup.component.html',
  styleUrls: ['./newvessel-location-popup.component.scss']
})
export class NewvesselLocationPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
}
