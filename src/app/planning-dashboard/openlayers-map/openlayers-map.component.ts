import { animate, style, transition, trigger} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import OlFeature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import LineString from 'ol/geom/LineString';
import OlPoint from 'ol/geom/Point';
import OlVectorLayer from 'ol/layer/Vector';
import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import OlVectorSource from 'ol/source/Vector';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import OlView from 'ol/View';
import {defaults as olinteraction} from 'ol/interaction';
import { LocalService } from 'src/app/services/local-service.service';
import { vesselPopupObj } from 'src/app/shared/vessellocationpopup/vessellocationpopup.component';
//import { slideInRightAnimation } from 'angular-animations';
@Component({
  selector: 'app-openlayers-map',
  templateUrl: './openlayers-map.component.html',
  styleUrls: ['./openlayers-map.component.scss'],
  animations: [
    // trigger('slideInOut', [
    //   transition(':enter', [
    //     style({transform: 'translateY(-100%)'}),
    //     animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    //   ]),
    //   transition(':leave', [
    //     animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
    //   ])
    // ])
    //slideInRightAnimation()
  ]  
})
export class OpenlayersMapComponent implements OnInit {
  isAnimate = false;
  animationState = false;
  animationWithState = false;
  map: any;
  mapCenterValues = [10, 10];
  minZoomLevel = 2;
  maxZoomLevel = 12;
  public selectedFillterTag=null;
  @ViewChild("olmap", {static: true}) olmapElement: any;
  @ViewChild("vessel_hover") vesselHoverElement: ElementRef;
  @ViewChild("port_hover") portHoverElement: ElementRef;
  @ViewChild("hover_circle") hoverCircleElement: ElementRef;

  lastUpdatedOn: string ="Today 10:45:08";
  public vesselPopData:vesselPopupObj = new vesselPopupObj();
  public showVesselPop:boolean;
  public showLocationPop:boolean;
  public showFullLocationInfo:boolean;
  public showFullVesselInfo:boolean;
  public showFullVesselInfo1:boolean;
  public showFullLocationInfo1:boolean;
  public showFillterChips:boolean = true;
  public hoverVesselName;
  public hoverVesselColor;
  public isLoading:boolean = true;
  private selectedVessel;

