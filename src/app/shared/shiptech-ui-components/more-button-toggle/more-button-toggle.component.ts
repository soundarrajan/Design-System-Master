import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-button-toggle',
  templateUrl: './more-button-toggle.component.html',
  styleUrls: ['./more-button-toggle.component.css']
})
export class MoreButtonToggleComponent implements OnInit {
  
  activeBtn = 'Final';
  showMoreButtons: boolean = false;
  more_invoice_types: string[] = ['Final', 'Provisional', 'Credit', 'Debit', 'Pre-claim'];
  invoice_types =[
    {
      displayName:'Final',
      value:'FinalInvoice',
    },
    {
      displayName:'Provisional',
      value:'Provisional',
    },
    {
      displayName:'Credit',
      value:'Credit',
    },
    {
      displayName:'Debit',
      value:'Debit',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.activeBtn = 'Final';
  }

  openMoreButtons($event){
      this.showMoreButtons = !this.showMoreButtons;
  }

}
