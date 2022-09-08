import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-delete-info',
  templateUrl: './add-delete-info.component.html',
  styleUrls: ['./add-delete-info.component.css']
})
export class AddDeleteInfoComponent implements OnInit {
  
  @Input('category') category;
  simpleSource = ['Manifold','Unknown'];
  public source ='Manifold';
  sampleSources = [{'id': 0, 'sampleSource': {'id': 1,'name': 'Manifold', 'displayName': 'Manifold'} }];

  hideDropdown:boolean = false;
  dataSource=[
    {product: 'RMG 380 3.5%', type: 'HSFO 3.5%'},
    {product: 'DMA 3.5%"', type: 'DOGO'}
  ];
  public productName:any[]=[];
  //public sampleSources:any[]=[''];
  displayedColumns: string[] = ['product', 'type'];
  selectedProductToAddInDelivery: any;
  @ViewChild('mySelect') mySelect: MatSelect;
  constructor() { }

  ngOnInit(): void {
    //alert(this.category);
  }

  addSampleSources(){
    this.sampleSources.push({'id': 0, 'sampleSource': {'id': 1,'name': 'Manifold', 'displayName': 'Manifold'} });
  }

  removeSampleSources(index){
    this.sampleSources.splice(index, 1);
  }
  addNewProduct(){
    this.hideDropdown = false;
    this.selectedProductToAddInDelivery = '';
  }
  deleteDeliveryProduct(index){
    this.productName.splice(index, 1);
  }
  openAddProductSelect(){
    // this.mySelect.close();
    //alert();
     this.mySelect.open();
   }
   addSelectedProductInDelivery(selectedProductToAddInDelivery) {
    this.hideDropdown = true;
    //alert(selectedProductToAddInDelivery);
    this.productName.push(selectedProductToAddInDelivery);
    // console.log("ffffffffffff");
    // console.log(this.productName);
  }
}
