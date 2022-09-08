import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsJournalsComponent } from '../details-journals/details-journals.component';
import { RelatedJournalsComponent } from '../related-journals/related-journals.component';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.css']
})
export class JournalDetailComponent implements OnInit {

  isCollapsed: boolean = false;
  disableDeleteBtn: boolean = false;
  disableReversalBtn: boolean = true;
  tabActive: boolean = true;
  public columns: any[];

  @ViewChild(RelatedJournalsComponent) child:RelatedJournalsComponent;
  @ViewChild(DetailsJournalsComponent) detail:DetailsJournalsComponent;

  constructor() { }

  ngOnInit(): void {
  }
  deleteJournal(){
    //alert("");
    this.disableDeleteBtn = true;
    this.disableReversalBtn = false;
    this.detail.cellChange('click');
  }
  reverseJournal(){
    this.detail.progress();
    this.tabActive = false;
  }

  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

  selectedTabChange(e){
    this.child.tabChange();
  }

}
