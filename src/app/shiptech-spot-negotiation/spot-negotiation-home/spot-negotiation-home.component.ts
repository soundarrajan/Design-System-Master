import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AgGridDatetimePickerToggleComponent } from 'src/app/shared/ag-grid/ag-grid-datetimePicker-Toggle';
import { SpotnegoConfirmorderComponent } from '../spot-negotiation-popups/spotnego-confirmorder/spotnego-confirmorder.component';
import { SpotnegoSendRfqComponent } from '../spot-negotiation-popups/spotnego-send-rfq/spotnego-send-rfq.component';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/app/services/local-service.service';
@Component({
  selector: 'app-spot-negotiation-home',
  templateUrl: './spot-negotiation-home.component.html',
  styleUrls: ['./spot-negotiation-home.component.css']
})
export class SpotNegotiationHomeComponent implements OnInit {
  navigationItems: any[];
  menuItems: any[];
  showNoQuote: boolean;
  today = new FormControl(new Date());
  public tab1:boolean;
  public tab2:boolean;
  public tab3:boolean;
  public tab4:boolean;
  public expand_quoteDate:boolean = true;
  requestOptions = [
    {
      request : 'Req 12321', vessel: 'Merlion', selected: true
    },
    {
      request : 'Req 12322', vessel: 'Afif', selected: true
    }
  ];
  companyName;
  showMaerskData: boolean;
  confirmButton;
  @ViewChild(AgGridDatetimePickerToggleComponent) child:AgGridDatetimePickerToggleComponent;

  constructor(public dialog: MatDialog, private toaster: ToastrService, private Activatedroute:ActivatedRoute,private localService:LocalService) { }

  ngOnInit(): void {
    // Get the route params if any  
    // http://localhost:4200/shiptech/spotnegotiation/maersk
    this.Activatedroute.paramMap
          .subscribe(params => { this.companyName =  params.get('companyName')||0;     
    });
    this.localService.setcompayCode(this.companyName);
    if(this.companyName == 'maersk'){
      this.showMaerskData = true;
    }
    this.confirmButton = this.showMaerskData ? 'Confirm Offer' : 'Confirm Order';
    this.localService.noQuoteChange.subscribe(data => {
      this.showNoQuote  = data;
    }) 
  }
 
  confirmorderpopup(){
    let popupData={info:{location:"Rotterdam",req:"Request 12321 - Al Mashrab"},
    individualOrderData:[ 
      {orderType:"Individual",location:"Rotterdam",seller:'Bominflot BV', offerProd:"RMG 380 0.5%",port:'Amstredam',minQty:"500.00 MT",maxQty:"500.00 MT",confirmedQty:"500.00 MT",price:'$560.19',total:"$125,000",supplier:"Bominflot BV"},
      {orderType:"Individual",location:"Rotterdam",seller:'Bominflot BV', offerProd:"RMG 380 0.5%",port:'Amstredam',minQty:"500.00 MT",maxQty:"500.00 MT",confirmedQty:"500.00 MT",price:'$560.19',total:"$125,000",supplier:"Bominflot BV"}
    ],
    consolidatedOrderData:[ 
      {orderType:"Individual",location:"Rotterdam",seller:'Bominflot BV', offerProd:"RMG 380 0.5%",port:'Amstredam',minQty:"500.00 MT",maxQty:"500.00 MT",confirmedQty:"500.00 MT",price:'$560.19',total:"$125,000",supplier:"Bominflot BV"},
      {orderType:"Consolidated",location:"Rotterdam",seller:'BP Nederland BV', offerProd:"MDO 180",port:'Amstredam',minQty:"100.00 MT",maxQty:"240.00 MT",confirmedQty:"80.00 MT",price:'$985.00',total:"$125,000",supplier:"BP Nederland BV"},
      {orderType:"Individual",location:"Rotterdam",seller:'Bominflot BV', offerProd:"RMG 380 0.5%",port:'Amstredam',minQty:"500.00 MT",maxQty:"500.00 MT",confirmedQty:"500.00 MT",price:'$560.19',total:"$125,000",supplier:"Bominflot BV"}
    ]};
    let popupDataMaersk={info:{location:"Singapore",req:"Req 12321 - Merlion"},data:[ 
      {location:"Singapore",seller:'BP Singapore PTE Limited', offerProd:"RMG 380 3.5%",port:'Amstredam',minQty:"500",maxQty:"500",confirmedQty:"500",price:'$483',total:"$242,100",supplier:"BP Singapore PTE Limited"},
      {location:"Singapore",seller:'BP Singapore PTE Limited', offerProd:"DMA 0.1%",port:'Amstredam',minQty:"300",maxQty:"300",confirmedQty:"300",price:'$753',total:"$226,050",supplier:"BP Singapore PTE Limited"}
    ]
      
    }
    const dialogRef = this.dialog.open(SpotnegoConfirmorderComponent, {
      data:this.showMaerskData?popupDataMaersk:popupData,

      width: '1045px',
      maxHeight: '555px',
      panelClass: 'additional-cost-popup'
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  sendRFQpopup(){

    const dialogRef = this.dialog.open(SpotnegoSendRfqComponent, {
      width: '600px',
      height: '340px',
      panelClass: 'additional-cost-popup'
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  dateTimePicker(e){
    e.stopPropagation();
    this.child.pickerOpen();
  }

  displaySuccessMsg(){
    this.toaster.show('<div class="message cust-msg">Successfully Duplicated to:</div><div class="requests"><span class="circle internal"></span><span class="label">Req 12322 - Afif</span><span class="circle external"></span><span class="label">Req 12323 - Al Mashrab</span></div>',
    '' , {
             enableHtml: true,
             toastClass: "toast-alert cust-alert toast-darkGrey",
             timeOut: 2000
         });
  }
  onSubTabChange(tabs,tabIndex){
    //alert(tabIndex);
        if(tabIndex == 0){
        this.tab1 = true;
        this.tab2 = false;
        this.tab3 = false;
        this.tab4 = false;
        }else if(tabIndex == 1){
        this.tab1 = false;
        this.tab2 = true;
        this.tab3 = false;
        this.tab4 = false;
        }else if(tabIndex == 2){
        this.tab1 = false;
        this.tab2 = false;
        this.tab3 = true;
        this.tab4 = false;
        }else {
          this.tab1 = false;
          this.tab2 = false;
          this.tab3 = false;
          this.tab4 = true;
        }
  }

}
