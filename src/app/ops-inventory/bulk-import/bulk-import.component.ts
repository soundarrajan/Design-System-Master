import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellEditableComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-editable.component';

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.css']
})
export class BulkImportComponent implements OnInit {

 

  ngOnInit(): void {
    //alert("");
    // setTimeout(function() {
    //   this.gridOptions_data.api.sizeColumnsToFit();
    // }, 1000);
  }

  files: any[] = [];
  public doc_type;
  public filename;
  public fileuploaded: boolean = false;
  public isDisable:boolean = true;
  public isCollapsed: boolean = false;
  public rowCount: Number;
  // public enableFileUpload: boolean = false;
  // public enableDrag: boolean = false;
  // enableUpload(e) {
  //   //console.log(e.);
  //  this.doc_type = e.value;
  //  //(this.doc_type);
  //   this.enableFileUpload = true;
  //   this.enableDrag = true;
  // }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }



  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.filename = this.files[0].name;
      this.fileuploaded = true;
      this.isDisable = false;
      //this.uploadgrid.uploadDocument(this.files,this.doc_type);
    }

  }

  Import(){
    this.gridOptions_data.api.setRowData(this.rowData_aggrid);
    this.isCollapsed = !this.isCollapsed;
  }


  public gridOptions_data: GridOptions;
  
  constructor() {
    this.gridOptions_data = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
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
        this.gridOptions_data.api.setRowData([]);
        this.rowCount = this.gridOptions_data.api.getDisplayedRowCount();
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

  

  // addCustomHeaderEventListener() {
  //   let addButtonElement = document.getElementsByClassName('add-btn');
  //   addButtonElement[0].addEventListener('click', (event) => {
  //     this.gridOptions_data.api.applyTransaction({
  //       add: [{
  //         type: 'Flat', provider: 'Kinder Morgan', Row Number: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
  //       }]
  //     });
  //   });

  // }

  private columnDef_aggrid = [
    
   
    { headerName: 'Row Number', headerTooltip: 'Row Number', field: 'RowNumber',width: 150,cellClass: ['p-l-30'], headerClass: ['p-l-30']},
    { headerName: 'Futures ID', headerTooltip: 'Futures Id', field: 'FuturesId', width: 100},
    { headerName: 'Import Status', headerTooltip: 'Import Status', field: 'ImportStatus', width: 100,
    cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Success'?'custom-chip-type3 lightgreen':
                      params.value==='Failed'?'custom-chip-type3 amber':
                      'custom-chip-type3 dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    { headerName: 'Reason', headerTooltip: 'Reason', field: 'Reason', width: 400},
    
  ];

  private rowData_aggrid = [

    {
      RowNumber: '123',  ImportStatus: 'Success', FuturesId: 'PHB829348', Reason: '',
    },
    {
      RowNumber: '134',  ImportStatus: 'Failed', FuturesId: 'PHB829348', Reason: 'modified contract on 21-02-2021',
    },
    {
      RowNumber: '123',  ImportStatus: 'Success', FuturesId: 'PHB829348', Reason: '',
    },
    {
      RowNumber: '123',  ImportStatus: 'Success', FuturesId: 'PHB829348', Reason: '',
    },
    {
      RowNumber: '134',  ImportStatus: 'Failed', FuturesId: 'PHB829348', Reason: 'modified contract on 21-02-2021',
    },
    {
      RowNumber: '123',  ImportStatus: 'Success', FuturesId: 'PHB829348', Reason: '',
    }
  ]

  tabChange(){
    this.gridOptions_data.api.sizeColumnsToFit();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

