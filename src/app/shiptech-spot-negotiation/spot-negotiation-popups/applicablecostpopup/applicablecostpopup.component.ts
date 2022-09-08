import { Component, OnInit, Inject, ViewChild, ElementRef,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local-service.service';
@Component({
  selector: 'app-applicablecostpopup',
  templateUrl: './applicablecostpopup.component.html',
  styleUrls: ['./applicablecostpopup.component.css']
})
export class ApplicablecostpopupComponent implements OnInit {

  checked: boolean = false;
  checkAll: boolean = false;
  requestOptions = [
    {
      request : 'Req 12321', vessel: 'Merlion', selected: true
    },
    {
      request : 'Req 12322', vessel: 'Afif', selected: true
    }
  ];
  disableScrollDown = false;
  public showaddbtn=true;
  isShown: boolean = true;
  isShown2: boolean = true;
  isBtnActive: boolean = false;
  isButtonVisible=true;
  iscontentEditable=false;
  locationName ='';
  isMaersk=false;

  ngOnInit() { 
    this.locationName = this.dialogRef.componentInstance.data == 'SINGAPORE' ? 'Singapore' : this.dialogRef.componentInstance.data;
    this.isMaersk  = this.localService.getcompayCode()=="maersk";
    this.tabledataslocationlist = this.isMaersk ? [] : this.tabledataslocationlist;
  }
  
  constructor(public dialogRef: MatDialogRef<ApplicablecostpopupComponent>,    @Inject(MAT_DIALOG_DATA) public data: any, 
  private localService:LocalService) { }
   
  closeDialog() {
      this.dialogRef.close();  
  } 
      
    tabledatalocation=[{}];
    tabledataslocation1=[{}];
    tabledataslocationlist=[{
      costname:'Surveyor Fee',
      costtype:'Flat',
      maxqty:'1500  MT',
      price:'5000',
      extra:'5.5',
      extraamt:'5000',
      checked: false
    },
    { 
      costname:'Barge Fee',
      costtype:'Flat',
      maxqty:'1500  MT',
      price:'5000',
      extra:'5.5',
      extraamt:'5000',
      checked: false
    },
    {
      costname:'Test Fee',
      costtype:'Flat',
      maxqty:'1500  MT',
      price:'5000',
      extra:'5.5',
      extraamt:'5000',
      checked: false
    }]
  tabledatas2=[ ];
  newtabledata:any={}
  addNew(){
        this.tabledatas2.push(this.newtabledata)
        this.newtabledata = {};
  }
  delete(i){
    this.tabledatas2.splice(i,1);
  }
  delete2(j){
    this.tabledataslocation.splice(j,1);
  }
  delete3(j){
    this.tabledataslocationlist.splice(j,1);
  }
  toggleShow() {
    this.isShown = ! this.isShown;
    this.isShown2=! this.isShown2; 
  } 
    tabledataslocation=[ ];
    addNewlocationbasedcost(){
      this.tabledataslocation.push(this.newtabledata)
      this.newtabledata = {};    
    }

    setAll(checked: boolean) {
      this.checkAll = checked;
      this.tabledataslocationlist.forEach(t => (t.checked = checked));
      this.tabledataslocation.forEach(t => (t.checked = checked));
    }

    updateAll() {
      if(this.tabledataslocationlist.filter(t => t.checked).length > 0 || this.tabledataslocation.filter(t => t.checked).length > 0){
        this.checkAll = true;
      }else{
        this.checkAll = false;
      }
    }
}

