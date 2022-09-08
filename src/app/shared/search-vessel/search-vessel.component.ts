import { ChangeDetectionStrategy, Component, OnChanges, OnInit, ViewChild, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { GeneralModel } from '../models/generic.model';
import { Broadcaster } from '../../planning-dashboard/services/broadcaster';
import { PlanningDashboardService } from '../../planning-dashboard/services/planning-dashboard.service';

@Component({
  selector: 'app-search-vessel',
  templateUrl: './search-vessel.component.html',
  styleUrls: ['./search-vessel.component.scss']
})
export class SearchVesselComponent implements OnChanges, OnInit {
  vesselvalues :any[];
  options: string[] = ['One', 'Two', 'Three'];
  
  @Input() IsFilterSearch:boolean=false;

  @Input() vesselList:any[];

  @Input() searchedVesselIMONO:number;

  selectedVesselName:string='';

  searchVesselLabel:string;

  searchVesselLabels:any[]=[
    {Key:'SearchOnly',Value:'Search'},
    {Key:'Search & Select',Value:'Search & Select Vessels'}
  ];

  _isFilterSearchEnabled:boolean;
  isEnabled:boolean;

  @Input('isEnabled')  set _isEnabled(val){
    
    // if(val)
    //   this.serachVesselControl.enable();
    // else
    //   this.serachVesselControl.disable();
    this.isEnabled=val;
    
  }

  @Input('isFilterSearchEnabled')  set isFilterSearchEnabled(val:boolean){
    this._isFilterSearchEnabled=val;
    if(val)
      this.searchVesselLabel=this.searchVesselLabels[0].Value;
    else
      this.searchVesselLabel=this.searchVesselLabels[1].Value;
    
  }

  get isFilterSearchEnabled(){
    return this._isFilterSearchEnabled;
  }


  @Output()
  searchClick:EventEmitter<any>=new EventEmitter<any>();

  @ViewChild('acVessel', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;

  // @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  filteredVesselList: Observable<string[]>;
  serachVesselControl = new FormControl();
  
  constructor(private objBroadcaster:Broadcaster, private pldService:PlanningDashboardService) {

    // this.groupedVesselList = groupByService.groupBy(this.vesselList, 'VesselId');

    //this.pldService.getVesselMaster().subscribe((vessels:any[])=>{

    //  this.vesselList=vessels;

    //});

  }

  ngOnInit() {

    //console.log("xxxxxxxxxxxuuuuuuuuu");
    //console.log(this.vesselList);
    //console.log("xxxxxxxxxxxuuuuuuuuu");
    this.refreshSearchList();

    //NOTE: In case of isFilterSearch=TRUE, it denotes Vessel Filter search, which can add more vessels to the searched
    //vessel, so 'SearchedVesselIMONO' is VOID in this case, since multiple vessel IMONOs are required
    if(this.IsFilterSearch)
    localStorage.setItem('SearchedVesselIMONO', "-1");

    if(this.searchedVesselIMONO==undefined)
    {
      var setVesselIMONO=localStorage.getItem('SearchedVesselIMONO');
      this.searchedVesselIMONO=setVesselIMONO!=undefined?+setVesselIMONO:-1;
    }
    
    this.setVesselNameAsDisplay(this.searchedVesselIMONO);

    this.objBroadcaster.on('ClearSearchedVesselIMONO').subscribe((res)=>{

      this.searchedVesselIMONO=-1;

      localStorage.setItem('SearchedVesselIMONO', "-1");

      setTimeout(() => {
        this.serachVesselControl.setValue("");
      }, 20);

    });

	this.pldService.masterVesselListEmitter.subscribe((res)=>{

      if(typeof res=="object" && res.Key!=undefined && res.Key=="searchVesselFilterList"){

      var currentFilter = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));

        if(this.IsFilterSearch || currentFilter==undefined || currentFilter.ConditionApplied.VesselByNames==undefined 
          || currentFilter.ConditionApplied.VesselByNames.length<=0)
          {
            //fill vesselList with masterList
            
              this.vesselList=res.Value;
          }
          else{
            if(res.Value==undefined || res.Value.length==undefined)
            return;



            this.vesselList=this.pldService.filterData(res.Value);
          }
        }

    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("zzzzzzzzzzzzzz");
    //console.log(this.vesselList);
    // console.log("zzzzzzzzzzzzzz");
    // console.log(changes);
    if(this.vesselvalues==null)
      return;
      
    this.vesselvalues = this.vesselList;
    this.vesselvalues.sort(function(a, b){
          var nameA=a.VesselName.toLowerCase(), nameB=b.VesselName.toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
      })

    //this.refreshSearchList();
    // if(changes.isEnabled)
    // return;
    
    // if(changes.vesselList!=undefined && changes.vesselList.currentValue!=undefined){
    //   this.vesselList=changes.vesselList.currentValue
    //   this.refreshSearchList();
    // }
  }

  private _filter(inputTypingTextvalue: string): string[] {

    if(inputTypingTextvalue==undefined)
    return;

    const filterValue = inputTypingTextvalue.toLowerCase();

    if(filterValue.length>=3)
    return this.vesselList.filter(vessel => vessel.VesselName.toLowerCase().includes(filterValue));
    else
    return this.vesselList;
  }

  private refreshSearchList(){
    
    this.filteredVesselList = this.serachVesselControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  SearchClick(event){
    //alert("sss");

    if(this.IsFilterSearch)
    {
      this.searchClick.emit(<GeneralModel>{Id:0,Value:'click'});
      return;
    }

    this.searchClick.emit('click');
  }

  onVesselSelected(event:any){

    if(this.IsFilterSearch)
    {
      this.searchedVesselIMONO=event.option.value;
      
      this.searchClick.emit(<GeneralModel>{Id:event.option.value,Value:'click'});
      this.setVesselNameAsDisplay(event.option.value);
      return;
    }

    this.selectedVesselName=this.vesselList.find(x=>x.VesselIMONO==event.option.value).VesselName;
	this.setVesselNameAsDisplay(event.option.value);
    localStorage.setItem('SearchedVesselIMONO', event.option.value);
    this.searchClick.emit(event.option.value);

  }

  
  checkEmptyValue(event:any){
    //alert("sss");

    if((event.key=="Backspace" || event.key=="Delete"))
    {
      //From vessel-filter component
      if(this.IsFilterSearch)
      {
        if(event.target!=undefined && event.target.value!=undefined && parseInt(event.target.value)!=NaN)
        {
          if(event.target.value==""){
          this.searchedVesselIMONO=-1;
          }

          //this.setVesselNameAsDisplay(this.searchedVesselIMONO);
          this.searchClick.emit(<GeneralModel>{Id:<number>this.searchedVesselIMONO,Value:'emptysearch'});
          return;
        }

        this.searchClick.emit(<GeneralModel>{Id:0,Value:'emptysearch'});
        return;
      }

      //From map or table component
      if(event.target.value.length==0)
        this.searchClick.emit('emptysearch');
      else
        // this.objBroadcaster.broadcast('partsearch');
        this.pldService.masterVesselListEmitter.emit('searchVesselFilterList');
    }

  }
  clearSearch(){
    this.serachVesselControl.setValue("");

    this.searchClick.emit('emptysearch');

  }

  setVesselNameAsDisplay(searchedVesselIMONO){
    if(searchedVesselIMONO!=undefined && searchedVesselIMONO>0)
    {
      

      var searchedVessel = this.vesselList.find(x=>x.VesselIMONO==searchedVesselIMONO);

      setTimeout(() => {
        if(searchedVessel!=undefined)
        // console.log(this.matAutocomplete.options.first);
        // this.matAutocomplete.options.first.select();

        this.serachVesselControl.setValue(searchedVessel.VesselName);
      }, 10);
      

    }
  }

}
