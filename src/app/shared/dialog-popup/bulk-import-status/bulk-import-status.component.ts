import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BulkImportSuccessComponent } from '../bulk-import-success/bulk-import-success.component';

@Component({
  selector: 'app-bulk-import-status',
  templateUrl: './bulk-import-status.component.html',
  styleUrls: ['./bulk-import-status.component.scss']
})
export class BulkImportStatusComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  bulkImportSuccess() {
    const dialogRef = this.dialog.open(BulkImportSuccessComponent, {
      width: '392px',
      height: '172px',
      panelClass: 'bulk-import-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}
