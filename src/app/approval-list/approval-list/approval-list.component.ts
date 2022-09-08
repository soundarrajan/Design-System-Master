import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {
  public headerToggle:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapse(){
    this.headerToggle = !this.headerToggle;
  }
}
