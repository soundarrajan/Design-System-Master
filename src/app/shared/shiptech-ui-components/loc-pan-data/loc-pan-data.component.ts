import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local-service.service';
import { ApplicablecostpopupComponent } from 'src/app/shiptech-spot-negotiation/spot-negotiation-popups/applicablecostpopup/applicablecostpopup.component';

@Component({
  selector: 'app-loc-pan-data',
  templateUrl: './loc-pan-data.component.html',
  styleUrls: ['./loc-pan-data.component.css']
})
export class LocPanDataComponent implements OnInit {
  location1 = "location1";  
  showselectedETA:boolean = true;  
  ETASelectDate = new FormControl(new Date());
  selectedETATime:any;  
  ETASelectTime:any = "12:12";
  ETAdatetime = new FormControl(new Date());
  @Input() title:string;
  companyCode;
  showMaerskData: boolean;
  deliveryWindow;
  constructor(public dialog: MatDialog, public localService: LocalService) { }
  

  ngOnInit(): void {
    this.ETASelectDate.setValue(new Date('01/22/2022 10:10'));
    this.companyCode = this.localService.getcompayCode();
    if(this.companyCode=="maersk"){
      this.showMaerskData = true;
    }
    this.deliveryWindow = this.showMaerskData ? '23/01/2022 11:00 - 23/01/2022 15:00' : '18/06/2021 11:00 - 18/06/2021 15:00';
  }

  additionalcostpopup(){
    const dialogRef = this.dialog.open(ApplicablecostpopupComponent, {
      width: '1170px',
      height: 'auto',
      panelClass: 'additional-cost-popup',
      data:this.title
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ETAMenuClosed(event){
    this.showselectedETA = true;
    this.ETASelectDate=this.selectedETATime.date;
    this.ETASelectTime=this.selectedETATime.time;
  }

  ETASelected(){
  }

  doSomething(date: any):void {
    console.log('Picked date: ', date);
    this.selectedETATime = date;   
  }

}
