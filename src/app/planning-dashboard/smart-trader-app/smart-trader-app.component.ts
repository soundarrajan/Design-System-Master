import { Component, ChangeDetectorRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BackendServices } from '../services/backend.service';
import { voyagedetails } from '../data/voyage'
import { VesselDataModel } from '../../shared/models/vessel.data.model';
import { PLDData, BunkerStatus, VesselTypes } from '../data/pld.data';
// import { MongodbService } from 'inatech-shared-infrastructure';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { LocationClickComponent } from '../location/location.click.component/location.click.component.component';
import { VesselFilterComponent } from '../vessel-filter/vessel-filter.component';
import { PlanningDashboardService } from '../services/planning-dashboard.service';
import { VesselFilterPreferenceModel, VesselFilterDetailModel } from '../../shared/models/vessel-filter.model';
import { Broadcaster } from '../services/broadcaster';
import { PlanningDashboardViews } from '../../shared/enums/pld-views.enum';
//import { GeneralModel } from '../shared/models/generic.model';
// import * as data from '../../assets/config/settings.json';
// import { AvailableFiltersComponent, SavefilterpreferenceComponent } from 'inatech-shared-infrastructure';
import { AppSettings } from '../../shared/models/api-settings';
// import { Guid } from '../services/util-functions/guid-generator';

import * as _loadashC from 'lodash';

const loadashC = _loadashC;
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/services/local-service.service';
const moment = _moment;

@Component({
  selector: 'app-smart-trader-app',
  templateUrl: './smart-trader-app.component.html',
  styleUrls: ['./smart-trader-app.component.scss']
})
export class SmartTraderAppComponent implements OnInit, OnDestroy {

  tenantFilterDetail: VesselFilterPreferenceModel;

    masterVesselList: VesselDataModel[];
    lastUpdatedOn = "Today " + new Date(new Date().getTime()).toLocaleTimeString();
    // masterVesselListEmitter:EventEmitter<any>=new EventEmitter<any>();

    IsAutoComplete: boolean = true;

    IsAppliedFilterRob: boolean = false;

    PreviousAppliedFilter: any;

    filteredVesselList: VesselDataModel[];
    ngOnInit(): void {
        //throw new Error("Method not implemented.");

        this.planningDashboardService.getTenantDetails().subscribe((res) => {
console.log("TENANT DETAILS" + res);
            this.tenantFilterDetail = res;

        })

        // this.planningDashboardService.locationClickEmitter.subscribe((res) => {

        //     if (res != undefined && res.Id == 'Map')
        //         this.showLocationClickPopup(res.Value);


        //     if (res != undefined && res.Id == 'Table')
        //         this.showLocationClickPopup(res.Value);

        // });

        this.planningDashboardService.searchVesselEmitter.subscribe((res) => {
            this.SearchVesselClick(res);
        });

        this.planningDashboardService.vesselFilterListEmitter.subscribe((vesselList) => {
            if (vesselList == undefined)
                return;

            this.vesselList = this.formatVesselDatawithROBandFilter(vesselList);

            this.planningDashboardService.refreshVesselListEmitter.emit(vesselList);
        });

        this.objBroadcaster.on('expandFilters').subscribe((eventFilterAction) => {

            this.OpenAvailableChipFilters();

        });

        //START OF Search-vessel-component broadcasts
        this.objBroadcaster.on('SearchedVessel').subscribe((res) => {

            let lastVesselFilter: any = "Default";

            if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined)
                lastVesselFilter = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));


            if (res == -1) {

                this.applyFilter(lastVesselFilter, false);
            }

