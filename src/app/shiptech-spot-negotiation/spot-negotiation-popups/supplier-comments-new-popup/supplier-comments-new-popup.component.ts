import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-comments-new-popup',
  templateUrl: './supplier-comments-new-popup.component.html',
  styleUrls: ['./supplier-comments-new-popup.component.css']
})
export class SupplierCommentsNewPopupComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
