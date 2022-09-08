import { PandlComponent } from "./../pandl/pandl.component";


import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pandltree",
    template: `
    <div *ngFor="let rdata of node.rowData">
      <div        class="row pandl-subheader-row " [ngClass]="rdata.mainparent ? 'left-ribbon-blue' : 'left-ribbon-bggray'"  (click)="toggle()" >
       
          <div class="col-4 space-1" >
            
           <div> 
             
<span class="mg" [ngStyle]="{'padding-left.px': levelIndex*20}"> {{ rdata.cname }}</span>
            <div [ngClass]=" isHaveChild ? 'open-close-arrow' : 'open-close-arrow-none' "  >
              <i [ngClass]=" isExpand ? 'fas fa-caret-up' : 'fas fa-caret-down' " ></i>
          
</div>
</div>
          </div>
          <div class="col-4 text-right">{{ rdata.value }}</div>
          <div class="col-4 text-right">{{ rdata.total }}</div>        
      </div>
</div>
    <div *ngIf="isHaveChild" class="space">
      <ul *ngFor="let cnode of node.childData;let j = index" >
      <ng-container *ngIf="isExpand">
        <app-pandltree [node]="cnode" [levelIndex]="node.childData? levelIndex+1:levelIndex" 
              [activeRowIndex]="isExpand?cnode.childData.lenght+this.activeRowIndex:0" (isExpanded)="updateRowIndex()"></app-pandltree>
        </ng-container>
</ul>
    </div>
   
  `,
  styleUrls: ["./pandltree.component.scss"]
})
export class PandltreeComponent implements OnInit {
 
  constructor() {}
  @Input() node;
 
  @Input() levelIndex;

  @Input() activeRowIndex =0;

  @Output() isExpanded = new EventEmitter();
  
  public templevelIndex=0;

  public isExpand: boolean = false;
  public isHaveChild: boolean;
  
  public checkIt(cdata) {
    console.log(cdata);
    console.log(name);
  }

  ngOnInit() {
   
    this.templevelIndex = this.node.childData? this.levelIndex+1:this.levelIndex;
  }
  toggle() {
    this.isExpand = !this.isExpand;    
    if(this.isExpand){
      this.levelIndex
    }  
  }

  ngAfterContentInit() {
    console.log(this.node.childData);
    this.isHaveChild = this.node.childData.length != 0;
  }

  updateRowIndex(){

  }
}
 