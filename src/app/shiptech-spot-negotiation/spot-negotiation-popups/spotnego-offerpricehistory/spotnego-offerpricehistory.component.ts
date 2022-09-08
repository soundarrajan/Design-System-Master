import { Component, OnInit, Inject, ViewChild, ElementRef,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Highcharts from "highcharts";
import { LocalService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-spotnego-offerpricehistory',
  templateUrl: './spotnego-offerpricehistory.component.html',
  styleUrls: ['./spotnego-offerpricehistory.component.css']
})
export class SpotnegoOfferpricehistoryComponent implements OnInit {
 
    highcharts = Highcharts;
    // chartOptions = {   
    //    chart: {
    //       height: 600,
    //       type: "spline"
    //    },
    //    title: {
    //       text: ""
    //    },
    //    xAxis:{
    //       lineWidth: 1,
    //       lineColor: '#364150',  
    //       //categories:["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
    //       categories:this.data.xPlotVal[0]
    //    },
    //    yAxis: {  
    //       tickPixelInterval: 1,       
    //       title:{
    //          text:""
    //       },
    //       gridLineWidth: 0,  
    //       lineWidth: 1,
    //       lineColor: '#364150',    
    //       plotLines: [{
    //         color: '#ED6161',
    //         width: 1,
    //         value: 515.5,
    //         label: {
    //           text: 'Target Price',
    //           align: 'right',
    //           x: -10,
    //           style: {
    //             color: '#333333',
    //             fontSize: '9px'
    //           }
    //         }
    //       }],
    //       min: 514.0,
    //       max: 521.0,
    //       plotBands: [{ 
    //         color: 'rgba(237,97,97,0.2)',
    //         from: 513.0,
    //         to: 515.5
    //       }],
    //    },
    //    series: [
    //     {
    //         name: 'Bominflot BV',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         //data: [520.2,519.0,518.6,'','']
    //         data:this.data.yPlotVal[0].name1
    //     },
    //     {
    //         name: 'BP Nederland BV',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         data: this.data.yPlotVal[1].name2
    //     },
    //     {
    //         name: 'Chemoil Europe BV',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         data: this.data.yPlotVal[2].name3
    //     },
    //     {
    //         name: 'Supplier 4',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         data: this.data.yPlotVal[3].name4
    //     },
    //     {
    //         name: 'Supplier 5',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         data: this.data.yPlotVal[4].name5
    //     },
    //     {
    //         name: 'Supplier 6',
    //         marker: {
    //           symbol: 'circle'
    //         },
    //         data: this.data.yPlotVal[5].name6
    //     }
       
    // ],
    // legend: {
    //   symbolWidth: 1,
    //   symbolPadding: 7,
    //   itemDistance: 20
    // },
    // responsive: {
    //   rules: [{
    //       condition: {
    //           maxWidth: 500,
    //           maxHeight: 300
    //       }
    //   }]
    // },
    // credits: {
    //   enabled: false
    // }
    // };
    chartOptions = {   
      chart: {
         height: 600,
         type: "spline"
      },
      title: {
         text: ""
      },
      xAxis:{
         lineWidth: 1,
         lineColor: '#364150',  
         //categories:["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
         categories:this.data.xPlotVal[0]
      },
      yAxis: {  
         tickPixelInterval: 1,       
         title:{
            text:""
         },
         gridLineWidth: 0,  
         lineWidth: 1,
         lineColor: '#364150',    
         plotLines: [{
           color: '#ED6161',
           width: 1,
           value: this.data.chartValues[0].value,
           label: {
             text: 'Target Price',
             align: 'right',
             x: -10,
             style: {
               color: '#333333',
               fontSize: '9px'
             }
           }
         }],
         min: this.data.chartValues[0].min,
         max: this.data.chartValues[0].max,
         plotBands: [{ 
           color: 'rgba(237,97,97,0.2)',
           from: this.data.chartValues[0].from,
           to: this.data.chartValues[0].to
         }],
      },
      series: [
       {
           name: this.data.tableData.graphData[0].name,
           marker: {
             symbol: 'circle'
           },
           //data: [520.2,519.0,518.6,'','']
           data:this.data.yPlotVal[0].name1
       },
       {
           name: this.data.tableData.graphData[1].name,
           marker: {
             symbol: 'circle'
           },
           data: this.data.yPlotVal[1].name2
       },
       {
           name: this.data.tableData.graphData[2].name,
           marker: {
             symbol: 'circle'
           },
           data: this.data.yPlotVal[2].name3
       },
       {
           name: this.data.tableData.graphData[3].name,
           marker: {
             symbol: 'circle'
           },
           data: this.data.yPlotVal[3].name4
       },
       {
           name: this.data.tableData.graphData[4].name,
           marker: {
             symbol: 'circle'
           },
           data: this.data.yPlotVal[4].name5
       },
       {
           name: this.data.tableData.graphData[5].name,
           marker: {
             symbol: 'circle'
           },
           data: this.data.yPlotVal[5].name6
       }
      
   ],
   legend: {
     symbolWidth: 1,
     symbolPadding: 7,
     itemDistance: 20
   },
   responsive: {
     rules: [{
         condition: {
             maxWidth: 500,
             maxHeight: 300
         }
     }]
   },
   credits: {
     enabled: false
   }
   };

  disableScrollDown = false
  public showaddbtn=true;
  isShown: boolean = true;
  isBtnActive: boolean = false;
  isButtonVisible=true;
  iscontentEditable=false;
  companyCode;
  showMaerskData: boolean;
  tabledata;
  ngOnInit() {
    this.companyCode = this.localService.getcompayCode();
    if(this.companyCode=="maersk"){
        this.showMaerskData = true;
    }
    this.showTableData();
    //console.log(this.data.chartValues);
   }
  
  constructor(public dialogRef: MatDialogRef<SpotnegoOfferpricehistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private localService: LocalService) { }
   
  closeDialog() {
      this.dialogRef.close();
  } 
      
  tabledatas2=[ ];
  newtabledata:any={}
  addNew(){
        this.tabledatas2.push(this.newtabledata)
        this.newtabledata = {};
  }
  delete(i){
    this.tabledatas2.splice(i,1);
  }
  toggleShow() {
    this.isShown = ! this.isShown;  
  }
  showTableData(){
    this.tabledata = this.data.tableData;
  }
  
}
