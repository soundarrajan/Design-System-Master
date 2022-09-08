import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BulkImportStatusComponent } from '../bulk-import-status/bulk-import-status.component';


@Component({
  selector: 'app-bulk-import-transaction',
  templateUrl: './bulk-import-transaction.component.html',
  styleUrls: ['./bulk-import-transaction.component.scss']
})
export class BulkImportTransactionComponent implements OnInit {
  public selectedFile: any = "";
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  bulkImportStatus() {
    const dialogRef = this.dialog.open(BulkImportStatusComponent, {
      width: '392px',
      height: '172px',
      panelClass: 'bulk-import-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  fileEvent(e: Event){
    //alert("");;
    let file = (<HTMLInputElement>e.target).files[0];
    let fileName = file.name;
    this.selectedFile = fileName;
    //alert(fileName);
}



}

