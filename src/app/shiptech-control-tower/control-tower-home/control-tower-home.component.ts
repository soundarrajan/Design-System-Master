import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { LocalService } from 'src/app/services/local-service.service';
import { MyNotesComponent } from '../my-notes/my-notes.component';
import { QualityClaimsComponent } from '../quality-claims/quality-claims.component';
import { QuantityClaimsComponent } from '../quantity-claims/quantity-claims.component';
import { ResidueClaimsComponent } from '../residue-claims/residue-claims.component';

@Component({
  selector: 'app-control-tower-home',
  templateUrl: './control-tower-home.component.html',
  styleUrls: ['./control-tower-home.component.css']
})
export class ControlTowerHomeComponent implements OnInit {
  public showQuality:boolean = true
  public showQuantity:boolean = false;
  public showResidue:boolean = false;
  public showSearchNotes:boolean = false;
  public searchText;
  public text;
  public showMenu: boolean = false;
  public theme = true;


  @ViewChild(QualityClaimsComponent) child:QualityClaimsComponent;
  @ViewChild(QuantityClaimsComponent) child1:QuantityClaimsComponent;
  @ViewChild(ResidueClaimsComponent) child2:ResidueClaimsComponent;
  @ViewChild(MyNotesComponent) childnotes:MyNotesComponent;
  constructor(private localService: LocalService) { 
   
   }

  ngOnInit(): void {
    this.localService.themeChange.subscribe(data => {
      this.theme  = data;
    })
    
  }

  selectedTabChange(e){
    //alert("tab");
    this.child.tabChange();
    
  }
  onTabChange(index){
    //alert(index);
    if(index == 2){
    this.showSearchNotes = true;
    }else{
      this.showSearchNotes = false;
    }
  }
  searchNotes(e){
    console.log(e);
    this.text = e.key;
    //if(e.keyCode === 13){
      //alert("");
      e.preventDefault();
      this.childnotes.filteringNotes();
    //}
  }
  quantityTabChange(e){
    this.child1.tabChange();
  }
  residueTabChange(e){
    this.child2.tabChange();
  }
  viewChange($event: MatRadioChange){
    //alert("");
    //console.log($event);
    if($event.value == "quality"){
      //alert("1");
      this.showQuality = true;
      this.showQuantity = false;
      this.showResidue = false;
    }
    else if($event.value == "quantity"){
      this.showQuality = false;
      this.showQuantity = true;
      this.showResidue = false;
    }
    else if($event.value == "residue"){
      this.showQuality = false;
      this.showQuantity = false;
      this.showResidue = true;
    }
    else{
      
    }


    
  }

}
