import { Component, OnInit, Inject, ViewChild, ElementRef,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-availabletermcontractspopup',
  templateUrl: './availabletermcontractspopup.component.html',
  styleUrls: ['./availabletermcontractspopup.component.css']
})
export class AvailabletermcontractspopupComponent implements OnInit {
  companyCode;
  showMaerskData: boolean;
  tabledata;
  ngOnInit(): void {
    this.companyCode = this.localService.getcompayCode();
    if(this.companyCode=="maersk"){
        this.showMaerskData = true;
    }
    this.showTableData()
  }
  constructor(public dialogRef: MatDialogRef<AvailabletermcontractspopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private localService: LocalService) { }
   
  closeDialog() {
      this.dialogRef.close();   
  } 

  showTableData(){
    this.tabledata = this.data;
    // if(this.showMaerskData){
    //   this.tabledata = [
    //     {seller:'Chevron Singapore Pte', port:'Amstredam',contractname:'Chev - RMG Jan - Mar 22',contractproduct:'DMA 1.5%', formula:'PUAFT00 - 0.5', schedule:'Weekly average',contractqty:'30000 MT',liftedqty:'898.00 MT', availableqty:'30000 MT',price:'$ 500.00'},
    //     {seller:'Bunker One Ltd', port:'Amstredam',contractname:'Bunk - DOGO Nov - Mar 22',contractproduct:'DMA 1.5%', formula:'AAXYO00  - 1.2', schedule:'Weekly average',contractqty:'50000 MT',liftedqty:'898.00 MT', availableqty:'23000 MT',price:'$ 500.00'}
    //   ];
    // }else{
    //   this.tabledata = [ 
    //     {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Cambodia Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'100,000.00 MT',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$ 500.00'},
    //     {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Amstredam Contarct',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'5,000.00 MT',liftedqty:'898.00 MT', availableqty:'5,000.00 MT',price:'$ 520.00'}
    //   ];
    // }
  }

}
