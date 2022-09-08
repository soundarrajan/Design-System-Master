import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExchangeSettleDialog } from '../popup-screens/exchange-settle-popup.component';
import { SpecificationPopupDialog } from '../popup-screens/specification-popup.component';
import { OtcSwapsComponent } from '../otc-swaps/otc-swaps.component';
import { ExchangeSwapsComponent } from '../exchange-swaps/exchange-swaps.component';

@Component({
  selector: 'app-settlement-screen',
  templateUrl: './settlement-screen.component.html',
  styleUrls: ['./settlement-screen.component.css']
})
export class SettlementScreenComponent implements OnInit {
  @ViewChild(OtcSwapsComponent)
  private otcSwapsComp: OtcSwapsComponent;
  @ViewChild(ExchangeSwapsComponent)
  private exchangeSwapsComp: ExchangeSwapsComponent;
  enableSettleBtn: boolean;
  isTabCollapsed: boolean = false;
  settleOtcPopup: boolean = false;
  settleExchangePopup: boolean = false;
  popupOpen: boolean;
  selectedIndex = 0;

  constructor(public dialog: MatDialog, public elem: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let elements = this.elem.nativeElement.querySelectorAll('.mat-tab-label');
    elements.forEach((element, index) => {
      // element.style.left = 138 * index+'px';
      element.style.zIndex = 1000 - index;
    });

  }

  enableOTCSettle($event) {
    this.settleOtcPopup = $event;
  }

  enableExchangeSettle($event) {
    this.settleExchangePopup = $event;
  }

  settle(tab) {
    if (tab == 0) {
      this.popupOpen = true;
      const dialogRef = this.dialog.open(SpecificationPopupDialog, {
        width: '330px',
        height: '240px',
        panelClass: 'specification-poppup'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.popupOpen = false;
        if (result == 'generated')
          this.otcSwapsComp.refreshGrid();
      });
    } else {
      this.popupOpen = true;
      const dialogRef = this.dialog.open(ExchangeSettleDialog, {
        width: '96vw',
        maxWidth: '96vw',
        height: '85vh',
        panelClass: ['movements-popup-grid', 'exchange-settle-popup']
      });

      dialogRef.afterClosed().subscribe(result => {
        this.popupOpen = false;
        if (result == 'created')
          this.exchangeSwapsComp.refreshGrid();
      });
    }
  }

  toggleCollapse() {
    this.isTabCollapsed = !this.isTabCollapsed;
  }

}
