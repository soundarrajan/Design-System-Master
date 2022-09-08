import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-related-journals',
  templateUrl: './related-journals.component.html',
  styleUrls: ['./related-journals.component.css']
})
export class RelatedJournalsComponent implements OnInit {

  public gridOptions_data: GridOptions;
  constructor() {
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
      rowHeight: 30,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
        this.gridOptions_data.api.sizeColumnsToFit();
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);

      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    }
  }

  ngOnInit(): void {
  }

  private columnDef_aggrid = [
    { headerName: 'Journal ID', headerTooltip: 'Journal ID', field: 'journal_id', type: "numericColumn", cellClass: ['aggridlink aggridtextalign-right'] },
    { headerName: 'Journal Date', headerTooltip: 'Journal Date', field: 'journal_date', cellClass: ['aggridtextalign-left'] },
    { headerName: 'Company', headerTooltip: 'Company', field: 'company', width: 300, cellClass: ['aggridtextalign-left'] },
    { headerName: 'Status', headerTooltip: 'Status', field: 'status', width: 250, headerClass: ['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Posted'?'custom-chip medium-green':
                      params.value==='Drafted'?'custom-chip medium-amber':
                      'custom-chip medium-green';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } },
    { headerName: 'Journal Type', headerTooltip: 'Journal Type', field: 'journal_type', cellClass: ['aggridtextalign-left'] },
    { headerName: 'Is Integrated', headerTooltip: 'Is Integrated', field: 'is_integrated', cellClass: ['aggridtextalign-left'] },
    { headerName: 'Reversal Journal ID', headerTooltip: 'Reversal Journal ID', field: 'rev_journal_id', type: "numericColumn", cellClass: ['aggridlink aggridtextalign-right'] },
  ];

  private rowData_aggrid = [

    {
      journal_id: '12345', journal_date: '10/03/2021', company: 'PDI North America', status: 'Posted', journal_type: 'Cost', is_integrated: 'No', rev_journal_id: '123456'
    },
    {
      journal_id: '12345', journal_date: '10/03/2021', company: 'PDI North America', status: 'Drafted', journal_type: 'Cost', is_integrated: 'No', rev_journal_id: '123456'
    },
    {
      journal_id: '12345', journal_date: '10/03/2021', company: 'PDI North America', status: 'Posted', journal_type: 'Cost', is_integrated: 'No', rev_journal_id: '123456'
    },
    {
      journal_id: '12345', journal_date: '10/03/2021', company: 'PDI North America', status: 'Posted', journal_type: 'Cost', is_integrated: 'No', rev_journal_id: '123456'
    },
  ];

  tabChange(){
    this.gridOptions_data.api.sizeColumnsToFit();
  }


}
