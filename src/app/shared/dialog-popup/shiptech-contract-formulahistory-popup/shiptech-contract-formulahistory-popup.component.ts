import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shiptech-contract-formulahistory-popup',
  templateUrl: './shiptech-contract-formulahistory-popup.component.html',
  styleUrls: ['./shiptech-contract-formulahistory-popup.component.css']
})
export class ShiptechContractFormulahistoryPopupComponent implements OnInit {

  public showaddbtn=true;
  isShown: boolean = true;
  isBtnActive: boolean = false;
  isButtonVisible=true;
  iscontentEditable=false;
  public switchTheme:boolean = false;
  public selectedFormulaTab='Pricing formula';
  public initialized;

  
  ngOnInit(): void {
  }
  constructor(public dialogRef: MatDialogRef<ShiptechContractFormulahistoryPopupComponent>,    @Inject(MAT_DIALOG_DATA) public data: any) { }
   
  closeDialog() {
      this.dialogRef.close();
  } 
  closeClick() {
    this.dialogRef.close();
  }
}
