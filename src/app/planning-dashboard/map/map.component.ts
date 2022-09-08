/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ComponentRef, ViewRef, ChangeDetectorRef, ApplicationRef, NgZone, Injector, ComponentFactoryResolver } from '@angular/core';
import { mapStyleCss } from './mapStyle';
import { PlanningDashboardService } from '../services/planning-dashboard.service';
import { VesselDataModel, VesselLocation } from '../../shared/models/vessel.data.model';
import { MarkerType } from '../../shared/enums/marker-types.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Broadcaster } from '../services/broadcaster';
import { LocalService } from 'src/app/services/local-service.service';
// import { VesselClickComponent } from './vessel/vessel.click.component/vessel.click.component.component';
import { GeneralModel } from '../../shared/models/generic.model';
import { PlanningDashboardViews } from '../../shared/enums/pld-views.enum';
import {VesselInfoComponent} from '../vessel-info/vessel-info.component';
import {LocationHoverComponent} from '../location-hover/location-hover.component';
import {Vessel2TabsComponent} from '../vessel2-tabs/vessel2-tabs.component';
import {Location2InfoComponent} from '../location2-info/location2-info.component';
import { OverlayHelper, OverlayData, OverlayPosition } from '../services/util-functions/map-overlay';

@Component({
  selector: 'pld-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  showLoading = true;
  vesHoverCompRef: ComponentRef<VesselInfoComponent>;
  locHoverCompRef: ComponentRef<LocationHoverComponent>;
  title = 'Planning DashBoard';
  vesselSearch = '';
  //vesHoverCompRef: ComponentRef<VesselHoverComponent>;
  //locHoverCompRef: ComponentRef<LocationHoverComponent>;
  currentVesselClickIMO = '';
  lastValidCenter: any;
  currentZoom = 3;
  minZoomLevel = 3;
  lastZoom = 3;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public secaRegionsList: any;
  public vesselByROB: any;
  public RequestStatusColorCode:any;
  IsAutoComplete: boolean = true;
  countryMarkers: any[];
  portMarkers: any[] = [];
  portMarkersZoom: any[] = [];
  vesselMarkers: any[] = [];
  infoWindows: any[];
  vesselOverlays: any[];
  routeLines = [];
  vesselGlowPathMarkers: any[] = [];
  locationGlowMarkers: any[] = [];
  public TodayMarketPriceList: any;
  autoCompleteSelectedVessel: number = 0;
  locInfoWindows: any[] = [];
  public selectedFillterTag="";
  public tagfillterData=[
    {
      name:'Strategy',
      count:'172',
      color:'#F08827'
    },
    {
      name:'Created',
      count:'04',
      color:'#E35154'
    },
    {
      name:'Planned',
      count:'04',
      color:'#E5C258'
    },
    {
      name:'Questionnaire',
      count:'02',
      color:'#E35154'
    },
    {
      name:'Validated',
      count:'00',
      color:'#E35154'
    },
    {
      name:'Inquired',
      count:'02',
      color:'#E5C258'
    },
    {
      name:'Quoted',
      count:'04',
      color:'#E5C258'
    },
    {
      name:'Stemmed',
      count:'01',
      color:'#1AB346'
    }
  ];
  
  searchedVesselIMONO: number;
  @Input('TodayMarketPriceList') set _TodayMarketPriceList(val) {
    this.TodayMarketPriceList = val;

  }

  @Input('vesselByROB') set _vesselROB(val) {
    this.vesselByROB = val;

  }

  @Input('RequestStatusColorCode') set _RequestStatusColorCode(val){
    this.RequestStatusColorCode = val;
  }

  vesselIcon = {
    "red": "#eb5757",
    "orange": "#f9c375",
    "blue": "#1cabe0",
    "green": "#008000"
  };

  @Input('secaRegionsList') set _secaRegionsList(val) {
    this.secaRegionsList = val;
    if (this.secaRegionsList != undefined) {
      for (let j = 0; j < this.secaRegionsList.features.length; j++) {
        var currItem = this.secaRegionsList.features[j].geometry;
        var boundaries = this.returnBoundaries(currItem.coordinates[0]);
        this.drawPolyGon(boundaries)
      }
    }
  }
  public vesselList: Array<VesselDataModel>
  @Input('vesselList') set _vesselList(val) {
    console.log("DATAS*" + val);
    this.vesselList = val;
    this.loadMap();

  }
  EnquiryStatus: string[];

  lastUpdatedOn: string ="Today 10:45:08";

  @Input('lastUpdatedOn') set _lastUpdatedOn(val) {
    this.lastUpdatedOn = val;
  }
  @Input() vesselTypes: string[];
  @Input() BunkerStatus: string[];
  @Input() availableFilters: any;

  @Input('chipListForFilters') set _chipListForFilters(val) {
    this.chipListForFilters = val;
  }
  chipListForFilters = [];
  tableName = 'PlanningDashboard';
  UserName = localStorage.getItem('userInfo') == undefined ? 'admin@inatech.com' : localStorage.getItem('userInfo');
  TenantId = 4;
  filterModel: any;

  @Output() showTableViewEmit = new EventEmitter();
  @Output() saveFilterPreference = new EventEmitter();
  @Output() applyFilterPreference = new EventEmitter();
  @Input() searchSelectedVessel: any;
  @Input() VoyageDetails: any;

  ports: any;
  @Input('ports') set _ports(val) {
    this.ports = val;
    // this.addPorts();
    console.log(this.ports);
  }

  private currentselectedFillterTag;
  filterChipClick(item){
    let currentselectedFillterTag = this.selectedFillterTag;
    if(item !=null)
     this.selectedFillterTag = this.selectedFillterTag!=item.name?item.name:'';
    else
      this.selectedFillterTag ='';
    this.vesselMarkers.forEach((vmarker) => {
      vmarker.setMap(null);
    });
    this.vesselGlowPathMarkers.forEach((gmarker) => {
      gmarker.setMap(null);
    });
    // if(currentselectedFillterTag != this.selectedFillterTag){
      if(this.selectedFillterTag !=''){     
        this.getVesselsFromBackend(true);
      }
      else{
          this.getVesselsFromBackend(false);
      }
    // }
    this.currentselectedFillterTag = this.selectedFillterTag;
  }
  setZoom(mode) {

    if (mode === 'in') {
      this.currentZoom = this.currentZoom + 1;
      console.log('this.currentZoom = ' + this.currentZoom)
      if (this.currentZoom > 8) {
        this.currentZoom = 8;
      }
      else
        this.map.setZoom(this.currentZoom);
    }
    else {
      this.currentZoom = this.currentZoom - 1;
      console.log('this.currentZoom = ' + this.currentZoom)

      if (this.currentZoom < 3) {
        this.currentZoom = 3;
      }
      else
        this.map.setZoom(this.currentZoom);
    }
  }
  setFilter(filters: any) {

    // var filter = this.availableFilters.find(x => x.filterName == filterName);
    // if (filter !== undefined) {
    //   this.applyFilterPreference.emit(filter);
    // }

    var filter = this.availableFilters.find(x => x.FilterId == filters.FilterId);
    if (this.availableFilters != null && this.availableFilters.length > 0) {
      if (filter !== undefined && filter.FilterName !== 'Default') {
        this.applyFilterPreference.emit(filter);
      }
      else if (typeof filters === 'string' && filters.toLowerCase() === 'more') {
        this.expandRegions();
      }
      else {
        this.applyFilterPreference.emit({ FilterName: 'Default', ConditionApplied: {} });
      }
    }
  }
  // Set the Map to Bound Region
  setOutOfBoundsListener() {
    google.maps.event.addListener(this.map, 'dragend', () => {
      this.checkLatitude();
    });
    // google.maps.event.addListener(this.map, 'idle', () => {
    //   this.checkLatitude();
    // });
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      this.checkLatitude();
    });
  }

  checkLatitude() {
    if (this.minZoomLevel) {
      if (this.map.getZoom() < this.minZoomLevel) {
        this.map.setZoom(this.minZoomLevel);
        this.currentZoom = this.minZoomLevel;
      }
    }

    var bounds = this.map.getBounds();
    if (bounds !== undefined) {

      var sLat = this.map.getBounds().getSouthWest().lat();
      var nLat = this.map.getBounds().getNorthEast().lat();
      if (sLat < -85 || nLat > 85) {
        //the map has gone beyone the world's max or min latitude - gray areas are visible
        //return to a valid position
        if (this.lastValidCenter) {
          this.map.setCenter(this.lastValidCenter);
        }
      }

      else {
        this.lastValidCenter = new google.maps.LatLng(38.185380, -10.964288);
      }

    }
  }
  /**
  * Pans the Map to Particular region
  * @param RegionName 
  */
  // panToRegion(RegionName) {


  //   var region = this.regionsList.find(x => x.Name == RegionName);
  //   var regionIndex = this.regionsList.findIndex(x => x.Name == RegionName);

  //   if (region !== null) {
  //     var latLng = new google.maps.LatLng(parseFloat(region.coordinates[0].lat), parseFloat(region.coordinates[0].long));
  //     this.map.panTo(latLng);
  //     this.map.setZoom(region.zoomLevel);
  //     var defaultedFilterIndex = this.regionsList.findIndex(x => x.IsDefault == true);
  //     if (defaultedFilterIndex > -1) {
  //       this.regionsList[defaultedFilterIndex].IsDefault = false;

  //     }
  //     this.regionsList[regionIndex].IsDefault = true;

  //   }
  // }

  /**
   * Sets the Type of the Map to set Our custom Style
   * @param mapTypeId 
   */
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }
  /**
   * Sets the ECA Boundaries
   * @param arrayOfCods 
   */
  returnBoundaries(arrayOfCods): any {
    var returnArr = [];
    for (var i = 0; i < arrayOfCods.length; i++) {
      var currentObj = arrayOfCods[i];
      var obj = { lat: currentObj[1], lng: currentObj[0] }
      returnArr.push(obj);

    }
    return returnArr;
  }
  ngOnInit() {

    //SECA From MongoDB 
    // this.objBackendServices.getSecaRegions().subscribe(res => {
    //   if (res != undefined) {
    //     this.secaRegionsList = res;
    //     
    //     for (let j = 0; j < res.length; j++) {
    //       var currItem = res[j];
    //       var boundaries = this.returnBoundaries(currItem.coordinates[0]);
    //       this.drawPolyGon(boundaries)
    //     }
    //   }

    // });
    this.loadMap();
    // this.objPlanningDashboardService.vesselListEmitter.subscribe((vessels) => {
    // console.log("DATASS"+vessels);
    //   setTimeout(() => {
    //     this.vesselList = vessels;

    //     if (!(this.cd as ViewRef).destroyed) {
    //       this.cd.detectChanges()

    //     }
    //   }, 10);

    // });

    // this.objPlanningDashboardService.refreshVesselListEmitter.subscribe((vessels) => {
    //   this.vesselList = vessels;
    // });


    // this.broadCast.on('filterDelete').subscribe((res) => {
    //   let filterIndex = this.chipListForFilters.indexOf(res);

    //   this.chipListForFilters.splice(filterIndex, 1);
    // });

    // this.broadCast.on('filterAdd').subscribe((res) => {
    //   this.chipListForFilters.push(res);
    // });

    // var searchedVesselAnother = [];
    // var PreviousSearchedVessel;

    // this.objPlanningDashboardService.searchVesselMasterEmitter.subscribe((selectedVessel) => {

      // if (typeof (selectedVessel) == 'boolean') {
      //   this.IsAutoComplete = selectedVessel;
      // }

      //TODO: Apply the searched & selected vessel style, for the abv finded vessel
      // var searchedVessel = this.vesselList.find(vessel=>vessel.VesselIMONO==selectedVessel);

      // var destinationCords = {
      //   lat: 0,
      //   lng: 0
      // };
      // var isRotation = false;
      // if (searchedVessel.VoyageDetails != undefined && searchedVessel.VoyageDetails != null && searchedVessel.VoyageDetails.length > 0) {


      //   destinationCords = searchedVessel.VoyageDetails.find(x => x.name === searchedVessel.EndLocation.LocationName);
      //   if (destinationCords != null) {
      //     isRotation = true;
      //   }
      // }

      // var iconForVesselMarker = {
      //   path: "M17.8,22.3l-7.9,5.9l7.6-21.8l7.7,21.5L17.8,22.3z",
      //   strokeColor: '#E7ECED',
      //   fillColor: searchedVessel.ROB.Color.indexOf('green') > -1 ? '#008000' : searchedVessel.ROB.Color.indexOf('green') > -1 ? '#008000' : '#008000',
      //   fillOpacity: 1,
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(0, 0),
      //   draggable: false,
      //   strokeWeight: 10.5,
      //   rotation: isRotation ? this.angleFromCoordinate(searchedVessel.EndLocation.Latitude, searchedVessel.EndLocation.Longitude, destinationCords.lat, destinationCords.lng) : 0
      // };

      // this.editMarker({ "lat": searchedVessel.CurrentLocation.Latitude, "lng": searchedVessel.CurrentLocation.Longitude }, iconForVesselMarker);

      // searchedVesselAnother.push(searchedVessel);

      // var searchedVesselAnotherLength = searchedVesselAnother.length;
      // if(searchedVesselAnotherLength > 1)
      // {
      //   PreviousSearchedVessel=searchedVesselAnother[searchedVesselAnother.length-2];
      //   var iconForVesselMarker1 = {
      //     path: "M17.8,22.3l-7.9,5.9l7.6-21.8l7.7,21.5L17.8,22.3z",
      //     strokeColor: '#E7ECED',
      //     fillColor: PreviousSearchedVessel.ROB.Color.indexOf('red') > -1 ? '#eb5757' : PreviousSearchedVessel.ROB.Color.indexOf('orange') > -1 ? '#f9c375' : '#1cabe0',
      //     fillOpacity: 1,
      //     origin: new google.maps.Point(0, 0),
      //     anchor: new google.maps.Point(0, 0),
      //     draggable: false,
      //     strokeWeight: .5,
      //     rotation: isRotation ? this.angleFromCoordinate(PreviousSearchedVessel.EndLocation.Latitude, PreviousSearchedVessel.EndLocation.Longitude, destinationCords.lat, destinationCords.lng) : 0
      //   };

      //   this.editMarker({ "lat": PreviousSearchedVessel.CurrentLocation.Latitude, "lng": PreviousSearchedVessel.CurrentLocation.Longitude }, iconForVesselMarker1);
      //   if(searchedVesselAnotherLength > 2)
      //     searchedVesselAnother.splice(0, 1);
      // }
    // });

    // this.broadCast.on('SearchedVessel').subscribe((res: number) => {
    //   this.searchedVesselIMONO = res;
    // });

    // this.broadCast.on('refreshSearchedVesselList').subscribe((res: any[]) => {

    //   if (res.length != undefined) {

    //     this.vesselList = res;

    //     // this.loadMap();
    //   }

    // });

  }

  editMarker(myLatLng, iconBase) {

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      icon: iconBase
    });
  }

  // drawOverlay() {
  //   let objOverlay: OverlayHelper = new OverlayHelper();
  //   var overlay = objOverlay.ionViewDidLoad(this.map, this.ports);

  //   overlay.setMap(this.map);
  // }

  // OnCommentDivHover(event, vesselIMONO, voyageCode) {
  //   let div = document.getElementById('divCommenthover');

  //   if (this.vesHoverCompRef) this.vesHoverCompRef.destroy();

  //   var currentVessel = this.vesselList.find(x => x.VesselIMONO == vesselIMONO);


  // }

  loadMap() {


    var mapProp = {

      center: new google.maps.LatLng(38.185380, -10.964288),
      zoom: this.minZoomLevel,
      zoomControl: false,
      minZoom: 3,
      maxZoom: 8,
      // zoomControlOptions: {
      //   position: google.maps.ControlPosition.RIGHT_BOTTOM,
      //   style: google.maps.ZoomControlStyle.SMALL,
      // },
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['myStyle']
      }

    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // this.setOutOfBoundsListener();
    //Rendering the Map

    this.map.mapTypes.set('myStyle', mapStyleCss);
    this.map.setMapTypeId('myStyle');

    // Applying the Styles

    this.getVesselsFromBackend(false);
    // debugger 
    var mapWrapper: any = document.getElementById('wrapper');
    if (mapWrapper !== undefined)
      mapWrapper.firstElementChild.style.position = 'fixed';
    var cords = this.VoyageDetails;
    // this.addPorts();
    var searchedIMO = localStorage.getItem('SearchedVesselIMONO');
    if (searchedIMO !== null && searchedIMO !== undefined
      && searchedIMO !== "" && searchedIMO !== "-1" && searchedIMO !== "0") {
      //this.setSearchedVesselList(searchedIMO);
      setTimeout(() => {
        if (document.getElementsByClassName('gm-ui-hover-effect') != undefined && document.getElementsByClassName('gm-ui-hover-effect').length > 0)
          var ds: any = document.getElementsByClassName('gm-ui-hover-effect')[0];

        if (ds != undefined)
          ds.click();
        this.addPorts();
      }, 900)
      this.autoCompleteSelectedVessel = parseInt(searchedIMO);
    }


    if (this.secaRegionsList != undefined) {
      for (let j = 0; j < this.secaRegionsList.features.length; j++) {
        var currItem = this.secaRegionsList.features[j].geometry;
        var boundaries = this.returnBoundaries(currItem.coordinates[0]);
        this.drawPolyGon(boundaries)
      }
    }

    // this.drawOverlay();
    // google.maps.event.addListener(this.map, 'click', function (event) {

    //   console.log("click ==> Lat = " + event.latLng.lat() + " Lng = " + event.latLng.lng())
    // });
    // this.showLoading = false;

  }

  /**
   * Finds the Bearing Angle for Vessel using Current LatLng to Destination LatLng
   * @param lat1 
   * @param long1 
   * @param lat2 
   * @param long2 
   */
  angleFromCoordinate(lat1: number, long1: number, lat2: number, long2: number): number {
    var y = Math.sin(this.degreeToRadian(long2 - long1)) * Math.cos(this.degreeToRadian(lat2));
    var x = Math.cos(this.degreeToRadian(lat1)) * Math.sin(this.degreeToRadian(lat2)) - Math.sin(this.degreeToRadian(lat1)) * Math.cos(this.degreeToRadian(lat2)) * Math.cos(this.degreeToRadian(long2 - long1));

    var bearingAngle = Math.atan2(y, x);
    bearingAngle = this.radianToDegree(bearingAngle);

    return bearingAngle;

    // var PI = 3.14159;
    // var lat1 = lat1 * PI / 180;
    // var long1 = long1 * PI / 180;
    // var lat2 = lat2 * PI / 180;
    // var long2 = long2 * PI / 180;

    // var dLon = (long2 - long1);

    // var y = Math.sin(dLon) * Math.cos(lat2);
    // var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
    //   * Math.cos(lat2) * Math.cos(dLon);

    // var brng = Math.atan2(y, x);

    // brng = this.radianToDegree(brng);
    // brng = (brng + 360) % 360;

    // return brng;

  }
  /**
   * Converts Degree To Radian
   * @param angle 
   */
  degreeToRadian(angle: any) {
    return Math.PI * angle / 180.0;
  }
  /**
   * Converts Radian to Degree
   * @param angle 
   */
  radianToDegree(angle: any) {
    return angle * (180.0 / Math.PI);
  }
  /**
   * Show / Hide Regions List
   */
  expandRegions() {
    this.broadCast.broadcast('expandFilters', event);
  }

  /**
   * Method To Add ports and mark it in the map
   */
  addPorts() {
    if (this.ports !== undefined) {
      for (let kk = 0; kk < this.ports.length; kk++) {
        // setTimeout(() => {

          this.addMarker(kk, this.ports[kk], '../../../assets/customicons/major-port.svg', "port");
        // }, 200);
        setTimeout(() => {

          this.removeInfoWindowCloseByClassName('majorPortDiv');

          // this.removeInfoWindowCloseByClassName('major-port-hover');
          this.removeInfoWindowCloseByClassName('minor-port-hover');
        }, 100);
      }



    }
  }

  /**
   * Removes the INfowindow X Button and Div
   */
  removeVesselMarkerById(Id) {
    var portInforWindow: Element = document.getElementById(Id);
    if (portInforWindow != null) {

      var portInforWindowParent: any = portInforWindow.parentElement.parentElement.parentElement;
      if (portInforWindowParent != null && portInforWindowParent.firstElementChild !== undefined && portInforWindowParent.firstElementChild.children.length > 2) {


        portInforWindowParent.firstElementChild.children[2].firstChild.style.left = '205px';

        portInforWindowParent.firstElementChild.children[2].firstChild.style.top = '-126px';
        portInforWindowParent.firstElementChild.children[2].firstChild.style.transform = 'rotate(270deg)';



        portInforWindowParent.firstElementChild.children[2].lastChild.style.left = '205px';

        portInforWindowParent.firstElementChild.children[2].lastChild.style.top = '-142px';
        portInforWindowParent.firstElementChild.children[2].lastChild.style.transform = 'rotate(270deg)';

        var divtoCopy = portInforWindowParent.firstElementChild.children[2]
        divtoCopy.lastChild.firstChild.style.background = '#37414F';
        divtoCopy.firstChild.firstChild.style.background = '#37414F';

        divtoCopy.lastChild.firstChild.style.boxShadow = '';
        divtoCopy.firstChild.firstChild.style.boxShadow = '';
        if (portInforWindowParent.firstChild != null) {

          portInforWindowParent.firstChild.remove()

        }
        if (portInforWindowParent.lastChild != null) {

          portInforWindowParent.lastChild.remove()

        }
        // portInforWindowParent.append(divtoCopy);
        portInforWindowParent.append(divtoCopy);


      }
    }
  }

  /**
   * Removes the INfowindow X Button and Div
   */
  removePortMarkerById(Id) {
    var portInforWindow: Element = document.getElementById(Id);
    if (portInforWindow != null) {

      var portInforWindowParent: any = portInforWindow.parentElement.parentElement.parentElement;
      if (portInforWindowParent != null) {


        // portInforWindowParent.firstElementChild.children[2];
        portInforWindowParent.firstElementChild.children[2].firstChild.style.left = '-284px';

        portInforWindowParent.firstElementChild.children[2].firstChild.style.top = '-120px';
        portInforWindowParent.firstElementChild.children[2].firstChild.style.transform = 'rotate(90deg)';



        portInforWindowParent.firstElementChild.children[2].lastChild.style.left = '-284px';

        portInforWindowParent.firstElementChild.children[2].lastChild.style.top = '-104px';
        portInforWindowParent.firstElementChild.children[2].lastChild.style.transform = 'rotate(90deg)';

        var divtoCopy = portInforWindowParent.firstElementChild.children[2]
        divtoCopy.lastChild.firstChild.style.background = '#37414F';
        divtoCopy.firstChild.firstChild.style.background = '#37414F';

        divtoCopy.lastChild.firstChild.style.boxShadow = '';
        divtoCopy.firstChild.firstChild.style.boxShadow = '';
        portInforWindow.parentElement.style.overflow = 'hidden';
        if (portInforWindowParent.firstChild != null) {

          portInforWindowParent.firstChild.remove()

        }
        if (portInforWindowParent.lastChild != null) {

          portInforWindowParent.lastChild.remove()

        }
        portInforWindowParent.append(divtoCopy);


      }
    }
  }

  /**
   * Removes the INfowindow X Button and Div
   */
  removeInfoWindowCloseByClassName(className) {
    var listOfNodes: any = document.getElementsByClassName(className)
    for (var i = 0; i < listOfNodes.length; i++) {

      var portInforWindow: any = listOfNodes[i];
      var top = "";
      var left = "";
      if (portInforWindow != null) {
        var portInforWindowParent: any = portInforWindow.parentNode.parentNode.parentNode.parentNode;
        if (portInforWindowParent.children.length > 2 && portInforWindowParent.firstChild != null) { //&& portInforWindowParent.length==3

          // if(portInforWindowParent.firstChild.children[2]!=undefined)
          // {

          top = portInforWindowParent.firstChild.children[2].style.top;
          left = portInforWindowParent.firstChild.children[2].style.left;

          // }
          portInforWindowParent.firstChild.remove();

          // portInforWindowParent.firstChild.style.display = 'none';//()

        }
        if (portInforWindowParent.children.length > 1 && portInforWindowParent.lastChild != null) {//&& portInforWindowParent.length==2
          portInforWindowParent.lastChild.remove();
          // portInforWindowParent.lastChild.style.display = 'none';

          portInforWindowParent.children[0].style.top = top;

          portInforWindowParent.children[0].style.left = left;


          if (portInforWindow.hasAttribute('IsMajorPort') &&
            portInforWindow.getAttribute('IsMajorPort') === 'true') {

            portInforWindow.style.borderWidth = '1px';
            portInforWindow.style.borderStyle = 'solid';
            portInforWindow.style.borderColor = '#484848';

            portInforWindow.style.width = '135px';


          }
          portInforWindow.addEventListener('mouseover', (event) => {

            if (event.currentTarget.hasAttribute('IsMajorPort') &&
              event.currentTarget.getAttribute('IsMajorPort') === 'true') {


              var currentPort = event.currentTarget;
              // if (currentPortByName != undefined && currentPortByName.length > 0) {
              //   var currentPort = currentPortByName[0];
              currentPort.style.borderWidth = '2px';
              currentPort.style.borderStyle = 'solid';
              currentPort.style.borderColor = '#484848';
              currentPort.style.fontWeight = 'bold';
              currentPort.style.width = '240px';
              var otherPrices = currentPort.getElementsByClassName('pl-3')
              for (let i = 0; i < otherPrices.length; i++) {
                var currentPrice: any = otherPrices[i];
                currentPrice.style.visibility = 'visible';
                currentPrice.style.opacity = 1;
                currentPrice.style.display = 'block';

              }
            }
            // }
          })

          portInforWindow.addEventListener('mouseout', (event) => {

            if (event.currentTarget.hasAttribute('IsMajorPort') &&
              event.currentTarget.getAttribute('IsMajorPort') === 'true') {


              var currentPort = event.currentTarget;// document.getElementsByName("ports_" + event.currentTarget.firstElementChild.firstElementChild.firstElementChild.getAttribute('portId'));
              // if (currentPortByName != undefined && currentPortByName.length > 0) {
              //   var currentPort = currentPortByName[0];
              currentPort.style.borderWidth = '1px';
              currentPort.style.borderStyle = 'solid';
              currentPort.style.borderColor = '#484848';
              currentPort.style.width = '135px';
              currentPort.style.fontWeight = '';

              var otherPrices = currentPort.getElementsByClassName('pl-3')
              for (let i = 0; i < otherPrices.length; i++) {
                var currentPrice: any = otherPrices[i];
                currentPrice.style.visibility = 'hidden';
                currentPrice.style.opacity = 0;
                currentPrice.style.display = 'none';
              }
            }

          });

          portInforWindow.addEventListener('click', (event) => {


            if (event.currentTarget.hasAttribute('portId')
              && event.currentTarget.hasAttribute('latitude')

              && event.currentTarget.hasAttribute('longitude')) {

              var portId = event.currentTarget.getAttribute('portId');
              var lat = parseFloat(event.currentTarget.getAttribute('latitude'));
              var long = parseFloat(event.currentTarget.getAttribute('longitude'));



              var endLocationInfoWindow = new google.maps.InfoWindow({
                position: { "lat": lat, "lng": long },
                disableAutoPan: true,
                maxWidth: 750,
                pixelOffset: new google.maps.Size(300, 115)

              });

              this.showLocationHover(portId, endLocationInfoWindow, null);
            }
            // this.showLocationClickPopup(portId, null)
          });


        }
      }
    }
  }

  /**
 * Method To Add ports and mark it in the map
 */
  addPortCountries() {
    if (this.ports !== undefined) {
      for (let kk = 0; kk < this.ports.length; kk++) {
        setTimeout(() => {
          if ((this.ports[kk].CountryLatitude !== undefined && this.ports[kk].CountryLatitude !== null) && (this.ports[kk].CountryLongitude !== undefined && this.ports[kk].CountryLongitude !== null))
            this.addMarker(kk, this.ports[kk], '../assets/images/port15.png', "country");
        }, 300);
      }

    }
  }


  /**
   * Gets the Vessel Information From Backend API
   */
  getVesselsFromBackend(isFillter) {

    //Draws the Voyage Detail 
    // To-Do-DSK Move inside and draw voyage only on click
    // Call to Get Vessel List From Backend
    // Call to Get Vessel Types From Backend
    // Call to Get Bunker Status From Backend

    // this.drawPolyLine(this.VoyageDetails);
    // this.vesselTypes = VesselTypes;
    // this.BunkerStatus = BunkerStatus;
    if(!isFillter){
    this.localService.getVesselsList().subscribe((res: any) => {
      this.vesselList =res;
      this.addVesselMarkersToMap(false);
      var currentDate = new Date();
      currentDate.getTime();
    });}
    else{
      this.localService.getVesselsList_red().subscribe((res: any) => {
        this.vesselList =res;  
        this.addVesselMarkersToMap(true);
        var currentDate = new Date();
        currentDate.getTime();
      });
    }   
    // this.lastUpdatedOn = "Today " + currentDate.toLocaleTimeString();
  }

  addvesselGlow(Latitude,Longitude){
    var image = {
      url: "../../assets/images/glow_red.svg",
      origin: new google.maps.Point(0, 0),// working
      anchor: new google.maps.Point(28.6, 25.6)// working
    };
    let vesselMarker = new google.maps.Marker({
      position: { "lat": Latitude, "lng": Longitude },
      map: this.map,
      icon: image,
      clickable: false
    });

    this.vesselGlowPathMarkers.push(vesselMarker);
  }


  addVesselMarkersToMap(isGlow) {

    if (this.vesselList == undefined)
      return;

    Array.from(new Set(this.vesselList.map((item: any) => item.Name)))

    for (let i = 0; i < this.vesselList.length; i++) {
      this.vesselList[i]["IsSelected"] = false;
      var itemVessel = this.vesselList[i];

      if (itemVessel.CurrentLocation.Latitude !== 0 && itemVessel.CurrentLocation.Longitude !== 0) {
        this.addVesselMarker(itemVessel);
        if(isGlow)
          this.addvesselGlow(itemVessel.CurrentLocation.Latitude,itemVessel.CurrentLocation.Longitude);
      }
    }

    if (this.vesselMarkers !== undefined && this.vesselMarkers.length > 0)
      this.showLoading = false;
  }

  /**
     * Adds the vessel marker based on the ROB and position of the Vessel.
     * 
     * @param vesselDetail 
  */
  addVesselMarker(vesselDetail: any) {

    var destinationCords = {
      lat: 0,
      lng: 0
    };
    var isRotation = false;
    if (vesselDetail.EndLocation !== undefined && vesselDetail.EndLocation !== null && vesselDetail.EndLocation.Latitude != 0 && vesselDetail.EndLocation.Longitude) {


      // destinationCords = vesselDetail.VoyageDetails.find(x => x.name === vesselDetail.EndLocation.LocationName);
      // if (destinationCords !== null) {
      isRotation = true;
      // }
    }
    // var prevLoc = new google.maps.LatLng(vesselDetail.CurrentLocation.Latitude,vesselDetail.CurrentLocation.Longitude);
    // var newLoc = new google.maps.LatLng(vesselDetail.EndLocation.Latitude,vesselDetail.EndLocation.Longitude);

    //  bearing = prevLoc. (newLoc);
    //dsk222
    var iconForVesselMarker = {
      path: "M17.8,22.3l-7.9,5.9l7.6-21.8l7.7,21.5L17.8,22.3z",
      // url: "../../assets/images/ROB_red.svg",
      strokeColor: '#E7ECED',
      fillColor: vesselDetail.ROB.Color.indexOf('red') > -1 ? '#eb5757' : vesselDetail.ROB.Color.indexOf('orange') > -1 ? '#f9c375' : '#1cabe0',
      fillOpacity: 1,
      // scale: 1.0,
      //origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(18.5, 18.5),
      // flat: true,
      // offset: '40%',
      rotation: isRotation ? this.angleFromCoordinate(vesselDetail.CurrentLocation.Latitude, vesselDetail.CurrentLocation.Longitude, vesselDetail.EndLocation.Latitude, vesselDetail.EndLocation.Longitude) : 0,

      draggable: false,
      strokeWeight: .5,
    };
    //var bearingRorationAngle= isRotation ? this.angleFromCoordinate(vesselDetail.CurrentLocation.Latitude, vesselDetail.CurrentLocation.Longitude, vesselDetail.EndLocation.Latitude, vesselDetail.EndLocation.Longitude) : 0;


    this.addMarker(vesselDetail.VesselIMONO, { "Latitude": vesselDetail.CurrentLocation.Latitude, "Longitude": vesselDetail.CurrentLocation.Longitude }, iconForVesselMarker, 'vessel');
  }
  /**
   * Add Ports On Zoom 4
   */
  addPortsZoom() {
    for (let kk = 0; kk < this.ports.length; kk++) {
      // setTimeout(() => {
      if (this.ports[kk].IsMajorPort)
        this.addMarker(kk, this.ports[kk], '', MarkerType.PortZoom);
      // }, 200);
    }
  }
  /**
   * Method to add Marker in the Map
   * @param myLatLng  Array of Lattitude and Longitude
   * @param iconBase  Icon path for marker
   * @param contentString Content to display on Marker click
   */
  addMarker(markerId, markerDetail, iconBase, type) {

    var marker = new google.maps.Marker({
      position: { "lat": markerDetail.Latitude, "lng": markerDetail.Longitude },
      map: this.map,

    });



    //Set the PortId / VesselIMONO based on marker
    if (type === MarkerType.Port) {
      var currentPort = this.ports[markerId];

      marker.setVisible(false);
      marker.set("portId", markerId);
      marker.set("markerType", type);
      marker.setPosition({ "lat": markerDetail.Latitude, "lng": markerDetail.Longitude });
      marker.setIcon(iconBase);
      var content = ``;

      // var content = `<div _ngcontent-c3="" class="majorPortDiv"   name="ports_` + markerId + `" portId=` + markerId + `  latitude=` + markerDetail.Latitude + ` longitude=` + markerDetail.Longitude + ` id="major-port-info"><div _ngcontent-c3="" class="float-left pr-2"><img _ngcontent-c3="" alt="Port Icon" src="../../../assets/customicons/major-port.svg"></div><div _ngcontent-c3="" class="float-left pr-2 " id="port-name"><div _ngcontent-c3="" class="truncate-80"> #LocationName# </div></div><div _ngcontent-c3="" class="float-left text-center"><div _ngcontent-c3="" class="fuel-type"><div _ngcontent-c3="" class="truncate-40">HSFO</div></div><div _ngcontent-c3="" class="fuel-value"><div _ngcontent-c3="" class="truncate-40">$#HSFOPrice#</div></div></div></div>`;
      //if (this.ports[markerId].IsMajorPort) {
        //alert("major-marker");

        content = `<div class="major-port"  IsMajorPort="true"  name="ports_` + markerId + `" portId=` + markerId + `  latitude=` + markerDetail.Latitude + ` longitude=` + markerDetail.Longitude + ` id="" style="border: 1px solid #484848 !important;width: 167px !important;  transition: all 0.5s; display: flex; align-items: center;     -webkit-transition-property: width, height; -webkit-transition-duration: 0.4s; transition-property: width, height; transition-timing-function: ease-in-out; transition-duration: 0.4s;">
        <div class="pr-2 d-flex align-items-center">
  
        <div class="d-flex align-items-center" style="position: relative; top: -1px;">
        <img class="major-port-icon" alt="Port Icon" src="../../../assets/customicons/major-port2.svg">
        </div>
  
        <div class="portname fs12 float-left" id="port-name">
        <div class="truncate-f80" >#LocationName#</div>
        </div>
  
        </div>

        

        <div class="float-left text-center">
        <div class="fuel-type">
        <div class="truncate-40">HSFO</div></div>
        <div class="fuel-value">
        <div class="truncate-40">$#HSFOPrice#</div>
        </div>
        </div>
  
        <div id="block2" class="float-left text-center pl-3">
        <div class="fuel-type">
        <div class="truncate-40">ULSFO</div>
        </div>
        <div class="fuel-value">
        <div class="truncate-40">$#ULSFOPrice#</div>
        </div>
        </div>
  
        <div id="block2" class="float-left text-center pl-3">
        <div class="fuel-type">
        <div class="truncate-40">DOGO</div>
        </div>
        <div class="fuel-value">
        <div class="truncate-40">$#DOGOPrice#</div>
        </div>
        </div>

        
  
        
        
        </div>`;
      // }
      // else {
      //   content = `<div class="minor-port-hover" IsMajorPort="false" name="ports_` + markerId + `" portId=` + markerId + `  latitude=` + markerDetail.Latitude + ` longitude=` + markerDetail.Longitude + `>
      //   <div class="float-left pr-2 d-flex align-items-center" matTooltip="Jacksonville" matTooltipShowDelay="500">
      //     <div class="float-left">
      //       <img class="minor-port-icon" src="../../../assets/customicons/minor-port.svg" alt="Port Icon">
      //     </div>
      //     <div class="fs12 float-left" id="port-name">
      //       <div class="truncate-f60">#LocationName#</div>
      //     </div>
      //   </div>
  
      //   <div id="block1" class="ml-auto text-center">
      //     <div class="fuel-type">
      //       <div class="truncate-40">HSFO</div>
      //     </div>
      //     <div class="fuel-value">
      //       <div class="truncate-40">$#HSFOPrice#</div>
      //     </div>
      //   </div>
      //   <div id="block2" class="ml-auto text-center pl-3">
      //     <div class="fuel-type">
      //       <div class="truncate-40">ULSFO</div>
      //     </div>
      //     <div class="fuel-value">
      //       <div class="truncate-40">$#ULSFOPrice#</div>
      //     </div>
      //   </div>
      //   <div id="block3" class="ml-auto text-center pl-3">
      //     <div class="fuel-type">
      //       <div class="truncate-40">DOGO</div>
      //     </div>
      //     <div class="fuel-value">
      //       <div class="truncate-40">$#DOGOPrice#</div>
      //     </div>
      //   </div>
      // </div>`;
      // }
      // console.log("zzzzzzzzzzz0000000");
      // console.log(this.TodayMarketPriceList);
      // console.log("zzzzzzzzzzz0000000888");
      var currentLocationPrices = this.TodayMarketPriceList.find(x => x.LocationName.toLowerCase() == this.ports[markerId].LocationName.toLowerCase());
      // console.log(currentLocationPrices);
      // console.log("currentLocationPrices");
      var HSFO = "-";
      var ULSFO = "-";
      var DOGO = "-";
      var locatioName = "";
      if (currentLocationPrices !== null && currentLocationPrices !== undefined && currentLocationPrices.LocationPriceDetails !== null && currentLocationPrices.LocationPriceDetails !== undefined) {
        HSFO = currentLocationPrices.LocationPriceDetails.HSFO !== null && currentLocationPrices.LocationPriceDetails.HSFO.Price !== undefined ? currentLocationPrices.LocationPriceDetails.HSFO.Price : '-';
        ULSFO = currentLocationPrices.LocationPriceDetails.ULSFO !== null && currentLocationPrices.LocationPriceDetails.ULSFO.Price !== undefined ? currentLocationPrices.LocationPriceDetails.ULSFO.Price : '-';
        DOGO = currentLocationPrices.LocationPriceDetails.DOGO !== null && currentLocationPrices.LocationPriceDetails.DOGO.Price !== undefined ? currentLocationPrices.LocationPriceDetails.DOGO.Price : '-';

      }
      locatioName = this.ports[markerId].LocationName;

      content = content.replace('#LocationName#', locatioName).replace('#HSFOPrice#', HSFO).replace('#ULSFOPrice#', ULSFO).replace('#DOGOPrice#', DOGO);

      var infoWindow = new google.maps.InfoWindow({
        position: { "lat": markerDetail.Latitude, "lng": markerDetail.Longitude },
        disableAutoPan: true
      });
      infoWindow.setContent(content);
      infoWindow.set("portId", markerId);
      infoWindow.set("markerType", type);
      infoWindow.set("IsMajorPort", true);
      infoWindow.open(this.map);
      this.portMarkers.push(infoWindow);

    }
    else if (type == MarkerType.PortZoom) {

      var iconForPortMarker = {

      };
      let PortIconbase = '../../../assets/customicons/major-port.svg';
      let minorPortIconbase = '../../../assets/customicons/minor-port.svg';
      if (this.ports[markerId].IsMajorPort) {
        iconForPortMarker = {
          url: PortIconbase,
          labelOrigin: new google.maps.Point(6, 20),
          origin: new google.maps.Point(0, 0),

          // Scaled size for major port
          scaledSize: new google.maps.Size(16, 16)
        }
        marker.set("IsMajorPort", true);

      }
      else {
        iconForPortMarker = {
          url: minorPortIconbase,
          labelOrigin: new google.maps.Point(43, 10),
          origin: new google.maps.Point(0, 0),

          // Scaled size for minor port
          scaledSize: new google.maps.Size(13, 13)
        }
        marker.set("IsMajorPort", false);

      }
      marker.set("portId", markerId);
      marker.set("markerType", type);
      marker.set("PortName", this.ports[markerId].LocationName);

      //marker.setIcon(iconForPortMarker);
      marker.setPosition({ "lat": markerDetail.Latitude, "lng": markerDetail.Longitude });
      marker.setZIndex(100000);
      marker.setLabel(

        {
          fontSize: '12px',
          color: 'white',
          text: this.objPlanningDashboardService.titleCaseWord(this.ports[markerId].LocationName)
        });

      this.portMarkersZoom.push(marker);

    }
    else if (type === MarkerType.Vessel) {

      marker.set("vesselIMONO", markerId);
      marker.set("markerType", type);
      marker.setIcon(iconBase);
      marker.setPosition({ "lat": markerDetail.Latitude, "lng": markerDetail.Longitude });
      // marker.setZIndex(100000);

      this.vesselMarkers.push(marker);
    }
    else if (type === MarkerType.Country) {

      marker.set("markerType", type);
      marker.setPosition({ "lat": markerDetail.CountryLatitude, "lng": markerDetail.CountryLongitude });
      // marker.setTitle(markerDetail.Country)
      marker.setLabel({

        color: 'white',
        // fontWeight: 'bold  ',
        fontSize: '15px',
        text: markerDetail.Country,

      });

      marker.setIcon({
        labelOrigin: new google.maps.Point(40, 10),
        url: iconBase,
        size: new google.maps.Size(15, 20),
        origin: new google.maps.Point(0, 0),

      })

      if (this.countryMarkers == undefined)
        this.countryMarkers = [];

      this.countryMarkers.push(marker);
    }


    // Adds the Listener For Marker Click
    google.maps.event.addListener(marker, 'click', (event) => {
      console.log("Clicked");
      //Change the Marker Icon on Click 
      //To-Do-Dsk bring without error
      //Commented for now 
      // let markerIcon = marker.getIcon();
      // let previousColor = markerIcon.fillColor;
      // markerIcon.fillColor = this.vesselIcon.red;
      // marker.setIcon(markerIcon);
      var markerType = marker.get('markerType');


      // var infowindow = new google.maps.InfoWindow({
      //   content: '',
      //disableAutoPan:true

      // });
      // if (markerType.toLowerCase() === "port") {
      //   var portId = marker.get("portId");
      //   this.showLocationHover(portId, infowindow, marker);
      //   infowindow.set('width','1000px');//='1000px';
      // }

      if (markerType.toLowerCase() === "port") {
        var portId = marker.get("portId");
        //this.showLocationClickPopup(portId, markerType);
      }
      else if (markerType === MarkerType.PortZoom) {

        this.map.panTo(marker.getPosition());
        this.map.setZoom(5);
        this.currentZoom = 5;
        // this.showLocationClickPopup(marker.get('portId'), markerType);

        var endLocationInfoWindow = new google.maps.InfoWindow({
          position: marker.getPosition(),
          disableAutoPan: true,
          maxWidth: 750,
          pixelOffset: new google.maps.Size(300, 115)

        });

        this.showLocationHover(marker.get('portId'), endLocationInfoWindow, null);
      }
      else {
        var vesselIMONO = marker.get("vesselIMONO");
        console.log(vesselIMONO);
        console.log(markerType);
        console.log(marker);
        this.showVesselClickPopup(vesselIMONO, markerType, marker);
      }

      // event.stopPropogation();

      return false;

      //To-Do-Dsk Add listener to get Close Click 
      //Commented for now 
      // infowindow.addListener('onclose',()=>{

      //   markerIcon.fillColor = previousColor;
      //   marker.setIcon(markerIcon);

      // })
    });
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      var zoomLevel = this.map.getZoom();
      var zoomOut = document.getElementById('zoomOut')
      var zoomIn = document.getElementById('zoomIn')
      const orgLastZoom = this.lastZoom;
      if (this.lastZoom == zoomLevel) {
        return;
      }
      this.lastZoom = zoomLevel;

      var infowindow = new google.maps.InfoWindow({
        // content: '',
        disableAutoPan: true

      });
      if (zoomLevel === 8) {
        zoomIn.classList.add('disabled')
      }
      else if (zoomLevel === 3)
        zoomOut.classList.add('disabled')
      else
        zoomIn.classList.remove('disabled')

      if (zoomLevel <= 3) {
        this.map.setZoom(3);
        this.currentZoom = 3;

        zoomOut.classList.add('disabled');
        this.removeMarker(MarkerType.Country);


        this.removeMarker(MarkerType.Port);


        this.removeMarker(MarkerType.PortZoom);
        //   this.lastValidCenter = this.map.getCenter();

        // this.map.setCenter(this.lastValidCenter);
        // this.map.fitBounds(this.lastValidCenter);

        // this.checkLatitude();
        return;
      }

      zoomOut.classList.remove('disabled')
      this.currentZoom = this.map.getZoom();
      switch (zoomLevel) {
        case 2:
        case 3:
          this.removeMarker(MarkerType.Country);


          this.removeMarker(MarkerType.Port);


          this.removeMarker(MarkerType.PortZoom);

          break;

        case 4: //Vessels + Country names(Having ports)
          // this.addPortCountries();
          this.removeMarker(MarkerType.Port);
          this.removeMarker(MarkerType.PortZoom);

          this.hideVesselNameOverlayForAll();
          this.addPortsZoom(); // no minor
          break;

        case 5: //Vessels + Country names(Having ports) + Port names with HSFO
          // this.addPortCountries();

          // this.removeMarker(MarkerType.Port);


          this.removeMarker(MarkerType.PortZoom);

          if (orgLastZoom === 4 && this.portMarkers !== undefined && this.portMarkers.length > 0 && this.ports.length === this.portMarkers.length) {
            this.portMarkers.forEach((infoWindow) => {
              if (infoWindow.get('IsMajorPort') == true)
                infoWindow.setMap(this.map);




            });
            setTimeout(() => {

              this.removeInfoWindowCloseByClassName('majorPortDiv');

              // this.removeInfoWindowCloseByClassName('major-port-hover');
              this.removeInfoWindowCloseByClassName('minor-port-hover');
            }, 100);
          }
          else if (orgLastZoom === 4) {
            this.addPorts();

          }

          this.showVesselNameOverlayForAll();
          break;

        case 6: //Vessels + Country names(Having ports) + Port names with All prices
          this.removeMinorPortMarkers();
          this.addMinorPortsZoom();

          break;
        case 7:
          this.removeMarker(MarkerType.PortZoom);
          this.addPorts();
          break;

        default:
          break;
      }

    });

    // Adds the Listener For Marker Hover
    google.maps.event.addListener(marker, 'mouseover', (event) => {
      var markerType = marker.get('markerType');
      //Sets the Content From the Function To The Info Window of the Marker
      var infowindow = new google.maps.InfoWindow({
        // content: '',

        disableAutoPan: true
      });
      if (markerType.toLowerCase() === MarkerType.Port) {
        var portId = marker.get("portId");
        this.showLocationHover(portId, infowindow, marker);
        infowindow.set('width', '1000px');//='1000px';
      }
      else if (markerType === MarkerType.PortZoom) {

      }
      else {
        var vesselIMONO = marker.get("vesselIMONO");

        let currentVessel = this.vesselList.find(vessel => vessel.VesselIMONO == vesselIMONO);
        if (this.map.getZoom() < 5)
          this.showVesselNameOverlay(currentVessel);
      }


    });
    //Close Infoview of the Marker on mouseout
    google.maps.event.addListener(marker, 'mouseout', () => {

      if (this.map.getZoom() < 5)
        this.hideVesselNameOverlay(marker.get("vesselIMONO"));
    });

    google.maps.event.addListener(this.map, 'click', (event) => {
      console.log("click ==> Lat = " + event.latLng.lat() + " Lng = " + event.latLng.lng())
      this.currentVesselClickIMO = '';
      if (this.infoWindows != undefined)
        this.infoWindows.forEach((infowindow) => {
          infowindow.close();
        });
      if (this.vesselGlowPathMarkers != undefined && this.autoCompleteSelectedVessel === 0)
        this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
          vesselGlowMarkers.setMap(null);
        });
        this.locationGlowMarkers.forEach((locationGlowMarker) => {
          locationGlowMarker.setMap(null);
        });
      this.routeLines.forEach((routes) => {
        routes.setMap(null);
      });
      this.locInfoWindows.forEach((infowindow) => {
        infowindow.close();
      });

      if (this.currentZoom === 4) {
        this.portMarkersZoom.forEach((marker) => {
          var getMap = marker.getMap();
          if (getMap == null)
            marker.setMap(this.map);
        });
      }


    });

  }

  removeMinorPortMarkers() {
    this.portMarkers.forEach((infoWindow) => {
      if (infoWindow.get('IsMajorPort') == false)
        infoWindow.setMap(null);
    });
  }
  addMinorPortsZoom() {
    for (let kk = 0; kk < this.ports.length; kk++) {
      // setTimeout(() => {
      if (!this.ports[kk].IsMajorPort)
        this.addMarker(kk, this.ports[kk], '', MarkerType.PortZoom);
      // }, 200);
    }
  }

  removeMarker(markerType: MarkerType) {
    switch (markerType) {
      case MarkerType.Country:
        if (this.countryMarkers != undefined)
          this.countryMarkers.forEach((cMarker) => {
            cMarker.setMap(null);
          });
        break;

      case MarkerType.Port:
        this.portMarkers.forEach((infoWindow) => {
          infoWindow.close();
        });
        if (this.currentVesselClickIMO === '')
          this.locInfoWindows.forEach((infoWindow) => {
            infoWindow.close();
          });
        break;

      case MarkerType.Vessel:
        break;

      case MarkerType.PortZoom:

        this.portMarkersZoom.forEach((marker) => {
          marker.setMap(null);
        });
        break;
    }
  }

  showVesselClickPopup(vesselIMONO, type, marker) {
    //alert(vesselIMONO+" "+this.currentVesselClickIMO);
        if (this.currentVesselClickIMO !== vesselIMONO) {
    //alert("1");
          let currentVessel = this.vesselList.find(vessel => vessel.VesselIMONO == vesselIMONO);
          //console.log(currentVessel);
          var strokeColor = currentVessel.ROB.Color.indexOf('red') > -1 ? '#eb5757' : currentVessel.ROB.Color.indexOf('orange') > -1 ? '#f9c375' : '#1cabe0';
          this.currentVesselClickIMO = vesselIMONO;
          //Draw Route for Vessel
          if (currentVessel != null && currentVessel !== undefined) {
    //alert("22");
    this.localService.getSeaRouteList().subscribe(res => {
    //console.log(res);
    //debugger;
    console.log(";;';'';';';';';';';';';';';';';';';';';';';';");
              if (res !== undefined && res.length > 0 && res[0].VesselIMONO === this.currentVesselClickIMO) {
                for (var i = 0; i < res.length; i++) {
                  if (res[i].RouteJson !== undefined && res[i].RouteJson!==null) {
                    var showSolid = false;
                    if (res[i].StartLocation === res[i].VesselName)
                      showSolid = true;
                      console.log(res[i].StartLocation);
                      
                    var routes = res[i].RouteJson.getRouteJson[0].routepoints;
                    console.log(routes);
                    routes.forEach(function (x) {
                      x["lng"] = x["lon"];
    
                    });
                    this.drawPolyLine(routes, strokeColor, showSolid);
                  }
    
                }
              }
            });
    
          }
    
          var vesselInfowindow = new google.maps.InfoWindow({
            position: { "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude },
            disableAutoPan: true,
            pixelOffset: new google.maps.Size(-246, 150)
    
          });
    //console.log("cccccccccccccccs");
          console.log(vesselInfowindow);
    
          //dsk22
          var vesselGlowPath = "";
          var endLocPath = "";
          var startLocPath = "";
    
          switch (currentVessel.ROB.Color.toLowerCase()) {
            case "tbl-red": vesselGlowPath = "../../assets/images/glow_red.svg"; endLocPath = "../../assets/images/end-red.svg"; startLocPath = "../../assets/images/start-red.svg"; break;
            case "tbl-orange": vesselGlowPath = "../../assets/images/glow_amber.svg"; endLocPath = "../../assets/images/end-amber.svg"; startLocPath = "../../assets/images/start-amber.svg"; break;
    
            case "tbl-blue":
            default:
              vesselGlowPath = "../../assets/images/glow_blue.svg"; endLocPath = "../../assets/images/end-blue.svg"; startLocPath = "../../assets/images/start-blue.svg";
              break;
          }
          var image = {
            url: vesselGlowPath,
            //icon: "data:image/jpeg;base64,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",
            origin: new google.maps.Point(0, 0),// working
            anchor: new google.maps.Point(28.6, 25.6)// working
    
    
          };
          this.routeLines.forEach((routes) => {
            routes.setMap(null);
          });
          this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
            vesselGlowMarkers.setMap(null);
          });
    
          this.locationGlowMarkers.forEach((locationGlowMarker) => {
            locationGlowMarker.setMap(null);
          });
          if (this.infoWindows != undefined)
            this.infoWindows.forEach((infowindow) => {
              infowindow.close();
            });
          if (this.locInfoWindows != undefined)
            this.locInfoWindows.forEach((infowindow) => {
              infowindow.close();
            });
          console.log("Vessel " + currentVessel.VesselName + "Lat = " + currentVessel.CurrentLocation.Latitude + "Long =" + currentVessel.CurrentLocation.Longitude)
          let vesselMarker = new google.maps.Marker({
            position: { "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude },
            map: this.map,
            icon: image,
            clickable: false,
    
          });
    
          this.vesselGlowPathMarkers.push(vesselMarker);
    
          //alert(currentVessel.EndLocation.Latitude+"  "+currentVessel.EndLocation.Longitude);
    
          var endLocationInfoWindow = new google.maps.InfoWindow({
            position: { "lat": currentVessel.EndLocation.Latitude, "lng": currentVessel.EndLocation.Longitude },
            disableAutoPan: true,
            maxWidth: 750,
            pixelOffset: new google.maps.Size(300, 120)
    
          });
          var endLocationMarkerIcon = {
            url: endLocPath,
          };
    
          let endLocationMarker = new google.maps.Marker({
            position: { "lat": currentVessel.EndLocation.Latitude, "lng": currentVessel.EndLocation.Longitude },
            map: this.map,
            icon: endLocationMarkerIcon,
            clickable: false,
            zIndex: 999999
          });
    
    
          var startLocationMarkerIcon = {
            url: startLocPath,
    
          };
    
          let startLocationMarker = new google.maps.Marker({
            position: { "lat": currentVessel.StartLocation.Latitude, "lng": currentVessel.StartLocation.Longitude },
            map: this.map,
            icon: startLocationMarkerIcon,
            clickable: false,
    
            zIndex: 999999
          });
          //Remove the portZoom Icon
          this.portMarkersZoom.forEach((marker) => {
            var portName = marker.get('PortName');
            if ((portName !== undefined && portName != '') && (portName.toLowerCase() === currentVessel.StartLocation.LocationName.toLowerCase() || portName.toLowerCase() === currentVessel.EndLocation.LocationName.toLowerCase()))
              marker.setMap(null);
          });
    
          this.locationGlowMarkers.push(endLocationMarker);
          this.locationGlowMarkers.push(startLocationMarker);
    
          this.showVesselHover(currentVessel.VesselIMONO, vesselInfowindow, null);
    
          if(currentVessel.EndLocation.Latitude!==null && currentVessel.EndLocation.Longitude!==null)
          {
            
          var bounds = new google.maps.LatLngBounds();
          bounds.extend({ "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude });
          bounds.extend({ "lat": currentVessel.EndLocation.Latitude, "lng": currentVessel.EndLocation.Longitude });
    
          this.map.fitBounds(bounds);
          
        }
        //ZZZ For show port
        console.log("zxzxzxzxzxzx");
        console.log(this.ports[0].LocationName);
        //alert(this.ports.LocationName);
        //alert(currentVessel.EndLocation.LocationName);
        // for(var i=0;i<=this.ports.length;i++){
    
        // }
          var endLocationPort = this.ports.find((port) => port.LocationName == currentVessel.EndLocation.LocationName);
          //alert("endlocationport");
          console.log(endLocationInfoWindow);
          console.log("qqqqqqqqqqqqqqqqqqqqqqqqqi");
        //   if (endLocationPort == undefined) {
        //     alert("location");
        //     return;
            
        //  }
        //   else {
            //alert("locationelse");
            var endLocationPortIndex = 50;
            
            this.showLocationHover(endLocationPortIndex, endLocationInfoWindow, null);
            this.portMarkers.forEach((marker) => {
              var portId = marker.get('portId');
    
              if (portId === endLocationPortIndex)
                marker.close();
            });
          //}     
        }
    
      }
  
 

  showVesselClickDialog(vesselIMONO) {
    var currentVessel = this.vesselList.find(x => x.VesselIMONO == vesselIMONO);

    const dialogRef2 = this.dialog.open(Vessel2TabsComponent, {
      id: 'loc_click_pop',

      // height:'100vh',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      disableClose: true,
      data: {
        vesselIMONO: vesselIMONO, ports: this.ports,
        RequestStatusColorCode:this.RequestStatusColorCode,
        voyageCode: currentVessel.VoyageCode,        //VesselDetails: currentVessel, LocationDetails: locationDetails, SupplierDetails: supplierDetails, VesselScheduleDetails: vesselScheduleDetails
        // vesselList: this.vesselList, type:type,vesselTypes3 vesselByType, vesselByROB: this.vesselByROB, bunkerRequestStatus: bunkerReqest, fuelStatus: fuelStatus, TenantId: this.TenantId
      }

    });
    dialogRef2.backdropClick().subscribe(_ => {
      // Close the dialog
      dialogRef2.close();
    })
  }

  showLocationClickPopup(locationName, type?: any) {

    const dialogRef4 = this.dialog.open(Location2InfoComponent, {
        id: 'loc_click_pop',
        closeOnNavigation: true,

        height: '100vh',
        position: { right: '0px', top: '0px' },
        disableClose: true,
        // position: { right: '0px', bottom:'0px' },
        data: {
            Name: locationName
            // vesselList: this.vesselList, type:type,vesselTypes: vesselByType, vesselByROB: this.vesselByROB, bunkerRequestStatus: bunkerReqest, fuelStatus: fuelStatus, TenantId: this.TenantId
        }
    });
    dialogRef4.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef4.close();
    })
}


  // showLocationClickPopup(portId, type) {

  //   this.objPlanningDashboardService.locationClickEmitter.emit({
  //     Id: 'Map',
  //     Value: this.ports[portId].LocationName
  //   });

  // }
  showVesselHover(vesselIMONO, infowindow, marker, timeout = 100) {
    //alert(vesselIMONO);
    if (this.vesHoverCompRef) this.vesHoverCompRef.destroy();

    // this.objPlanningDashboardService.getVesselDetailsByIMONO(vesselIMONO).subscribe(resVes => {

    //   if (resVes != undefined) {
    var currentVessel = this.vesselList.find(x => x.VesselIMONO == vesselIMONO);
    let div = document.createElement('div');

    //this.objPlanningDashboardService.getVesselCommments(currentVessel.VesselIMONO).subscribe(res => {
      // if (res != undefined) {
      //   currentVessel.Comments = res;
      // }
      const compFactory = this.resolver.resolveComponentFactory(VesselInfoComponent);
      this.vesHoverCompRef = compFactory.create(this.injector);

      currentVessel = this.objPlanningDashboardService.formatVesselDataforROb([currentVessel])[0];

      this.vesHoverCompRef.instance.vesselDetail = currentVessel;



      this.vesHoverCompRef.instance.vesselColor = currentVessel.ROB.Color.toString();
      this.vesHoverCompRef.instance.IsCloseClicked = false;

      this.vesHoverCompRef.instance.vesselDetail = currentVessel;
      div.id = "vesselHoverPopup";
      div.style.cursor = 'pointer';
      div.appendChild(this.vesHoverCompRef.location.nativeElement);

      this.vesHoverCompRef.instance.closeClicked.subscribe(res => {
        if (this.infoWindows != undefined)
          this.infoWindows.forEach((infowindow) => {
            infowindow.close();
          });

        this.vesHoverCompRef.instance.IsCloseClicked = false;

      })


      // this.vesHoverCompRef.instance.expandClicked.subscribe(res=>{

      // })
      this.vesHoverCompRef.instance.expandClicked.subscribe(res => {
        // if (!this.vesHoverCompRef.instance.IsCloseClicked) {

        // if (this.currentZoom >= 5) {
        //   //           this.portMarkers.forEach((marker) => {
        //   //             var getMap = marker.getMap();
        //   //             if (getMap == null) {

        //   //               marker.setMap(this.map);
        //   // //dsk777
        //   //               this.removeInfoWindowCloseByClassName('majorPortDiv');

        //   //               // this.removeInfoWindowCloseByClassName('major-port-hover');
        //   //               this.removeInfoWindowCloseByClassName('minor-port-hover');
        //   //             }
        //   //           });
        //   this.addPorts();
        // }
        this.showVesselClickDialog(currentVessel.VesselIMONO);
        this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
          vesselGlowMarkers.setMap(null);
        });
        if (this.infoWindows != undefined)
          this.infoWindows.forEach((infowindow) => {
            infowindow.close();
          });
        this.locInfoWindows.forEach((infowindow) => {
          infowindow.close();
        });
        this.locationGlowMarkers.forEach((locationGlowMarker) => {
          locationGlowMarker.setMap(null);
        });
        this.routeLines.forEach((routes) => {
          routes.setMap(null);
        });
        this.currentVesselClickIMO = "";
        if (this.currentZoom === 4) {
          this.portMarkersZoom.forEach((marker) => {
            var getMap = marker.getMap();
            if (getMap == null)
              marker.setMap(this.map);
          });
        }
        // }
      });

      infowindow.setContent(div);
      if (marker !== null)
        infowindow.open(this.map, marker);
      else
        infowindow.open(this.map);

      infowindow.set('width', '1700px');
      infowindow.setZIndex(100000);

      if (this.infoWindows == undefined)
        this.infoWindows = [];

      this.infoWindows.push(infowindow);

      this.appRef.attachView(this.vesHoverCompRef.hostView);
      this.vesHoverCompRef.changeDetectorRef.detectChanges()
      this.vesHoverCompRef.onDestroy(() => {
        this.appRef.detachView(this.vesHoverCompRef.hostView);
      });
      setTimeout(() => {
        this.removeVesselMarkerById('vesselHoverPopup');
      }, timeout)
    //});


    //   }

    // });

  }

  // showLocationZoom(infowindow, marker) {
  //   if (this.locHoverCompRef) this.locHoverCompRef.destroy();

  //   const compFactory = this.resolver.resolveComponentFactory(LocationHoverComponent);
  //   this.locHoverCompRef = compFactory.create(this.injector);
  //   let div = document.createElement('div');

  //   for (let kk = 0; kk < this.ports.length; kk++) {
  //     var locationDetails = this.ports[kk];
  //     this.objPlanningDashboardService.getLocationPrices(this.ports[kk].LocationName).subscribe((priceRes: any) => {
  //       if (priceRes != undefined) {
  //         if (priceRes.PriceHistory == undefined || priceRes.PriceHistory.length <= 0) {
  //           priceRes.PriceHistory = [
  //             {
  //               HSFO: { Price: 0, premium: 0, discount: 0 },
  //               ULSFO: { Price: 0, premium: 0, discount: 0 },
  //               DOGO: { Price: 0, premium: 0, discount: 0 }
  //             }
  //           ];
  //         }
  //         else
  //           if (priceRes.PriceHistory != undefined) {
  //             priceRes.PriceHistory.map((price) => {

  //               price.HSFO = price.HSFO == undefined ? { Price: 0, premium: 0, discount: 0 } : price.HSFO;
  //               price.ULSFO = price.ULSFO == undefined ? { Price: 0, premium: 0, discount: 0 } : price.ULSFO;
  //               price.DOGO = price.DOGO == undefined ? { Price: 0, premium: 0, discount: 0 } : price.DOGO;

  //             });
  //           }

  //         locationDetails["ROB"] = priceRes;
  //         this.objPlanningDashboardService.getLocationCommments(locationDetails.Id).subscribe(res => {

  //           if (res != undefined) {
  //             locationDetails.Comments = res;
  //           }

  //           this.locHoverCompRef.instance.LocationDetails = locationDetails;
  //           div.appendChild(this.locHoverCompRef.location.nativeElement);

  //           infowindow.setContent(div);
  //           infowindow.open(this.map, marker);
  //           this.appRef.attachView(this.locHoverCompRef.hostView);
  //           this.locHoverCompRef.changeDetectorRef.detectChanges()
  //           this.locHoverCompRef.onDestroy(() => {
  //             this.appRef.detachView(this.locHoverCompRef.hostView);
  //           });
  //         });
  //       }
  //     });
  //   }
  // }


  showLocationHover(portIdIndex, infowindow, marker) {
    //alert("locationss");
    if (this.locHoverCompRef) this.locHoverCompRef.destroy();

    const compFactory = this.resolver.resolveComponentFactory(LocationHoverComponent);
    this.locHoverCompRef = compFactory.create(this.injector);
    let div = document.createElement('div');
    var locationDetails = this.ports[portIdIndex];
    div.id = "locationHoverPopup";
    div.style.cursor = 'pointer';

    this.locHoverCompRef.instance.closeClicked.subscribe(res => {
      this.locInfoWindows.forEach((infowindow) => {
        infowindow.close();
      });
      this.locHoverCompRef.instance.IsCloseClicked = false;
    });

    this.locHoverCompRef.instance.expandClicked.subscribe(res => {
      // if (!this.locHoverCompRef.instance.IsCloseClicked) {

      // if (this.currentZoom >= 5) {
      //   // this.portMarkers.forEach((marker) => {
      //   //   var getMap = marker.getMap();
      //   //   if (getMap == null) {

      //   //     marker.setMap(this.map);

      //   //     this.removeInfoWindowCloseByClassName('majorPortDiv');

      //   //     // this.removeInfoWindowCloseByClassName('major-port-hover');
      //   //     this.removeInfoWindowCloseByClassName('minor-port-hover');
      //   //   }
      //   // });
      //   this.addPorts();


      // }
      this.showLocationClickPopup(portIdIndex, MarkerType.Port);
      this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
        vesselGlowMarkers.setMap(null);
      });
      if (this.infoWindows != undefined)
        this.infoWindows.forEach((infowindow) => {
          infowindow.close();
        });

      this.locationGlowMarkers.forEach((locationGlowMarker) => {
        locationGlowMarker.setMap(null);
      });
      this.routeLines.forEach((routes) => {
        routes.setMap(null);
      });
      this.locInfoWindows.forEach((infowindow) => {
        infowindow.close();
      });

      this.routeLines.forEach((routes) => {
        routes.setMap(null);
      });
      this.currentVesselClickIMO = "";
      if (this.currentZoom === 4) {
        this.portMarkersZoom.forEach((marker) => {
          var getMap = marker.getMap();
          if (getMap == null)
            marker.setMap(this.map);
        });
      }

    });
    // this.objPlanningDashboardService.getLocationPrices(this.ports[portIdIndex].LocationName).subscribe((priceRes: any) => {
    //var currentLocationPrices = this.TodayMarketPriceList.find(x => x.LocationName.toLowerCase() == this.ports[portIdIndex].LocationName.toLowerCase());
    var HSFO = "0";
    var ULSFO = "0";
    var DOGO = "0";
    // if (currentLocationPrices != null) {
    //   HSFO = currentLocationPrices.LocationPriceDetails.HSFO.Price;
    //   ULSFO = currentLocationPrices.LocationPriceDetails.ULSFO.Price;
    //   DOGO = currentLocationPrices.LocationPriceDetails.DOGO.Price;

    // }
    // if (priceRes != undefined) {
    var priceRes = {
      PriceHistory: []
    };
    //console.log("currentLocationPrices",currentLocationPrices);
    // if (currentLocationPrices == undefined || currentLocationPrices == null) {
    //   priceRes.PriceHistory = [
    //     {
    //       HSFO: { Price: '-', premium: '-', discount: '-', IsPremium: null },
    //       ULSFO: { Price: '-', premium: '-', discount: '-', IsPremium: null },
    //       DOGO: { Price: '-', premium: '-', discount: '-', IsPremium: null }
    //     }
    //   ];
    // }
    // else
    //   if (currentLocationPrices !== undefined && currentLocationPrices !== null) {
    //     this.locHoverCompRef.instance.today = currentLocationPrices.LocationPriceDetails.LastUpdatedDate;

    //     priceRes.PriceHistory = [
    //       {



    //         HSFO: { Price: currentLocationPrices.LocationPriceDetails.HSFO !== null && currentLocationPrices.LocationPriceDetails.HSFO.Price !== null ? currentLocationPrices.LocationPriceDetails.HSFO.Price : '-', premium: currentLocationPrices.LocationPriceDetails.HSFO !== null && currentLocationPrices.LocationPriceDetails.HSFO.premium !== null ? currentLocationPrices.LocationPriceDetails.HSFO.premium : null, discount: currentLocationPrices.LocationPriceDetails.HSFO !== null && currentLocationPrices.LocationPriceDetails.HSFO.discount !== null ? currentLocationPrices.LocationPriceDetails.HSFO.discount : null },
    //         ULSFO: { Price: currentLocationPrices.LocationPriceDetails.ULSFO !== null && currentLocationPrices.LocationPriceDetails.ULSFO.Price !== null ? currentLocationPrices.LocationPriceDetails.ULSFO.Price : '-', premium: currentLocationPrices.LocationPriceDetails.ULSFO !== null && currentLocationPrices.LocationPriceDetails.ULSFO.premium !== null ? currentLocationPrices.LocationPriceDetails.ULSFO.premium : null, discount: currentLocationPrices.LocationPriceDetails.ULSFO !== null && currentLocationPrices.LocationPriceDetails.ULSFO.discount !== null ? currentLocationPrices.LocationPriceDetails.ULSFO.discount : null },
    //         DOGO: { Price: currentLocationPrices.LocationPriceDetails.DOGO !== null && currentLocationPrices.LocationPriceDetails.DOGO.Price !== null ? currentLocationPrices.LocationPriceDetails.DOGO.Price : '-', premium: currentLocationPrices.LocationPriceDetails.DOGO !== null && currentLocationPrices.LocationPriceDetails.DOGO.premium !== null ? currentLocationPrices.LocationPriceDetails.DOGO.premium : null, discount: currentLocationPrices.LocationPriceDetails.DOGO !== null && currentLocationPrices.LocationPriceDetails.DOGO.discount !== null ? currentLocationPrices.LocationPriceDetails.DOGO.discount : null }
    //       }
    //     ];
    //     priceRes.PriceHistory[0]["HSFO"]["IsPremium"] = currentLocationPrices.LocationPriceDetails.HSFO === null || (currentLocationPrices.LocationPriceDetails.HSFO.premium === null && currentLocationPrices.LocationPriceDetails.HSFO.discount === null) ? null : currentLocationPrices.LocationPriceDetails.HSFO.discount === null ? true : false;
    //     priceRes.PriceHistory[0]["ULSFO"]["IsPremium"] = currentLocationPrices.LocationPriceDetails.ULSFO === null || (currentLocationPrices.LocationPriceDetails.ULSFO.premium === null && currentLocationPrices.LocationPriceDetails.ULSFO.discount === null) ? null : currentLocationPrices.LocationPriceDetails.ULSFO.discount === null ? true : false;
    //     priceRes.PriceHistory[0]["DOGO"]["IsPremium"] = currentLocationPrices.LocationPriceDetails.DOGO === null || (currentLocationPrices.LocationPriceDetails.DOGO.premium === null && currentLocationPrices.LocationPriceDetails.DOGO.discount === null) ? null : currentLocationPrices.LocationPriceDetails.DOGO.discount === null ? true : false;
    //     //setting Premium and DiscountValues


    //     // priceRes.PriceHistory.map((price) => {

    //     //   price.HSFO = HSFO;// currentLocationPrices.LocationPriceDetails.HSFO.Price;
    //     //   price.ULSFO = ULSFO;//currentLocationPrices.LocationPriceDetails.ULSFO.Price;
    //     //   price.DOGO = DOGO;//currentLocationPrices.LocationPriceDetails.DOGO.Price;

    //     // });
    //   }


    locationDetails["ROB"] = priceRes;
    //this.objPlanningDashboardService.getLocationCommments(locationDetails.Id).subscribe(res => {

      // if (res != undefined) {
      //   locationDetails.Comments = res;
      // }
      this.locHoverCompRef.instance.IsCloseClicked = false;

      this.locHoverCompRef.instance.LocationDetails = locationDetails;
      div.appendChild(this.locHoverCompRef.location.nativeElement);

      infowindow.setContent(div);
      if (marker != null)
        infowindow.open(this.map, marker);
      else
        infowindow.open(this.map);

      infowindow.set('width', '1700px');
      infowindow.setZIndex(10000);
      if (this.locInfoWindows !== undefined) {
        this.locInfoWindows.forEach((infowindow) => {
          infowindow.close();
        });

      }
      if (this.locInfoWindows == undefined)
        this.locInfoWindows = [];

      this.locInfoWindows.push(infowindow);

      this.appRef.attachView(this.locHoverCompRef.hostView);
      this.locHoverCompRef.changeDetectorRef.detectChanges()
      this.locHoverCompRef.onDestroy(() => {
        this.appRef.detachView(this.locHoverCompRef.hostView);
      });
      setTimeout(() => {
        //this.removePortMarkerById('locationHoverPopup');
      }, 100)
    //});
    // }
    // });
  }
  showVesselNameOverlayForAll() {

    this.vesselMarkers.forEach((vessel) => {
      var markerId = vessel.get('vesselIMONO');
      var currentVessel = this.vesselList.find(x => x.VesselIMONO == markerId);
      if (currentVessel !== undefined && currentVessel !== null)
        this.showVesselNameOverlay(currentVessel)
    });
  }

  hideVesselNameOverlayForAll() {

    // this.vesselMarkers.forEach((vessel) => {
    //   vessel.setLabel('');
    // });
    if (this.vesselOverlays !== undefined)
      this.vesselOverlays.forEach((overlayVessel) => {
        overlayVessel.setMap(null);
      });
  }
  showVesselNameOverlay(vessel: any) {

    let objOverlay: OverlayHelper = new OverlayHelper();
    var overlay = objOverlay.drawOverlay(this.map,
      <OverlayData>{
        Id: vessel.VesselIMONO,
        Value: {
          LabelName: vessel.VesselName,
          Position: <OverlayPosition>{ Latitude: vessel.CurrentLocation.Latitude, Longitude: vessel.CurrentLocation.Longitude },

        },
      }
    );

    overlay.setMap(this.map);

    if (this.vesselOverlays == undefined)
      this.vesselOverlays = [];

    this.vesselOverlays.push(overlay);
  }

  hideVesselNameOverlay(vesselIMONO: any) {
    if (this.vesselOverlays !== undefined)
      this.vesselOverlays.forEach((overlayVessel) => {
        if (overlayVessel.item_.Id == vesselIMONO) {
          overlayVessel.setMap(null);
        }
      });
  }

  /**
   * Draw the Voyage Path
   * @param pathArr 
   */
  drawPolyLine(pathArr, strokeColorForLine, showSolid) {

    if (showSolid) {

      var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeWeight: 3,

        strokeColor: strokeColorForLine,
        fillColor: strokeColorForLine,
        fillOpacity: 1,
      };
      var line = new google.maps.Polyline({
        path: pathArr,
        strokeOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }],
        clickable: false,
        geodesic: true,
      });

      line.setMap(this.map);
      this.routeLines.push(line);
    }
    else {

      var shape = new google.maps.Polyline({
        path: pathArr,
        strokeColor: strokeColorForLine,
        strokeOpacity: 1,
        strokeWeight: 3,
        clickable: false,
        geodesic: true,
      });
      shape.setMap(this.map);
      this.routeLines.push(shape);

    }
  }
  /**
   * Draw  Polygon in maps 
   */

  drawPolyGon(pathArr) {

    var shape = new google.maps.Polygon({
      paths: pathArr,
      strokeColor: '#f4aa42',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#fcead1',
      fillOpacity: 0.35
    });
    shape.setMap(this.map);
  }

  /**
  * Event handler for Vessel search-click method
  ** @param event: Holds the event value emitted from Search vessel component
  */
  SearchVesselClick(event) {
   //alert(event);

    if (event === 'click') {
      //alert("sss");
      this.IsAutoComplete = false;
      this.objPlanningDashboardService.searchVesselEmitter.emit(<GeneralModel>{ Id: PlanningDashboardViews.Map, Value: event });
    }
    else if (event == 'emptysearch') {

      localStorage.setItem('SearchedVesselIMONO', '-1');

      this.autoCompleteSelectedVessel = this.searchedVesselIMONO = -1;

      this.broadCast.broadcast('SearchedVessel', -1);

      this.vesselMarkers.forEach((vessel) => {
        vessel.setMap(this.map);

      });
      this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
        vesselGlowMarkers.setMap(null);
      });
      if (this.infoWindows != undefined)
        this.infoWindows.forEach((infowindow) => {
          infowindow.close();
        });

      this.locationGlowMarkers.forEach((locationGlowMarker) => {
        locationGlowMarker.setMap(null);
      });
      this.hideVesselNameOverlayForAll();

    }
    //Some vessel selected
    else if (typeof (parseInt(event)) == 'number') {
      // this.pagedVesselList=this.pagedVesselList.filter(vessel=>vessel.VesselId==event);

      this.autoCompleteSelectedVessel = event;

      this.setSearchedVesselList(this.autoCompleteSelectedVessel);
      this.addPorts();
      // this.broadCast.broadcast('SearchedVesselSetInMap', this.autoCompleteSelectedVessel);

      this.broadCast.broadcast('SearchedVessel', this.autoCompleteSelectedVessel);

      localStorage.setItem('SearchedVesselIMONO', this.autoCompleteSelectedVessel.toString());

    }


  }

  setSearchedVesselList(searchedVesselIMONO) {

    this.vesselMarkers.forEach((vessel) => {
      var markerIMO = vessel.get('vesselIMONO');
      if (markerIMO !== searchedVesselIMONO) {
        vessel.setMap(null);

      }
      else if (vessel.getMap() !== null)
        vessel.setMap(this.map);

    });
    this.vesselGlowPathMarkers.forEach((vesselGlowMarkers) => {
      vesselGlowMarkers.setMap(null);
    });
    if (this.infoWindows != undefined)
      this.infoWindows.forEach((infowindow) => {
        infowindow.close();
      });

    this.locationGlowMarkers.forEach((locationGlowMarker) => {
      locationGlowMarker.setMap(null);
    });
    var vesselGlowPath = "";
    var currentVessel = this.vesselList.find(x => x.VesselIMONO == searchedVesselIMONO);

    if (currentVessel == undefined || currentVessel.ROB == undefined) {
      return;
    }

    switch (currentVessel.ROB.Color.toLowerCase()) {
      case "tbl-red": vesselGlowPath = "../../assets/images/glow_red.svg"; break;
      case "tbl-orange": vesselGlowPath = "../../assets/images/glow_amber.svg"; break;

      case "tbl-blue":
      default:
        vesselGlowPath = "../../assets/images/glow_blue.svg";
        break;
    }
    var image = {
      url: vesselGlowPath,
      origin: new google.maps.Point(0, 0),// working
      anchor: new google.maps.Point(28.6, 25.6)// working
    };

    let vesselMarker = new google.maps.Marker({
      position: { "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude },
      map: this.map,
      icon: image,
      clickable: false,

    });

    this.vesselGlowPathMarkers.push(vesselMarker);



    var vesselInfowindow = new google.maps.InfoWindow({
      position: { "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude },
      // disableAutoPan: true,
      // pixelOffset: new google.maps.Size(280, 150)
      pixelOffset: new google.maps.Size(-246, 150)

    });

    this.map.panTo(vesselInfowindow.getPosition());
    this.map.setCenter({ "lat": currentVessel.CurrentLocation.Latitude, "lng": currentVessel.CurrentLocation.Longitude });

    this.map.setZoom(5);
    this.currentZoom = 5;

    //this.showVesselHover(currentVessel.VesselIMONO, vesselInfowindow, null, 300);

  }

  constructor(private appRef: ApplicationRef, private objPlanningDashboardService: PlanningDashboardService, 
    private localService:LocalService,
    private zone: NgZone, private cd: ChangeDetectorRef, public dialog: MatDialog, private snackBar: MatSnackBar, private injector: Injector,
    private resolver: ComponentFactoryResolver,private broadCast: Broadcaster) {
  }
}
