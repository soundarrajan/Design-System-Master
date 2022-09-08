import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-badge',
  templateUrl: './dynamic-badge.component.html',
  styleUrls: ['./dynamic-badge.component.css']
})
export class DynamicBadgeComponent implements OnInit {

  @Input() type: string;
  @Input() dot: string;
  @Input() divider: string;
  @Input('category') category;
  @Input('dropdown') dropdown;
  @Input('items') items;
  public listQuantityOption = 'Confirm';
//   public items =  [
//            { label: "Seller", value: "AA fuel seller"},
//            { label:"Broker", value: "AAA Brokerage"},
//            { label: "Seller", value: "AA fuel seller"},
//            { label:"Broker", value: "AAA Brokerage"}
//   ];
//   public itemsDropdown =  [
//     { label: "Buyer's Using", value: ["Confirm","Vessel","BDN"]},
//     { label:"Broker", value: "AAA Brokerage"},
//     { label: "Seller", value: "AA fuel seller"},
//     { label:"Broker", value: "AAA Brokerage"}
// ];
  public label = {by:'Yusuf Hassan',on:'17/06/2020'};
  constructor() { }

  ngOnInit(): void {
    
  }

}

