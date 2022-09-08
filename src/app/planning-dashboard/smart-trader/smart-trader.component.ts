import { Component, OnInit, EventEmitter, Output, } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-smart-trader',
  templateUrl: './smart-trader.component.html',
  styleUrls: ['./smart-trader.component.scss']
})
export class SmartTraderComponent implements OnInit {
  public gridOptions: GridOptions;
  public colResizeDefault;
  public actionsHeaderWidth;
  //public myRowClickedHandler;
  //resize = false;
  @Output() showTableViewEmit = new EventEmitter();
  constructor() { 
    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      enableColumnResizing: true,
      
      //pagination: true,
      // floatingFilter:true,
      //paginationPageSize: 6,
      rowHeight: 100,
      rowSelection: 'multiple',
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      // onGridSizeChanged: event => { 
      //   alert("sss");
      //   event.api.sizeColumnsToFit(); 
      // },
      onGridReady: (params) => {
        
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.columnApi.getColumnState(); 
          this.gridOptions.api.setRowData(this.rowData); 
          //this.resize = false;
          //this.gridOptions.api.addEventListener('onColumnResized', this.myRowClickedHandler);
        //   this.gridOptions.onColumnResized = (event) => {
        //     console.log('event via option 3: ' + event);
        // };         
      },
      // myRowClickedHandler:function(){
      //   console.log("xxxxxxxxxxxxxxxxxx");
      // },
      onColumnResized: function(params) {
        // console.log(params.columnApi.getColumn("reqstatus").getActualWidth());
        // if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
        //     params.api.sizeColumnsToFit();
        // }
        // this.actionsHeaderWidth = (params.columnApi.getColumn("reqstatus").getActualWidth() +
        // params.columnApi.getColumn("date").getActualWidth()+
        // params.columnApi.getColumn("comment").getActualWidth())
        // -3; 
        
        // console.log(this.actionsHeaderWidth);
        // if (params.type === 'columnResized' && params.finished === true) {
        // // this.gridOptions.api.sizeColumnsToFit();
        // }
      },
      // onColumnResized:(params) => {
      //   //this.gridOptions.api.addEventListener('onColumnResized', this.myRowClickedHandler);
      //   //suppressSizeToFit=true
      //   //console.log("ssss");
      //   //this.gridOptions.api.sizeColumnsToFit(); 
      //   //this.gridOptions.enableColResize = true;
      //   //this.gridOptions.columnApi.getColumnState(); 
      //   //this.gridOptions.columnApi.getColumnState(); 
      //   //params.api.sizeColumnsToFit();
      //   // var colWidth = document.getElementById('smart-trader-grid').clientWidth;
      //   // console.log(colWidth);
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   //this.resize = true;
      //   // if(this.resize){
      //    console.log("resizexxxxxxxx");
      //   // }
      //   //params.api.sizeColumnsToFit();
      // },
      // oncolumnMoved: () => {
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   console.log("resizess");
      // },
      // onGridColumnsChanged: () => {
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   console.log("resizess1");
      // },
      // onDisplayedColumnsChanged: () => {
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   //console.log("resizess2");
      // },
      // onExpandedChanged: () => {
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   console.log("resizess3");
      // },
      // onGridSizeChanged: () => {
      //   //this.gridOptions.api.sizeColumnsToFit();
      //   console.log("resizess3");
      // },    
      // ongridSizeChanged:(params) => {
      //   alert("ss");
      // }, 
      getRowClass:(params)=> {
        if (params.node.rowIndex % 2 === 0) {
            return '';
        }
        if(params.node.rowIndex === 2){
            return 'aggrid-notification';
        }
      },
      onColumnRowGroupChanged : this.groupChanged.bind(this)
    }; 
    this.colResizeDefault = "shift";
  }

  groupChanged(params){
    alert("sss");
    params.api.sizeColumnsToFit();
    this.gridOptions.api.sizeColumnsToFit(); 
  }

  ngOnInit() {
  }

  public removefloatingFilter(){
    console.log(this.gridOptions.floatingFilter);
    this.gridOptions.floatingFilter=false;
    console.log(this.gridOptions.floatingFilter);
  }

  private columnDefs = [
    { headerName: 'Vessel Information', headerTooltip:'Vessel Information', hide: false, headerClass:['aggrid-columgroup-splitter',''], 
      children: [
        { headerName: 'Name', headerTooltip:'Name', field: 'name', headerClass:['aggridtextalign-left text-ellipsis'],
        cellClass: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridlink aggrid-content-center');
            let newClass= params.data.status==='Confirmed'?'aggrid-left-ribbon lightblue':
                          params.data.status==='Unconfirmed'?'aggrid-left-ribbon lightred':
                          params.data.status==='Settled'?'aggrid-left-ribbon lightamber':
                          'aggrid-left-ribbon-red';
                          classArray.push(newClass);
            return classArray.length>0?classArray:null },cellRendererFramework:AGGridCellDataComponent,cellRendererParams:{style:'link'}
        },
        { headerName: 'Type', headerTooltip:'Type', field: 'type', cellClass:['aggrid-columgroup-splitter aggrid-content-center text-ellipsis'], headerClass:['aggrid-columgroup-splitter aggrid-content-center aggrid-text-align-c text-ellipsis'], cellRendererParams: {type:'checkbox'}},
    ]},
    { headerName: 'ROB', headerTooltip:'ROB',  headerClass:['aggrid-columgroup-splitter'],
      children: [
        { headerName: 'HSFO', headerTooltip:'HSFO', field: 'hsfo', width: 140, cellClass:['aggrid-content-center'],headerClass:['','aggrid-text-align-c']},
        { headerName: 'LSFO', headerTooltip:'LSFO', field: 'lsfo', width: 140, cellClass:['aggrid-content-center'],headerClass:['','aggrid-text-align-c'],
        // cellClass: function(params) { 
        //   var classArray:string[] =[]; 
        //     //classArray.push('aggridtextalign-left');
        //     let newClass= params.data.status==='Unconfirmed'?'aggrid-alertbox red':
        //                   params.data.status==='Settled'?'aggrid-alertbox amber':
        //                   params.data.status==='Confirmed'?'aggrid-alertbox':'aggrid-alertbox';
        //                   classArray.push(newClass);
        //     return classArray.length>0?classArray:null },
        cellRendererParams: function(params) { 
          console.log(params.data);
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.data.status==='Unconfirmed'?'aggrid-alertbox red':
                          params.data.status==='Settled'?'aggrid-alertbox amber': 'aggrid-alertbox';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }, 
         cellRendererFramework:AGGridCellRendererComponent
        },
        { headerName: 'DOGO', cellClass:["aggrid-columgroup-splitter",'aggrid-content-center'], headerTooltip:'DOGO', field: 'dogo',width: 140,
        cellRendererParams: function(params) { 
          //console.log(params.data);
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.data.status==='Unconfirmed'?'aggrid-alertbox red':
                          params.data.status==='Settled'?'aggrid-alertbox amber': 'aggrid-alertbox';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }, 
         cellRendererFramework:AGGridCellRendererComponent, 
        
        headerClass:['aggrid-columgroup-splitter','','aggrid-text-align-c'] },
    ]},
    { headerName: 'Voyage Information', headerTooltip:'Voyage Information', headerClass:['aggrid-columgroup-splitter'],
      children: [
        { headerName: 'Location', headerTooltip:'Location',cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'location', type:'staticlabel'},width: 300,
          valueGetter : function(params) { 
          return params.data.data[0].location;
        },
        // colSpan: function(params) {
        //   var location = params.data.data[1].location;
        //   console.log(location);
        //   if (location === "") {
        //     return 2;
        //   } else {
        //     return 1;
        //   }
        //} 
        cellClass:"aggrid-rowgroup location-cell aggridtextalign-left text-ellipsis",
        headerClass:['aggridtextalign-left pl80 text-ellipsis'],
        },
        { headerName: 'ETA', headerTooltip:'ETA',cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {label: 'eta', type:'etalabel'},headerClass:['aggrid-columgroup-thin-split aggridtextalign-left pl10 text-ellipsis'],
        cellClass:"aggrid-columgroup-thin-split aggrid-rowgroup aggridtextalign-left eta-cell text-ellipsis",width: 250,
        valueGetter : function(params) { 
          return params.data.data[0].eta;
        } },
        { headerName: 'Schedule', headerTooltip:'Schedule', headerClass:[' aggrid-text-align-c text-ellipsis'],field: 'schedule-img', cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'schedule-img'},width: 160,cellClass:['aggrid-content-center'],  
        },
        { headerName: 'Status', headerTooltip:'Status', field: 'state' , headerClass:[' aggrid-text-align-c aggrid-columgroup-splitter text-ellipsis min-width'], width: 160,
          cellClass: function(params) {
            let classes:string []=[];         
            
            classes.push("aggrid-columgroup-splitter min-width aggrid-content-center");
            return classes;
          }
        }
    ]},
    { headerName: 'Actions', headerTooltip:'Actions',
      children: [
        { headerName: 'Request Status', headerTooltip:'Request Stauts', field: 'reqstatus' ,cellRendererFramework:AGGridCellDataComponent,cellRendererParams:{style:'link'}, headerClass:['aggridtextalign-left text-ellipsis pl40'],
        cellClass: ['aggridtextalign-left text-ellipsis ellipsis-child pl40 aggrid-content-center'],width: 270
        },
        { headerName: 'Last Action', headerTooltip:'Last Action', field: 'date', cellEditor: "datePicker", cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {stylemode:'editable'},
        cellClass: ['date aggridtextalign-left text-ellipsis ellipsis-child aggrid-content-center'], headerClass:['aggridtextalign-left  aggrid-text-align-c text-ellipsis']
        },
        { headerName: 'Comments', cellClass:['aggrid-content-center','aggrid-columgroup-splitter'], headerTooltip:'Comments', cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'comments'},  },
    ]}
  ];

