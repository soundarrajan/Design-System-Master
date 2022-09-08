import { Component, OnInit, Inject } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'exchange-settle-dialog',
  template:
    `
        <div class="dialog-container">
  <div class="header">
    <div class="title">Draft Journals - Preview</div>
    <div class="header-btn">
      <button class="cancel-button" tabindex="-1" mat-button
        [mat-dialog-close]="true">Cancel</button>
      <button [mat-dialog-close]="true" [disabled]="!stopProgressBar" (click)="createEntries()" class="blue-button">Create Entries</button>
      <mat-divider [vertical]="true"></mat-divider>
      <span id="dialogCloseButton" class="close" (click)="closeDialog()"></span>
    </div>
  </div>
  <div class="draft-journal-table">
    <mat-progress-bar mode="indeterminate" *ngIf="!stopProgressBar"></mat-progress-bar>
    <table>
      <thead>
        <tr>
          <th class="s_no right-col">S.No</th>
          <th class="left-col">Swap ID</th>
          <th class="left-col">Product/Cost</th>
          <th class="right-col">GL Code</th>
          <th class="left-col desc">Description</th>
          <th class="right-col">Credit</th>
          <th class="right-col">Debit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="s_no right-col">1</td>
          <td class="left-col">SB-10239</td>
          <td class="left-col">Gasoline</td>
          <td class="right-col">12892231</td>
          <td class="left-col desc">Swap product gasoline-dr</td>
          <td class="right-col"></td>
          <td class="right-col">125000 USD</td>
        </tr>
        <tr>
          <td class="s_no right-col">2</td>
          <td class="left-col">SB-10239</td>
          <td class="left-col">Gasoline</td>
          <td class="right-col">12892231</td>
          <td class="left-col desc">Swap product gasoline-dr</td>
          <td class="right-col">125000 USD</td>
          <td class="right-col"></td>
        </tr>
        <tr>
          <td class="s_no right-col">3</td>
          <td class="left-col">SB-10239</td>
          <td class="left-col">Gasoline</td>
          <td class="right-col">12892231</td>
          <td class="left-col desc">Swap product gasoline-dr</td>
          <td class="right-col"></td>
          <td class="right-col">125000 USD</td>
        </tr>
        <tr>
          <td class="s_no right-col">4</td>
          <td class="left-col">SB-10239</td>
          <td class="left-col">Gasoline</td>
          <td class="right-col">12892231</td>
          <td class="left-col desc">Swap product gasoline-dr</td>
          <td class="right-col">125000 USD</td>
          <td class="right-col"></td>
        </tr>
        <tr>
          <td class="s_no right-col">5</td>
          <td class="left-col">SB-10239</td>
          <td class="left-col">Gasoline</td>
          <td class="right-col">12892231</td>
          <td class="left-col desc">Swap product gasoline-dr</td>
          <td class="right-col"></td>
          <td class="right-col">125000 USD</td>
        </tr>
        
        
      </tbody>
    </table>
  </div>
  <div *ngIf="stopProgressBar" class="no-records">No more rows to show</div>

  <!-- </mat-dialog-content> -->

  <!-- <mat-dialog-actions class="float-right">
    <button tabindex="-1" mat-button [mat-dialog-close]="true">Cancel</button>
    <button class="grey-button create-btn" disabled [disabled]="!stopProgressBar" (click)="createEntries()" [ngClass]="{'blue-button' : stopProgressBar}">Create Entries</button>
  </mat-dialog-actions> -->
</div>
    `,
})
export class ExchangeSettleDialog {

  stopProgressBar: boolean = false;

  ngOnInit() {
    const timeoutFunc = () => this.stopProgressBar = true;
    setTimeout(timeoutFunc.bind(this), 2000);
  }
  constructor(
    public dialogRef: MatDialogRef<ExchangeSettleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private toaster: ToastrService) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createEntries() {
    this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Journal entries generated successfully</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-green",
      timeOut: 2000
    });
    this.dialogRef.close('created');
  }

}