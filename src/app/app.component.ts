import { Component } from '@angular/core';
import { AppSettings } from '../app/shared/models/api-settings';
import { Broadcaster } from '../app/planning-dashboard/services/broadcaster';
import { NotificationModel } from './shared/models/notification.model';
import { Router } from '@angular/router';
import { LocalService } from './services/local-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  showHeader: boolean;

  constructor( private loginservice: LocalService, private objAppsettings:AppSettings, private objBroadcast:Broadcaster,  private router: Router){

    objAppsettings.getAppSettings().subscribe((appSettings)=>{
      objBroadcast.broadcast('appSettings', appSettings);
    });

  }

  ngOnInit(): void {
    this.loginservice.showHeader.subscribe((show)=>{
      this.showHeader = show;
    });
  }

  public showNotificationSettings:boolean =false;

  print(mess) {
    console.log(mess);
  }

  //ColorFlag 1 -red, 2 -amber, 3 -green
  alertsArray: NotificationModel[] =
    [
      // {
      //   NotificationId:0,
      //   EntityType:"",
      //   EntityId:1,
      //   AlertName:'No Request Alert',
      //   Message:'Vessel Torm Lilly is reaching the port of Amsterdam in 10 days. But no request is created.',
      //   ColorFlag:1,
      //   Latitude:0,
      //   Longitude:0,
      //   LastUpdatedDate: '13 Apr 2019 09:50'
      // },
      // {       
      //   NotificationId:0,
      //   EntityType:"",
      //   EntityId:2,
      //   AlertName:'No Request Alert',
      //   Message:'Vessel Torm Lilly is reaching the port of Amsterdam in 10 days. But no request is created.',
      //   ColorFlag:2,
      //   Latitude:0,
      //   Longitude:0,
      //   LastUpdatedDate: '13 Apr 2019 09:50'
      // },
      // {       
      //   NotificationId:0,
      //   EntityType:"",
      //   EntityId:1,
      //   AlertName:'No Request Alert',
      //   Message:'Vessel Torm Lilly is reaching the port of Amsterdam in 10 days. But no request is created.',
      //   ColorFlag:3,
      //   Latitude:0,
      //   Longitude:0,
      //   LastUpdatedDate: '13 Apr 2019 09:50'
      // },
      // {       
      //   NotificationId:0,
      //   EntityType:"",
      //   EntityId:1,
      //   AlertName:'No Request Alert',
      //   Message:'Vessel Torm Lilly is reaching the port of Amsterdam in 10 days. But no request is created.',
      //   ColorFlag:1,
      //   Latitude:0,
      //   Longitude:0,
      //   LastUpdatedDate: '13 Apr 2019 09:50'
      // },
      // {
      //   NotificationId:0,
      //   EntityType:"",
      //   EntityId:1,
      //   AlertName:'No Request Alert',
      //   Message:'Vessel Torm Lilly is reaching the port of Amsterdam in 10 days. But no request is created.',
      //   ColorFlag:1,
      //   Latitude:0,
      //   Longitude:0,
      //   LastUpdatedDate: '13 Apr 2019 09:50'
      // }   
    ];

    clickNotify($evt){
      console.log($evt);
    }

    clearNotify(){
      console.log("Clear Clicked");
    }

    deleteNotification($evt){
      console.log($evt);
    }

   settingsClicked(){
      console.log("Reached");
      this.showNotificationSettings=true;
      console.log(this.showNotificationSettings,"*********");
    }

    onLogout(){
      this.loginservice.logOut();
    }
}
