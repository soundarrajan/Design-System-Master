import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { LocalService } from 'src/app/services/local-service.service';
@Component({
  selector: 'app-marketpricehistorypopup',
  templateUrl: './marketpricehistorypopup.component.html',
  styleUrls: ['./marketpricehistorypopup.component.css']
})
export class MarketpricehistorypopupComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      height: 500,
      width: 700,
      spacingBottom: 100,
      spacingRight: 50,
      scrollablePlotArea: {
        minHeight: 500
      },
    },
    title: {
      text: ""
    },
    xAxis:{
      lineWidth: 1,
      lineColor: '#364150',  
      title:{
        text:""
      }, 
      categories: this.data.xPlotVal
      //categories:['16/01','15/01','14/01','13/01','12/01','11/01','10/01','09/01','08/01','07/01','06/01','05/01','04/01','03/01','02/01']
    },
    yAxis: {    
      gridLineWidth: 0,  
      lineWidth: 1,
      lineColor: '#364150',    
        title:{
          text:""
        },
        tickPixelInterval: 2 
    },
    series: [
      {
        showInLegend: false,             
        type: "line",
        data: this.data.yPlotVal
        //data: [484.00,484.00,484.00,478.00,475.00,462.00,464.00,492.00,492.00,492.00,455.00,454.00,473.00,452.00,451.00]
      }
    ],
    credits: {
      enabled: false
    }
  };
  companyCode;
  showMaerskData: boolean;
  tabledata = [];
  showGraph: boolean = false;
  ngOnInit(): void {
    this.companyCode = this.localService.getcompayCode();
    if(this.companyCode=="maersk"){
        this.showMaerskData = true;
    }
    this.showTableData();
  }
  constructor(public dialogRef: MatDialogRef<MarketpricehistorypopupComponent>,    @Inject(MAT_DIALOG_DATA) public data: any, private localService: LocalService) { }
   
  closeDialog() {
      this.dialogRef.close();  
  } 

  showTableData(){
    this.tabledata = this.data.tableData.graphData;
    /* if(this.showTableData){
      this.tabledata=[
        {date:'16-1-2021',price:'484.00'},{date:'15-1-2021',price:'484.00'},{date:'14-1-2021',price:'484.00'},{date:'13-1-2021',price:'478.00'},{date:'12-1-2021',price:'475.00'},{date:'11-1-2021',price:'462.00'},{date:'10-1-2021',price:'464.00'},{date:'9-1-2021',price:'492.00'},{date:'8-1-2021',price:'492.00'},{date:'7-1-2021',price:'492.00'},{date:'6-1-2021',price:'455.00'},{date:'5-1-2021',price:'454.00'},{date:'4-1-2021',price:'473.00'},{date:'3-1-2021',price:'452.00'},{date:'2-1-2021',price:'451.00'}
      ];
    }else{
      this.tabledata=[
        {date:'19-5-2021',price:'560.00'},{date:'18-5-2021',price:'560.01'},{date:'17-5-2021',price:'560.11'},{date:'16-5-2021',price:'560.11'},{date:'15-5-2021',price:'550.11'},{date:'14-5-2021',price:'550.11'},{date:'13-5-2021',price:'550.11'},{date:'12-5-2021',price:'550.19'},{date:'11-5-2021',price:'550.19'},{date:'10-5-2021',price:'550.19'},{date:'9-5-2021',price:'550.19'},{date:'8-5-2021',price:'550.19'},{date:'7-5-2021',price:'550.19'},{date:'6-5-2021',price:'550.31'},{date:'5-5-2021',price:'550.31'},{date:'4-5-2021',price:'550.31'}
      ];
    } */
  }
}
