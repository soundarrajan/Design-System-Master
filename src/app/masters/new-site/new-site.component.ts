import { Component, OnChanges, DoCheck, AfterViewChecked, OnInit, Output, EventEmitter } from '@angular/core';
import { Directive, ElementRef, Input, AfterContentInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { RemoveExternalRefComponent } from 'src/app/shared/dialog-popup/remove-external-ref/remove-external-ref.component';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss']
})
export class NewSiteComponent implements OnInit {
  
  showAlert = false;
  customCollapsedHeight: string = '65px';
  customExpandedHeight: string = '40px';
  customExpandedHeightFreight: string = '60px';
  customExpandedHeightNotes: string = '60px';
  auditlog_isopen = false;
  public address1;
  public address2;
  public onEdit = false;
  public gridOptions_auditLog: GridOptions;
  public isdisplaydensityhigh:boolean = false;
  constructor(public dialog: MatDialog) { 
    this.gridOptions_auditLog = <GridOptions>{      
      columnDefs: this.columnDef_auditLog,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      rowHeight: 50,
      rowSelection: 'multiple',
      animateRows:true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
       },
      onGridReady: (params) => {
          this.gridOptions_auditLog.api = params.api;
          this.gridOptions_auditLog.columnApi = params.columnApi;
          this.gridOptions_auditLog.api.sizeColumnsToFit(); 
          this.gridOptions_auditLog.enableColResize = true;
          this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);          
      },
      getRowClass:(params)=> {
        let classes:string []=[];
        
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }       
        if(classes.length>0)
          return classes;       
    },
      onColumnResized: function(params) {
        console.log(params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged');
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        console.log(params.columnApi.getAllDisplayedColumns().length <= 10);
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    }
  }

  ngOnInit() {
  }

  @Output() returnlist: EventEmitter<string> = new EventEmitter<string>();

returnToList() {
this.returnlist.emit();
}

// maxlengthAlert(){
//   alert("");
//   //var el = document.getElementsByTagName("input");
//   //console.log(el.length);
// }

private columnDef_auditLog = [
  { headerName: 'Entity Name', headerTooltip:'Entity Name', field:'entityname', cellClass:['aggrid-left-ribbon darkgray']},
  { headerName: 'Event Type', headerTooltip:'Event Type', field:'eventtype'},
  //{ headerName: 'Location', headerTooltip:'Location', field:'location'},
  //{ headerName: 'Terminal', headerTooltip:'Terminal', field:'terminal'},
  //{ headerName: 'Product', headerTooltip:'Product', field:'product'},
  { headerName: 'Field Name', headerTooltip:'Field Name', field:'fieldname'},
  { headerName: 'New Value', headerTooltip:'New Value', field:'newvalue', type: "numericColumn" },
  { headerName: 'Old Value', headerTooltip:'Old Value', field:'oldvalue', type: "numericColumn" },
  { headerName: 'User Name', headerTooltip:'User Name', field:'username'},
  { headerName: 'Date', headerTooltip:'Date', field:'date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, cellClass: ['aggridtextalign-center'], headerClass:['aggrid-text-align-c'], width: 250 }
];

private rowData_auditLog = [

  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  
]

removeReferenceDialog() {
  const dialogRef = this.dialog.open(RemoveExternalRefComponent, {
    
    width: '390px',
    height: '215px',
    //position: { top:'25px'},
    //top: '25px',
    panelClass: 'remove-terminal-popup'

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
  
}

edit(){
  this.onEdit = true;
}

public change_rowdensity(){
  this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
  if(this.isdisplaydensityhigh){
    this.gridOptions_auditLog.rowHeight = 48;
  }
  else{
    this.gridOptions_auditLog.rowHeight = 35;
  }
  this.gridOptions_auditLog.api.resetRowHeights();
}

}

/*Soft Warning */
//el = document.getElementsByTagName("input");
//document.getElementsByTagName("input").onkeypress = function() {myFunction()};

// maxlengthAlert(){
//   alert("");
//   //var el = document.getElementsByTagName("input");
//   //console.log(el.length);
// }

@Directive({ selector: '[inputfocus]' })

export class InputFocusedDirective implements DoCheck {
  public valLength;
  //showAlert = false;

  @Input() inputfocus;
  constructor(public el: ElementRef, public renderer: Renderer2) { }
  
  ngDoCheck() {
      let valLength = this.el.nativeElement.value.length;
      //console.log("valLength " + valLength);

      if (valLength > 50) {
        //this.showAlert = true;
        //console.log(this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('max-length-alert'));
        this.renderer.addClass(this.el.nativeElement.parentElement.parentElement.parentElement, 'maxlength-focused');
        this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.max-length-alert').style.display = 'block';
        //this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.mat-form-field-ripple').style.background = '#CEA742';
        //this.maxlengthAlert();
          //alert("");
      }
      else {
          this.renderer.removeClass(this.el.nativeElement.parentElement, 'maxlength-focused');
          this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.max-length-alert').style.display = 'none';
          //this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.mat-form-field-ripple').style.background = 'rgba(0,0,0,.87)';
      }


  }
  
}

