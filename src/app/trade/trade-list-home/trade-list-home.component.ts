import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-trade-list-home',
  templateUrl: './trade-list-home.component.html',
  styleUrls: ['./trade-list-home.component.scss']
})
export class TradeListHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  tabs = [];
  selected = new FormControl(0);

  addTab() {
    this.tabs.push('DRAFT');
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
