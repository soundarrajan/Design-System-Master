import { Component, OnInit, Inject, ViewChild, ElementRef,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LocalService } from 'src/app/services/local-service.service';
@Component({
  selector: 'app-spotnego-confirmorder',
  templateUrl: './spotnego-confirmorder.component.html',
  styleUrls: ['./spotnego-confirmorder.component.css']
})
export class SpotnegoConfirmorderComponent implements OnInit {

  selectedOrderType = "Individual";
  disableScrollDown = false
  public showaddbtn=true;
  isShown: boolean = true;
  isBtnActive: boolean = false;
  isButtonVisible=true;
  iscontentEditable=false;
  tableData;
  showMaerskData: boolean;
  ngOnInit(): void {
    let companyCode = this.localService.getcompayCode();
    if(companyCode=="maersk"){
        this.showMaerskData = true;
    }
    this.tableData = this.data;
  }
  
  constructor(public dialogRef: MatDialogRef<SpotnegoConfirmorderComponent>,    @Inject(MAT_DIALOG_DATA) public data: any, private localService:LocalService) { }
   
  closeDialog() {
      this.dialogRef.close();
  } 
      
  // tabledata=[ 
  //   {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Cambodia Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Con', schedule:'Average of 5 Days',contractqty:'10,000,.00',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$500.00'},
  //   {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Amstredam Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Con', schedule:'Average of 5 Days',contractqty:'10,000,.00',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$500.00'}
  // ];

}

