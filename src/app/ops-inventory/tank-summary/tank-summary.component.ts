import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TankPopupComponent } from 'src/app/shared/dialog-popup/tank-popup/tank-popup.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-tank-summary',
  templateUrl: './tank-summary.component.html',
  styleUrls: ['./tank-summary.component.css']
})
export class TankSummaryComponent implements OnInit {
  public gridOptions_data: GridOptions;
  public selectedValues = [];
  public newData1:any;
  public disableExecute:boolean = true;
  menuOptions = [{ name: "Export Summary"}, { name: "Export Details"}]
  constructor(public dialog: MatDialog,iconRegistry: MatIconRegistry,sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'data-picker-gray',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-dark.svg'));
    iconRegistry.addSvgIcon(
      'data-picker-white',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-white.svg'));

      this.gridOptions_data = <GridOptions>{
        defaultColDef: {
          resizable: true,
          filtering: false,
          sortable: false
        },
        columnDefs: this.columnDef_aggrid,
        suppressRowClickSelection: true,
        suppressCellSelection: true,
        headerHeight: 35,
        rowHeight: 35,
        animateRows: false,
  
        onGridReady: (params) => {
          this.gridOptions_data.api = params.api;
          this.gridOptions_data.columnApi = params.columnApi;
          this.gridOptions_data.api.setRowData(this.rowData_aggrid);
          // setTimeout(function() {
          this.gridOptions_data.api.sizeColumnsToFit();
          
          // window.addEventListener('resize', function () {
          //   setTimeout(function () {
          //     this.gridOptions_data.api.sizeColumnsToFit();
          //   });
          // });
           //}, 500);
          //alert("");
         // this.addCustomHeaderEventListener();
         
         
  
        },
        onColumnResized: function (params) {
          if (params.columnApi.getAllDisplayedColumns().length <= 9 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
            //params.api.sizeColumnsToFit();
          }
        },
        onColumnVisible: function (params) {
          if (params.columnApi.getAllDisplayedColumns().length <= 9) {
           params.api.sizeColumnsToFit();
  
          }
        }
      }
  }

  ngOnInit(): void {
  }
  execute(){
    //console.log("ssssssssss");
    //console.log(this.columnDef_aggrid);
    //var newData = [];
    //var newData1 = any[];
    //console.log(this.selectedValues);
    //const start = Date.UTC(this.selectedValues[0].getFullYear(), this.selectedValues[0].getMonth(), this.selectedValues[0].getDate());
    //console.log(this.selectedValues[0].getFullYear());
    var startDate = this.selectedValues[0].getFullYear() + ','+this.selectedValues[0].getMonth()+ ','+this.selectedValues[0].getDate();
    var endDate = this.selectedValues[1].getFullYear() + ','+this.selectedValues[1].getMonth()+ ','+this.selectedValues[1].getDate();
    //console.log(startDate);
    //console.log(endDate);

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate:any = new Date(startDate);
    var secondDate:any = new Date(endDate);
    var diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    //alert(diffDays);

    var dataObj = { headerName: '30-Aug-2020', headerTooltip: '', headerClass:['aggrid-text-align-c'],field: '30-Aug-2020',
    cellRendererFramework:AGGridCellDataComponent,
    //cellClass: ['aggridtextalign-center product-cell'], 
    cellClass: function(params) { 
      var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center'); 
      if (params.node.rowIndex == 1)
      classArray.push('product-cell');
    else
      classArray.push('');
        return classArray.length>0?classArray:null } ,  
    cellRendererParams: {type:'movReport-popup'}
    };
    this.columnDef_aggrid.splice(1, 1);
    for(var i=0;i<=diffDays;i++){
    //this.selectedValues.forEach( (element) => {
    this.columnDef_aggrid.push(dataObj);
  }
    //console.log("dddd");
    //console.log(this.newData1);
    //this.gridOptions_data.api.setColumnDefs(this.newData1);
    this.gridOptions_data.api.setColumnDefs(this.columnDef_aggrid);
    this.gridOptions_data.api.sizeColumnsToFit();
  }

  dateSelected(e,index){
    this.selectedValues[index] = e.target.value;
    //console.log("ssss");
    //console.log(this.selectedValues);
    let myLength=this.selectedValues.reduce((acc,cv)=>(cv)?acc+1:acc,0);
    //this.selectedValues.push = e.target.value;
    //console.log(myLength);
    // console.log(myLength.length);
    if(myLength == 2 )
    this.disableExecute = false ;
  }
  openPopup(){
    const dialogRef = this.dialog.open(TankPopupComponent, {
      width: '926px',
      minHeight: '360px',
      maxHeight: '500px'
    });

    dialogRef.afterClosed().subscribe(result => { 
      console.log(`Dialog result: ${result}`);
    });
  }

  private columnDef_aggrid = [
    
   
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'movdate'},
    { headerName: '29-Aug-2020', headerTooltip: '', headerClass:['aggrid-text-align-c'],field: '29-Aug-2020',
    cellRendererFramework:AGGridCellDataComponent,
    //cellClass: ['aggridtextalign-center product-cell'], 
    cellClass: function(params) { 
      var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center'); 
      if (params.node.rowIndex == 1)
      classArray.push('product-cell aggridtextalign-center hoverdisable hover-cell-menu-icon');
    else
      classArray.push('');
        return classArray.length>0?classArray:null } ,  
    cellRendererParams: {type:'movReport-popup'}
  
  
  
  },
    
    
    
  ];
/*
  private colDefsIncluded=[
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'movdate'},
    { headerName: '29-Aug-2020', headerTooltip: '', headerClass:['aggrid-text-align-c'],field: '29-Aug-2020',
    cellRendererFramework:AGGridCellDataComponent,
    //cellClass: ['aggridtextalign-center product-cell'], 
    cellClass: function(params) { 
      var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center'); 
      if (params.node.rowIndex == 1)
      classArray.push('product-cell');
    else
      classArray.push('');
        return classArray.length>0?classArray:null } ,  
    cellRendererParams: {type:'movReport-popup'}
    },
    { headerName: '30-Aug-2020', headerTooltip: '', headerClass:['aggrid-text-align-c'],field: '30-Aug-2020',
    cellRendererFramework:AGGridCellDataComponent,
    //cellClass: ['aggridtextalign-center product-cell'], 
    cellClass: function(params) { 
      var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center'); 
      if (params.node.rowIndex == 1)
      classArray.push('product-cell');
    else
      classArray.push('');
        return classArray.length>0?classArray:null } ,  
    cellRendererParams: {type:'movReport-popup'}
    },

  ];

*/
  private rowData_aggrid = [

    {
      movdate: 'Day Opening Balance',  '29-Aug-2020': '5000','30-Aug-2020': '5000',
    },
    {
      movdate: 'In',   '29-Aug-2020': '3000','30-Aug-2020': '3000'
    },
    {
      movdate: 'Out',   '29-Aug-2020': '-5000','30-Aug-2020': '-5000'
    },
    {
      movdate: 'Transfer Out',   '29-Aug-2020': '-2000','30-Aug-2020': '-2000'
    },
    {
      movdate: 'Transfer In',   '29-Aug-2020': '0','30-Aug-2020': '0'
    },
    {
      movdate: 'Gain',   '29-Aug-2020': '20','30-Aug-2020': '20'
    },
    {
      movdate: 'Loss',  '29-Aug-2020': '0','30-Aug-2020': '0'
    },
    {
      movdate: 'Adj In',  '29-Aug-2020': '0','30-Aug-2020': '0'
    },
    {
      movdate: 'Adj Out',  '29-Aug-2020': '0','30-Aug-2020': '0'
    },
    {
      movdate: 'Day Closing Balance',  '29-Aug-2020': '1020','30-Aug-2020': '1020'
    }
  ]

}
