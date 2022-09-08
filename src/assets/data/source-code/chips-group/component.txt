import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chips-group',
  templateUrl: './chips-group.component.html',
  styleUrls: ['./chips-group.component.css']
})
export class ChipsGroupComponent implements OnInit {
  emptyStringVal = '--';
  public chipData = [
    {Title:'Invoice No', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Status', Data:'Draft',status:'Draft'},
    {Title:'Invoice Total', Data:this.emptyStringVal,status:'Saved'},
    {Title:'Estimated Total', Data:'33,898.00 USD',status:'Saved'},
    {Title:'Total Difference', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Provisional Inv No.', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Provisional Total', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Deductions', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Net Payable', Data:this.emptyStringVal,status:'Draft'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