private rowData = [
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: 'Balboa', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Confirmed',name: 'Agnes', type: 'LR1', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '1110', date:'09-09-2018', state: 'BAL',comment:'3'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: '', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Unconfirmed',name: 'Ohio', type: 'Handy', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '12310', date:'09-09-2018', state: 'BAL',comment:'3'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: 'Balboa', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Settled',name: 'Agnes', type: 'LR1', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '110', date:'09-09-2018', state: 'BAL',comment:'0'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: 'Balboa', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Confirmed',name: 'Agnes', type: 'LR1', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '110', date:'09-09-2018', state: 'BAL',comment:'3'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: '', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Unconfirmed',name: 'Ohio', type: 'Handy', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '12310', date:'09-09-2018', state: 'BAL',comment:'3'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: 'Balboa', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Settled',name: 'Agnes', type: 'LR1', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '110', date:'09-09-2018', state: 'BAL',comment:'0'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: '', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Unconfirmed',name: 'Ohio', type: 'Handy', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '12310', date:'09-09-2018', state: 'BAL',comment:'3'
    
  
  },
  {  
    matchID:'001', data:[
      { destination: 'From', location: 'Charleston', eta:'2018-09-08 17:00 LT (UTC +8)'},
      { destination: 'Next', location: 'Balboa', eta:'2018-09-08 17:00 LT (UTC +8)'}
    ],
    status: 'Settled',name: 'Agnes', type: 'LR1', reqstatus: 'Stemmed', hsfo:'12310', lsfo: '12310', dogo: '110', date:'09-09-2018', state: 'BAL',comment:'0'
    
  
  },
  
];

}
