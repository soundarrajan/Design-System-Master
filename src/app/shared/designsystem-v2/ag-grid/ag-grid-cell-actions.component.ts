import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { OperationalAmountDialog } from "src/app/movements/popup-screens/operational-amount.component";
import { InventoryReportPopupComponent } from '../../../ops-inventory/popup-screens/inventory-report-popup/inventory-report-popup.component';
import { ChangeLogPopupComponent } from '../../dialog-popup/change-log-popup/change-log-popup.component';
@Component({
    selector: 'ag-grid-cell-renderer',
    template: `  
    <div *ngIf="params.type==='row-remove-icon'">
        <div class="remove-icon" (click)='deleteRow();'></div>
    </div>
    <div *ngIf="params.type==='row-remove-icon-with-checkbox'">
        <div class="remove-icon-with-checkbox" (click)='deleteRow();'></div>
    </div>
    <div *ngIf="params.type==='row-remove-icon-cell-hover'">
        <div class=" remove-icon-cell-hover" (click)='deleteRow();'></div>
    </div>
    <div *ngIf="params.type==='download'">
        <div class="download-icon"></div>
    </div>
    <div *ngIf="params.type==='radio-button-selection'">
        <mat-radio-button [checked]="params.value" class='grid-radio-btn'></mat-radio-button>
    </div>
    <div *ngIf="params.type==='checkbox-selection'">
        <mat-checkbox class='grid-checkbox'></mat-checkbox>
    </div>
    <div class="hover-popup-icon grid-popup" *ngIf="params.type==='grid-popup-icon'">
        <span>{{params.value}}</span>
        <div class="popup-icon" matTooltip="View Operational Calc." matTooltipShowDelay="200" (click)="openOperationalAmtPopup()"></div>
    </div>
    <div class="hover-popup-icon" *ngIf="params.type==='cell-with-popup-icon'">
        <div>{{params.value}}</div>
        <div class="popup-icon-inline" [ngClass]="{'popup-icon-active':popupOpen}" matTooltip="View Operational Calc." matTooltipShowDelay="200" (click)="openOperationalAmtPopup()"></div>
    </div>
    <div *ngIf="params.type==='view-link'">
        <span (click)="navigateTo($event)">View</span>
    </div>
    <div *ngIf="params.type==='edit-link'">
        <span (click)="navigateTo($event)">Edit</span>
    </div>
    <div *ngIf="params.type==='copy-link'">
        <span (click)="navigateTo($event)">Copy</span>
    </div>
    <div *ngIf="params.type==='delete-link'">
        <span (click)="navigateTo($event)">Delete</span>
    </div>
    <div *ngIf="params.type==='run-link'">
        <span [ngClass]="{'view-eye-icon' : params.value == 'View EOM', 'run-icon' : params.value == 'Run EOM'}"></span>
        <span (click)="navigateTo($event)">{{params.value}}</span>
    </div>
    <div *ngIf="params.type==='download-json-btn'">
        <button mat-raised-button class="blue-button h-25">Download JSON</button>
    </div>
    <div *ngIf="params.type==='view-figma-btn'">
    <button mat-raised-button class="blue-button h-25" (click)="viewFigma();">View Figma</button>
    </div>
    <div *ngIf="params.type==='change-logs-btn'">
    <button mat-raised-button class="blue-button h-25" (click)="changeLog();">Change Logs</button>
    </div>
    <div *ngIf="params.type==='cell-edit-sort-order'" style="margin-left: -55px;">
        <span class="sort-order-icon-disabled"></span>
        <span class="sort-order-icon"></span>
    </div>
    <div *ngIf="params.type=='revert'">
        <img  src="../../../assets/customicons/revert.svg" width="13" alt="Revert">
    </div>
    <div *ngIf="params.type=='actions'">
        <div class="action-icon-dark">
    </div>
    <div *ngIf="params.type==='border-cell'">
        <div class="border-cell">
          <span class="left-data">{{params.value}}</span>
          <span class="right-data">{{params.data.orderProduct}}</span>
        </div>
    </div>
    <div *ngIf="params.type==='dashed-border-darkcell'">
      <div class="dashed-border" style="">{{params.value}}</div>
    </div>
    <div *ngIf="params.type==='dashed-border-with-expand'">
      <span class="dashed-border with-expand">{{params.value}}</span>
      <span class="expand-arrow"></span>
    </div>
    <div *ngIf="params.type==='dashed-border-dark-search'" class="cell-bg-border">
        <div class="truncate-100p inner-cell dark" style="padding: 0 3px;">
            <span class="dashed-border with-search">
                {{params.value}}<span class="search-icon-dark"></span>
            </span>           
        </div>
    </div>
`
})

export class AGGridCellActionsComponent implements ICellRendererAngularComp {
    public params: any;
    public popupOpen: boolean;
    constructor(public router: Router, public dialog: MatDialog) {
    }

    agInit(params: any): void {
        this.params = params;
        // console.log(this.params);
        
    }

    refresh(): boolean {
        return false;
    }
    deleteRow() {
        let rowData = [];
        this.params.api.forEachNode(node => rowData.push(node.data));
        let index = this.params.node.rowIndex;
        let newData = [];
        newData = rowData.splice(index, 1);
        this.params.api.applyTransaction({ remove: newData });
        this.params.action();
    }

    openOperationalAmtPopup() {
        this.popupOpen = true;
        const dialogRef = this.dialog.open(OperationalAmountDialog, {
            width: '600px',
            maxHeight: '600px',
            panelClass: 'movements-popup-grid'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.popupOpen = false;
        });
    }

    navigateTo() {
        this.params.onClick(this.params);
    }
    
    viewFigma(e){
        var figmaLink = this.params.value;
        this.router.navigate([]).then(result => {  window.open(figmaLink, '_blank'); });
    }

    changeLog(){
        var changeLogsData = this.params.data.changeLogs;
        const dialogRef = this.dialog.open(ChangeLogPopupComponent, {      
            width: '100vw',
            height: '95vh',
            maxWidth:'95vw',
            panelClass: 'mov-report-popup',
            data: changeLogsData
          });
        
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }

}