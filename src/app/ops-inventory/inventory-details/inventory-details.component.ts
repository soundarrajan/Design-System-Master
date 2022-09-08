import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  headerCollapse: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  selectTab($event){

  }
  toggleCollapse(){
    this.headerCollapse = !this.headerCollapse;
  }
}