            else if (res > 0) {
                this.cd.markForCheck();

                this.vesselList = this.masterVesselList.filter(vessel => vessel.VesselIMONO == res);

                this.objBroadcaster.broadcast('refreshSearchedVesselList', this.vesselList);

                this.cd.detectChanges();

            }

        });


        this.vesselListEmitterSubscribe();

        //END OF Search-vessel-component broadcasts

    }

    vesselIcon = {
        "red": "#eb5757",
        "amber": "#f9c375",
        "blue": "#1cabe0",

    };
    vesselByROB = {
        red: 0,
        blue: 0,
        amber: 0
    }
    showTable = false;
    filterModel = [];
    tableName = 'PlanningDashboard';
    userName = localStorage.getItem('userInfo') == undefined ? 'admin@inatech.com' : localStorage.getItem('userInfo');
    TenantId = 4;
    BunkerStatus = [];
    VoyageDetails = [];
    vesselList = [];
    vesselTypes = [];
    chipListForFilters = [];
    availableFilters = [];
    secaRegionsList: any;
    ports: any;
    TodayMarketPriceList: any;
    lastVesselFilterConditionApplied: any;
    requestStatusColorCode=[];
    constructor(private objBroadcaster: Broadcaster, 
        private localService:LocalService,
        private planningDashboardService: PlanningDashboardService, 
        private cd: ChangeDetectorRef,
        private objBackendServices: BackendServices, 
        // private objMongoDbService: MongodbService, 
        public dialog: MatDialog, private snackBar: MatSnackBar,
        private objAppsettings: AppSettings) {
        localStorage.removeItem('SearchedVesselIMONO');
        // this.objMongoDbService.apiUrl = objAppsettings.mongoUrl;
        this.getData();
        this.getVesselData();
      
        this.getFilters();


        // // Should Remove code after checking Vessel Popup loads properly
        // setTimeout(() => {
        //     this.toggle({});
        //     setTimeout(() => {
        //         this.toggle({});
        //     }, 0)
        // }, 500);

        this.objBroadcaster.on('appSettings').subscribe((res: any) => {
            // this.objMongoDbService.apiUrl = res.mongoUrl;
        });

    }

    /**
      * Opens the Save Preference Popup
      * @param filterData 
      */
    savePreferencePopup(filterData) {

        var selectedFilter = {
            bunkerRequestStatus: filterData.bunkerRequestStatus.filter(requestState => requestState.IsSelected),
            fuelStatus: filterData.fuelStatus.filter(fuelState => fuelState.IsSelected),
            VesselTypes: filterData.vesselTypes.filter(vesselType => vesselType.IsSelected),
            VesselByNames: filterData.ConditionApplied.VesselByNames
        };

        localStorage.setItem('currentVesselFilter', JSON.stringify(selectedFilter));

        // const dialogRefForSavePref = this.dialog.open(SavefilterpreferenceComponent, {
        //     width: '400px',
        //     data: {
        //         Name: '', TenantId: this.TenantId, UserName: this.userName, TableName: 'PlanningDashboard', mongodbUrl: this.objMongoDbService.apiUrl, pattern: '^([?=_*0-9a-zA-Z]+)', ApplicationName: 'PlanningDashboard'


        //     }
        // });
        // dialogRefForSavePref.componentInstance.OnSavePreference.subscribe((dataFromSavePreference) => {

        //     filterData["FilterName"] = dataFromSavePreference.Name;

        //     selectedFilter = JSON.parse(localStorage.getItem('currentVesselFilter'));

        //     filterData.bunkerRequestStatus = selectedFilter.bunkerRequestStatus;

        //     filterData.fuelStatus = selectedFilter.fuelStatus;

        //     filterData.vesselTypes = selectedFilter.VesselTypes;

        //     filterData.vesselByNames = selectedFilter.VesselByNames;

        //     this.saveFilter(filterData);

        // });
    }
    /**
     * Sets the clicked FIlter 
     */
    setFilter(filterName) {
        if (filterName !== 'Default') {
            var filter = this.availableFilters.find(x => x.filterName == filterName);
            var filterIndex = this.availableFilters.findIndex(x => x.filterName == filterName);

            if (filter !== undefined) {


                this.applyFilter(filter);
            }
        }
        else {
            this.setDefaultChip("Default");
        }
    }


    /**
     * Saves the Filter to DB and Applies the filter
     * @param filterData 
     */
    saveFilter(data) {

        if (data.savePreference) {

            this.planningDashboardService.selectedFuelStatusFilter = data.vesselFuelStatusFilter !== undefined ?
                data.vesselFuelStatusFilter : this.planningDashboardService.selectedFuelStatusFilter;

            let currentVesselFilter: VesselFilterPreferenceModel =
                <VesselFilterPreferenceModel>{
                    FilterId: this.planningDashboardService.newGuid(),
                    FilterName: data.FilterName,
                    userName: this.userName,
                    TenantId: this.TenantId,
                    ConditionApplied: <VesselFilterDetailModel>
                        {
                            FuelType: data.fuelStatus.filter(fuelState => fuelState.IsSelected),
                            RequestStatus: data.bunkerRequestStatus.filter(requestStatus => requestStatus.IsSelected),
                            SelectedFuelStatus: data.vesselFuelStatusFilter,
                            VesselType: data.vesselTypes.filter(typedVessel => typedVessel.IsSelected),
                            VesselByNames: data.vesselByNames
                        },
                    IsDefault: false,
                    TableName: "PlanningDashboard",
                    IsPinned: this.chipListForFilters.length < 4 ? true : false
                };


            // data["TableName"] = this.tableName;
            // data["userName"] = this.userName;
            // data["TenantId"] = this.TenantId;
            // data["filterValue"]=currentVesselFilter.ConditionApplied;
            if (data.savePreferenceMode == 'add') {

                // this.objBroadcastService.on('appSettings').subscribe((res: any) => {
                //     this.objMongoDbService.apiUrl = res.mongoUrl;

                // this.objMongoDbService.GetNodeApiJson("POST", "VesselFilterPreference", "", currentVesselFilter).subscribe(res => {

                //     if (res != undefined) {
                //         this.snackBar.open('Filter Preference Has Been Saved Successfully', '', { duration: 2000, });
                //         if (this.chipListForFilters.length == 0) {
                //             this.chipListForFilters.push(<VesselFilterPreferenceModel>{
                //                 FilterId: '', FilterName: "Default", IsDefault: true,
                //                 TableName: 'PlanningDashboard', userName: this.userName, TenantId: this.TenantId, ConditionApplied: null
                //             });
                //         }

                //         delete data.savePreference;
                //         delete data.savePreferenceMode;
                //         var newIndex = 1;
                //         var defaultedFilterIndex = this.chipListForFilters.findIndex(x => x.IsDefault == true);
                //         if (defaultedFilterIndex > -1) {
                //             this.chipListForFilters[defaultedFilterIndex].IsDefault = false;
                //         }

                //         this.chipListForFilters.push(res);

                //         this.availableFilters.push(res);

                //         data["ConditionApplied"] = res.ConditionApplied;
                //         this.cd.detectChanges();
                //         this.applyFilter(data);

                //     }
                // });
                // });
            }
            else {
                // this.objMongoDbService.GetNodeApiJson("PUT", "VesselFilterPreference?FilterId=" + data.FilterId + "&userName=" + this.userName + "&TenantId=" + this.TenantId, "", data).subscribe(res => {

                //     if (res != undefined) {
                //         this.snackBar.open('Filter Preference Has Been Updated Successfully', '', { duration: 2000, });
                //         // this.cd.detectChanges();

                //         this.applyFilter(data);

                //     }
                // });

            }
        }
        else if (data.FilterName === 'Default') {
            this.filterModel = [];
            this.getVesselData();
            var defaultedFilterIndex = this.chipListForFilters.findIndex(x => x.IsDefault == true);
            if (defaultedFilterIndex > -1) {
                this.chipListForFilters[defaultedFilterIndex].IsDefault = false;

            }
        }
        else {
            this.applyFilter(data);
        }

    }
    /**
     *  Applies the filter
     * @param data 
     */
    applyFilter(data, isVesselFilter?: boolean, vesselfilterRefreshedList?: VesselDataModel[]) {

        if (data != undefined && data.ConditionApplied != undefined) {

            if (this.lastVesselFilterConditionApplied != undefined) {

                this.PreviousAppliedFilter = loadashC.cloneDeep(this.lastVesselFilterConditionApplied);

                if (this.lastVesselFilterConditionApplied.vesselFuelStatusFilter == data.ConditionApplied.SelectedFuelStatus)
                    this.IsAppliedFilterRob = true;
            }

            this.lastVesselFilterConditionApplied = data;
            localStorage.setItem('lastVesselFilterConditionApplied', JSON.stringify(this.lastVesselFilterConditionApplied));

            if (data.ConditionApplied.VesselType != undefined && data.ConditionApplied.VesselType.length != undefined) {
                if (
                    data.ConditionApplied.VesselType.length > 0 && data.ConditionApplied.VesselType[0].vesselType == "All Vessels" ||
                    (data.ConditionApplied.VesselType.length <= 0 &&
                        data.ConditionApplied.RequestStatus.length <= 0 &&
                        data.ConditionApplied.FuelType.length <= 0 &&
                        data.ConditionApplied.VesselByNames.length <= 0) ||
                    (vesselfilterRefreshedList != undefined && vesselfilterRefreshedList.filter(vessel => vessel.IsSelected == true).length == 0)
                )
                    data.FilterName = "Default";
            }

            if (data.ConditionApplied.length != undefined) {
                var arrayOfFilters = [];

                data.ConditionApplied.forEach(condition => {
                    arrayOfFilters.push({
                        Key: condition.columnName,
                        Value: condition.filterValue,
                        operator: condition.operator,
                        conditionFormat: condition.conditionFormat
                    });
                });

                this.filterModel = arrayOfFilters;
            }



        }
        else {
            this.filterModel = [];
        }

        if (!isVesselFilter) {

            if (vesselfilterRefreshedList != undefined) {

                this.masterVesselList = vesselfilterRefreshedList;
            }

            this.getVesselData();
        }
        else {

            if (vesselfilterRefreshedList != undefined) {

                this.masterVesselList = vesselfilterRefreshedList;
            }

        }

        if (data.ConditionApplied)
            this.setDefaultChip(data.FilterName);

        if (localStorage.getItem('SearchedVesselIMONO') == "-1")
            this.objBroadcaster.broadcast('ClearSearchedVesselIMONO');

    }

    /**
     * Sets the Filter Chips
     * @param filterName 
     */
    setDefaultChip(filterName) {
        var defaultedFilterIndex = this.chipListForFilters.findIndex(x => x.IsDefault == true);
        if (defaultedFilterIndex > -1) {
            this.chipListForFilters[defaultedFilterIndex].IsDefault = false;

        }
        var arrayClone = this.chipListForFilters.slice();
        // Move the Applied Filter to Index One always --UX
        if (filterName !== 'Default') {

            var index = arrayClone.findIndex(x => x.FilterName == filterName);
            if (index > -1) {
                arrayClone[index].IsDefault = true;
                var currentOj = arrayClone[index];
                arrayClone.splice(index, 1);
                arrayClone.splice(1, 0, currentOj);
            }
            this.chipListForFilters = [];
            this.chipListForFilters = arrayClone;

        }
        else {
            var index = this.chipListForFilters.findIndex(x => x.FilterName == filterName);
            if (index > -1) {
                this.chipListForFilters[index].IsDefault = true;
            }
        }
        if (this.chipListForFilters.length == 1) {
            this.chipListForFilters = [];
        }

        this.cd.detectChanges();

    }

    toggle(event) {

        this.showTable = !this.showTable;
    }
    getFilters() {
        this.objBroadcaster.on('appSettings').subscribe((res: any) => {
            // this.objMongoDbService.apiUrl = res.mongoUrl;

            // this.objMongoDbService.GetNodeApiJson("GET", "VesselFilterPreference?TenantId=" + this.TenantId + "&userName=" + this.userName + "&TableName=" + this.tableName).subscribe(res => {
            //     if (res !== undefined && res.length > 0) {
            //         this.availableFilters = res;
            //         this.chipListForFilters = [];
            //         this.chipListForFilters.push(<VesselFilterPreferenceModel>{
            //             FilterId: '', FilterName: "Default", IsDefault: true,
            //             TableName: 'PlanningDashboard', userName: this.userName, TenantId: this.TenantId, ConditionApplied: null, IsPinned: false
            //         });
            //         for (var i = 0; i < res.length; i++) {
            //             var currentFilter = res[i];
            //             this.chipListForFilters.push(<VesselFilterPreferenceModel>{
            //                 FilterId: currentFilter.FilterId, FilterName: currentFilter.FilterName, IsDefault: currentFilter.IsDefault,
            //                 TableName: 'PlanningDashboard', userName: this.userName, TenantId: this.TenantId, ConditionApplied: currentFilter.ConditionApplied, IsPinned: currentFilter.IsPinned
            //             });
            //         }
            //     }
            // });

        });
    }
    getData() {
        // this.planningDashboardService.getLocationCountries().subscribe(res => {
        //     if (res != undefined) {
        //         this.ports = res;
        //     }
        // });

        this.localService.getCountriesList().subscribe(res => {
            if (res != undefined) {
                this.ports = res;
            }
        });

        this.localService.getMarketprice().subscribe(res => {
            if (res != undefined) {
                this.TodayMarketPriceList = res;
            }
        });

        // this.objBackendServices.getSecaRegionsFromSearoutes().subscribe(res => {

        //     if (res != undefined) {
        //         this.secaRegionsList = res;

        //     }
        // });
        this.objBroadcaster.on('appSettings').subscribe((res: any) => {

            this.planningDashboardService.GetTodayMarketPrice().subscribe(res => {
                if (res != undefined) {
                    this.TodayMarketPriceList = res;

                }

            })
        });

    }
    // prefex for Date
    checkDate(inputDateStr: string): string {

        const today = new Date();
        const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
        var inputDate = new Date(inputDateStr)
        if (inputDate.toLocaleDateString() == today.toLocaleDateString()) {
            return 'Today'
        } else if (inputDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
            return 'Yesterday'
        }
        else {
            return '';
        }
    }

    /**
    * Gets the masterVessel list, on page load & on fuel status condition change
    * @param VesselTypeName 
    * @param IsSelected 
    */
    getVesselData() {
        this.vesselByROB.red = 0;
        this.vesselByROB.amber = 0;
        this.vesselByROB.blue = 0;
        this.BunkerStatus = BunkerStatus;
        this.VoyageDetails = voyagedetails;

        if (this.masterVesselList == undefined) {
            this.objBroadcaster.on('appSettings').subscribe((res: any) => {
                var defaultRob = res.defaultFuelStatus != undefined ? res.defaultFuelStatus : "ROB";
                var date1 = new Date(); // 9:00 AM
                var one_day = 1000 * 60 * 60 * 24;

                this.planningDashboardService.getVesselInfoByROB(defaultRob).subscribe((res) => {
                    var date2 = new Date(); // 5:00 PM

                    if (date2 < date1) {
                        date2.setDate(date2.getDate() + 1);
                    }
                    var date1_ms = date1.getTime();
                    var date2_ms = date2.getTime();
                    var difference_ms = date2_ms - date1_ms;
                    console.log('First Call Time Vessel ROB' + Math.round(difference_ms / 1000));
                    res.sort((vessel1, vessel2) => {

                        vessel1.VesselName = this.planningDashboardService.titleCaseConverter(vessel1.VesselName);

                        vessel2.VesselName = this.planningDashboardService.titleCaseConverter(vessel2.VesselName);

                        let sortRes: number = 0;

                        // res=vessel1.IsSelected?1:-1;

                        if (vessel1.VesselName < vessel2.VesselName)
                            sortRes = -1;
                        else if (vessel1.VesselName > vessel2.VesselName)
                            sortRes = 1;

                        return sortRes;
                    });

                    this.masterVesselList = res;
                    this.planningDashboardService.masterVesselListEmitter.emit(this.masterVesselList);
                });

                this.planningDashboardService.GetRequestStatusColor().subscribe((res:any)=>{
                    // debugger;
                    this.requestStatusColorCode=res;
                });
                this.planningDashboardService.GetLatestVesselUpdatedDate().subscribe((res: any) => {
                    if (res != undefined)

                        var prefix = this.checkDate(res);
                    this.lastUpdatedOn = prefix == '' ? moment(new Date(res)).format('DD-MMM-YYYY HH:mm') : prefix + ' ' + new Date(res).toLocaleTimeString(); // this.lastUpdatedOn = "Today " + currentDate.toLocaleTimeString();

                })
            })

        }
        else {
            this.planningDashboardService.masterVesselListEmitter.emit(this.masterVesselList);
        }
        // this.vesselListEmitterSubscribe();
    }

    vesselListEmitterSubscribe() {
      console.log("vesselListEmitterstart");
        this.planningDashboardService.masterVesselListEmitter.subscribe((res) => {
          console.log("vesselListEmitter");
            if (res == undefined)
                return;

            if (res == 'masterVesselList') {

                var bunkerReqest = [];
                for (let i = 0; i < this.BunkerStatus.length; i++) {
                    var vesselListByStatusCount = this.vesselList.filter((x) => { return x.RequestStatus === this.BunkerStatus[i] }).length

                    bunkerReqest.push({
                        StatusName: this.BunkerStatus[i],
                        StatusCount: vesselListByStatusCount,
                        IsSelected: false
                    });
                }

                if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined)
                    this.lastVesselFilterConditionApplied = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));

                //sending
                this.objBroadcaster.broadcast('vesselFilterComponent', { filterData: this.lastVesselFilterConditionApplied, vesselList: this.masterVesselList });

                // this.planningDashboardService.vesselListEmitter.emit(this.masterVesselList);

                return;
            }

            //Gets the masterlist
            if (res == "searchVesselFilterList" || res == "currentFilterVesselList") {
                switch (res) {
                    case "searchVesselFilterList":
                        this.planningDashboardService.masterVesselListEmitter.emit({ "Key": "searchVesselFilterList", "Value": this.masterVesselList });
                        break;

                    case "currentFilterVesselList":
                        this.planningDashboardService.masterVesselListEmitter.emit({ "Key": "currentFilterVesselList", "Value": this.masterVesselList });
                        break;
                }

                return;
            }
            //Gets the masterlist

            if (res.Key != undefined || res.Key == "searchVesselFilterList" || res.Key == "currentFilterVesselList")
                return;

            this.vesselTypes = VesselTypes;

            let latestVesselFilterConditionRob;

            if (this.lastVesselFilterConditionApplied == undefined) {

                if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined) {
                    this.lastVesselFilterConditionApplied = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));

                    latestVesselFilterConditionRob = this.lastVesselFilterConditionApplied.vesselFuelStatusFilter == undefined ?
                        this.lastVesselFilterConditionApplied.ConditionApplied.SelectedFuelStatus : this.lastVesselFilterConditionApplied.vesselFuelStatusFilter;
                }

            }
            else {
                latestVesselFilterConditionRob =
                    (this.lastVesselFilterConditionApplied.FilterName == 'Default' || this.lastVesselFilterConditionApplied.ConditionApplied.SelectedFuelStatus == undefined) ?
                        localStorage.getItem('LastVesselFilterROB') : this.lastVesselFilterConditionApplied.ConditionApplied.SelectedFuelStatus;
            }

            if (this.PreviousAppliedFilter != undefined &&
                this.PreviousAppliedFilter.ConditionApplied != undefined &&
                this.PreviousAppliedFilter.ConditionApplied.SelectedFuelStatus != undefined &&
                this.PreviousAppliedFilter.vesselFuelStatusFilter == undefined)
                this.PreviousAppliedFilter.vesselFuelStatusFilter = this.PreviousAppliedFilter.ConditionApplied.SelectedFuelStatus;

            if(
                    (
                        (this.PreviousAppliedFilter==undefined || 
                        this.PreviousAppliedFilter.vesselFuelStatusFilter==undefined) &&
                        this.masterVesselList==undefined ||
                        latestVesselFilterConditionRob!=undefined && this.planningDashboardService.appSettings.defaultRob!=latestVesselFilterConditionRob
                    ) ||
                    (this.PreviousAppliedFilter!=undefined && 
                        ((this.PreviousAppliedFilter.vesselFuelStatusFilter!=undefined && 
                        this.PreviousAppliedFilter.vesselFuelStatusFilter!=latestVesselFilterConditionRob) ||
                        (this.PreviousAppliedFilter.FilterName!=undefined && this.PreviousAppliedFilter.FilterName=="Default" &&
                        latestVesselFilterConditionRob!=undefined &&
                        this.planningDashboardService.appSettings.defaultRob!=latestVesselFilterConditionRob))
                    )
              )
            {
                var date1 = new Date(); // 9:00 AM
                var one_day = 1000 * 60 * 60 * 24;

                this.planningDashboardService.getVesselInfoByROB(latestVesselFilterConditionRob).subscribe(
                    (res) => {

                        var date2 = new Date(); // 5:00 PM

                        if (date2 < date1) {
                            date2.setDate(date2.getDate() + 1);
                        }
                        var date1_ms = date1.getTime();
                        var date2_ms = date2.getTime();
                        var difference_ms = date2_ms - date1_ms;
                        console.log('Second Call Time Vessel ROB' + Math.round(difference_ms / 1000));
                        this.vesselList = res;
                        //TODO:Try extension mtd on array, instead of  passing list as paramtr to mtd
                        this.vesselList = this.formatVesselDatawithROBandFilter(res);

                        //Sends the latest filtered vessel-list to Child views
                        //TODO: This line to be commented & supposed to be resolved by cd.detectChanges() as follows
                        this.planningDashboardService.vesselListEmitter.emit(this.vesselList);

                        this.cd.detectChanges();

                    });

                return;
            }

            //TODO:Try extension mtd on array, instead of  passing list as paramtr to mtd
            this.vesselList = this.formatVesselDatawithROBandFilter(res);

            //Sends the latest filtered vessel-list to Child views
            //TODO: This line to be commented & supposed to be resolved by cd.detectChanges() as follows
            this.planningDashboardService.vesselListEmitter.emit(this.vesselList);

            this.cd.detectChanges();
        });

    }

    formatVesselDatawithROBandFilter(res) {
        res = this.planningDashboardService.formatVesselDataforROb(res);

        res = this.filterData(res);

        return res;
    }

    checkVesselNormal(robColorCode: any): boolean {
        if (robColorCode == '')
            return true;
    }
    checkVesselAbormal(robColorCode: any): boolean {
        if (robColorCode == 'red-threshold-box')
            return true;
    }

    formatVesselDataforROb(vesselList): VesselDataModel[] {
        var robColorCodes: any[];
        vesselList.forEach((vessel) => {

            vessel.ROB.DOGO.ColorCode = vessel.ROB.DOGO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.DOGO.Color == 'orange') ? 'orange-threshold-box' : '';

            vessel.ROB.HSFO.ColorCode = vessel.ROB.HSFO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.HSFO.Color == 'orange') ? 'orange-threshold-box' : '';

            vessel.ROB.ULSFO.ColorCode = vessel.ROB.ULSFO.Color == 'red' ? 'red-threshold-box' : (vessel.ROB.ULSFO.Color == 'orange') ? 'orange-threshold-box' : '';

            robColorCodes = [vessel.ROB.HSFO.ColorCode, vessel.ROB.ULSFO.ColorCode, vessel.ROB.DOGO.ColorCode];
            vessel.ROB.Color = robColorCodes.every(this.checkVesselNormal) ? 'tbl-blue' : robColorCodes.some(this.checkVesselAbormal) ? 'tbl-red' : 'tbl-orange';

        });


        return vesselList;
    }

    getFilteredData(vesselList): any {
        var filteredVesselDetails = [];
        if (this.filterModel != null && this.filterModel.length > 0) {

            //Apply filters on full vesselDetails
            for (let i = 0; i < this.filterModel.length; i++) {

                if (this.filterModel[i].conditionFormat == "IN")
                    var values = this.filterModel[i].Value.split(',');

                if (i == 0) {
                    vesselList.forEach((res) => {

                        values.forEach((val) => {

                            if (val == res[this.filterModel[i].Key]) {

                                filteredVesselDetails.push(res);
                            }


                        });

                    });
                }
                else {

                    if (this.filterModel[i].operator == "And") {

                        var filteredVesselDetailsCopy = Array.from(filteredVesselDetails);

                        filteredVesselDetails = [];

                        //Deep clone filteredVesselDetails, for filtering itself again
                        filteredVesselDetailsCopy.filter((res) => {

                            values.forEach((val) => {

                                if (val == res[this.filterModel[i].Key])
                                    filteredVesselDetails.push(res);
                            });

                        });
                    }

                    else if (this.filterModel[i].operator == "Or") {

                        vesselList.forEach((res) => {
                            if (res[this.filterModel[i].Key] == this.filterModel[i].Value)
                                filteredVesselDetails.push(res);
                        });

                    }
                }
            }


        }
        else
            filteredVesselDetails = vesselList;

        return filteredVesselDetails;
    }

    filterData(vesselList): any {

        if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined) {
            this.lastVesselFilterConditionApplied = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));

            if (this.lastVesselFilterConditionApplied == undefined)
                return;

            if (
                this.lastVesselFilterConditionApplied.ConditionApplied != undefined &&
                this.lastVesselFilterConditionApplied.ConditionApplied.VesselType != undefined) {

                if (this.lastVesselFilterConditionApplied.ConditionApplied.VesselType.length == 1 &&
                    this.lastVesselFilterConditionApplied.ConditionApplied.VesselType[0].vesselType == "All Vessels")
                    this.lastVesselFilterConditionApplied.FilterName = 'Default';

            }

            if (this.lastVesselFilterConditionApplied.FilterName == 'Default' ||
                this.lastVesselFilterConditionApplied.ConditionApplied == undefined ||
                (
                    (this.lastVesselFilterConditionApplied.ConditionApplied.FuelType == undefined || this.lastVesselFilterConditionApplied.ConditionApplied.FuelType.length <= 0) &&
                    (this.lastVesselFilterConditionApplied.ConditionApplied.RequestStatus == undefined || this.lastVesselFilterConditionApplied.ConditionApplied.RequestStatus.length <= 0) &&
                    (this.lastVesselFilterConditionApplied.ConditionApplied.VesselType == undefined || this.lastVesselFilterConditionApplied.ConditionApplied.VesselType.length <= 0) &&
                    (this.lastVesselFilterConditionApplied.ConditionApplied.VesselByNames == undefined || this.lastVesselFilterConditionApplied.ConditionApplied.VesselByNames.length <= 0)
                )
            ) {
                this.setDefaultChip("Default");
                return vesselList;
            }

            vesselList = this.planningDashboardService.filteredVesselSelection(this.lastVesselFilterConditionApplied, vesselList);

            return vesselList.filter(vessel => vessel.IsSelected);

        }

        return vesselList;
    }

    // showLocationClickPopup(locationName, type?: any) {

    //     const dialogRef4 = this.dialog.open(LocationClickComponent, {
    //         id: 'loc_click_pop',
    //         closeOnNavigation: true,

    //         height: '100vh',
    //         position: { right: '0px', top: '0px' },
    //         disableClose: true,
    //         // position: { right: '0px', bottom:'0px' },
    //         data: {
    //             Name: locationName
    //             // vesselList: this.vesselList, type:type,vesselTypes: vesselByType, vesselByROB: this.vesselByROB, bunkerRequestStatus: bunkerReqest, fuelStatus: fuelStatus, TenantId: this.TenantId
    //         }
    //     });
    //     dialogRef4.backdropClick().subscribe(_ => {
    //         // Close the dialog
    //         dialogRef4.close();
    //     })
    // }

    setSearchSelectedVessel(event) {
        if (event != undefined && event.length > 0) {
            this.vesselList = this.masterVesselList.filter((vessel) => vessel.VesselIMONO == event[0].VesselIMONO);
        }

    }

    /**
  * Event handler for Vessel search-click method
  ** @param event: Holds the event value emitted from Search vessel component
  */
    SearchVesselClick(event) {

        if (event.Id == PlanningDashboardViews.Map) {
            if (event.Value === 'click') {
                this.OpenVesselFilter();

            }
            else if (event.Value != 'emptysearch') {
                var searchedVessel = this.vesselList.filter(vessel => vessel.VesselIMONO == event.Value);

                // this.setSearchSelectedVessel(searchedVessel);

                this.planningDashboardService.searchVesselMasterEmitter.emit(event.Value);
            }
        }

        else if (event.Id == PlanningDashboardViews.Table) {
            if (event.Value === 'click') {
                // this.IsAutoComplete=false;

                // this.myControl.disable();

                this.OpenVesselFilter();
            }

            else if (event.Value != 'emptysearch') {
                this.planningDashboardService.searchVesselMasterEmitter.emit(event.Value);
            }
        }

    }

    /**
   * Opens the vessel filter popup
   */
    OpenVesselFilter() {

        var vesselByType = [{
            vesselType: 'All Vessels',
            vesselCount: this.vesselList.length,
            IsSelected: false

        }];
        for (let i = 0; i < this.vesselTypes.length; i++) {
            var vesselListByTypeCount = this.vesselList.filter((x) => { return x.VesselType === this.vesselTypes[i] }).length;

            vesselByType.push({
                vesselType: this.vesselTypes[i],
                vesselCount: vesselListByTypeCount,
                IsSelected: false
            });
        }
        var bunkerReqest = [];
        for (let i = 0; i < this.BunkerStatus.length; i++) {
            var vesselListByStatusCount = this.vesselList.filter((x) => { return x.RequestStatus === this.BunkerStatus[i] }).length

            bunkerReqest.push({
                StatusName: this.BunkerStatus[i],
                StatusCount: vesselListByStatusCount,
                IsSelected: false
            });
        }

        if (localStorage.getItem('lastVesselFilterConditionApplied') != undefined)
            this.lastVesselFilterConditionApplied = JSON.parse(localStorage.getItem('lastVesselFilterConditionApplied'));


        var vesselFilterComponentData =
        {
            vesselFuelStatusFilter: (this.lastVesselFilterConditionApplied == undefined) ?
                this.planningDashboardService.selectedFuelStatusFilter : this.lastVesselFilterConditionApplied.ConditionApplied.SelectedFuelStatus,
            vesselList: this.masterVesselList,
            vesselTypes: this.vesselTypes,
            vesselByROB: this.vesselByROB,
            vesselByNames: (this.lastVesselFilterConditionApplied == undefined) ?
                null : this.lastVesselFilterConditionApplied.ConditionApplied.VesselByNames,
            bunkerRequestStatus: bunkerReqest,
            fuelStatus: [],
            TenantId: this.TenantId
        };



        const dialogRef = this.dialog.open(VesselFilterComponent, {
            height: '100vh',
            id: 'vessel_filter_popup',
            position: { left: '0px', top: '0px' },
            data: vesselFilterComponentData
        });

        dialogRef.componentInstance.onApplyFilter.subscribe((data) => {

            if (data == undefined) {
                //TO LOG: Error in applyFilter

                return;
            }

            this.planningDashboardService.selectedFuelStatusFilter = data.selectedFuelStatusFilter;


            this.applyFilter(data.filterConditions, false, data.vesselfilterRefreshedList);

        });
        dialogRef.componentInstance.onSaveFilter.subscribe((data) => {
            if (data.savePreference)
                this.savePreferencePopup(data);
            else
                this.saveFilter(data);
        });

        dialogRef.afterClosed().subscribe(() => {

            this.IsAutoComplete = true;
            this.planningDashboardService.searchVesselMasterEmitter.emit(this.IsAutoComplete);

        });

    }

    OpenAvailableChipFilters() {

        this.chipListForFilters.forEach((chipFilter) => {
            this.availableFilters.forEach((filter) => {
                filter.IsDefault = (filter.FilterId == chipFilter.FilterId) ? chipFilter.IsDefault : filter.IsDefault;
            });
        })


        // const dialogRef = this.dialog.open(AvailableFiltersComponent, {
        //     // id: 'available-filter-content',
        //     data: { availableFilters: this.availableFilters, filterNameKey: 'FilterName', ExpandColor: 'white' },
        //     maxHeight: '400px',
        //     width: '500px'
        // });

        // dialogRef.componentInstance.onFilterAction.subscribe((currentFilter) => {

        //     if (currentFilter == undefined) {
        //         //TO LOG: Error in applyFilter

        //         return;
        //     }

        //     // var currentFilter = this.availableFilters.find(x => x.FilterId == currentFilter.FilterId);

        //     this.objMongoDbService.GetNodeApiJson("DELETE", "VesselFilterPreference?FilterId=" + currentFilter.FilterId + "&userName=" + this.userName + "&TenantId=" + this.TenantId).subscribe(res => {

        //         if (res == undefined) {
        //             this.snackBar.open('Error in Delete Filter Preference', '', { duration: 2000, });

        //             return;
        //         }

        //         let filterIndex = this.availableFilters.indexOf(currentFilter);
        //         if (filterIndex > -1)
        //             this.availableFilters.splice(filterIndex, 1);
        //         //Updates the child view about the removed filter, so that children removes the deleted filter from the list
        //         //this.objBroadcastService.broadcast('filterDelete', currentFilter);
        //         //OR
        //         let chipfilterIndex = this.chipListForFilters.findIndex(x => x.FilterId == currentFilter.FilterId);
        //         if (chipfilterIndex > -1)
        //             this.chipListForFilters.splice(chipfilterIndex, 1);
        //         var cloned = loadashC.cloneDeep(this.chipListForFilters);
        //         this.chipListForFilters = [];
        //         this.chipListForFilters = cloned;
        //         var defaultedFilterIndex = this.chipListForFilters.findIndex(x => x.IsDefault == true && x.FilterId == currentFilter.FilterId);
        //         if (defaultedFilterIndex > -1) {
        //             this.chipListForFilters[defaultedFilterIndex].IsDefault = false;
        //         }

        //         if (currentFilter.IsDefault) {
        //             this.applyFilter({ FilterName: 'Default' })
        //             // this.setDefaultChip('Default');

        //             //TODO: clear the local storage if current deleted filter is already applied
        //             this.planningDashboardService.clearItems();
        //         }

        //         if (this.chipListForFilters.length === 1 && this.chipListForFilters[0]["FilterName"] === "Default") {
        //             this.chipListForFilters = [];
        //             this.availableFilters = [];
        //         }

        //         this.cd.detectChanges();

        //         this.snackBar.open('Filter Preference Deleted Successfully', '', { duration: 2000, });

        //     });

        // });
        //dsk22
        // dialogRef.componentInstance.onAvailableFilterApply.subscribe((data) => {


        //     var firstDef = this.chipListForFilters[0];
        //     this.chipListForFilters = [];
        //     this.chipListForFilters.push(firstDef)
        //     for (var i = 0; i < data.length; i++) {
        //         this.chipListForFilters.push(data[i])
        //         var saveObj = loadashC.cloneDeep(data[i]);// Should not Save the ISDefault Flag in db 
        //         saveObj.IsDefault = false;

        //         this.objMongoDbService.GetNodeApiJson("PUT", "VesselFilterPreference?FilterId=" + data[i].FilterId + "&userName=" + this.userName + "&TenantId=" + this.TenantId, "", saveObj).subscribe(res => {

        //             if (res != undefined) {
        //                 // this.snackBar.open('Filter Preference Has Been Updated Successfully', '', { duration: 2000, });
        //                 // this.cd.detectChanges();

        //                 // this.applyFilter(data);
        //                 this.cd.detectChanges();

        //             }
        //         });

        //     }

        //     // this.chipListForFilters = [this.chipListForFilters[0]];
        //     // this.chipListForFilters.push(data);
        // })

        // dialogRef.afterClosed().subscribe(() => {

        // });

    }

    getMasterVesselList(): Observable<any> {

        return Observable.create((observer: any) => {
            observer.next(this.masterVesselList);
            observer.complete();
        });

    }

  ngOnDestroy() {
    localStorage.setItem('selectedROBOption', null);
    localStorage.removeItem('selectedROBOption');

    localStorage.setItem('lastVesselFilterConditionApplied', null);
    localStorage.removeItem('lastVesselFilterConditionApplied');

    localStorage.setItem('filteredVessels', null);
    localStorage.removeItem('filteredVessels');

    localStorage.setItem('appSettings', null);
    localStorage.removeItem('appSettings');

    localStorage.setItem('LastVesselFilterROB', null);
    localStorage.removeItem('LastVesselFilterROB');

}

}
