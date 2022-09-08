import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { LocalService } from 'src/app/services/local-service.service';
import { ShiptechCustomHeaderGroup } from 'src/app/shared/ag-grid/shiptech-custom-header-group';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';
import { MatCheckboxHeaderComponent } from 'src/app/shared/ag-grid/mat-checkbox-header.component';

@Component({
  selector: 'app-spot-negotiation-details',
  templateUrl: './spot-negotiation-details.component.html',
  styleUrls: ['./spot-negotiation-details.component.css']
})
export class SpotNegotiationDetailsComponent implements OnInit {
  @ViewChild('inputSection') inputSection: ElementRef;
  today = new FormControl(new Date());
  @Input() requests;
  @Input() selectedRequestIndex;
  @Input() searchCounterparty;
  @Input() calculateBestPrice = false;
  locations = [];
  public ETASelect: any;
  public gridOptions_counterparty: GridOptions;
  public gridOptions_details: GridOptions;
  public rowSelection;
  public rowCount: Number;
  public counterpartyHeaderWidth;
  public expandGridHeaderWidth;
  public totalOfferHeaderWidth;
  public fullHeaderWidth;
  public frameworkComponents;
  private context: any;
  public portIndex:number=0;
  rowData_aggrid = [];
  public grid1Width = {
    width: '100%'
  }
  //companyCode;
  menuOptions = [{ label: 'ETA' }, { label: 'ETB' }, { label: 'ETD' }];
  public noQuote = false;
  companyCode;
  products=[
    {
      id:1,
      name:"RMG 380",
      mailStatus: "not-sent",
      qty:"600/800 MT",
      closure:"$559.00",
      closureOutdated:true,
      qtySuggestion: false,
      perf:"$559.00",
      livePrice:"$559.00",
      target:"$559.00",
      bestContract:"$559.00",
      field:"ICE Brent",
      bestContractPopup:
      {
        info:{location:"Rotterdam",product:"RMG380 0.1%"},
        gridData: [ 
          {contractid: '1000',seller:'Total Marine Fuel', port:'Amstredam',contractname:'Cambodia Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'100,000.00 MT',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$ 500.00'},
          {contractid: '1001',seller:'Total Marine Fuel', port:'Amstredam',contractname:'Amstredam Contarct',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'5,000.00 MT',liftedqty:'898.00 MT', availableqty:'5,000.00 MT',price:'$ 520.00'}
        ]
      },
      marketHistoryPopup:{
        info:{
          index:"Marine Fuel 0.5% Bunker Dlvd Rotterdam",
          location:"Rotterdam",
          product:"RMG380 0.1%"
        },
        graphData:       [
          {date:'19-5-2021',price:'560.00'},{date:'18-5-2021',price:'560.01'},{date:'17-5-2021',price:'560.11'},{date:'16-5-2021',price:'560.11'},{date:'15-5-2021',price:'550.11'},{date:'14-5-2021',price:'550.11'},{date:'13-5-2021',price:'550.11'},{date:'12-5-2021',price:'550.19'},{date:'11-5-2021',price:'550.19'},{date:'10-5-2021',price:'550.19'},{date:'9-5-2021',price:'550.19'},{date:'8-5-2021',price:'550.19'},{date:'7-5-2021',price:'550.19'},{date:'6-5-2021',price:'550.31'},{date:'5-5-2021',price:'550.31'},{date:'4-5-2021',price:'550.31'}
        ]
      },
      marketHistoryXaxis: ['20/5','21/05','24/05','25/05','26/05','27/05','02/06','03/06','05/06','07/06','08/06'],
      marketHistoryYaxis: [476.00,473.00,482.00,485.00,485.00,487.00,492.00,496.00,502.00,506.00,518.00],
      offerPriceHistoryPopup:{
      info:{
        location:"Rotterdam",
        product:"RMG380 0.1%"
      },
      graphData:
      [
        {name: 'Bominflot BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'BP Nederland BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Chemoil Europe BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 4', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 5', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 6', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
      ]},
      offerPriceHistoryXaxis:[
        ["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
      ],
      offerPriceHistoryYaxis:[
        {'name1':[520.2,519.0,518.6,'','']},
        {'name2':[518.5,517.0,516.8,516.0,'']},
        {'name3':[519.7,518.0,519.0,'','']},
        {'name4':[519.9,518.0,517.5,517.0,'']},
        {'name5':[520.5,518.0,515.2,'','']},
        {'name6':[519.1,518.7,517.0,516.8,'']}
        ],
        offerPriceHistoryChartValues:[
            {value:'515.5',min:'514.0',max:'521.0',from:'513.0',to:'515.5'}
        ]
    },
    {
      id:2,
      name:"RMK 700",
      mailStatus: "not-sent",
      qty:"600/800 MT",
      closure:"$559.00",
      closureOutdated:false,
      qtySuggestion: false,
      perf:"$559.00",
      livePrice:"$559.00",
      target:"$559.00",
      bestContract:"$559.00",
      field:"ICE Brent",
      bestContractPopup:{
        info:{location:"Rotterdam",product:"RMG380 0.1%"},
        gridData: [ 
          {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Cambodia Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'100,000.00 MT',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$ 500.00'},
          {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Amstredam Contarct',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'5,000.00 MT',liftedqty:'898.00 MT', availableqty:'5,000.00 MT',price:'$ 520.00'}
        ]
      },
      marketHistoryPopup: {
        info:{
          index:"Marine Fuel 0.5% Bunker Dlvd Rotterdam",
          location:"Rotterdam",
          product:"RMG380 0.1%"
        },
        graphData:       [
          {date:'19-5-2021',price:'560.00'},{date:'18-5-2021',price:'560.01'},{date:'17-5-2021',price:'560.11'},{date:'16-5-2021',price:'560.11'},{date:'15-5-2021',price:'550.11'},{date:'14-5-2021',price:'550.11'},{date:'13-5-2021',price:'550.11'},{date:'12-5-2021',price:'550.19'},{date:'11-5-2021',price:'550.19'},{date:'10-5-2021',price:'550.19'},{date:'9-5-2021',price:'550.19'},{date:'8-5-2021',price:'550.19'},{date:'7-5-2021',price:'550.19'},{date:'6-5-2021',price:'550.31'},{date:'5-5-2021',price:'550.31'},{date:'4-5-2021',price:'550.31'}
        ]
      },
      marketHistoryXaxis: ['20/5','21/05','24/05','25/05','26/05','27/05','02/06','03/06','05/06','07/06','08/06'],
      marketHistoryYaxis: [476.00,473.00,482.00,485.00,485.00,487.00,492.00,496.00,502.00,506.00,518.00],
      offerPriceHistoryPopup:{
      info:{
        location:"Rotterdam",
        product:"RMG380 0.1%"
      },
      graphData:
      [
        {name: 'Bominflot BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'BP Nederland BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Chemoil Europe BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 4', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 5', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 6', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
      ]},
      offerPriceHistoryXaxis:[
        ["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
      ],
      offerPriceHistoryYaxis:[
        {'name1':[520.2,519.0,518.6,'','']},
        {'name2':[518.5,517.0,516.8,516.0,'']},
        {'name3':[519.7,518.0,519.0,'','']},
        {'name4':[519.9,518.0,517.5,517.0,'']},
        {'name5':[520.5,518.0,515.2,'','']},
        {'name6':[519.1,518.7,517.0,516.8,'']}
        ],
        offerPriceHistoryChartValues:[
            {value:'515.5',min:'514.0',max:'521.0',from:'513.0',to:'515.5'}
        ]
      
    },
    {
      id:3,
      name:"DMA 0.1%",
      mailStatus: "not-sent",
      qty:"600/800 MT",
      closure:"$559.00",
      closureOutdated:false,
      qtySuggestion: true,
      perf:"$559.00",
      livePrice:"$559.00",
      target:"$559.00",
      bestContract:"$559.00",
      field:"ICE Brent",
      bestContractPopup:{
        info:{location:"Rotterdam",product:"RMG380 0.1%"},
        gridData: [ 
          {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Cambodia Contarct 2021',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'100,000.00 MT',liftedqty:'898.00 MT', availableqty:'96,602.00 MT',price:'$ 500.00'},
          {seller:'Total Marine Fuel', port:'Amstredam',contractname:'Amstredam Contarct',contractproduct:'DMA 1.5%', formula:'Cambodia Contracts formula description type here in this box..', schedule:'Average of 5 Days',contractqty:'5,000.00 MT',liftedqty:'898.00 MT', availableqty:'5,000.00 MT',price:'$ 520.00'}
        ]
      },
      marketHistoryPopup: {
        info:{
          index:"Marine Fuel 0.5% Bunker Dlvd Rotterdam",
          location:"Rotterdam",
          product:"RMG380 0.1%"
        },
        graphData:       [
          {date:'19-5-2021',price:'560.00'},{date:'18-5-2021',price:'560.01'},{date:'17-5-2021',price:'560.11'},{date:'16-5-2021',price:'560.11'},{date:'15-5-2021',price:'550.11'},{date:'14-5-2021',price:'550.11'},{date:'13-5-2021',price:'550.11'},{date:'12-5-2021',price:'550.19'},{date:'11-5-2021',price:'550.19'},{date:'10-5-2021',price:'550.19'},{date:'9-5-2021',price:'550.19'},{date:'8-5-2021',price:'550.19'},{date:'7-5-2021',price:'550.19'},{date:'6-5-2021',price:'550.31'},{date:'5-5-2021',price:'550.31'},{date:'4-5-2021',price:'550.31'}
        ]
      },
      marketHistoryXaxis: ['20/5','21/05','24/05','25/05','26/05','27/05','02/06','03/06','05/06','07/06','08/06'],
      marketHistoryYaxis: [476.00,473.00,482.00,485.00,485.00,487.00,492.00,496.00,502.00,506.00,518.00],
      offerPriceHistoryPopup:{
      info:{
        location:"Rotterdam",
        product:"RMG380 0.1%"
      },
      graphData:
      [
        {name: 'Bominflot BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'BP Nederland BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Chemoil Europe BV', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 4', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 5', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 6', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
        {name: 'Supplier 7', diff: '$ 1.50', curroff: '$ 515.70', pastoffer: '$ 517.20', off3: '$ 519.20', off4: '$ 520.20', off5: '', off6: '' },
      ]
    },
      offerPriceHistoryXaxis:[
        ["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
      ],
      offerPriceHistoryYaxis:[
      {'name1':[520.2,519.0,518.6,'','']},
      {'name2':[518.5,517.0,516.8,516.0,'']},
      {'name3':[519.7,518.0,519.0,'','']},
      {'name4':[519.9,518.0,517.5,517.0,'']},
      {'name5':[520.5,518.0,515.2,'','']},
      {'name6':[519.1,518.7,517.0,516.8,'']}
      ],
      offerPriceHistoryChartValues:[
          {value:'515.5',min:'514.0',max:'521.0',from:'513.0',to:'515.5'}
        ]
    }
  ]
  products_maersk = [
    {
      id:1,
      name:"RMG 380 3.5%",
      mailStatus: "not-sent",
      qty:"500/500 MT",
      closure:"$484.00",
      closureOutdated:true,
      qtySuggestion: false,
      perf:"$0.5",
      livePrice:"$485.00",
      target:"$484.50",
      bestContract:"$487.00",
      field:"PUAFT00",
      bestContractPopup:{
        info:{location:"Singapore",product:"RMG 380 3.5%"},
        gridData:      [
          {seller:'Chevron Singapore Pte', port:'Amstredam',contractname:'Chev - RMG Jan - Mar 22',contractproduct:'DMA 1.5%', formula:'PUAFT00 - 0.5', schedule:'Weekly average',contractqty:'30000 MT',liftedqty:'898.00 MT', availableqty:'30000 MT',price:'$ 500.00'},
        ]
      },
      marketHistoryPopup: {
        info:{
          index:"Bunker FO 380 CST Dlvd Singapore",
          location:"Singapore",
          product:"PUAFT00"
        },
        graphData:[
          {date:'16-1-2022',price:'484.00'},{date:'15-1-2022',price:'484.00'},{date:'14-1-2022',price:'484.00'},{date:'13-1-2022',price:'478.00'},{date:'12-1-2022',price:'475.00'},{date:'11-1-2022',price:'462.00'},{date:'10-1-2022',price:'464.00'},{date:'9-1-2022',price:'492.00'},{date:'8-1-2022',price:'492.00'},{date:'7-1-2022',price:'492.00'},{date:'6-1-2022',price:'455.00'},{date:'5-1-2022',price:'454.00'},{date:'4-1-2022',price:'473.00'},{date:'3-1-2022',price:'452.00'},{date:'2-1-2022',price:'451.00'}        
        ]
      },
      marketHistoryXaxis: ['16/01','15/01','14/01','13/01','12/01','11/01','10/01','09/01','08/01','07/01','06/01','05/01','04/01','03/01','02/01'],
      marketHistoryYaxis: [484.00,484.00,484.00,478.00,475.00,462.00,464.00,492.00,492.00,492.00,455.00,454.00,473.00,452.00,451.00],
      offerPriceHistoryPopup:{
      info:{
        location:"Singapore",
        product:"RMG 380 3.5%"
      },
      graphData:[
        {name: 'Total Marine', diff: ' $ 0', curroff: '$ 484.75', pastoffer: '$ 484.75', off3: '', off4: '', off5: '', off6: '' },
        {name: 'Trafigura Pte', diff: '$ 1', curroff: '$ 484', pastoffer: '$ 484.75', off3: '$ 485', off4: '', off5: '', off6: '' },
        {name: 'Shell Eastern Trading', diff: '$ 0.25', curroff: '$ 484.5', pastoffer: '$ 484.75', off3: '', off4: '', off5: '', off6: '' },
        {name: 'Exxonmobil Marine Fuels', diff: '$ 0.5', curroff: '$ 484.5', pastoffer: '$ 485', off3: '', off4: '', off5: '', off6: '' },
        {name: 'Minerva Bunkering Pte Ltd', diff: '$ 0.95', curroff: '$ 483.75', pastoffer: '$ 484', off3: '$ 484.5', off4: '$ 484.7', off5: '', off6: '' },
        {name: 'BP Singapore PTE Limited', diff: '$ 1', curroff: '$ 483', pastoffer: '$ 484.5', off3: '$ 484', off4: '', off5: '', off6: '' },
     ]
    },
      offerPriceHistoryXaxis:[
        ["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
      ],
      offerPriceHistoryYaxis:[
      {'name1':[484.75,484.75,'','','']},
      {'name2':[484,484.75,485,'','']},
      {'name3':[484.5,484.75,'','','']},
      {'name4':[484.5,485,'','','']},
      {'name5':[483.75,484,484.5,484.7,'']},
      {'name6':[483,484.5,484,'','']}
      ],
      offerPriceHistoryChartValues:[
        {value:'483.0',min:'482.0',max:'486.0',from:'480.0',to:'483.0'}
      ]
    },
    {
      id:2,
      name:"DMA 0.1%",
      mailStatus: "not-sent",
      qty:"300/300 MT",
      closure:"$754.00",
      closureOutdated:false,
      qtySuggestion: true,
      perf:"$0.7",
      livePrice:"$756.00",
      target:"$755.30",
      bestContract:"$757.90",
      field:"AAXYO00",
      bestContractPopup:
      {
        info:{location:"Singapore",product:"DMA 0.1%"},
        gridData:      [        
          {seller:'Bunker One Ltd', port:'Amstredam',contractname:'Bunk - DOGO Nov - Mar 22',contractproduct:'DMA 1.5%', formula:'AAXYO00  - 1.2', schedule:'Weekly average',contractqty:'50000 MT',liftedqty:'898.00 MT', availableqty:'23000 MT',price:'$ 500.00'}
        ]
      },
      marketHistoryPopup: {
        info:{
          index:"Marine Gasoil 0.1% Dlvd Singapore",
          location:"Singapore",
          product:"AAXYO00"
        },
        graphData:[
          {date:'16-1-2022',price:'754.00'},{date:'15-1-2022',price:'754.00'},{date:'14-1-2022',price:'754.00'},{date:'13-1-2022',price:'742.50'},{date:'12-1-2022',price:'733.00'},{date:'11-1-2022',price:'713.50'},{date:'10-1-2022',price:'712.50'},{date:'9-1-2022',price:'713.00'},{date:'8-1-2022',price:'713.00'},{date:'7-1-2022',price:'713.00'},{date:'6-1-2022',price:'698.50'},{date:'5-1-2022',price:'697.50'},{date:'4-1-2022',price:'688.00'},{date:'3-1-2022',price:'690.00'},{date:'2-1-2022',price:'692.50'}       
        ]
      },
      marketHistoryXaxis: ['16/01','15/01','14/01','13/01','12/01','11/01','10/01','09/01','08/01','07/01','06/01','05/01','04/01','03/01','02/01'],
      marketHistoryYaxis: [754.00,754.00,754.00,742.50,733.00,713.50,712.50,713.00,713.00,713.00,698.50,697.50,688.00,690.00,692.50],
      offerPriceHistoryPopup:{
        info:{
          location:"Singapore",
          product:"DMA 0.1%"
        },
        graphData:[
          {name: 'Total Marine', diff: ' $ 0.5', curroff: '$ 754', pastoffer: '$ 754.5', off3: '', off4: '', off5: '', off6: '' },
          {name: 'Trafigura Pte', diff: '$ 0', curroff: '$ 755.5', pastoffer: '', off3: '', off4: '', off5: '', off6: '' },
          {name: 'Shell Eastern Trading', diff: '$ 0', curroff: '$ 755', pastoffer: '', off3: '', off4: '', off5: '', off6: '' },
          {name: 'Exxonmobil Marine Fuels', diff: '$ 0.75', curroff: '$ 754.75', pastoffer: '$ 755', off3: '755.5', off4: '', off5: '', off6: '' },
          {name: 'Minerva Bunkering Pte Ltd', diff: '$ 0', curroff: '$ 756', pastoffer: '', off3: '', off4: '', off5: '', off6: '' },
          {name: 'BP Singapore PTE Limited', diff: '$ 1', curroff: '$ 753', pastoffer: '$ 753.5', off3: '$ 754', off4: '', off5: '', off6: '' },
       ]
      },
      offerPriceHistoryXaxis:[
        ["Offer 1","Offer 2","Offer 3","Offer 4","Offer 5"]
      ],
      offerPriceHistoryYaxis:[
      {'name1':[754,754.5,'','','']},
      {'name2':[755.5,'','','','']},
      {'name3':[755,'','','','']},
      {'name4':[754.75,755,755.5,'','']},
      {'name5':[756,'','','','']},
      {'name6':[753,753.5,754,'','']}
      ],
      offerPriceHistoryChartValues:[
        {value:'753.0',min:'752.0',max:'757.0',from:'750.0',to:'753.0'}
      ]
    }
  ]
  showMaerskData: boolean;

  ngOnInit(): void {
    this.companyCode = this.localService.getcompayCode();
    if(this.companyCode=="maersk"){
      this.showMaerskData = true;
    }
  }

  ngOnChanges(){
    this.getGridData();
  }
  ngAfterViewInit(){

    this.gridOptions_counterparty = <GridOptions>{
      suppressRowClickSelection: true,
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: false
      },
      //columnDefs: this.columnDef_aggrid,
      columnDefs: this.showMaerskData ? this.columnDef_aggrid_maersk : this.columnDef_aggrid,
      suppressCellSelection: true,
      headerHeight: 30,
      groupHeaderHeight: 80,
      rowHeight: 35,
      animateRows: false,
      tooltipShowDelay : 0,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },
      rowSelection: 'multiple',
      onGridReady: (params) => {
        this.gridOptions_counterparty.api = params.api;
        this.gridOptions_counterparty.columnApi = params.columnApi;
        this.gridOptions_counterparty.api.sizeColumnsToFit();
        this.rowCount = this.gridOptions_counterparty.api.getDisplayedRowCount();
        params.api.sizeColumnsToFit();
        this.counterpartyHeaderWidth = (params.columnApi.getColumn("check").getActualWidth() +
          params.columnApi.getColumn("name").getActualWidth() +
          params.columnApi.getColumn("genRating").getActualWidth() +
          params.columnApi.getColumn("portRating").getActualWidth() +
          params.columnApi.getColumn("phySupplier").getActualWidth());
        this.expandGridHeaderWidth = (
          params.columnApi.getColumn("check1").getActualWidth() +
          params.columnApi.getColumn("offPrice1").getActualWidth() +
          params.columnApi.getColumn("offPrice2").getActualWidth() +
          params.columnApi.getColumn("offPrice3")?.getActualWidth() +
          params.columnApi.getColumn("tPr").getActualWidth() +
          params.columnApi.getColumn("diff").getActualWidth() +
          params.columnApi.getColumn("amt").getActualWidth());
        this.totalOfferHeaderWidth = params.columnApi.getColumn("totalOffer").getActualWidth();
        this.getGridData();
        this.selectAllHederCheckbox();
      },

      onColumnResized: function (params) { },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
        params.api.sizeColumnsToFit();
      },
      // onCellClicked:(params)=>{
      //   let arr = [];
      //   arr.push(params.rowIndex)
      //   params.api.redrawRows({ rowNodes: arr });
      //   // params.node.parent.setSelected(true);
      // },
      frameworkComponents: {
        customHeaderGroupComponent: ShiptechCustomHeaderGroup,
        checkboxHeaderRenderer: MatCheckboxHeaderComponent
      },
      
    }
  }

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument, private datePipe: DatePipe, public dialog: MatDialog, private localService: LocalService) {
    this.context = { componentParent: this };
    this.rowSelection = 'multiple';
  }

  private getGridData() {
    //Grid Data
    if(this.companyCode=="maersk")
      this.localService.getSpotDataJSON('12321', 'maersk').subscribe((res: any) => {
        this.rowData_aggrid = res;
        this.gridOptions_counterparty.api.setRowData(this.rowData_aggrid)
      })
    else
      this.localService.getSpotDataJSON('12321', '001').subscribe((res: any) => {
        this.rowData_aggrid = res;
        this.gridOptions_counterparty.api.setRowData(this.rowData_aggrid)
      })

    // var allData.forkJoin
  }


  dataManupulation() {

  }
  //toolTipValueGetter = (params) => ({ value: params.value });
  toolTipValueGetter(params) {
    if(params.value != "-")
    return params.value;
  }
  private rowClassRules = {
    'customRowClass': function (params) {
      var offPrice = params.data.offPrice1;
      return offPrice == 100;
    },
    'display-no-quote': function (params) {
      var offPrice = params.data.isQuote;
      return offPrice == 'No quote';
    },
    // 'ag-row-selected': (params) =>{ 
      
    //   let focusedCell = params.node;
    //   console.log(focusedCell);
    //   console.log(params.rowIndex);
    //   return true;
    // },
  };

  private columnDef_aggrid_maersk = [
    {
      headerName: 'counterparty',
      headerTooltip: '',
      resizable: false,
      marryChildren: true,
      headerClass: 'plain-header-fullwidth',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'plain-header',data:6
      },
      children: [
        {
          headerName: '',
          field: 'check',
          filter: true,
          suppressMenu: true,
          maxWidth: 20,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          cellClass: 'p-1 checkbox-center ag-checkbox-v2',
          cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon-cell-hover' }
        },
        {
          headerName: 'Name', headerTooltip: 'Name', field: 'name', width: 420,
          cellClass: 'suppress-movable-col remove-option hoverCell', pinned: 'left',
          headerClass: 'm-l-7', suppressNavigable: true, lockPosition: true, cellStyle: { 'overflow': 'visible' },
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'hover-cell-lookup', type: 'hover-cell-lookup', cellClass: '', data: this.products_maersk }
        },
        {
          headerName: 'Gen. Rating', headerTooltip: 'General Rating',hide: true,headerClass:['aggrid-text-align-c'],
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          field: 'genRating', width: 230, cellClass: 'aggridtextalign-center no-padding rating-chip',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'gen-rating', type: 'rating-chip', cellClass: 'rating-chip' }
        },
        {
          headerName: 'Port Rating', headerTooltip: 'Port Rating',hide: true,headerClass:['aggrid-text-align-c'],
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          field: 'portRating', width: 230, cellClass: 'aggridtextalign-center no-padding rating-chip',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'port-rating', type: 'rating-chip', cellClass: 'rating-chip' }
        },
        {
          headerName: 'Phy. Supplier', headerTooltip: 'Physical Supplier',
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          headerClass: 'border-right', field: 'phySupplier', width: 200, cellClass: 'line-seperator-pinned',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'phy-supplier' }
        },
      ]
    },
    {
      headerName: '',
      headerTooltip: '',
      resizable: false,
      marryChildren: true,
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'single-bg-header',data:this.products_maersk.length
      },
      children: [
        {
          headerName: 'Total Offer($)', headerTooltip: 'Total Offer($)', field: 'totalOffer',
          tooltipField: '', width: 200, headerClass: 'border-right', cellClass: 'line-seperator',cellStyle: params => (this.calculateBestPrice &&  params.value == '518.50') ? { background: '#C5DCCF' } : null,
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'totalOffer', cellClass: '' }
        }]
    },
    {
      headerName: '',
      headerTooltip: '',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'bg-header',data:this.products_maersk[0]
      },
      marryChildren: true,
      resizable: false,
      name: 'grid1',
      groupId: 'grid1',

