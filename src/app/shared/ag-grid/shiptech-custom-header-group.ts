import { DOCUMENT } from '@angular/common';
import {Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpotnegoOfferpricehistoryComponent } from 'src/app/shiptech-spot-negotiation/spot-negotiation-popups/spotnego-offerpricehistory/spotnego-offerpricehistory.component';
import { MarketpricehistorypopupComponent } from 'src/app/shiptech-spot-negotiation/spot-negotiation-popups/marketpricehistorypopup/marketpricehistorypopup.component';
import {AvailabletermcontractspopupComponent} from 'src/app/shiptech-spot-negotiation/spot-negotiation-popups/availabletermcontractspopup/availabletermcontractspopup.component';
@Component({
    selector: 'app-loading-overlay',
    template: `
    <div class="grid-header" *ngIf="params.type=='plain-header'">
    <div class="title">
    <span class="add-icon" (click)="setFocus()" matTooltip="Add counterparty in this location" matTooltipClass="lightTooltip" [matMenuTriggerFor]="clickmenu" #menuTrigger="matMenuTrigger"></span>
    <mat-menu  #clickmenu="matMenu" class="add-new-request-menu add-counterparties">
        <div class="expansion-popup" style="margin: 20px 0px;">
            <div class="select-product-container">
                <div class="col-md-12 header-container-product" (click)="$event.stopPropagation(); $event.preventDefault()">
                <div class="search-product-container col-md-10">
                    <span class="search-product-lookup">
                    </span>
                    <input matInput #inputBox
                        placeholder="Search and select counterparty"
                        class="search-product-input"
                        (input)="search($event.target.value)">
                        </div>
                <div class="col-md-2">
                    <span class="expand-img"></span>
                </div>
                </div>
                <table class="delivery-products-pop-up counterpartyList col-md-12 no-padding" mat-table (click)="$event.stopPropagation()" [dataSource]="counterpartyList">
                                                        
                    <ng-container matColumnDef="counterparty">
                        <th mat-header-cell *matHeaderCellDef> Counterparty </th>
                        <td mat-cell *matCellDef="let element"> 
                        <mat-option [value]="element">
                            <mat-checkbox class="single_column_label" [value]="element" [(ngModel)]="element.selected" matTooltipClass="lightTooltip"  matTooltip="{{element.counterparty}}">
                                {{element.counterparty}}
                            </mat-checkbox>
                        </mat-option>
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="blank">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let element">
                        </td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="counterpartyColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: counterpartyColumns;"></tr>
                </table>
                <div class="proceed-div">
                    <button mat-button class="mid-blue-button proceed-btn">Proceed</button>
                </div>
            </div>
            </div>
    </mat-menu>
        <div class="text">Counterparties</div>
        <div class="count">{{params.data}}</div>
    </div>
    <!--<div class="action">
        <div class="search"></div>
        <div class="menu"></div>
        <div class="filter"></div>
    </div>-->
    <div style="border-bottom: 3px solid #E0E1E4; margin: 10px -30px;"></div>
    <div class="d-flex justify-content-end align-items-center">
    <span style="margin-left: 10px;" class="counterpartytype-icon type-seller d-flex align-items-center"><i class="fas fa-circle"></i> <span class="text">Seller</span></span>
    <span style="margin-left: 10px;" class="counterpartytype-icon type-broker d-flex align-items-center"><i class="fas fa-circle"></i> <span class="text">Broker</span></span>
    <span style="margin-left: 10px;" class="counterpartytype-icon type-physicalsupplier d-flex align-items-center"><i class="fas fa-circle"></i> <span class="text">Physical Supplier</span></span>
    </div>
    </div>
    <div class="resize-grid-header" style="position: relative;" *ngIf="params.type=='single-bg-header'">
        <div class="border-line"></div>
        <div matTooltip="Total Offer" matTooltipClass="lightTooltip" class="options" style="padding-top: 5px;padding-bottom:10px; ">
          <div class="checkBox w-100" style="padding-top:0px;" >
              Total Offer
          </div>
        </div>
        <div class="label" matTooltip="No. of Products" matTooltipClass="lightTooltip">
            <div class="label-content" style="width:95%;">
                <div class="label-element w-100">
                  <div class="title">No. of Products</div>
                  <div class="value">{{params.data}}</div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="resize-grid-header" *ngIf="params.type=='bg-header'">
        <div class="options">
          <div class="checkBox" matTooltip={{params.data.name}} matTooltipClass="lightTooltip" style="padding: 4px !important;">
              {{params.data.name}}
              <!-- <mat-checkbox class="noborder" [checked]='true'>{{params.data.name}}</mat-checkbox> -->
          </div>
          <div class="optionsText">
            <div class="qty-tooltip">
                <div class="qty">
                  <span class="title">Qty:</span>
                  <span>
                      <span class="value">{{params.data.qty}}</span>
                      <span *ngIf="params.data.qtySuggestion" class="info-icon-amber m-l-3"></span>
                  </span>
                </div>
                <div class="hover-tooltip">
                    <span>Minimum Qty:<b>1000 MT</b></span>
                    <span>Maximum Qty:<b>1000 MT</b></span>
                    <span>Suggested Qty:<b>1000 MT</b></span>
                </div>
            </div>
            <div class="arrow" matTooltip="Market Price history" matTooltipClass="lightTooltip" (click)="pricinghistorypopup()">
              <span class="title">{{params.data.field}}</span>
              <span class="image"></span>
            </div>
            <div class="offer" matTooltip="Offer price history" matTooltipClass="lightTooltip" (click)="offerpricehistorypopup()">
              <span class="title">Offer</span>
              <span class="image"></span>
            </div>
          </div>
        </div>
        <div class="label">
            <div class="label-content">
                <div class="label-element" [matTooltip]= "!params.data.closureOutdated ? 'Price as on 14-Mar-2022: ' + params.data.closure : 'Price outdated. Last published on 11-March-2022'" 
                matTooltipClass="lightTooltip">
                  
                  <div class="title"><span *ngIf="params.data.closureOutdated" class="info-icon-amber"></span>Closure</div>
                  <div class="value" contenteditable="true"(keydown)="editQty($event)">{{params.data.closure}}</div>
                </div>
                <div class="label-element red">
                  <div class="title" matTooltip="Performance/Benchmark" matTooltipClass="lightTooltip">Perf/BM</div>
                  <div class="value" contenteditable="true"(keydown)="editQty($event)" matTooltip={{params.data.perf}} matTooltipClass="lightTooltip">{{params.data.perf}}</div>
                </div>
                <div class="label-element dashed">
                  <div class="title" matTooltip="Manual Live Pricing" matTooltipClass="lightTooltip">Man. price</div>
                  <div class="value" contenteditable="true"(keydown)="editQty($event)" matTooltip={{params.data.livePrice}} matTooltipClass="lightTooltip">{{params.data.livePrice}}</div>
                </div>
                <div class="label-element green">
                  <div class="title" matTooltip="Target" matTooltipClass="lightTooltip">Target</div>
                  <div class="value" contenteditable="true"(keydown)="editQty($event)" matTooltip={{params.data.target}} matTooltipClass="lightTooltip">{{params.data.target}}</div>
                </div>
                <div class="label-element bestcontract" (click)="availabletermcontractpopup()" >
                  <div class="title pointer" matTooltip="Best Contract" matTooltipClass="lightTooltip">
                    <span class="eye-icon" ></span>
                    Best Contract
                  </div>
                  <div class="value" contenteditable="true"(keydown)="editQty($event)" matTooltip={{params.data.bestContract}} matTooltipClass="lightTooltip">{{params.data.bestContract}}</div>
                </div>
            </div>
            <div class="resize-icon">
                <div class="img resizeIcons" [ngClass]="this.expandState"  (click)="expandOrCollapse(true)"></div>
            </div>
        </div>
    </div>
    `,
    styles: [
        `
        .customHeaderLabel{
            position: fixed;
            width: 100%;
        }
    `
    ]
})
export class ShiptechCustomHeaderGroup {
    @ViewChildren('resieIcon') resieIcons: ElementRef<HTMLInputElement>;
    @ViewChild('inputBox') _el: ElementRef;
    public params: any;
    selected = 'eur';
    selected1 = 'bbl';
    isExpand:boolean;
    public resizeIconss:any;
    public expandState: string;

