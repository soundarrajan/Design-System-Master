import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BulkImportErrorComponent } from '../bulk-import-error/bulk-import-error.component';

@Component({
  selector: 'app-bulk-import-success',
  templateUrl: './bulk-import-success.component.html',
  styleUrls: ['./bulk-import-success.component.scss']
})
export class BulkImportSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  bulkImportError() {
    const dialogRef = this.dialog.open(BulkImportErrorComponent, {
      width: '865px',
          height: '570px',
          panelClass: 'dialog-popup-tbl' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}