      children: [

        {
          headerName: '',
          field: 'check1',
          filter: true,
          suppressMenu: true,
          width: 35,
          resizable: false,
          suppressMovable: true,
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          headerComponent: 'checkboxHeaderRenderer',
          headerComponentParams:{
            displayName:"header-selectAll1"
          },
          cellClass: 'p-1 checkbox-center ag-checkbox-v2 grey-opacity-cell pad-lr-0 mat-check-center',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { type: 'mat-check-box', val: 'check1',  },
        },
        {
          headerName: 'Offer Price', headerTooltip: 'Offer Price', field: 'offPrice1', 
          width: 380, cellClass: 'hoverCell grey-opacity-cell pad-lr-0',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { label: 'price-calc', type: 'price-calc', cellClass: '' }
        },
        {
          headerName: 'T.Price($)', headerTooltip: 'Total Price($)', field: 'tPr', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0',cellStyle: params => params.value == '484.00' ? { background: '#C5DCCF' } : null
        },
        {
          headerName: 'Amount ($)', headerTooltip: 'Amount ($)', field: 'amt', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Tar. diff', headerTooltip: 'Target difference', field: 'diff', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Ø Energy [MJ/kg]', headerTooltip: 'Ø Energy [MJ/kg]', field: 'mj',valueFormatter: params => params.data.mj!="" ? params.data.mj.toFixed(2):'',
          tooltipValueGetter: params => {
            return params.data.mj!=""?params.data.mj.toFixed(2) +(" (based on 4 lab results)"):"";
          },
          width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Δ Energy [$/mt]', headerTooltip: 'Δ Energy [$/mt]', field: 'ediff', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open',  cellClass: 'grey-opacity-cell pad-lr-5'
        },
        {
          headerName: 'TCO ($)', headerTooltip: 'TCO ($)', field: 'tco', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open', headerClass: 'border-right',cellClass: 'line-seperator  grey-opacity-cell pad-lr-0'
        }
      ]
    },
    {
      headerName: '',
      headerTooltip: '',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'bg-header',data:this.products_maersk[1]
      },
      marryChildren: true,
      resizable: false,
      name: 'grid2',
      groupId: 'grid2',
      children: [
        {
          headerName: '',
          field: 'check2',
          filter: true,
          suppressMenu: true,
          width: 35,
          resizable: false,
          suppressMovable: true,
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          headerComponent: 'checkboxHeaderRenderer',
          headerComponentParams:{
            displayName:"header-selectAll2"
          },
          cellClass: 'p-1 checkbox-center ag-checkbox-v2 pad-lr-0 mat-check-center grey-opacity-cell',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { type: 'mat-check-box', val: 'check2' }
        },
        {
          headerName: 'Offer price', headerTooltip: 'Offer price', field: 'offPrice2', 
          width: 380, cellClass: 'hoverCell grey-opacity-cell pad-lr-0',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'price-calc', type: 'price-calc', cellClass: '' }
        },
        {
          headerName: 'T.Pr.($)', headerTooltip: 'Total Price($)', field: 'tPr2', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0',cellStyle: params => params.value == '753.50' ? { background: '#C5DCCF' } : null
        },
        {
          headerName: 'Amount ($)', headerTooltip: 'Amount ($)', field: 'amt2', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Tar. diff', headerTooltip: 'Target difference', field: 'diff2', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Ø Energy [MJ/kg]', headerTooltip: 'Ø Energy [MJ/kg]', field: 'mj1', valueFormatter: params => params.data.mj1!=""? params.data.mj1.toFixed(2):'',
          tooltipValueGetter: params => {
            return params.data.mj1!=""?params.data.mj1.toFixed(2) +(" (based on 4 lab results)"):"";
          },
          width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Δ Energy [$/mt]', headerTooltip: 'Δ Energy [$/mt]', field: 'ediff1', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open',  cellClass: 'grey-opacity-cell pad-lr-5'
        },
        {
          headerName: 'TCO ($)', headerTooltip: 'TCO ($)', field: 'tco1', 
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open', headerClass: 'border-right',cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        }
      ]
    }
  ];

  private columnDef_aggrid = [
    {
      headerName: 'counterparty',
      headerTooltip: '',
      resizable: false,
      marryChildren: true,
      headerClass: 'plain-header-fullwidth',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'plain-header',data:16
      },
      children: [
        {
          headerName: '',
          field: 'check',
          filter: true,
          suppressMenu: true,
          maxWidth: 20,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          cellClass: 'p-1 checkbox-center ag-checkbox-v2',
          cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon-cell-hover' }
        },
        {
          headerName: 'Name', headerTooltip: 'Name', field: 'name', width: 420,
          cellClass: 'suppress-movable-col remove-option hoverCell', pinned: 'left',
          headerClass: 'm-l-7', suppressNavigable: true, lockPosition: true, cellStyle: { 'overflow': 'visible' },
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'hover-cell-lookup', type: 'hover-cell-lookup', cellClass: '', data: this.products }
        },
        {
          headerName: 'Gen. Rating', headerTooltip: 'General Rating',headerClass:['aggrid-text-align-c'],
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          field: 'genRating', width: 230, cellClass: 'aggridtextalign-center no-padding rating-chip',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'gen-rating', type: 'rating-chip', cellClass: 'rating-chip' }
        },
        {
          headerName: 'Port Rating', headerTooltip: 'Port Rating',headerClass:['aggrid-text-align-c'],
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          field: 'portRating', width: 230, cellClass: 'aggridtextalign-center no-padding rating-chip',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'port-rating', type: 'rating-chip', cellClass: 'rating-chip' }
        },
        {
          headerName: 'Phy. Supplier', headerTooltip: 'Physical Supplier',
          suppressNavigable: true, lockPosition: true, pinned: 'left',
          headerClass: 'border-right', field: 'phySupplier', width: 200, cellClass: 'line-seperator-pinned',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'phy-supplier' }
        },
      ]
    },
    {
      headerName: '',
      headerTooltip: '',
      resizable: false,
      marryChildren: true,
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'single-bg-header',data:this.products.length
      },
      children: [
        {
          headerName: 'Total Offer($)', headerTooltip: 'Total Offer($)', field: 'totalOffer',
          tooltipField: '', width: 200, headerClass: 'border-right', cellClass: 'line-seperator'
          ,cellStyle: params => (this.calculateBestPrice &&  params.value == '518.50') ? { background: '#C5DCCF' } : null,
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'totalOffer', cellClass: '' }
        }]
    },
    {
      headerName: '',
      headerTooltip: '',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'bg-header',data:this.products[0]
      },
      marryChildren: true,
      resizable: false,
      name: 'grid1',
      groupId: 'grid1',

      children: [

        {
          headerName: '',
          field: 'check1',
          filter: true,
          suppressMenu: true,
          width: 35,
          resizable: false,
          suppressMovable: true,
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          headerComponent: 'checkboxHeaderRenderer',
          headerComponentParams:{
            displayName:"header-selectAll1"
          },
          cellClass: 'p-1 checkbox-center ag-checkbox-v2 grey-opacity-cell pad-lr-0 mat-check-center',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { type: 'mat-check-box', val: 'check1',  },
        },
        {
          headerName: 'Offer price', headerTooltip: 'Offer price', field: 'offPrice1', width: 380, cellClass: 'hoverCell grey-opacity-cell pad-lr-0',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { label: 'price-calc', type: 'price-calc', cellClass: '' }
        },
        {
          headerName: 'T.Pr.($)', headerTooltip: 'Total Price($)', field: 'tPr',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0', cellStyle: params => (this.calculateBestPrice &&  params.value == '518.50') ? { background: '#C5DCCF' } : null,
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'addTpr', cellClass: '' }
        },
        {
          headerName: 'Amount ($)', headerTooltip: 'Amount ($)', field: 'amt',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Tar. diff', headerTooltip: 'Target difference', field: 'diff',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Ø Energy [MJ/kg]', headerTooltip: 'Ø Energy [MJ/kg]', field: 'mj',valueFormatter: params => params.data.mj!=""? params.data.mj.toFixed(2):'',
          tooltipValueGetter: params => {
            return params.data.mj!=""?params.data.mj.toFixed(2) +(" (based on 4 lab results)"):"";
          },
          width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Δ Energy [$/mt]', headerTooltip: 'Δ Energy [$/mt]', field: 'ediff',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-5'
        },
        {
          headerName: 'TCO ($)', headerTooltip: 'TCO ($)', field: 'tco',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open', headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        }
      ]
    },
    {
      headerName: '',
      headerTooltip: '',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'bg-header',data:this.products[1]
      },
      marryChildren: true,
      resizable: false,
      name: 'grid2',
      groupId: 'grid2',
      children: [
        {
          headerName: '',
          field: 'check2',
          filter: true,
          suppressMenu: true,
          width: 35,
          resizable: false,
          suppressMovable: true,
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          headerComponent: 'checkboxHeaderRenderer',
          headerComponentParams:{
            displayName:"header-selectAll2"
          },
          cellClass: 'p-1 checkbox-center ag-checkbox-v2 pad-lr-0 mat-check-center grey-opacity-cell',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { type: 'mat-check-box', val: 'check2' }
        },
        {
          headerName: 'Offer price', headerTooltip: 'Offer price', field: 'offPrice2',width: 380, cellClass: 'hoverCell grey-opacity-cell pad-lr-0',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'price-calc', type: 'price-calc', cellClass: '' }
        },
        {
          headerName: 'T.Pr.($)', headerTooltip: 'Total Price($)', field: 'tPr',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          ,width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Amount ($)', headerTooltip: 'Amount ($)', field: 'amt',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          ,width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Tar. diff', headerTooltip: 'Target difference', field: 'diff',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          ,width: 150, headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0' 
        },
        {
          headerName: 'Ø Energy [MJ/kg]', headerTooltip: 'Ø Energy [MJ/kg]', field: 'mj1',valueFormatter: params => params.data.mj1!=""? params.data.mj1.toFixed(2):'',
          tooltipValueGetter: params => {
            return params.data.mj1!=""?params.data.mj1.toFixed(2) +(" (based on 4 lab results)"):"";
          }
          , width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Δ Energy [$/mt]', headerTooltip: 'Δ Energy [$/mt]', field: 'ediff1',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          , width: 150, columnGroupShow: 'open',  cellClass: 'grey-opacity-cell pad-lr-5'
        },
        {
          headerName: 'TCO ($)', headerTooltip: 'TCO ($)', field: 'tco1',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          , width: 150, columnGroupShow: 'open',headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
      ]
    },
    {
      headerName: '',
      headerTooltip: '',
      headerGroupComponent: 'customHeaderGroupComponent',
      headerGroupComponentParams: {
        type: 'bg-header',data:this.products[2]
      },
      marryChildren: true,
      resizable: false,
      name: 'grid3',
      groupId: 'grid3',
      children: [

        {
          headerName: '',
          field: 'check3',
          filter: true,
          suppressMenu: true,
          width: 35,
          resizable: false,
          suppressMovable: true,
          headerClass: 'header-checkbox-center checkbox-center ag-checkbox-v2',
          headerComponent: 'checkboxHeaderRenderer',
          headerComponentParams:{
            displayName:"header-selectAll3"
          },
          cellClass: 'p-1 checkbox-center ag-checkbox-v2 grey-opacity-cell pad-lr-0 mat-check-center',
          cellRendererFramework: AGGridCellRendererV2Component,
          cellRendererParams: { type: 'mat-check-box', val: 'check3' },
        },
        {
          headerName: 'Offer price', headerTooltip: 'Offer price', field: 'offPrice3',width: 380, cellClass: 'hoverCell grey-opacity-cell pad-lr-0',
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'price-calc', type: 'price-calc', cellClass: '' }
        },
        {
          headerName: 'T.Pr.($)', headerTooltip: 'Total Price($)', field: 'tPr',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          ,width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Amount ($)', headerTooltip: 'Amount ($)', field: 'amt',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          , width: 150, cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Tar. diff', headerTooltip: 'Target difference', field: 'diff',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          }
          ,width: 150, headerClass: 'border-right', cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Ø Energy [MJ/kg]', headerTooltip: 'Ø Energy [MJ/kg]', field: 'mj1',valueFormatter: params => params.data.mj1!="" ? params.data.mj1.toFixed(2):'',
          tooltipValueGetter: params => {
            return params.data.mj1!=""?params.data.mj1.toFixed(2) +(" (based on 4 lab results)"):"";
          },
          width: 150, columnGroupShow: 'open', cellClass: 'grey-opacity-cell pad-lr-0'
        },
        {
          headerName: 'Δ Energy [$/mt]', headerTooltip: 'Δ Energy [$/mt]', field: 'ediff2',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open',  cellClass: 'grey-opacity-cell pad-lr-5'
        },
        {
          headerName: 'TCO ($)', headerTooltip: 'TCO ($)', field: 'tco1',
          tooltipValueGetter: params => {
            return this.toolTipValueGetter(params);
          },
          width: 150, columnGroupShow: 'open', headerClass: 'border-right',cellClass: 'line-seperator grey-opacity-cell pad-lr-0'
        },
      ]
    },

  ];

  resizeGrid() {

    this.gridOptions_counterparty.columnApi.setColumnVisible('mj', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('mj1', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('mj2', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('tco', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('tco1', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('tco2', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('ediff', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('ediff1', true);
    this.gridOptions_counterparty.columnApi.setColumnVisible('ediff2', true);
    this.expandGridHeaderWidth =
      (this.gridOptions_counterparty.columnApi.getColumn("check1")?.getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("offPrice").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("tPr").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("diff").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("mj").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("tco").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("ediff").getActualWidth() +
        this.gridOptions_counterparty.columnApi.getColumn("amt").getActualWidth());

    this.counterpartyHeaderWidth = (this.gridOptions_counterparty.columnApi.getColumn("check").getActualWidth() +
      this.gridOptions_counterparty.columnApi.getColumn("name").getActualWidth() +
      this.gridOptions_counterparty.columnApi.getColumn("genRating").getActualWidth() +
      this.gridOptions_counterparty.columnApi.getColumn("portRating").getActualWidth() +
      this.gridOptions_counterparty.columnApi.getColumn("phySupplier").getActualWidth());


    this.fullHeaderWidth = this.counterpartyHeaderWidth + this.totalOfferHeaderWidth + (this.expandGridHeaderWidth * 3) + 7;
  }

  groupHeaderCheck() {
    let addButtonElement = document.getElementsByClassName('groupHeaderCheckBox');
    addButtonElement[0].addEventListener('click', (event) => {
    });
  }
  onRowSelected(e) {
    var itemsToUpdate = [];
    this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
      rowNode.data.check = false;
        if(e.rowIndex === rowNode.childIndex){
          rowNode.data.check1 = e.node.selected;
          rowNode.data.check2 = e.node.selected;
          rowNode.data.check3 = e.node.selected;
        }
    });
    this.gridOptions_counterparty.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {

      if (!rowNode.isSelected() === true) {
        return;
      }
      var data = rowNode.data;
      data.check = TextTrackCueList
      itemsToUpdate.push(data);
    });
    var res = this.gridOptions_counterparty.api.applyTransaction({ update: itemsToUpdate });
  }
  onSelectionChanged(e) {
  }
  onSearchCounterparty(input){
    this.gridOptions_counterparty.api.setQuickFilter(input);
  }
  onClearSearchCounterparty(){
    this.gridOptions_counterparty.api.setQuickFilter('');
  }
  scrollExpand(i){
    this.portIndex = i;
  }

  noQuoteChange(){
    this.noQuote = !this.noQuote;
    this.localService.setNoQuote(this.noQuote);
  }

  selectAllHederCheckbox() {
    let addButtonElement1 = document.getElementsByClassName('header-selectAll1');
    addButtonElement1[0].addEventListener('click', (event) => {
      if(!(event.target["childNodes"][0].checked)){
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check1 = true;
        });
      }else{
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check1 = false;
        }); 
      }     
    });

    let addButtonElement2 = document.getElementsByClassName('header-selectAll2');
    addButtonElement2[0].addEventListener('click', (event) => {
      if(!(event.target["childNodes"][0].checked)){
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check2 = true;
        });
      }else{
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check2 = false;
        }); 
      }     
    });

    let addButtonElement3 = document.getElementsByClassName('header-selectAll3');
    addButtonElement3[0].addEventListener('click', (event) => {
      if(!(event.target["childNodes"][0].checked)){
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check3 = true;
        });
      }else{
        this.gridOptions_counterparty.api.forEachNode((rowNode, index) => {
          rowNode.data.check3 = false;
        }); 
      }     
    });
  }
}
