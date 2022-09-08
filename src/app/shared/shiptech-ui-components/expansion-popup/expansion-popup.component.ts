import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion-popup',
  templateUrl: './expansion-popup.component.html',
  styleUrls: ['./expansion-popup.component.css']
})
export class ExpansionPopupComponent implements OnInit {

  expandProductPopUp:boolean = false;
  displayedColumns: string[] = ['product', 'productType'];
  deliverySummaryProducts = [
    {'product': 'RMG 380 MAX 050', 'productType': 'VLSFO'},
    {'product': 'DMA 0.1%', 'productType': 'DOGO'},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  search(value: string): void {
    let filterSummaryProducts = this.deliverySummaryProducts.filter((summaryProd) => summaryProd.product.toLowerCase().includes(value));
    this.deliverySummaryProducts = [ ... filterSummaryProducts];

    this.deliverySummaryProducts = [
      {'product': 'RMG 380 MAX 050', 'productType': 'VLSFO'},
      {'product': 'RMG 380 MAX 0502', 'productType': 'VLSFO2'},
    ];
  }

}
