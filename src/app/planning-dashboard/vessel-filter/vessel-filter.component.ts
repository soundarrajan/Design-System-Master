import { ChangeDetectionStrategy, Component, OnInit, Inject, EventEmitter, Input, OnChanges, SimpleChanges, Output, ViewChild,ViewChildren, QueryList } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { forkJoin as observableForkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { VesselDataModel,RequestDetail } from '../../shared/models/vessel.data.model';
import { PlanningDashboardService } from '../../planning-dashboard/services/planning-dashboard.service';
import { LocalService } from '../../services/local-service.service';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { GeneralModel } from '../../shared/models/generic.model';
// import * as settingsJson from '../../assets/config/settings.json';
//import { Broadcaster } from '../../planning-dashboard/services/broadcaster';
export const FuelStatus: any[] =
  ["ROB", "ROB+Req. Quantity", "ROB+Ordered Quantity", "ROB+Ordered Quantity+Req. Quantity"];

@Component({
  selector: 'app-vessel-filter',
  templateUrl: './vessel-filter.component.html',
  styleUrls: ['./vessel-filter.component.scss']
})


export class VesselFilterComponent implements OnChanges, OnInit {
  @Input() IsFilterSearch:boolean=false;
  @Input() searchedVesselIMONO:number;
  selectedVesselName:string='';
  vesselvalues;
  selectedVessel;
  //private isSelected = false;
  isChecked:boolean = false;
  IsSelected = true;
  bunkerStatusCountObj = {};
  options: string[] = ['One', 'Two', 'Three'];
  bunkerRequestStatusObj;
  vesselTypeSelected;
  ddlThresholdLimit = this.pldService.FuelStatus;
  onApplyFilter = new EventEmitter();
  onSaveFilter = new EventEmitter();
  vesselTypesSelected: Array<string> = [];
  NoDestinationSelected = false;
  vesselTypes: any[];
  searchVesselsList: any[];
  selectedVesselColor: any[];
  selectedVesselColorRed: any[];
  selectedVesselColorOrange: any[];
  selectedVesselColorBlue: any[];
  selectedVesselContainer: any[];
  datavesselTypes: any[];
  sortedVessels: any = [];
  sortedVesselss: any = [];
  fuelStatusCountRed: any = [];
  fuelStatusCountOrange: any = [];
  fuelStatusCountBlue: any = [];
  sortedVesselsContainer: any = [];
  filteredVesselType = {};
  vesselByROB = {
    red: 0,
    blue: 0,
    amber: 0
  }
  defaultFuelStatus: any = "ROB";
  get lastSelectedROB(): any {
    {
      var lastSelected = this.data.vesselFuelStatusFilter == undefined ?
        this.pldService.FuelStatus.find(status => status == this.defaultFuelStatus) : this.data.vesselFuelStatusFilter;

      return lastSelected;
    }
  }

  set lastSelectedROB(value: any) {

    if (value == undefined)
      return;


    this.data.vesselFuelStatusFilter = value;

    localStorage.setItem('LastVesselFilterROB',value);

  }

  isEnabled:boolean;
  @Input('isEnabled')  set _isEnabled(val){
    
    // if(val)
    //   this.serachVesselControl.enable();
    // else
    //   this.serachVesselControl.disable();
    this.isEnabled=val;
    
  }

  @Output()
  searchClick:EventEmitter<any>=new EventEmitter<any>();

  @ViewChildren('myCheckbox') private myCheckboxes : QueryList<any>;
  @ViewChild('acVessel', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;
  serachVesselControl = new FormControl();

  @Input()
  vesselList: Array<VesselDataModel> = [];
  requestList: Array<RequestDetail> = [];

  IsAutoComplete: boolean = true;

  lastUpdatedOn: any;
  //vesselTypes: string[];
  vesselByTypes: any[];
  EnquiryStatus: string[];
  BunkerStatus: string[];
  bunkerRequest: any[];
  fuelStatus: any[];
  //vesselCount:number;

  constructor(
    public dialogRef: MatDialogRef<VesselFilterComponent>,
    private pldService: PlanningDashboardService,
    private localService:LocalService,
    //private objBroadcaster: Broadcaster,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      // this.objBroadcaster.on('appSettings').subscribe((res: any) => {

      //   this.defaultFuelStatus = res.defaultFuelStatus != undefined ? res.defaultFuelStatus : "ROB";
      // });
      // this.vesselList = this.vesselTypes;
      //this.vesselCount = this.vesselList.length;
  }

  checkEmpty(value) {
    return (value == undefined || null);
  }


  ngOnInit() {
    this.getVesselsTypes();
  }

  ResetVesselsOrder(resetVesselSelection?:boolean){
    this.vesselList.sort((vessel1, vessel2)=>{


      if(resetVesselSelection){
        vessel1.IsSelected=false;
        vessel2.IsSelected=false;
      }

      vessel1.VesselName=this.pldService.titleCaseConverter(vessel1.VesselName);

      vessel2.VesselName=this.pldService.titleCaseConverter(vessel2.VesselName);

      let res:number=0;

      // res=vessel1.IsSelected?1:-1;

      if(vessel1.VesselName< vessel2.VesselName)
      res=-1;
      else if(vessel1.VesselName> vessel2.VesselName)
      res=1;

      return res;
    });
  }
  /**
   * Selects the Vessel by matching the vessel type
   * @param VesselTypeName 
   * @param IsSelected 
   */
  // selectVesselByType(VesselTypeName, IsSelected) {
    
  //   this.SelectVesselAndConditioned(IsSelected);

  // }
  /**
   * Selects the vessel by the ROB Conditions
   * @param colorCode 
   * @param IsSelected 
   */
  // selectVesselByFuelStatus(colorCode, IsSelected) {

  //   this.SelectVesselAndConditioned(IsSelected);

  // }


  /**
   * Selects the vessel by the ROB Conditions
   * @param colorCode 
   * @param IsSelected 
   */
  // selectVesselByRequestStatus(EnquiryStatus, IsSelected) {

  //   this.SelectVesselAndConditioned(IsSelected);
  // }
  /**
   * After Change for Vessel Type Checkbox -- If All is selected 
   * @param vesselType 
   */
 
  vesselTypeSelection(vesselType: any, IsSelected: boolean) {
    var Selected;
    console.log("ttttttttttttt");
    console.log(this.vesselTypes);
    this.sortedVessels=[];
    // for (var i=0; i<this.vesselTypes.length; i++){
    //   this.vesselTypes[i].IsSelected = false;
    //   }
      // for (var i=0; i<this.vesselTypeSelected.length; i++){
      //   this.vesselTypeSelected[i].IsSelected = false;
      //   }
    //alert(vesselType + IsSelected);
    //this.vesselTypeSelected = this.vesselList;
    //console.log("vessel type selectionssssssssss");
    //console.log(this.vesselList);
    // for (var i=0; i<this.vesselTypeSelected.length; i++){
    // this.vesselTypeSelected[i].IsSelected = "True";
    // }
    // console.log(this.vesselTypeSelected);
    // console.log("qqqqqqqqqqqqqqqqqq");
    // console.log(this.vesselTypes);
    if (vesselType === 'All Vessels') {
      //alert(this.data.vesselTypes.length);
      //alert(this.vesselList.length);
      for (var i=0; i<this.vesselTypes.length; i++){
          this.vesselTypes[i].IsSelected = false;
      } 
      for (let i = 0; i < this.vesselTypeSelected.length; i++) {
        this.vesselTypeSelected[i].IsSelected = true;
        //this.selectVesselByType(this.data.vesselTypes[i].vesselType, IsSelected)
      }
      this.SortSelectedVessels();
      //this.resetFuelStatusCount(vesselType);
      //this.resetBunkerStatusCount(vesselType);
      //this.SetVesselTypeCounts();
      /* Set Bunker Request Status */

      /* fill BunkerStatus*/
      //this.resetBunkerStatusCount(vesselType);

    /* fill BunkerStatus*/
   
    
      this.SetVesselsFuelStatus();
      this.getVesselsTypes();
      //this.getVesselsTypes();
      //this.resetBunkerStatusCount(vesselType);
    }
    else {
      //console.log("1111111111111111");
     //console.log(this.vesselTypes);
     this.vesselTypes[0].IsSelected = false;
     //alert(IsSelected);
    // for (let i = 0; i < this.vesselTypes.length; i++) {
    // this.vesselTypes[i].IsSelected = false;
    // }
      //alert(vesselType + IsSelected);
      //this.vesselTypeSelected.map(vessel=>{vessel.IsSelected=false});
      //console.log("Vessel list count");
      //this.vesselTypeSelected.IsSelected = false;
      //console.log(this.vesselList);
      console.log("aaaaaaaaaaaaaaaaaaaa");
      console.log(vesselType);
      console.log(this.vesselTypeSelected);
      console.log("aaaaaaaaaaaaaaaaaaaa");
    //   for (var i=0; i<this.vesselTypeSelected.length; i++){
    //     if (this.vesselTypeSelected[i].VesselType === vesselType){
    //       this.vesselTypeSelected[i].IsSelected = true;
    //        //console.log(this.selectedVessel);
    //        //return this.cityStatsStorage;
    //     }else{
    //       this.vesselTypeSelected[i].IsSelected = false;
    //     }
    //  }
      this.selectedVesselContainer =  this.vesselTypeSelected.filter(vessel => vessel.VesselType === vesselType);
      if(!IsSelected){
        for (var i = 0; i < this.selectedVesselContainer.length; i++) {
         this.sortedVesselsContainer.push(this.selectedVesselContainer[i].VesselName.toLowerCase());
         //alert(IsSelected);
         }
       }
         if(IsSelected){
           for (var i = 0; i < this.selectedVesselContainer.length; i++) {
             //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
             var index = this.sortedVesselsContainer.indexOf(this.selectedVesselContainer[i].VesselName.toLowerCase()); // get index if value found otherwise -1
             //alert(index);
               if (index > -1) { //if found
               this.sortedVesselsContainer.splice(index, 1);
             }
           }
         }
         for (var i = 0; i < this.vesselTypeSelected.length; i++) {
          if(this.sortedVesselsContainer.indexOf(this.vesselTypeSelected[i].VesselName.toLowerCase())==-1){
            this.vesselTypeSelected[i].IsSelected= false;
          }
          else{
            this.vesselTypeSelected[i].IsSelected= true;
          }
        }
         console.log(this.selectedVesselContainer);
         console.log(this.sortedVesselsContainer);
         console.log(".---------------------------...");
     this.SortSelectedVessels();
     this.resetFuelStatusCount(vesselType, IsSelected);
     this.resetBunkerStatusCount(vesselType);
    }
  }

  /*********************** */
  resetBunkerStatusCount(vesselType: any){
    //alert(vesselType);
    console.log("RESET BUNKER STATUsssS");
    console.log(this.vesselList);
    console.log(this.vesselTypeSelected);
    //var k = {};
    var uniqueRequestStatus = [];
    for (var j=0; j<this.vesselList.length; j++){
      if(uniqueRequestStatus.indexOf(this.vesselList[j].Request.RequestStatus) === -1){
        uniqueRequestStatus.push(this.vesselList[j].Request.RequestStatus);
      }
      //console.log("RESET UNIQUE BUNKER STATUsssS");      
    }
    console.log("UNIQUE REQUEST STATUS");
    console.log(uniqueRequestStatus);
    //var filteredVesselType = {};
    this.bunkerStatusCountObj = {};
    console.log(this.vesselTypeSelected);
    if(vesselType == "All Vessels"){
      this.filteredVesselType = this.vesselList;
      //this.SetVesselTypeCounts();
    }else{
      this.filteredVesselType = this.vesselTypeSelected.filter(vessel => vessel.VesselType === vesselType);
    }
    //this.filteredVesselType = this.filteredVesselType.push(this.filteredVesselType);

    // this.sortedVesselss.push(this.filteredVesselType);
    
    // var returnedTarget = Object.assign(this.sortedVesselss, this.filteredVesselType);
    // console.log(this.sortedVesselss);
    // console.log(returnedTarget);
    //var counts = {};
    // for(var ii=0;ii<this.sortedVesselss.length;ii++)
    // this.sortedVesselss[ii].RequestStatus.forEach((x)=> { counts[x] = (counts[x] || 0)+1; });
    //   console.log(counts);

    // console.log(this.sortedVesselss[0][0]);
    // for(var k=0;k<this.sortedVesselss.length;k++){
    //   console.log(this.sortedVesselss[k][k].VesselName);
    // }
    //this.sortedVesselss.concat(this.filteredVesselType);
    // this.sortedVesselss = this.filteredVesselType;
    // var ss = {...this.sortedVesselss, ...this.filteredVesselType }
    // console.log(ss);
    //console.log(this.filteredVesselType);
    //console.log(object3);
    console.log("vvvv");
    //console.log(ss);
    for(var i in this.filteredVesselType){
      //alert(bunkerStatusCountObj[filteredVesselType[i].RequestStatus]);
      this.bunkerStatusCountObj[this.filteredVesselType[i].RequestStatus]=(this.bunkerStatusCountObj[this.filteredVesselType[i].RequestStatus]||0)+1; //increments count if element already exists
     }
     console.log(this.bunkerStatusCountObj);
     console.log("RESET BUNKER STATUS");
     for(var k=0;k<uniqueRequestStatus.length;k++){
      //alert(bunkerStatusCountObj[uniqueRequestStatus[k]]);
      if(this.bunkerStatusCountObj[uniqueRequestStatus[k]] == undefined){
        this.bunkerStatusCountObj[uniqueRequestStatus[k]] = 0
      }else{
        //this.bunkerStatusCountObj[uniqueRequestStatus[k]] = 
      }
     }
     console.log(this.bunkerStatusCountObj);
     ///console.log("bunkerStatusCountObj");
     //this.bunkerRequestStatusObj = {};
     console.log(this.bunkerRequestStatusObj);
     this.bunkerRequestStatusObj = this.bunkerStatusCountObj;
  }

  resetFuelStatusCount(vesselType: any,IsSelected){
    console.log("RESET FUEL STATUS");
    //alert(vesselType);
    //console.log(this.vesselTypeSelected);
    //console.log(this.vesselList);
    //this.fuelStatusCount =
    //alert(IsSelected);
    this.selectedVesselColorRed  = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('red')>=0 && vessel.VesselType === vesselType);
    this.selectedVesselColorOrange  = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('orange')>=0 && vessel.VesselType === vesselType);
    this.selectedVesselColorBlue  = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('blue')>=0 && vessel.VesselType === vesselType);
    //console.log(this.selectedVesselColor);
    if(!IsSelected){
      for (var i = 0; i < this.selectedVesselColorRed.length; i++) {
        this.fuelStatusCountRed.push(this.selectedVesselColorRed[i].VesselName.toLowerCase());
      }
      for (var i = 0; i < this.selectedVesselColorOrange.length; i++) {
        this.fuelStatusCountOrange.push(this.selectedVesselColorOrange[i].VesselName.toLowerCase());
      }
      for (var i = 0; i < this.selectedVesselColorBlue.length; i++) {
        this.fuelStatusCountBlue.push(this.selectedVesselColorBlue[i].VesselName.toLowerCase());
      }
    }
    if(IsSelected){
      for (var i = 0; i < this.selectedVesselColorRed.length; i++) {
        //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
        var index = this.fuelStatusCountRed.indexOf(this.selectedVesselColorRed[i].VesselName.toLowerCase()); // get index if value found otherwise -1
        //alert(index);
          if (index > -1) { //if found
          this.fuelStatusCountRed.splice(index, 1);
        }
      }

      for (var i = 0; i < this.selectedVesselColorOrange.length; i++) {
        //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
        var index = this.fuelStatusCountOrange.indexOf(this.selectedVesselColorOrange[i].VesselName.toLowerCase()); // get index if value found otherwise -1
        //alert(index);
          if (index > -1) { //if found
          this.fuelStatusCountOrange.splice(index, 1);
        }
      }

      for (var i = 0; i < this.selectedVesselColorBlue.length; i++) {
        //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
        var index = this.fuelStatusCountBlue.indexOf(this.selectedVesselColorBlue[i].VesselName.toLowerCase()); // get index if value found otherwise -1
        //alert(index);
          if (index > -1) { //if found
          this.fuelStatusCountBlue.splice(index, 1);
        }
      }
    }
    //console.log(this.fuelStatusCount);
    this.vesselByROB.red = this.fuelStatusCountRed.length;
    this.vesselByROB.amber = this.fuelStatusCountOrange.length;
    this.vesselByROB.blue = this.fuelStatusCountBlue.length;
    //console.log(this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('red')>=0 && vessel.VesselType === vesselType));

    this.data.fuelStatus = [
      { "FuelStatusCount": this.vesselByROB.red, IsSelected: false, Count: this.vesselByROB.red, Color: 'red' },
      { "FuelStatusCount": this.vesselByROB.amber, IsSelected: false, Count: this.vesselByROB.amber, Color: 'orange' },
      { "FuelStatusCount": this.vesselByROB.blue, IsSelected: false, Count: this.vesselByROB.blue, Color: 'blue' }
    ];

  }
  SortSelectedVessels(){

    //clone the vesselList
    //let vesselList=this.vesselList.slice(0);

    //this.vesselList=[];

    let selectedVesselList=this.vesselTypeSelected.filter(vessel=>vessel.IsSelected).
    sort((leftVessel,rightVessel):number=>{

        if(leftVessel.VesselName< rightVessel.VesselName)
          return -1;
        else if(leftVessel.VesselName> rightVessel.VesselName)
          return 1;
    });

    let unselectedVesselList=this.vesselTypeSelected.filter(vessel=>vessel.IsSelected==false).
    sort((leftVessel,rightVessel):number=>{

      if(leftVessel.VesselName< rightVessel.VesselName)
        return -1;
      else if(leftVessel.VesselName> rightVessel.VesselName)
        return 1;
    });


    this.vesselTypeSelected=selectedVesselList;

    unselectedVesselList.forEach((vessel)=>{
      this.vesselTypeSelected.push(vessel);
    });
  }
  

  /**Design System - GET VESSEl Typese */

  getVesselsTypes() {
    this.pldService.getVesselsTypes()
        .subscribe(
            (vesselTypes) =>{ this.vesselTypes = vesselTypes;
              console.log(this.vesselTypes);
            console.log("vessel types");
            this.vesselList = this.vesselTypes;
            this.vesselTypeSelected = this.vesselList;
            for (var i=0; i<this.vesselTypeSelected.length; i++){
              this.vesselTypeSelected[i].IsSelected = "True";
            }
              console.log("yyyyyyyyyyy");
              console.log(this.vesselList);
              console.log(this.vesselTypeSelected);
              console.log("zzzzzzzzzzzzzzzzz");
            this.requestList = this.vesselTypes;
            this.ResetVesselsOrder();
            //this.SetOtherFilterCounts();
            this.SetVesselTypeCounts();
            this.SetVesselsFuelStatus();
             
  });

}

