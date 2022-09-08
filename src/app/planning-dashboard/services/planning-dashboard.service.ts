import { forkJoin as observableForkJoin } from 'rxjs';
import { Injectable, NgModule, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { VesselDataModel, VesselLocation, VoyageDetails, FuelDetails, RequestDetail } from '../../shared/models/vessel.data.model';
import { VesselFilterPreferenceModel } from '../../shared/models/vessel-filter.model';
import { LocationModel, SupplierModel, CommentModel, LocationPriceModel } from '../../shared/models/location.model';
import { ExcelExportFormat } from '../../shared/models/excel-export';
import { AppSettings } from '../../shared/models/api-settings';
import { map } from 'rxjs/operators';
import { HttpRequestOptions } from './util-functions/http-helper';
import { HttpHelperService } from './util-functions/http-helper';
// import { MongodbService } from 'inatech-shared-infrastructure';
import { Broadcaster } from '../services/broadcaster';
import * as _moment from 'moment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const moment = _moment;

@Injectable()
export class PlanningDashboardService {
    selectedFuelStatusFilter: any;
    vesselListEmitter: EventEmitter<VesselDataModel[]> = new EventEmitter<VesselDataModel[]>();
    vesselFilterListEmitter: EventEmitter<VesselDataModel[]> = new EventEmitter<VesselDataModel[]>();
    masterVesselListEmitter: EventEmitter<any> = new EventEmitter<any>();
    elementAttributeEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() fire: EventEmitter<any> = new EventEmitter();

    appSettings:any={
        baseUrl: "",
        integrationUrl: "",
        blobUrl: "",
        defaultRob:""
    };

    
    headersProp: HttpHeaders;

    hoverEmitter: EventEmitter<any> = new EventEmitter<any>();
    locationClickEmitter: EventEmitter<any> = new EventEmitter<any>();

    searchVesselEmitter: EventEmitter<any> = new EventEmitter<any>();
    searchVesselMasterEmitter: EventEmitter<any> = new EventEmitter<any>();
    refreshVesselListEmitter: EventEmitter<any> = new EventEmitter<any>();

    // apiurl:string=environment.apiUrl;

    // apiurl:string='./assets/data/table-view.json';

    FuelStatus: any[] =
        ["ROB", "ROB+Req. Quantity", "ROB+Ordered Quantity", "ROB+Ordered Quantity+Req. Quantity"];

    constructor(private http: HttpClient, private httpHelper: HttpHelperService, public objBroadcast: Broadcaster,
        // private objMongoService: MongodbService, 
        private objAppsettings: AppSettings) {
        this.headersProp = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, );

        if(this.checkNestedPropertiesAreNull(this.appSettings) && 
        localStorage.getItem('appSettings')!=undefined)
        {
            this.appSettings=JSON.parse(localStorage.getItem('appSettings'));

            return
        }
        objBroadcast.on('appSettings').subscribe((res: any) => {
            localStorage.setItem('appSettings',
                JSON.stringify({
                    'baseUrl':res.bigDataServiceUrl,
                    'integrationUrl':res.integrationApiUrl,
                    'blobUrl':res.blobUrl,
                    'defaultRob':res.defaultFuelStatus
                })
            );

            this.appSettings={
                baseUrl: res.bigDataServiceUrl,
                integrationUrl: res.integrationApiUrl,
                blobUrl: res.blobUrl,
                defaultRob:res.defaultFuelStatus
            };
        });

    }
    titleCaseWord(word: string) {
        if (!word) return word;
        var returnWord = "";
        var splitt = word.split(' ');
        if (splitt.length == 0)
            returnWord = word[0].toUpperCase() + word.substr(1).toLowerCase();
        else {
            for (let i = 0; i < splitt.length; i++) {
                var currentWord = splitt[i];
                returnWord = returnWord + currentWord[0].toUpperCase() + currentWord.substr(1).toLowerCase() + " ";

            }
        }
        return returnWord;
    }
    getDateFromString(inputDateStr: string) {

        var objDate = moment(inputDateStr),

            locale = "en-us",

            time = objDate.format('H:mm'),
            dateFormat = objDate.format('D MMMM YYYY')



        return dateFormat + " " + time;
    }
    checkFileType(fileExtension): boolean {
        var isAccepted = true;
        switch (fileExtension) {
            case "js":
            case "json":
            case "ts":
            case "html":
            case "sql":
            case "dll":
            case "java":
            case "jnl":
            case "jar":
            case "ps1":
            case "pyc":
            case "zip":
            case "rar":
            case "exe":

            case "py": {
                isAccepted = false;
                break;
            }
            default: {
                isAccepted = true;
                break;
            }
        }
        return isAccepted;

    }
    postFileToBlob(fileArray: any, fileName) {

        var base64Arr = fileArray.split("base64,")[1];
        var obj = {
            ByteValue: base64Arr,
            FileName: fileName,
            Extension: "",
        };
        return this.http.post(this.appSettings.integrationUrl + "/api/Storage/PostToBlob", obj, { headers: this.headersProp, responseType: 'text' });
    }
    getVesselDetailsByIMONO(vesselIMONO, robCondition?) {
        var url = this.appSettings.baseUrl + "/api/Vessels/" + vesselIMONO;
        var options = this.httpHelper.formHttpClientParams(<HttpRequestOptions>{ requestParams: { robCondition: robCondition } });
        return this.http.get(url, { params: options.requestParams });
    }
    GetSeaRouteList(imono) {
        return this.http.get(this.appSettings.integrationUrl + "/api/VoyageRoute/GetRoute?imono=" + imono);
    }
    GetRequestStatusColor(){
        return this.http.get(this.appSettings.baseUrl+ "/api/RequestStatusColorCode");
    }

    getLocations() {
        return this.http.get(this.appSettings.baseUrl + "/api/Locations");
    }

    change() {
        this.fire.emit(true); //For Disappearance of text while editing comment
    }
    getEmittedValue() {
        return this.fire; //For Disappearance of text while editing comment
    }

    getLocationCountries(): Observable<any> {

        return Observable.create((observer: any) => {
            if (this.appSettings.baseUrl === undefined || this.appSettings.baseUrl === "") {
                this.objBroadcast.on('appSettings').subscribe((res: any) => {
                    this.appSettings.baseUrl = res.bigDataServiceUrl;
                    this.appSettings.integrationUrl = res.integrationApiUrl;

                    this.http.get(this.appSettings.baseUrl + "/api/Locations/GetLocationCountries").subscribe((res) => {
                        observer.next(res);
                        observer.complete();
                    });


                });
            }
            else {
                this.http.get(this.appSettings.baseUrl + "/api/Locations/GetLocationCountries").subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
            }
        });



        // return this.http.get(this.baseUrl + "/api/Locations/GetLocationCountries");
    }


    naturalCompare(a, b) {
        var ax = [], bx = [];

        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

        while (ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if (nn) return nn;
        }

        return ax.length - bx.length;
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    getLocationByName(locationName: string) {
        return this.http.get(this.appSettings.baseUrl + "/api/Locations/GetLocationByName/" + locationName);
    }

    getVesselMaster(): Observable<any> {
        // this.baseUrl = (<any>data).baseUrl;

        return Observable.create((observer: any) => {
            if (this.appSettings.baseUrl === undefined || this.appSettings.baseUrl==="") {
                this.objBroadcast.on('appSettings').subscribe((res: any) => {
                    this.appSettings.baseUrl = res.bigDataServiceUrl;
                    this.appSettings.integrationUrl = res.integrationApiUrl;

                    this.http.get(this.appSettings.baseUrl + "/api/Master/GetVessels").subscribe((vessels) => {
                        observer.next(vessels);
                        observer.complete();
                    });

                })
            }
            else {
                this.http.get(this.appSettings.baseUrl + "/api/Master/GetVessels").subscribe((vessels) => {
                    observer.next(vessels);
                    observer.complete();
                });

            }
        });

    }

    getVesselInfo(): Observable<VesselDataModel[]> {
        return this.http.get(this.appSettings.baseUrl + "/api/Vessels").pipe(map((res: any[]) => {

            let vesselList: VesselDataModel[] = []
            res.forEach(vessel => {
                vesselList.push(
                    <VesselDataModel>
                    {
                        ShiptechVesselId: vessel.ShiptechVesselId,
                        VesselIMONO: vessel.VesselIMONO,
                        VesselName: vessel.VesselName,
                        VesselType: vessel.VesselType,
                        ROB: {
                            HSFO: <FuelDetails>{ Value: vessel.ROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            ULSFO: <FuelDetails>{ Value: vessel.ROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            DOGO: <FuelDetails>{ Value: vessel.ROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            Color: '',
                            ColorCode: ''
                        },
                        StandardROB: {
                            HSFO: <FuelDetails>{ Value: vessel.StandardROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            ULSFO: <FuelDetails>{ Value: vessel.StandardROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            DOGO: <FuelDetails>{ Value: vessel.StandardROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            Color: '',
                            ColorCode: ''
                        },
                        MinimumROB: {
                            HSFO: <FuelDetails>{ Value: vessel.MinimumROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            ULSFO: <FuelDetails>{ Value: vessel.MinimumROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            DOGO: <FuelDetails>{ Value: vessel.MinimumROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            Color: '',
                            ColorCode: ''
                        },
                        MaximumROB: {
                            HSFO: <FuelDetails>{ Value: vessel.MaximumROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            ULSFO: <FuelDetails>{ Value: vessel.MaximumROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            DOGO: <FuelDetails>{ Value: vessel.MaximumROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                            Color: '',
                            ColorCode: ''
                        },
                        StartLocation: <VesselLocation>{
                            LocationId: vessel.StartLocationId,
                            LocationName: vessel.StartLocation,
                            ETA: vessel.StartLocationETA,
                            ETB: vessel.StartLocationETB,
                            Latitude: vessel.StartLatitude == undefined ? 0 : vessel.StartLatitude,
                            Longitude: vessel.StartLongitude == undefined ? 0 : vessel.StartLongitude,
                            Schedule: false,
                            Status: ''
                        },
                        EndLocation: <VesselLocation>{
                            LocationId: vessel.EndLocationId,
                            LocationName: vessel.EndLocation,
                            ETA: vessel.EndLocationETA,
                            ETB: vessel.EndLocationETB,
                            Latitude: vessel.EndLatitude == undefined ? 0 : vessel.EndLatitude,
                            Longitude: vessel.EndLongitude == undefined ? 0 : vessel.EndLongitude,
                            Schedule: false,
                            Status: ''
                        },
                        CurrentLocation: <VesselLocation>{
                            LocationId: 0,
                            LocationName: vessel.CurrentLocation,
                            ETA: vessel.ETA != undefined ? vessel.ETA : undefined,
                            ETB: vessel.ETB != undefined ? vessel.ETB : undefined,
                            Latitude: vessel.Latitude != null ? vessel.Latitude : 0,
                            Longitude: vessel.Longitude != null ? vessel.Longitude : 0,
                            Schedule: false,
                            Status: ''
                        },
                        VesselStatus: '',
                        Request: <RequestDetail>{ RequestId: vessel.RequestId, RequestName: vessel.RequestName, RequestStatus: vessel.RequestStatus, RequestUpdatedOn: vessel.RequestUpdatedOn },
                        LastAction: new Date(),
                        Comments: null,
                        CommentsCount: vessel.Comments,
                        VoyageDetails: [],
                        VoyageStatus: vessel.VoyageStatus,
                        VoyageCode: vessel.VoyageCode
                    })

            });

            return vesselList;
        },
            (error) => {

                return null;
            }));
    }

    getVesselInfoByROB(robOption?): Observable<VesselDataModel[]> {
        return this.http.post(this.appSettings.baseUrl + "/api/Vessels/GetVesselsByROB", robOption, { headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) }).
            pipe(
                map((res: any[]) => {
                    let vesselList: VesselDataModel[] = []
                    res.forEach(vessel => {
                        vesselList.push(
                            <VesselDataModel>
                            {
                                ShiptechVesselId: vessel.ShiptechVesselId,
                                VesselIMONO: vessel.VesselIMONO,
                                VesselName: vessel.VesselName,
                                VesselType: vessel.VesselType,
                                ROB: {
                                    HSFO: <FuelDetails>{ Value: vessel.ROBHSFO == undefined ? 0 : vessel.ROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    ULSFO: <FuelDetails>{ Value: vessel.ROBULSFO == undefined ? 0 : vessel.ROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    DOGO: <FuelDetails>{ Value: vessel.ROBDOGO == undefined ? 0 : vessel.ROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    Color: '',
                                    ColorCode: ''
                                },
                                StandardROB: {
                                    HSFO: <FuelDetails>{ Value: vessel.StandardROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    ULSFO: <FuelDetails>{ Value: vessel.StandardROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    DOGO: <FuelDetails>{ Value: vessel.StandardROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    Color: '',
                                    ColorCode: ''
                                },
                                MinimumROB: {
                                    HSFO: <FuelDetails>{ Value: vessel.MinimumROBHSFO == undefined ? 0 : vessel.MinimumROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    ULSFO: <FuelDetails>{ Value: vessel.MinimumROBULSFO == undefined ? 0 : vessel.MinimumROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    DOGO: <FuelDetails>{ Value: vessel.MinimumROBDOGO == undefined ? 0 : vessel.MinimumROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    Color: '',
                                    ColorCode: ''
                                },
                                MaximumROB: {
                                    HSFO: <FuelDetails>{ Value: vessel.MaximumROBHSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    ULSFO: <FuelDetails>{ Value: vessel.MaximumROBULSFO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    DOGO: <FuelDetails>{ Value: vessel.MaximumROBDOGO, ColorCode: vessel.ColorCode == undefined ? '' : vessel.ColorCode },
                                    Color: '',
                                    ColorCode: ''
                                },
                                StartLocation: <VesselLocation>{
                                    LocationId: vessel.StartLocationId,
                                    LocationName: vessel.StartLocation,
                                    ETA: vessel.StartLocationETA,
                                    ETB: vessel.StartLocationETB,
                                    Latitude: vessel.StartLatitude != undefined ? vessel.StartLatitude : 0,
                                    Longitude: vessel.StartLongitude != undefined ? vessel.StartLongitude : 0,
                                    Schedule: false,
                                    Status: ''
                                },
                                EndLocation: <VesselLocation>{
                                    LocationId: vessel.EndLocationId,
                                    LocationName: vessel.EndLocation,
                                    ETA: vessel.EndLocationETA,
                                    ETB: vessel.EndLocationETB,
                                    Latitude: vessel.EndLatitude != undefined ? vessel.EndLatitude : 0,
                                    Longitude: vessel.EndLongitude != undefined ? vessel.EndLongitude : 0,
                                    Schedule: false,
                                    Status: ''
                                },
                                CurrentLocation: <VesselLocation>{
                                    LocationId: 0,
                                    LocationName: vessel.CurrentLocation,
                                    ETA: new Date(),
                                    ETB: new Date(),
                                    Latitude: vessel.Latitude != undefined ? vessel.Latitude : 0,
                                    Longitude: vessel.Longitude != undefined ? vessel.Longitude : 0,
                                    Schedule: false,
                                    Status: ''
                                },
                                VesselStatus: '',
                                Request: <RequestDetail>{ RequestId: vessel.RequestId, RequestName: vessel.RequestName, RequestStatus: vessel.RequestStatus, RequestUpdatedOn: vessel.RequestUpdatedOn },
                                LastAction: new Date(),
                                Comments: null,
                                CommentsCount: vessel.Comments,
                                VoyageDetails: [],
                                VoyageStatus: vessel.VoyageStatus,
                                VoyageCode: vessel.VoyageCode
                            })

                    });

                    return vesselList;
                },
                    (error) => {

                        return null;
                    })
            );
    }
    getVesselCommments(vesselId) {
        var url = this.appSettings.baseUrl + "/api/Comments/GetCommentsByEntity/Vessel/" + vesselId;

        return this.http.get(url).pipe(map((res) => {
            return <CommentModel[]>res;
        },
            (error) => {

                null;
            }));

    }
    RemoveCommments(Id, Entity) {
        return this.http.post(this.appSettings.baseUrl + "/api/Comments/Remove?Id=" + Id + "&Entity=" + Entity, { headers: this.headersProp });
    }

    EditComments(EntityComment, Id, Entity, EntityName, UserName, FileName) {
        var obj = {
            Id: Id,
            Entity: Entity,
            CreatedBy: UserName,
            EntityName: EntityName,
            Comments: EntityComment,
            FileName: FileName,
            CreatedDate: new Date(),
        };
        return this.http.put(this.appSettings.baseUrl + "/api/Comments", obj,{ headers: this.headersProp });
    }

    getVoyagesByIMONO(vesselIMONO) {
        var url = this.appSettings.baseUrl + "/api/Voyages/GetVoyageByImoNo/" + vesselIMONO;
        return this.http.get(url).pipe(
            map((res: any[]) => {

                let voyageList: any[] = [];

                res.forEach(voyage => {
                    voyageList.push(
                        {
                            VoyageId: voyage.Id,
                            VoyageCode: voyage.VoyageCode,
                            VesselName: voyage.VesselName,
                            VesselIMONO: voyage.VesselIMONO,
                            LocationName: voyage.Location,
                            Latitude: voyage.Latitude,
                            Longitude: voyage.Longitude,
                            Function: voyage.Function,
                            ETA: voyage.ETA,
                            ETB: voyage.ETB,
                            ETD: voyage.ETD,
                            Status: voyage.Status

                        }
                    );
                });

                return res;
            },
                (error) => {

                    return null;
                })
        );
    }

    getVoyagesByVoyageCode(voyageCode) {
        var url = this.appSettings.baseUrl + "/api/Voyages/GetVoyagesByVoyageCode/" + voyageCode;
        return this.http.get(url).pipe(
            map((res: any[]) => {

                let voyageList: any[] = [];

                res.forEach(voyage => {
                    voyageList.push(
                        {
                            VoyageId: voyage.Id,
                            VoyageCode: voyage.VoyageCode,
                            VesselName: voyage.VesselName,
                            VesselIMONO: voyage.VesselIMONO,
                            LocationName: voyage.Location,
                            Latitude: voyage.Latitude,
                            Longitude: voyage.Longitude,
                            Function: voyage.Function,
                            ETA: voyage.ETA,
                            ETB: voyage.ETB,
                            ETD: voyage.ETD,
                            Status: voyage.Status
                        }
                    );
                });

                return res;
            },
                (error) => {

                    return null;
                })
        );
    }

    getLocationCommments(locationId) {
        var url = this.appSettings.baseUrl + "/api/Comments/GetCommentsByEntity/Location/" + locationId;

        return this.http.get(url).pipe(map((res) => {
            return <CommentModel[]>res;
        },
            (error) => {

                null;
            }));

    }
    GetLatestVesselUpdatedDate() {


        return Observable.create((observer: any) => {
            if (this.appSettings.baseUrl === undefined || this.appSettings.baseUrl === "") {
                this.objBroadcast.on('appSettings').subscribe((res: any) => {
                    this.appSettings.baseUrl = res.bigDataServiceUrl;
                    this.appSettings.integrationUrl = res.integrationApiUrl;

                    this.http.get(this.appSettings.baseUrl + "/api/Vessels/GetLatestVesselUpdatedDate").subscribe((res) => {
                        observer.next(res);
                        observer.complete();
                    });


                });
            }
            else {
                this.http.get(this.appSettings.baseUrl + "/api/Vessels/GetLatestVesselUpdatedDate").subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
            }
        });
    }
    postVesselComments(vesselId, vesselComments: CommentModel) {

        var obj = {
            Id: 0,
            Entity: vesselId,
            CreatedBy: vesselComments.UserName,
            EntityName: "Vessel",
            Comments: vesselComments.Comment,
            FileName: vesselComments.FileName,
            CreatedDate: new Date(),
        };
        return this.http.post(this.appSettings.baseUrl + "/api/Comments", obj, { headers: this.headersProp });
    }
    postLocationComments(vesselId, locationComments: CommentModel) {

        var obj = {
            Id: 0,
            Entity: vesselId,
            CreatedBy: locationComments.UserName,
            EntityName: "Location",
            Comments: locationComments.Comment,
            FileName: locationComments.FileName,
            CreatedDate: new Date(),
        };
        return this.http.post(this.appSettings.baseUrl + "/api/Comments", obj, { headers: this.headersProp });
    }


    getTenantDetails() {
      console.log("get tenant detailss");
        return this.http.get('./assets/data/filter-detail.json').pipe(map((res) => {

            return <VesselFilterPreferenceModel>res;
        },
            (error) => {

                null;
            }));
    }

    getMarketPriceByLocation(locationName) {
        var url = this.appSettings.baseUrl + "/api/Vessels/" + locationName;
        return this.http.get(url);//.map((res) => {

    }

    getDummyLocationPrices(portDetails): LocationModel {
        if (portDetails.port_name == undefined)
            portDetails.port_name = ''

        var location: LocationModel = {
            LocationId: portDetails.PortId,
            LocationName: portDetails.Name,
            Latitude: portDetails.Latitude,
            Longitude: portDetails.Longitude,
            Comments: [
            ],
            ROB: {
                ProductName: "Test",
                PriceHistory: [
                    {
                        HSFO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,

                            Color: '',
                        },
                        ULSFO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,
                            Color: '',
                        }
                        , DOGO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,
                            Color: '',
                        },
                        PriceDate: new Date()
                    },
                    {
                        HSFO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,
                            Color: '',
                        },
                        ULSFO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,
                            Color: '',
                        }
                        , DOGO: {
                            Price: Math.floor(Math.random() * 1000) + 1,
                            premium: Math.floor(Math.random() * 11),
                            discount: 0,
                            Color: '',
                        },
                        PriceDate: new Date(new Date().setDate(new Date().getDate() - 1))
                    }


                ]
            }


        };
        for (var i = 0; i < location.ROB.PriceHistory.length; i++) {

            if (location.ROB.PriceHistory[i].HSFO.premium == 0) {
                location.ROB.PriceHistory[i].HSFO.discount = Math.floor(Math.random() * 10) + 1;
            }
            else {
                location.ROB.PriceHistory[i].HSFO.discount = 0;

            }

            if (location.ROB.PriceHistory[i].ULSFO.premium == 0) {
                location.ROB.PriceHistory[i].ULSFO.discount = Math.floor(Math.random() * 10) + 1;
            }
            else {
                location.ROB.PriceHistory[i].ULSFO.discount = 0;

            }
            if (location.ROB.PriceHistory[i].DOGO.premium == 0) {
                location.ROB.PriceHistory[i].DOGO.discount = Math.floor(Math.random() * 10) + 1;
            }
            else {
                location.ROB.PriceHistory[i].DOGO.discount = 0;

            }
        }




        return location;
    }

    GetTodayMarketPrice() {
        var url = this.appSettings.baseUrl + "/api/MarketPrice/GetTodayMarketPrice/";
        return this.http.get(url);//.map((res) => {
    }

    getLocationPrices(locationName) {

        var url = this.appSettings.baseUrl + "/api/MarketPrice/GetLatestMarketPriceByLocation/" + locationName;
        return this.http.get(url);//.map((res) => {

    }
    getLocationSupplier(LocationName: number) {
        var url = this.appSettings.baseUrl + "/api/Counterparty/GetCounterpartyListByLocation/" + LocationName;

        return this.http.get(url);
    }

    getDummyLocationSupplier(LocationId: number): Array<SupplierModel> {
        var suppliers: Array<SupplierModel> = [
            {
                Id: 1,
                SupplierName: "Argos Bunkering",
                rating: 3,
                LocationName: "Singapore",
                IsPhysical: true,
                IsTrader: false
            },
            {
                Id: 2,
                LocationName: "Singapore",
                IsPhysical: true,
                IsTrader: false,

                SupplierName: "Ar Bunkering",
                rating: 3
            }, {
                Id: 3,

                LocationName: "Singapore",
                IsPhysical: true,
                IsTrader: false,
                SupplierName: "Chemoil Europe",
                rating: 3,
            }, {
                Id: 4,
                LocationName: "Singapore",
                IsPhysical: false,
                IsTrader: true,
                SupplierName: "ExxonMobil Marine",
                rating: 3,
            }, {
                Id: 5, LocationName: "Singapore",
                IsPhysical: false,
                IsTrader: true,
                SupplierName: "Golden Arrow Europe",
                rating: 3,
            }, {
                Id: 6, LocationName: "Singapore",
                IsPhysical: true,
                IsTrader: true,
                SupplierName: "Peninsula Petrochemicals Ltd.",
                rating: 3,
            }, {
                Id: 7, LocationName: "Singapore",
                IsPhysical: true,
                IsTrader: true,
                SupplierName: "Shell Trading",
                rating: 3,
            }
        ];

        return suppliers;
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }


    getDummyVesselVoyages(VoyageId, LocationId, portDetails, VesselId): Array<VoyageDetails> {
        var arr: Array<VoyageDetails> = [];
        var randomNumber = Math.abs(Math.floor(Math.random() * 11) - 5);

        for (var i = 0; i < randomNumber; i++) {
            var item = this.getDummyVesselVoyage(VoyageId, LocationId, portDetails, VesselId, i);
            arr.push(item);
        }
        return arr;
    }

    getDummyVesselVoyage(VoyageId, LocationId, portDetails, VesselId, index): VoyageDetails {
        var item: VoyageDetails = {
            VesselId: VesselId,
            VoyageId: VoyageId,
            LocationId: LocationId,
            LocationName: LocationId < 154 ? portDetails[LocationId + index].port_name : portDetails[VesselId + index].main_port_name,
            Function: index % 2 == 0 ? 'Load' : 'Discharge',
            ETA: new Date(),

            ETB: new Date(),
            ETD: this.randomDate(new Date(2018, 8, 1), new Date()),

        };
        item.ETB = this.randomDate(item.ETD, new Date());
        item.ETA = this.randomDate(item.ETB, new Date());
        return item;

    }
    getTableFilterOptions() {

        return observableForkJoin(

            this.http.get('./assets/data/text-col-filteroptions.json'),
            this.http.get('./assets/data/number-col-filteroptions.json'),
            this.http.get('./assets/data/date-col-filteroptions.json').pipe(map(
                results => {
                    return results;
                }
            ))
        )
    }

    /**
     * Method to get the vessel types
     */
    getVesselTypes() {
        //var url = this.appSettings.baseUrl + "/api/Master/GetVesselTypes";
        //return this.http.get(url);
    }

    /**
     * Method to get the vessel request types
     */
    getRequestTypes() {
        //var url = this.appSettings.baseUrl + "/api/Master/GetRequestStatusTypes";
        //return this.http.get(url);
    }

    exportToExcel(vesselList?: VesselDataModel[]): Observable<any> {

        return Observable.create((observer: any) => {
            this.http.get(this.appSettings.baseUrl + "/api/Vessels").subscribe((res: any[]) => {

                if (res == undefined && res.length <= 0) {
                    //TODO: Show Error in Export
                    return;
                }

                let objExcelExport: ExcelExportFormat = {
                    fileName: "VesselList",
                    fileExtension: "xls",
                    exportRefId: this.newGuid(),
                    tenantId: 0,
                    userId: 0,
                    exportData: res
                }

                this.http.post(this.appSettings.integrationUrl + "/api/Export/ExportVesselList", objExcelExport, { headers: this.headersProp }).
                    subscribe((res) => {
                        if (res == undefined) {
                            //TODO: Show Error in Export
                        }

                        observer.next(res);
                        observer.complete();
                    },
                        (error) => {
                            console.log(error);
                            observer.next(error);
                            observer.complete();
                        });

            });
        });


    }

    /**
     * Set the schedule details for Vessel from the response from backend
     * @param res 
     */
    setVesselScheduleDetails(res: any) {

        var resp = [];
        for (var i = 0; i < res.length; i++) {
            var currentItem = res[i];
            var item: VoyageDetails = {
                VesselId: currentItem.Id,
                VoyageId: currentItem.VoyageCode,
                LocationId: 1,
                LocationName: currentItem.Location,
                Function: i % 2 == 0 ? 'Load' : 'Discharge',
                ETA: currentItem.ETA,//new Date(),

                ETB: currentItem.ETB,//new Date(),
                ETD: currentItem.ETD,//new Date(),

            };
            resp.push(item);
        }
        return resp;
    }

    /**
     * Set the  details for Vessel from the response from backend
     * @param res 
     */
    setVesselDetails(res: any) {
        var lastIndex = res.length - 1;
        var objVessel: VesselDataModel =
            <VesselDataModel>
            {
                CurrentLocation: {
                    LocationId: 0,
                    LocationName: res[0].CurrentLocation != undefined ? res[0].CurrentLocation : {},
                    ETA: new Date('08/20/2018'),
                    ETB: new Date('08/22/2018'),
                    ETD: new Date('08/22/2018'),
                    LatestETA: new Date('08/21/2018'),
                    LatestETB: new Date('08/23/2018'),
                    LatestETD: new Date('08/24/2018'),
                    Latitude: res.Latitude,
                    Longitude: res.Longitude,
                    Schedule: false,
                    Status: "Created"
                },
                ShiptechVesselId: res[0].Id,
                VesselIMONO: res[0].VesselIMONO,
                VesselName: res[0].VesselName,
                VesselStatus: res[0].RequestStatus,
                VesselType: res[0].VesselType,
                Request: <RequestDetail>{ RequestId: res[0].RequestId, RequestName: res[0].RequestName, RequestStatus: res[0].RequestStatus, RequestUpdatedOn: res[0].RequestUpdatedOn },
                Speed: res[0].Speed,
                Comments: [],
                CommentsCount: 0,
                StartLocation:
                {
                    LocationId: 1,
                    LocationName: res[0].StartLocation,
                    ETA: res[0].StartLocationETA,
                    ETB: res[0].StartLocationETB,
                    ETD: res[0].StartLocationETD,
                    LatestETA: res[0].LatestLocationETA,
                    LatestETB: res[0].LatestLocationETB,
                    LatestETD: res[0].LatestLocationETD,
                    Latitude: res[0].Latitude,
                    Longitude: res[0].Longitude,
                    Schedule: false,
                    Status: ''
                },
                EndLocation:
                {

                    LocationId: 1,
                    LocationName: res[0].EndLocation,
                    ETA: res[0].EndLocationETA,
                    ETB: res[0].EndLocationETB,
                    ETD: res[0].EndLocationETD,
                    LatestETA: res[0].LatestLocationETA,
                    LatestETB: res[0].LatestLocationETB,
                    LatestETD: res[0].LatestLocationETD,
                    Latitude: res[0].Latitude,
                    Longitude: res[0].Longitude,
                    Schedule: false,
                    Status: ''
                },
                LastAction: new Date(),
                StandardROB: {
                    HSFO: <FuelDetails>{ Value: res[0].StandardROBHSFO == undefined ? 0 : res[0].StandardROBHSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    ULSFO: <FuelDetails>{ Value: res[0].StandardROBULSFO == undefined ? 0 : res[0].StandardROBULSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    DOGO: <FuelDetails>{ Value: res[0].StandardROBDOGO == undefined ? 0 : res[0].StandardROBDOGO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    Color: '',
                    ColorCode: ''
                },
                MinimumROB: {
                    HSFO: <FuelDetails>{ Value: res[0].MinimumROBHSFO == undefined ? 0 : res[0].MinimumROBHSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    ULSFO: <FuelDetails>{ Value: res[0].MinimumROBULSFO == undefined ? 0 : res[0].MinimumROBULSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    DOGO: <FuelDetails>{ Value: res[0].MinimumROBDOGO == undefined ? 0 : res[0].MinimumROBDOGO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    Color: '',
                    ColorCode: ''
                },
                MaximumROB: {
                    HSFO: <FuelDetails>{ Value: res[0].MaximumROBHSFO == undefined ? 0 : res[0].MaximumROBHSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    ULSFO: <FuelDetails>{ Value: res[0].MaximumROBULSFO == undefined ? 0 : res[0].MaximumROBULSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    DOGO: <FuelDetails>{ Value: res[0].MaximumROBDOGO == undefined ? 0 : res[0].MaximumROBDOGO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    Color: '',
                    ColorCode: ''
                },
                EstimatedROB: {
                    HSFO: <FuelDetails>{ Value: res[0].ROBHSFO == undefined ? 0 : res[0].ROBHSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    ULSFO: <FuelDetails>{ Value: res[0].ROBULSFO == undefined ? 0 : res[0].ROBULSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    DOGO: <FuelDetails>{ Value: res[0].ROBDOGO == undefined ? 0 : res[0].ROBDOGO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    Color: '',
                    ColorCode: ''
                },
                ROB: {
                    HSFO: <FuelDetails>{ Value: res[0].ROBHSFO == undefined ? 0 : res[0].ROBHSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    ULSFO: <FuelDetails>{ Value: res[0].ROBULSFO == undefined ? 0 : res[0].ROBULSFO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    DOGO: <FuelDetails>{ Value: res[0].ROBDOGO == undefined ? 0 : res[0].ROBDOGO, ColorCode: res[0].ColorCode == undefined ? '' : res[0].ColorCode },
                    Color: '',
                    ColorCode: ''
                },
                VoyageDetails: []
            };


        return objVessel;
    }
    formatNumber(input) {
        if (input !== null && !isNaN(input)) {


            return parseFloat(input).toPrecision(3);

        }
        else if (input === null) {
            return '-';
        }
        else
            return input;
    }
    formatVesselDataforROb(vesselList): VesselDataModel[] {
        var HSFOColor = "";
        var DOGOColor = "";
        var ULSFOColor = "";
        var robColorCodes: any[];
        vesselList.forEach((vessel) => {

            DOGOColor = vessel.ROB.DOGO.Color = vessel.ROB.DOGO.Value < vessel.MinimumROB.DOGO.Value ? "red" : (vessel.ROB.DOGO.Value > vessel.MinimumROB.DOGO.Value && vessel.ROB.DOGO.Value < vessel.MaximumROB.DOGO.Value) ? "blue" : "orange";
            vessel.ROB.DOGO.ColorCode = vessel.ROB.DOGO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.DOGO.Color == 'orange') ? 'orange-threshold-box' : '';

            HSFOColor = vessel.ROB.HSFO.Color = vessel.ROB.HSFO.Value < vessel.MinimumROB.HSFO.Value ? "red" : (vessel.ROB.HSFO.Value > vessel.MinimumROB.HSFO.Value && vessel.ROB.HSFO.Value < vessel.MaximumROB.HSFO.Value) ? "blue" : "orange";
            vessel.ROB.HSFO.ColorCode = vessel.ROB.HSFO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.HSFO.Color == 'orange') ? 'orange-threshold-box' : '';

            ULSFOColor = vessel.ROB.ULSFO.Color = vessel.ROB.ULSFO.Value < vessel.MinimumROB.ULSFO.Value ? "red" : (vessel.ROB.ULSFO.Value > vessel.MinimumROB.ULSFO.Value && vessel.ROB.ULSFO.Value < vessel.MaximumROB.ULSFO.Value) ? "blue" : "orange";
            vessel.ROB.ULSFO.ColorCode = vessel.ROB.ULSFO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.ULSFO.Color == 'orange') ? 'orange-threshold-box' : '';

            robColorCodes = [vessel.ROB.HSFO.ColorCode, vessel.ROB.ULSFO.ColorCode, vessel.ROB.DOGO.ColorCode];
            vessel.ROB.Color = robColorCodes.every(this.checkVesselNormal) ? 'tbl-blue' : robColorCodes.some(this.checkVesselAbormal) ? 'tbl-red' : 'tbl-orange';

        });


        return vesselList;
    }

    filteredVesselSelection(vesselFilterCondition, vesselList) {

        // vesselList.map((vessel) => {
        //     vessel.IsSelected = false;
        // });

        if (vesselFilterCondition == undefined)
            return;

        vesselList.forEach((vessel) => {

            vessel.IsSelected = false;

            if (
                vesselFilterCondition.ConditionApplied.VesselType.length == 0 &&
                vesselFilterCondition.ConditionApplied.FuelType.length == 0 &&
                vesselFilterCondition.ConditionApplied.RequestStatus.length == 0
            ) {
                vesselFilterCondition.ConditionApplied.VesselByNames.forEach(
                    (vesselIMONO) => {
                        if (vessel.VesselIMONO == vesselIMONO)
                            vessel.IsSelected = true;
                    }
                );

            }

            else {

                if (this.checkVesselInVesselType(vessel, vesselFilterCondition.ConditionApplied.VesselType) &&
                    this.checkVesselInVesselFuelStatus(vessel, vesselFilterCondition.ConditionApplied.FuelType) &&
                    this.checkVesselInVesselRequestStatus(vessel, vesselFilterCondition.ConditionApplied.RequestStatus))
                    vessel.IsSelected = true;
                else
                    vessel.IsSelected = false;

                if (vesselFilterCondition.ConditionApplied.VesselByNames != undefined)
                    vesselFilterCondition.ConditionApplied.VesselByNames.forEach(
                        (vesselIMONO) => {
                            if (vessel.VesselIMONO == vesselIMONO)
                                vessel.IsSelected = true;
                        }
                    );

            }


        });

        return vesselList;

    }

    filterData(vesselList): any {

        let lastVesselFilterConditionApplied: any;

        if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined) {
            lastVesselFilterConditionApplied = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));

            if (lastVesselFilterConditionApplied == undefined)
                return;

            if (lastVesselFilterConditionApplied.ConditionApplied != undefined &&
                lastVesselFilterConditionApplied.ConditionApplied.VesselType != undefined) {

                if (lastVesselFilterConditionApplied.ConditionApplied.VesselType.length == 1 &&
                    lastVesselFilterConditionApplied.ConditionApplied.VesselType[0].vesselType == "All Vessels")
                    lastVesselFilterConditionApplied.FilterName = 'Default';

            }

            vesselList = this.filteredVesselSelection(lastVesselFilterConditionApplied, vesselList);

            return vesselList.filter(vessel => vessel.IsSelected);

        }

        return vesselList;
    }

    checkVesselInVesselType(vessel: any, selectedVesselTypes: any[]): boolean {

        let inVesselType: boolean = false;

        var currentSelectedVesselTypes = selectedVesselTypes;

        if (currentSelectedVesselTypes.length == 0)
            return true;

        currentSelectedVesselTypes.forEach((vesselType) => {

            if (vessel.VesselType == vesselType.vesselType)
                inVesselType = true;

        });

        return inVesselType;
    }

    checkVesselInVesselFuelStatus(vessel: any, selectedFuelStatuses: any[]): boolean {

        let inFuelStatus: boolean = false;

        var currentSelectedVesselFuelStatus = selectedFuelStatuses;

        if (currentSelectedVesselFuelStatus.length == 0)
            return true;

        currentSelectedVesselFuelStatus.forEach((fuelStatus) => {

            if (vessel.ROB.Color.indexOf(fuelStatus.Color) >= 0)
                inFuelStatus = true;

        });

        return inFuelStatus;
    }

    checkVesselInVesselRequestStatus(vessel: any, selectedRequestStatuses: any[]): boolean {

        let inRequestStatus: boolean = false;

        var currentSelectedVesselBunkerStatus = selectedRequestStatuses;

        if (currentSelectedVesselBunkerStatus.length == 0)
            return true;

        currentSelectedVesselBunkerStatus.forEach((bunkerStatus) => {

            if (vessel.Request.RequestStatus == bunkerStatus.StatusName)
                inRequestStatus = true;

        });

        return inRequestStatus;
    }


    checkVesselNormal(robColorCode: any): boolean {
        if (robColorCode == '')
            return true;
    }
    checkVesselAbormal(robColorCode: any): boolean {
        if (robColorCode == 'red-threshold-box')
            return true;
    }

    updateFilter(userName, TenantId, data) {

        // return this.objMongoService.GetNodeApiJson("PUT", "VesselFilterPreference?FilterId=" + data.FilterId + "&userName=" + userName + "&TenantId=" + TenantId, data).subscribe(res => {

        //     if (res != undefined) {
        //         return -1;
        //     }

        //     return 1;
        // });
    }

    deleteFilter(userName, TenantId, filterId) {

        // return this.objMongoService.GetNodeApiJson("DELETE", "VesselFilterPreference?FilterId=" + filterId + "&userName=" + userName + "&TenantId=" + TenantId).subscribe(res => {

        //     if (res != undefined) {
        //         return -1;
        //     }

        //     return 1;
        // });
    }

    clearItems() {
        localStorage.setItem('selectedROBOption', null);
        localStorage.removeItem('selectedROBOption');

        localStorage.setItem('lastVesselFilterConditionApplied', null);
        localStorage.removeItem('lastVesselFilterConditionApplied');

        localStorage.setItem('filteredVessels', null);
        localStorage.removeItem('filteredVessels');
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    checkNested(obj, key) {
        var args = Array.prototype.slice.call(key, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    checkNestedPropertiesAreNull(obj) {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return false;
        }
        return true;
    }

    titleCaseConverter(input: string): string {
        if (!input) {
            return '';
        } else {
            return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
        }
    }

    /** GET VESSEL TYPES */

    

    public getVesselsTypes(): Observable<any> {
        return this.http.get("./assets/data/vessel-types.json")
                        .pipe(map((res:any) => res))
                        .catch((error) => error);

    }


}
