import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ship-tech-home-screen',
  templateUrl: './ship-tech-home-screen.component.html',
  styleUrls: ['./ship-tech-home-screen.component.scss']
})
export class ShipTechHomeScreenComponent implements OnInit {  

  public gridOptions: GridOptions;
  private columnDefs = [
    {headerName: 'Transaction Type', field: 'call_id'}, 
    {headerName: 'Transaction Type', field: 'port'}, 
    {headerName: 'Transaction Type', field: 'vessel'}, 
    {headerName: 'Transaction Type', field: 'survey_date'}, 
    {headerName: 'Transaction Type', field: 'survey_status'}, 
    {headerName: 'Transaction Type', field: 'oty_matched'}, 
    {headerName: 'Transaction Type', field: 'logbook_rob_qty_bd'}, 
    {headerName: 'Transaction Type', field: 'measured_rob_surveyor_qty_bd'}, 
    {headerName: 'Transaction Type', field: 'rob_before_diff_bd'}, 
    {headerName: 'Transaction Type', field: 'qty_uom_rob_before_diff_bd'}, 
    {headerName: 'Transaction Type', field: 'bdn_qty'}, 
    {headerName: 'Transaction Type', field: 'measured_delivered_qty'}, 
    {headerName: 'Transaction Type', field: 'delivered_qty'}, 
    {headerName: 'Transaction Type', field: 'qty_uom_delivered_qty'}, 
    {headerName: 'Transaction Type', field: 'logbook_rob_qty_ad'}, 
    {headerName: 'Transaction Type', field: 'measured_rob_surveyor_qty_ad'}, 
    {headerName: 'Transaction Type', field: 'rob_diff_ad'}, 
    {headerName: 'Transaction Type', field: 'qty_uom_rob_diff_ad'}, 
    {headerName: 'Transaction Type', field: 'logbook_sludge_rob_qty_bd'}, 
    {headerName: 'Transaction Type', field: 'measured_sludge_rob_surveyor_qty_bd'}, 
    {headerName: 'Transaction Type', field: 'rob_bd_diff'}, 
    {headerName: 'Transaction Type', field: 'discharged_qty'}, 
    {headerName: 'Transaction Type', field: 'qty_uom_discharged_qty'}, 
    {headerName: 'Transaction Type', field: 'comment'}, 
    {headerName: 'Transaction Type', field: 'verify_sludge_qty'}
  ];

  private rowData = [
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
    {
      call_id: 'BU97680132', port: 'ROTTERDAM', vessel: 'YANTIAN EXPRESS', survey_date:'13/Jul/2019', survey_status:'New', oty_matched:'Matched', logbook_rob_qty_bd:614.171, measured_rob_surveyor_qty_bd:614.171,
      rob_before_diff_bd:0, qty_uom_rob_before_diff_bd:'MT', bdn_qty:619.24, measured_delivered_qty:620.214, delivered_qty:0.974, qty_uom_delivered_qty:'MT', logbook_rob_qty_ad:614.171, measured_rob_surveyor_qty_ad:617.9,
      rob_diff_ad:3.729, qty_uom_rob_diff_ad:'MT', logbook_sludge_rob_qty_bd:40.56, measured_sludge_rob_surveyor_qty_bd:42.76, rob_bd_diff:2.2, discharged_qty:38.56, qty_uom_discharged_qty:'MT', comment:'', verify_sludge_qty:'yes'
    },
  ];


  constructor() {
    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true      
      },
      rowSelection: 'single',
      onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          // this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData);  
          // this.rowCount = this.gridOptions.api.getDisplayedRowCount();         
            
      },
      
    }; 
  }

  ngOnInit() {
    
  }

}