SetVesselTypeCounts(){
   
  
   this.vesselByTypes = [{
    vesselType: 'All Vessels',
    vesselCount: this.vesselList.length,
    IsSelected: true

  }];
  var vesselListByTypeCount;
  var vesselListByStatusCount;
  /* fill vesselByTypes*/
  
  
  if(this.vesselTypes!=undefined)
  this.vesselTypes.forEach((vType) => {
    //console.log(vType);
    vesselListByTypeCount = this.vesselList.filter((vlist) => { return vlist.VesselType === vType.VesselType }).length;

    this.vesselByTypes.push({
      vesselType: vType,
      vesselCount: vesselListByTypeCount,
      IsSelected: false
    });
  });
  console.log(this.vesselByTypes);
  console.log("oooooooooooooo");
  var i;
  var uniqueVessels = ['All Vessels'];
  var uniqueVesselscount = [this.vesselList.length];
  var selected=[true];
  var vesselwithcount=[];
  
  for(i = 1; i< this.vesselByTypes.length; i++){    
    
    if(uniqueVessels.indexOf(this.vesselByTypes[i].vesselType.VesselType) === -1){
      
      uniqueVessels.push(this.vesselByTypes[i].vesselType.VesselType);
      uniqueVesselscount.push(this.vesselByTypes[i].vesselCount);
      selected.push(this.vesselByTypes[i].IsSelected);    
      
    }        
}
  
      for(i = 0; i < uniqueVessels.length; i++){
        //obj[newParamArr[i]] = paramVal[i];
        vesselwithcount.push({
          name:uniqueVessels[i],count:uniqueVesselscount[i],IsSelected:selected[i]
        });
        
      }

      
      //console.log(obj);
      this.vesselTypes = vesselwithcount;
      console.log("222222222222222");
      console.log(this.vesselTypes);
      

      /* Set Bunker Request Status */

      /* fill BunkerStatus*/
    this.bunkerRequest = [];
    console.log("Bunker Status");
    
    var vesselListByRequestCount;
    //console.log(this.vesselList);
    var bunkerRequestStatus = [];

    for ( i = 0; i < this.vesselList.length; i++ ) {
      bunkerRequestStatus.push(this.vesselList[i]["RequestStatus"]);
    }
    console.log(bunkerRequestStatus);
    console.log("6666666666666666666666666");
    //console.log(fileLicenses);
    this.bunkerRequestStatusObj = {};
    for(i = 0; i < bunkerRequestStatus.length; ++i) {
      if(!this.bunkerRequestStatusObj[bunkerRequestStatus[i]]) {
        this.bunkerRequestStatusObj[bunkerRequestStatus[i]] = 0;
      }

      ++this.bunkerRequestStatusObj[bunkerRequestStatus[i]];
    }
   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
console.log(this.bunkerRequestStatusObj);
      //console.log( this.keyCount );
      //console.log(typeof(this.keyCount))
  }

  SetVesselsFuelStatus(){
    console.log("Set Vessels Fuel Status");
    //console.log(this.vesselList);
    this.localService.getVesselsList().subscribe((res: any) => {
      this.vesselList =res;
      this.vesselList.sort(function(a, b){
                  var nameA=a.VesselName.toLowerCase(), nameB=b.VesselName.toLowerCase()
                  if (nameA < nameB) //sort string ascending
                      return -1 
                  if (nameA > nameB)
                      return 1
                  return 0 //default return value (no sorting)
              })
      console.log(res);
      this.vesselByROB.red = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('red')>=0).length;
      this.vesselByROB.amber = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('orange')>=0).length;
      this.vesselByROB.blue = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('blue')>=0).length;

      this.data.fuelStatus = [
        { "FuelStatusCount": this.vesselByROB.red, IsSelected: false, Count: this.vesselByROB.red, Color: 'red' },
        { "FuelStatusCount": this.vesselByROB.amber, IsSelected: false, Count: this.vesselByROB.amber, Color: 'orange' },
        { "FuelStatusCount": this.vesselByROB.blue, IsSelected: false, Count: this.vesselByROB.blue, Color: 'blue' }
      ];
      console.log(this.data.fuelStatus);
    })
  }

  /******Select Fuel Status check */
  selectVesselByFuelStatus(colorCode, IsSelected){
    //alert(colorCode+" "+IsSelected);
    //console.log("Fuel status Check");
    //console.log(this.vesselList);
    //alert(vesselType);
    console.log(this.data.fuelStatus);
    var selectedFuelStatus =[];
    selectedFuelStatus = this.data.fuelStatus.filter(x => x.IsSelected === true);
    console.log(selectedFuelStatus);
    console.log("select vessel fuel statussssss");
    
    // for (var i=0; i<this.data.fuelStatus.length; i++){
    //   this.data.fuelStatus[i].IsSelected = false;
    // }
    //vesselType = "All Vessels";
    
    //var selectedVesselColor = [];

    /****selected vessel list  */
    var selectedVesselTypes = this.getSelectedVesselTypes();
    console.log(selectedVesselTypes);
    //console.log(this.vesselList);
    // var ss = [];
    // for(var i=0;i<selectedVesselTypes.length;i++){
    //   ss.push(selectedVesselTypes[i].name);
    //   console.log(";;;;;;;;;;;;;;;;;;;;;;");
    // }
    // console.log(ss);
    
    console.log("@@@@@@@@@@@@");
    //console.log(this.vesselTypes);
    var vesselType = selectedVesselTypes[0].name;
    
    //alert(vesselType);
    //this.selectedVesselColor = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf(colorCode)>=0);
    if(vesselType == "All Vessels"){
      //alert("all");
      this.selectedVesselColor = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf(colorCode)>=0);
    }else{
      //alert("ccc");
      this.selectedVesselColor = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf(colorCode)>=0 && vessel.VesselType === vesselType);
      // for (var i = 0; i < selectedVesselTypes.length; i++) {
      // this.selectedVesselColor = this.vesselList.filter(function(vessel) { return vessel.ROB.Color.indexOf(colorCode)>=0 && vessel.VesselType === selectedVesselTypes[i].name});
      // }
    //   selectedVesselTypes.forEach(element => {
    //   element.isSelected = false;
    // });
    // console.log(selectedVesselTypes);
    // console.log(".,/,.,/,.,/,.,/,.,");
      // for(var i=0;i<this.vesselList.length;i++){
      //  if( this.vesselList[i].ROB.Color.indexOf(colorCode)>=0 && this.vesselList[i].VesselType === ss[i]){
      //   //this.selectedVesselColor
      //   //this.selectedVesselColor
      //   this.selectedVesselColor.push(this.vesselList[i]);
      //  } 
      // }

      // var xx = [];
      // this.vesselList.forEach((vType) => {
      //   //console.log(vType);
      //   for(var i=0;i<ss.length;i++){
      //   xx  = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf(colorCode)>=0 && vessel.VesselType === ss[i]);
        
      //   }
        
      // });
                           
      //this.selectedVesselColor.push(xx);
      //console.log(this.selectedVesselColor);

      console.log(this.selectedVesselColor);
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,");
    }
    // console.log("!!!!!!!!!!!!!!!");
    // console.log(this.selectedVesselColor);
    // vessel list
    //var sortedVessels = [];
  //   this.selectedVesselColor.map(function(item1){
  //     //console.log(item1.VesselName);
  //     sortedVessels.push(item1.VesselName.toLowerCase());
  //  })
  if(!IsSelected){
   for (var i = 0; i < this.selectedVesselColor.length; i++) {
    this.sortedVessels.push(this.selectedVesselColor[i].VesselName.toLowerCase());
    //alert(IsSelected);
    }
  }
    if(IsSelected){
      for (var i = 0; i < this.selectedVesselColor.length; i++) {
        //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
        var index = this.sortedVessels.indexOf(this.selectedVesselColor[i].VesselName.toLowerCase()); // get index if value found otherwise -1
        //alert(index);
          if (index > -1) { //if found
          this.sortedVessels.splice(index, 1);
        }
      }
    }
   console.log(this.sortedVessels);
   console.log(this.vesselList);
    console.log(this.vesselTypeSelected);
    console.log("...........................");
    //this.vesselTypeSelected.forEach(function (value) {
     // if(!IsSelected){
    for (var i = 0; i < this.vesselTypeSelected.length; i++) {
      if(this.sortedVessels.indexOf(this.vesselTypeSelected[i].VesselName.toLowerCase())==-1){
        this.vesselTypeSelected[i].IsSelected= false;
      }
      else{
        this.vesselTypeSelected[i].IsSelected= true;
      }
    }
  // }else{
  //   for (var i = 0; i < this.vesselTypeSelected.length; i++) {
  //     if(this.sortedVessels.indexOf(this.vesselTypeSelected[i].VesselName.toLowerCase())==-1){
  //       this.vesselTypeSelected[i].IsSelected= true;
  //     }
  //     else{
  //       this.vesselTypeSelected[i].IsSelected= false;
  //     }
  //   }
  // }
    //}); 
    this.SortSelectedVessels();
    console.log(this.vesselTypeSelected);
    console.log("gggggggggggggggggggggg");
    //console.log(this.vesselTypes);
    
    /****selected vessel list  */







    /* Set Bunker Request Status */
    console.log("!!!!!!!!!!!!!!!");
    console.log(this.selectedVesselColor);
    

    var bunkerStatusCountObjs = {};
    for(var ii in this.selectedVesselColor){
      //alert(bunkerStatusCountObj[filteredVesselType[i].RequestStatus]);
      bunkerStatusCountObjs[this.selectedVesselColor[ii].Request.RequestStatus]=(bunkerStatusCountObjs[this.selectedVesselColor[ii].Request.RequestStatus]||0)+1; //increments count if element already exists
     }
     console.log(bunkerStatusCountObjs);

     var uniqueRequestStatus = [];
    for (var j=0; j<this.vesselList.length; j++){
      if(uniqueRequestStatus.indexOf(this.vesselList[j].Request.RequestStatus) === -1){
        uniqueRequestStatus.push(this.vesselList[j].Request.RequestStatus);
      }
      //console.log("RESET UNIQUE BUNKER STATUsssS");      
    }

    console.log(uniqueRequestStatus);

     for(var k=0;k<uniqueRequestStatus.length;k++){
      //alert(bunkerStatusCountObj[uniqueRequestStatus[k]]);
      if(bunkerStatusCountObjs[uniqueRequestStatus[k]] == undefined){
        bunkerStatusCountObjs[uniqueRequestStatus[k]] = 0
      }else{
        //this.bunkerStatusCountObj[uniqueRequestStatus[k]] = 
      }
     }
     //bunkerStatusCountObjs[isSelected] = false;
     this.bunkerRequestStatusObj = bunkerStatusCountObjs;
    //console.log(this.bunkerRequestStatusObj);
   //console.log("vvvvvvvvvvvvvvvvvvvvvv");
    /* Set Bunker Request Status */
    
    // console.log("*************,,,,");
    // selectedVesselTypes.forEach(element => {
    //   element.IsSelected = false;
    // });
    // console.log(selectedVesselTypes);
  }
 
  selectVesselByRequestStatus(EnquiryStatus, event){
    
    // this.myCheckboxes.forEach(element => {
    //   element.checked = false;
    // });
    // alert("");
    //alert(event.checked);
    //console.log(event.checked);

    //this.isChecked = !this.isChecked;
    // if(this.isChecked){
    //   this.isChecked = false;
    // }else{
    //   this.isChecked = true;
    // }
    /*Select a Vessel List*/ 
    var selectedVesselTypes=this.getSelectedVesselTypes();
    var vesselType = selectedVesselTypes[0].name;
    console.log(this.vesselList);
    if(vesselType == "All Vessels"){
      //alert("all");
      this.selectedVesselColor = this.vesselList.filter(vessel => vessel.Request.RequestStatus.indexOf(EnquiryStatus)>=0);
    }else{
      //alert("ccc");
      this.selectedVesselColor = this.vesselList.filter(vessel => vessel.Request.RequestStatus.indexOf(EnquiryStatus)>=0 && vessel.VesselType === vesselType);
    }
    console.log(this.selectedVesselColor);
    //var sortedVessels = [];
  //   this.selectedVesselColor.map(function(item1){
  //     //console.log(item1.VesselName);
  //     sortedVessels.push(item1.VesselName.toLowerCase());
  //  })
   
  if(event.checked){
    for (var i = 0; i < this.selectedVesselColor.length; i++) {
     this.sortedVessels.push(this.selectedVesselColor[i].VesselName.toLowerCase());
     //alert(IsSelected);
     }
   }
   if(!event.checked){
    for (var i = 0; i < this.selectedVesselColor.length; i++) {
      //alert(this.selectedVesselColor[i].VesselName.toLowerCase());
      var index = this.sortedVessels.indexOf(this.selectedVesselColor[i].VesselName.toLowerCase()); // get index if value found otherwise -1
      //alert(index);
        if (index > -1) { //if found
        this.sortedVessels.splice(index, 1);
      }
    }
  }

  console.log(this.sortedVessels);
  console.log(this.vesselTypeSelected);
  console.log("./././////././//.");

  for (var i = 0; i < this.vesselTypeSelected.length; i++) {
    if(this.sortedVessels.indexOf(this.vesselTypeSelected[i].VesselName.toLowerCase())==-1){
      this.vesselTypeSelected[i].IsSelected= false;
    }
    else{
      this.vesselTypeSelected[i].IsSelected= true;
    }
  }

    // this.vesselTypeSelected.forEach(function (value) {
    //   if(sortedVessels.indexOf(value.VesselName.toLowerCase())==-1){
    //     value.IsSelected= false;
    //   }
    //   else{
    //     value.IsSelected= true;
    //   }
    // }); 
    this.SortSelectedVessels();
    /*Select a Vessel List*/

    /**Set Fuel Status Count */
    if(vesselType == "All Vessels"){
      this.vesselByROB.red = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('red')>=0 && vessel.Request.RequestStatus === EnquiryStatus ).length;
    this.vesselByROB.amber = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('orange')>=0 && vessel.Request.RequestStatus === EnquiryStatus).length;
    this.vesselByROB.blue = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('blue')>=0 && vessel.Request.RequestStatus === EnquiryStatus).length;
    }else{
    this.vesselByROB.red = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('red')>=0 && vessel.VesselType === vesselType && vessel.Request.RequestStatus === EnquiryStatus ).length;
    this.vesselByROB.amber = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('orange')>=0 && vessel.VesselType === vesselType && vessel.Request.RequestStatus === EnquiryStatus).length;
    this.vesselByROB.blue = this.vesselList.filter(vessel => vessel.ROB.Color.indexOf('blue')>=0 && vessel.VesselType === vesselType && vessel.Request.RequestStatus === EnquiryStatus).length;
    }
    //alert(this.vesselByROB.red);

    this.data.fuelStatus = [
      { "FuelStatusCount": this.vesselByROB.red, IsSelected: false, Count: this.vesselByROB.red, Color: 'red' },
      { "FuelStatusCount": this.vesselByROB.amber, IsSelected: false, Count: this.vesselByROB.amber, Color: 'orange' },
      { "FuelStatusCount": this.vesselByROB.blue, IsSelected: false, Count: this.vesselByROB.blue, Color: 'blue' }
    ];

    /**Set Fuel Status Count */

    /**Set Vessel Type By Request Status -START*/
    console.log(this.vesselTypes);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  }
  /**
   * Gets the Selected Vessel type for filtering
   */
  getSelectedVesselTypes(): Array<any> {
    return this.vesselTypes.filter((x) => {
      return x.IsSelected === true;
    });

  }

  
  // getSelectedFuelStatus(): Array<any> {
  //   return this.data.fuelStatus.filter((x) => {
  //     return x.IsSelected === true;
  //   });

  // }


/**Vessel filter search box */

  searchVesselList(){
    this.searchVesselsList = this.vesselList;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ApplyFilters(event) {
    //alert("ss");
    this.dialogRef.close();
  }
}
