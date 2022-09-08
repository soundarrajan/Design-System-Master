import { Component, OnInit, ViewChild } from '@angular/core';
import { FreightContractsMastersComponent } from '../freight-contracts-masters/freight-contracts-masters.component';

@Component({
  selector: 'app-freight-contracts-home',
  templateUrl: './freight-contracts-home.component.html',
  styleUrls: ['./freight-contracts-home.component.scss']
})
export class FreightContractsHomeComponent implements OnInit {

  @ViewChild(FreightContractsMastersComponent) contractMasters;
  constructor() { }

  ngOnInit() {
  }

  newFreightContractMasters(){
    this.contractMasters.freightNewComponent();
  }

}