  public tagfillterData=[
    {
      name:'Strategy',
      count:'172',
      color:'#F08827'
    },
    {
      name:'Created',
      count:'12',
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

  //Layers 
  // Global Map
  private mapLayer = new OlVectorLayer({
    source: new OlVectorSource({
      // url: './assets/data/geo.json',//'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson',
      // url: 'https://raw.githubusercontent.com/openlayers/openlayers/master/examples/data/geojson/countries.geojson',
      // url: 'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson',
      // url: 'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
      url: './assets/data/countries.json',
      format: new GeoJSON(),
      id:'map_layer'
    }),   
    style:function(feature) {
      let newStyle = countryText;
      countryText.getText().setText(feature.get('name')); 
      return newStyle;
    }
  });

  // Features is Markers
  private vesselMakersLayer = new OlVectorLayer({
    source: new OlVectorSource({
        features: []
      })
  });

  //Port Layer
  private portMakersLayer = new OlVectorLayer({
    source: new OlVectorSource({
        features: []
      })
  });
 
  //Router Layer
  private routeLayer = new OlVectorLayer({
    source:  new OlVectorSource({
      features: []
    }),
    // style:
  });

  private vesselAnimateLayer = new OlVectorLayer({
      source: new OlVectorSource({
        wrapX: false
      })
    });

  //OverLays
  private vesselHoverPopupOverlay;
  private portHoverPopupOverlay;
  private hoverCircleEffectOverlay;
  
  constructor(private localService:LocalService) { 

  }

  ngOnInit() {
    this.loadMap();
    this.loadEventListeners();
    this.loadVessels(false);
    this.portMakersLayer.setVisible(false);
    this.loadPorts();
    // this.loadRoute();
  }

  // public poup_overlay:any;
  ngAfterViewInit()
  {  
      this.vesselHoverPopupOverlay = new Overlay({
        element: this.vesselHoverElement.nativeElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      this.portHoverPopupOverlay = new Overlay({
        element: this.portHoverElement.nativeElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        zindex:1
      });
      this.hoverCircleEffectOverlay = new Overlay({
        element: this.hoverCircleElement.nativeElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      this.map.addOverlay(this.hoverCircleEffectOverlay);
      this.map.addOverlay(this.vesselHoverPopupOverlay);
      this.map.addOverlay(this.portHoverPopupOverlay);      
  }

  loadMap() { 
    let mapView = new OlView({
      center: fromLonLat(this.mapCenterValues),
      zoom: this.minZoomLevel,
      minZoom: this.minZoomLevel,
      maxZoom: this.maxZoomLevel
    });    

    this.map = new OlMap({
      layers: [this.mapLayer, this.portMakersLayer, this.vesselMakersLayer, this.routeLayer, this.vesselAnimateLayer],
      OverLays:[],
      controls: [],
      target: this.olmapElement.nativeElement,
      view: mapView,
      // interactions: olinteraction      
    });  
  }


  private loadVessels(filter){
    this.isLoading=true;
    this.vesselMakersLayer.getSource().clear();
    if(!filter){
      this.localService.getVesselsList().subscribe((res: any) => {
        let vesselMakesrs=[];
        this.getCurrentTime();
        for (let vesselDetail of res) { 
              let marker = new OlFeature({
                // anchor: [3, 12],
                id:'ST'+vesselDetail.ShiptechVesselId, type: 'vessel', data:vesselDetail,
                geometry: new OlPoint(fromLonLat([vesselDetail.CurrentLocation.Longitude,vesselDetail.CurrentLocation.Latitude]))
              });    
              marker.setStyle(this.getVesselStyle(vesselDetail));
              vesselMakesrs.push(marker); 
        }
        if(vesselMakesrs.length>0){
          this.vesselMakersLayer.getSource().addFeatures(vesselMakesrs);
          this.setCenter();
          // this.cle
        } 
        // this.isLoading=false;       
      });  
    }    
    else{
      this.localService.getVesselsList_red().subscribe((res: any) => {
        let vesselMakesrs=[];
        this.getCurrentTime();
        for (let vesselDetail of res) { 
              vesselDetail.ColorFlag =1;
              if(vesselDetail.ROB.Color.indexOf('red')>0){
                let marker = new OlFeature({
                  id:'ST'+vesselDetail.ShiptechVesselId, type: 'vessel', data:vesselDetail,
                  geometry: new OlPoint(fromLonLat([vesselDetail.CurrentLocation.Longitude,vesselDetail.CurrentLocation.Latitude]))
                });    
                marker.setStyle(this.getVesselStyle(vesselDetail));
                vesselMakesrs.push(marker); 

                //Vessel Glow
                let vesselGlow = new OlFeature({
                  id:'STG'+vesselDetail.ShiptechVesselId, type: 'vessel-glow', data:vesselDetail,
                  geometry: new OlPoint(fromLonLat([vesselDetail.CurrentLocation.Longitude,vesselDetail.CurrentLocation.Latitude])),
                });  
                vesselGlow.setStyle(this.getVesselGlowStyle('red'));  
                vesselMakesrs.push(vesselGlow);
            }
        }
        if(vesselMakesrs.length>0){
          this.vesselMakersLayer.getSource().addFeatures(vesselMakesrs);
          this.setCenter();  
        }
        // this.isLoading=false;                  
      });
    } 
  }  


  loadPorts(){
    this.localService.getCountriesList().subscribe(res => {
      if (res != undefined) {         
        let portMakesrs=[];
        this.getCurrentTime();       
        for (let port of res) {   
              let marker = new OlFeature({
                id:'PID'+port.Id, type: 'port', data:port,
                geometry: new OlPoint(fromLonLat([port.Longitude,port.Latitude]))
              });    
              marker.setStyle(this.getPortStyle((port.LocationName).toUpperCase(), port.IsMajorPort));
              portMakesrs.push(marker); 
        }
        if(portMakesrs.length>0)
          this.portMakersLayer.getSource().addFeatures(portMakesrs);
      }
  });
  }

  //Vessel Style
  private getVesselStyle(vesselDetail):Style{
      var iconStyle = new Style({
        image: new Icon(({
            anchor: [0.47,0.47],
            anchorOrigin:'bottom-left',
            // anchorXUnits: 'pixels',           
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            rotation: this.getRotationForVessel(vesselDetail.EndLocation.Latitude,vesselDetail.EndLocation.Longitude,
                                                vesselDetail.CurrentLocation.Latitude, vesselDetail.CurrentLocation.Longitude),
            // src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1",
            // src: vesselDetail.ColorFlag == 0 ? "../assets/icon/ROB_blue.svg" : vesselDetail.ColorFlag == 1 ? "../assets/icon/ROB_red.svg" : "../assets/icon/ROB_amber.svg",
            src: vesselDetail.ROB.Color.indexOf('orange') > 0 ? "../assets/icon/ROB_amber.svg" : vesselDetail.ROB.Color.indexOf('red') > 0 ? "../assets/icon/ROB_red.svg" : "../assets/icon/ROB_blue.svg",
        }))
    }); 
    return iconStyle;
  }

  private getVesselStyle1(vesselDetail):Style{
      var iconStyle = new Style({
        image: new Icon(({
          anchor: [0.47,0.47],
          anchorOrigin:'bottom-left',
          // anchorXUnits: 'pixels', 
          zIndex:Infinity,          
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
            rotation: this.getRotationForVessel(vesselDetail.EndLocation.Latitude,vesselDetail.EndLocation.Longitude,
                                                vesselDetail.CurrentLocation.Latitude, vesselDetail.CurrentLocation.Longitude),
            src: "../assets/icon/ROB_red.svg",
            // src: "../assets/customicons/vessel/ROB_amber_hover_3.svg",
        }))
    }); 
    return iconStyle;
  }

  private getVesselGlowStyle(color):Style{
    var iconStyle = new Style({
      image: new Icon(({
         anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: '../assets/images/glow_'+color+'.svg',
          opacity: 0.5,
          anchorOrigin:'bottom-left',
      }))
    }); 
    return iconStyle;
  }

  private getPortStyle(name, isMajorPort):Style{
    var iconStyle = new Style({
      image: new Icon(({
        src: '../assets/customicons/port/'+(isMajorPort?'major':'minor')+'-port.png', //portType -major:minor
        rotation: 0,
        anchor: [1, 1],
        // scale: -1,
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: isMajorPort?0.3:0.1
      })),
      text: new Text({
        offsetY: 10,
        offsetX: 10,
        // padding:[50,50,50,50],
        text: name,
        // scale: 1.2,
        fill: new Fill({
          color: "#fff"
        })
      })
    }); 
    return iconStyle;
  }

  //Styles -ends

  //Events - start
  private loadEventListeners(){  
    let hoverItems:any;  
    //EVENTS
    //MAP - pointermove 
    this.map.on('pointermove', (event) => {
      if(hoverItems!=null&& hoverItems.length>0)
      this.resetHoverItems(hoverItems);     
      var pixel = this.map.getEventPixel(event.originalEvent);
      var hit = this.map.hasFeatureAtPixel(pixel);
      var coordinates = event.coordinate;
      if(hit){          
        hoverItems = this.map.getFeaturesAtPixel(pixel);
          if(hoverItems[0].get('type') == 'vessel'){         
            hoverItems[0].setStyle(this.getVesselStyle1(hoverItems[0].get('data')));         
            this.map.getViewport().style.cursor = 'pointer';       
            var coordinates = event.coordinate;
            this.hoverVesselName = hoverItems[0].get('data').VesselName;
            this.hoverVesselColor = hoverItems[0].get('data').ROB.Color.indexOf('red')>0 ? 'red':
            hoverItems[0].get('data').ROB.Color.indexOf('orange')>0 ?'yellow':'blue'; 
            this.map.getViewport().style.cursor = 'pointer';
            this.vesselHoverPopupOverlay.setPosition(coordinates);    
            // this.hoverCircleEffect.setPosition(coordinates); 
          } 
          else if(hoverItems[0].get('type') == 'port'){
            // console.log(hoverItems[0].get('geometry').flatCoordinates)
            // console.log(coordinates)
            this.map.getViewport().style.cursor = 'pointer';  
            this.vesselHoverPopupOverlay.setPosition(undefined);
            this.hoverCircleEffectOverlay.setPosition(undefined); 
            this.portHoverPopupOverlay.setPosition(hoverItems[0].get('geometry').flatCoordinates);    
          }
          else{
            this.vesselHoverPopupOverlay.setPosition(undefined);
            // this.portHoverPopupOverlay.setPosition(undefined);
            this.hoverCircleEffectOverlay.setPosition(undefined);         
            this.map.getViewport().style.cursor = '';
          }         
        }
        else{       
          this.vesselHoverPopupOverlay.setPosition(undefined);
          // this.portHoverPopup.setPosition(undefined);
          this.hoverCircleEffectOverlay.setPosition(undefined); 
          this.map.getViewport().style.cursor = '';
        }      
    });

    //MAP - click 
    this.map.on('click', (evt) => {       
      if(hoverItems!=null&& hoverItems.length>0)
        this.resetHoverItems(hoverItems); 
        var pixel = this.map.getEventPixel(evt.originalEvent);
        var hit = this.map.hasFeatureAtPixel(pixel);     
      if(hit){
        let items = this.map.getFeaturesAtPixel(pixel);        
        if(items[0].get('type') == 'vessel'){
          this.isLoading = true;
          this.showFillterChips=false;
          this.setdata(items[0].get('data'));  
        }
        else { 
            if(this.showLocationPop && this.showLocationPop && (this.showFullLocationInfo || this.showFullVesselInfo))
            {
              this.showFullLocationInfo =false;
              this.showFullVesselInfo = false;
            }
            else{
              this.showLocationPop = false; 
              this.showVesselPop = false;
              this.routeLayer.setVisible(false)
              this.mapLayer.setOpacity(1);
              this.vesselMakersLayer.setOpacity(1);
              this.showFillterChips=true;
            }
        }
      }
      else {
        if(this.showLocationPop && this.showLocationPop && (this.showFullLocationInfo || this.showFullVesselInfo))
        {
          this.showFullLocationInfo =false;
          this.showFullVesselInfo = false;
        }
        else{
          this.showLocationPop = false; 
          this.showVesselPop = false;
          this.routeLayer.setVisible(false);
          this.mapLayer.setOpacity(1);
          this.vesselMakersLayer.setOpacity(1);
          this.showFillterChips=true;
        }
      }
    });  
    //MAP - singleclick 
    this.map.on('singleclick', function (event) {
          var coordinate = event.coordinate; 
    });

    this.map.on('moveend', (evt) => { 
      if(evt.map.getView().getZoom() > 4 )
        this.portMakersLayer.setVisible(true);
      else
        this.portMakersLayer.setVisible(false);
    });

    this.map.on('movestart', (evt) => { 
      if(evt.map.getView().getZoom() > 4)
        this.portMakersLayer.setVisible(true);
      else
        this.portMakersLayer.setVisible(false);
    });


    this.vesselMakersLayer.getSource().on('addfeature', (evt) => {
      //  console.log("Hello");
    });
  }

  resetHoverItems(items){
    //reset hover effect
    for (var val of items) {
      if(val.get('type') == 'vessel')
          val.setStyle(this.getVesselStyle(val.get('data')));
    }
  }

  filterChipClick(item){
    this.routeLayer.setVisible(false);
    this.mapLayer.setOpacity(1);
    this.vesselMakersLayer.setOpacity(1);    
    this.showVesselPop=false;
    this.showLocationPop=false;
    if(item !=null){
      this.selectedFillterTag = this.selectedFillterTag!=item.name?item.name:null;
    }
    else
      this.selectedFillterTag =null;        
    
    if(this.selectedFillterTag) 
        this.loadVessels(true)
    else
      this.loadVessels(false);    
  }

  //Events - start

  setdata(vData){
    this.selectedVessel = vData;
    this.vesselPopData = new vesselPopupObj();
    this.vesselPopData.name = vData.VesselName;
    this.vesselPopData.vesselType = vData.VesselType;
    this.vesselPopData.hsfo = vData.ROB.HSFO.Value;
    this.vesselPopData.dogo = vData.ROB.DOGO.Value;
    this.vesselPopData.ulsfo = vData.ROB.ULSFO.Value;
    //this.vesselPopData.vlsfo = vData.ROB.VLSFO.Value;
    this.vesselPopData.voyageStatus = vData.VoyageStatus;
    this.vesselPopData.bunkeringStatus = vData.Request.RequestStatus;
    this.vesselPopData.eta = vData.StartLocation.ETA;
    this.vesselPopData.destination = vData.EndLocation.LocationName;
    this.vesselPopData.eta = vData.EndLocation.ETA;

    var locations ={
      "start_location_name":vData.StartLocation.LocationName,
      "start_location_id":vData.StartLocation.LocationId,
      "end_location_name":vData.EndLocation.LocationName,
      "end_location_id":vData.EndLocation.LocationId      
    }

    var lonlat = fromLonLat([vData.CurrentLocation.Longitude, vData.CurrentLocation.Latitude]);
        this.flyTo(lonlat, () => {this.isLoading =false},3);   
    
    this.drawRoute(vData,locations);
    this.showLocationPop = true; 
    this.showVesselPop = true;
  }

  drawRoute(data,locations){
    this.routeLayer.getSource().clear();
    if(data.VesselIMONO =='9301914')
    this.localService.getSeaRoute(data.VesselIMONO).subscribe((res: any) => {  
      let strokeColor = "#f9c375"   
      let dottedLine =false; 
      let startLoc;
      let endLoc;
      for (var i = 0; i < res.length; i++) {      
      if (res[i].RouteJson !== undefined &&res[i].RouteJson !== null )
          if((res[i].StartLocation === res[i].VesselName)){
            dottedLine = true;
          }          
          // console.log(res[i],res[i].NextLocation == locations.end_location_name);
          let lineStringStyleNw = new Style({
            stroke: new Stroke({
              color:strokeColor,
              width: 3,
              lineDash:dottedLine ? [8, 16]: [0, 0]
            })
          });

          var routes = JSON.parse(res[i].RouteJson); 
          for (var routeJson of routes.getRouteJson) {
            var routes = routeJson.routepoints;
              var longPlus= [];var longMinus= [];
              routes.forEach(function (x) {
                x["lng"] = x["lon"];
                if(x["lon"] > 0){
                  longPlus.push(x);
                }else{
                  longMinus.push(x);
                }
              });
              if(longMinus.length >0){
                this.drawVesselRouteLines(longMinus, lineStringStyleNw, data);
              }
              if(longPlus.length>0){
                this.drawVesselRouteLines(longPlus, lineStringStyleNw, data);
              }
            }

            if(res[i].StartLocation == locations.start_location_name){
              startLoc = {
                geoLocation: new OlPoint(fromLonLat([res[i].StartLocationLatitude,res[i].StartLocationLongitude])),
                locationID: locations.start_location_id
              }
              this.addLocationPin(true,startLoc);
            }
            if(res[i].StartLocation == locations.start_location_name){
              endLoc = {
                geoLocation: new OlPoint(fromLonLat([res[i].StartLocationLatitude,res[i].StartLocationLongitude])),
                locationID: locations.start_location_id
              }
              this.addLocationPin(false,endLoc);
            }
      }


    });
  }

  addLocationPin(isStart,data):OlFeature{
    if(isStart){
      let marker = new OlFeature({
        id:'ST'+data.locationID, type: 'startLoc', data:data,
        geometry: data.geoLocation
      });    
      return marker
    }
    else{
      return null;
    }
    
  }

    /**
   * 
   * @param pathArr : array of coordinates for route
   * @param linestyle : style path like solid, dotted and small dotted lines
   */
  drawVesselRouteLines(pathArr, linestyle, vesselInfo) {
    let featureRoutes=[];
    pathArr.forEach((item, index) => {
      if (index != (pathArr.length - 1)) {
        let lineString = new LineString([[item.lon, item.lat], [pathArr[index + 1].lon, pathArr[index + 1].lat]]);
        lineString.transform('EPSG:4326', 'EPSG:3857');
        let featureLineString = new OlFeature({
          geometry: lineString,
          name: 'vesselLine'
        });
        featureLineString.setStyle(linestyle);
        featureRoutes.push(featureLineString);
      }
    });

    //Vessel Glow
    let vesselGlow = new OlFeature({
      id:'STG'+vesselInfo.ShiptechVesselId, type: 'vessel-glow', data:vesselInfo,
      geometry: new OlPoint(fromLonLat([vesselInfo.CurrentLocation.Longitude,vesselInfo.CurrentLocation.Latitude])),
    });  
    vesselGlow.setStyle(this.getVesselGlowStyle('amber'));  
    featureRoutes.push(vesselGlow)


    let vesselmarker = new OlFeature({
      id:'STD'+vesselInfo.ShiptechVesselId, type: 'vessel-dummy', data:vesselInfo,
      geometry: new OlPoint(fromLonLat([vesselInfo.CurrentLocation.Longitude,vesselInfo.CurrentLocation.Latitude])),
    });    
    vesselmarker.setStyle(this.getVesselStyle(vesselInfo));
    featureRoutes.push(vesselmarker);

    this.routeLayer.getSource().addFeatures(featureRoutes);
    this.routeLayer.setVisible(true);
    this.mapLayer.setOpacity(0.3);
    this.vesselMakersLayer.setOpacity(0.3);
  }

  private loadRoute(){
    var route = new OlFeature();
    var coordinates = [[2.173403, 40.385064], [2.273403,41.385064]];
    var geometry = new LineString(coordinates);
    geometry.transform('EPSG:4326', 'EPSG:3857'); //Transform to your map projection
    route.setGeometry(geometry);
    this.routeLayer.getSource().addFeature(route);
  }

   /**
   * 
   * @param clat : Current/vessel location latitude
   * @param clon : Current/vessel location longitude
   * @param elat : End location latitude
   * @param elon : End location longitude
   */
  getRotationForVessel(clat, clon, elat, elon) {
    var x2 = clat;
    var x1 = elat;
    var y2 = clon;
    var y1 = elon;
    var radians = Math.atan2((y1 - y2), (x1 - x2));

    var compassReading = radians * (180 / Math.PI);

    var coordNames = [0, 0.75, 1.5, 2, 3.05, 4, 4.75, 5.25, 0];
    // var coordNames = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    var coordIndex = Math.round(compassReading / 45);
    if (coordIndex < 0) {
      coordIndex = coordIndex + 8;
    };
    return coordNames[coordIndex];
  }

  //map Zoom +
  mapZoom(iszoomIn){
    if(iszoomIn)
      this.map.getView().setZoom(this.map.getView().getZoom()+1); 
    else
      this.map.getView().setZoom(this.map.getView().getZoom()-1); 
  }
  
  setCenter() {
    var lonlat = fromLonLat([10, 10]);
    this.flyTo(lonlat,() => {this.isLoading = false},3)
}



// var bern = fromLonLat([7.4458, 46.95]);
//MOVE TO THE LOCATION
flyTo(location, done, zoom) {
  var duration = 200; //2000
  // var zoom = this.map.getView().getZoom();
  var zoom = zoom ? zoom : this.map.getView().getZoom();
  var parts = 1;
  var called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    } 
  }
  this.map.getView().animate({
    center: location,
    duration: duration
  }, callback);

  if(zoom != this.map.getView().getZoom()){
    this.map.getView().animate({
      zoom: zoom,
      duration: duration / 2
    }, callback);
  }
}

closeOverlayPopup(){
  //this.showFullLocationInfo =false;
  this.showFullVesselInfo1 = false;
  this.showFullLocationInfo1 = false;
  setTimeout(() => {
    this.showFullVesselInfo = false;
    this.showFullLocationInfo = false;
  }, 1000);
  
  }

getCurrentTime():string{
  var d = new Date(); // for now
  this.lastUpdatedOn ='Today '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
  return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
}

animate(){
  // this.animationState = false;
  // this.isAnimate = true;
  this.showFullVesselInfo1 = true;
  
  this.showFullLocationInfo1 = true;
  this.showFullLocationInfo = true;
  this.showFullVesselInfo = true;
  
  
  //this.showFullVesselInfo1 = true;
    // setTimeout(() => {
    //   this.animationState = true;
    //   this.animationWithState = !this.animationWithState;
    // }, 1);
}

}

//Styles
var countryText = new Style({
  fill: new Fill({
    color: '#777F8C'
  }),
  stroke: new Stroke({
    color: '#5C6270',
    width: 0.5
  }),
  text: new Text({
    font: '13px Calibri,sans-serif',
    fill: new Fill({
      color: '#424a57'
    })
  })
});


