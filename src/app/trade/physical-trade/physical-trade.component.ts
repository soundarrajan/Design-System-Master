import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physical-trade',
  templateUrl: './physical-trade.component.html',
  styleUrls: ['./physical-trade.component.scss']
})
export class PhysicalTradeComponent implements OnInit {

  constructor(private router:Router) { }

  url:string='http://localhost:3009/V2/#/Contract/PhysicalDeal/PhysicalDealDetail?dealId=PHB00005682';

  ngOnInit() {
    this.router.navigate(['techoil/trade/externalRedirect', {externalUrl:this.url}]);
  }

}