    counterpartyColumns: string[] = ['counterparty','blank'];
    counterpartyList = [
      {'counterparty': 'Shell North America Division', 'selected': false},
      {'counterparty': 'Shell North America Division', 'selected': false},
      {'counterparty': 'Trefoil Oil and Sales', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation long nae to test ellipsis', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false},
      {'counterparty': 'Shell North America Corporation', 'selected': false}
    ];
    
    constructor(private el: ElementRef,@Inject(DOCUMENT) private _document: HTMLDocument, public dialog: MatDialog) {
    }
    agInit(params): void {
        this.params = params;
        this.params.columnGroup
         .getOriginalColumnGroup()
         .addEventListener('expandedChanged', this.syncExpandButtons.bind(this));
          this.syncExpandButtons();
    }
    
    expandOrCollapse(isExpanded) {
        
      let currentState = this.params.columnGroup
        .getOriginalColumnGroup()
        .isExpanded();
        let groupNames = ["grid1","grid2","grid3"];
        groupNames.forEach(groupId => {
        this.params.columnApi.setColumnGroupOpened(groupId, !currentState);
        });
        
        if(currentState)
        this.params.api.sizeColumnsToFit();
    }

    invokeParentMethod() {
      this.params.context.componentParent.resizeGrid();
    }

    syncExpandButtons() {
      if (this.params.columnGroup.getOriginalColumnGroup().isExpanded()) {
        this.expandState = 'expand';
      } else {
        this.expandState = '';
      }
    }

    offerpricehistorypopup(){
      const dialogRef = this.dialog.open(SpotnegoOfferpricehistoryComponent, {
        data: { tableData : this.params.data.offerPriceHistoryPopup, xPlotVal: this.params.data.offerPriceHistoryXaxis, yPlotVal: this.params.data.offerPriceHistoryYaxis,chartValues:this.params.data.offerPriceHistoryChartValues},       
        width: '500vw',
        height: '90vh',
        panelClass: 'additional-cost-popup'
      });
    
      dialogRef.afterClosed().subscribe(result => {
      });
  
    }

    pricinghistorypopup(){
      const dialogRef = this.dialog.open(MarketpricehistorypopupComponent, {
        data: { tableData : this.params.data.marketHistoryPopup, xPlotVal: this.params.data.marketHistoryXaxis, yPlotVal: this.params.data.marketHistoryYaxis },       
        width: '500vw',
        height: '90vh',
        panelClass: 'additional-cost-popup'
      });
    
      dialogRef.afterClosed().subscribe(result => {
      });
  
    }
    availabletermcontractpopup(){
      const dialogRef = this.dialog.open(AvailabletermcontractspopupComponent, {
        data:this.params.data.bestContractPopup,
        width: '90vw',
        maxWidth: '90vw',
        height: '180px',
        panelClass: 'additional-cost-popup'
      });
    
      dialogRef.afterClosed().subscribe(result => {
      });
    }
    editQty(e){
      if (e.keyCode == 37 || e.keyCode == 39){
       e.stopPropagation();
      }
      
    }

    setFocus(){
      this._el.nativeElement.focus();
    }
}
