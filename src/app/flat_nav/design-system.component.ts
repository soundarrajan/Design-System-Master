import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import { FormControl } from '@angular/forms';

import { Menu, MainMenuItems, MenuItems } from '../shared/menu-items/menu-items';
import { Menus } from './menuitems';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { iif } from 'rxjs';
import { filter, map } from '../../../node_modules/rxjs/operators';
import { LocalService } from '../services/local-service.service';
export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;

}
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'inatech-nav',
  templateUrl: './design-system.component.html',
  styleUrls: [
    '../../themes/defaultweb/flat-able/nav/nav.scss',
    '../../themes/defaultweb/design-system.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,

  providers: [MenuItems]
})

export class DesignSystemComponent implements OnInit {
  @ViewChild('mySelect') mySelect;
  @Input() menus: Menu[];
  UseMenuUrl = false;
  @Input('UseMenuUrl') set _UseMenuUrl(val) {
    this.UseMenuUrl = val;
  }
  @Input() userName: any;
  @Output() onRefreshCache = new EventEmitter();
  @Output() onRefreshMenu = new EventEmitter();
  @Output() onLogout = new EventEmitter();
  @Output() onProfile = new EventEmitter();
  @Output() onHelp = new EventEmitter();
  @Output() onBreadcrumbClick = new EventEmitter();
  @Output() onAppRedirectClick = new EventEmitter();
  @Input() showNotification: boolean = false;
  @Input() showSwitchThemeMenu: boolean = false;
  @Input() showLoadingnotification: boolean = false;
  @Input() showSettingNotification: boolean = false;
  @Input() isSmartTrader: boolean = false;
  @Input() isControlTower: boolean = false;
  @Input() isDesignSystem: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() version_no: string = '0.0.1';
  @Input() notificationList: any[];
  @Output() notificationClick = new EventEmitter<any>();
  @Output() clearAllNotification = new EventEmitter();
  @Output() deleteNotification = new EventEmitter<any>();
  @Output() notificationIconClick = new EventEmitter();
  @Output() notificationSettingClick = new EventEmitter();
  sub: any;
  deviceType = 'desktop';
  verticalNavType = 'collapsed';
  verticalEffect = 'shrink';
  innerHeight: string;
  isCollapsedMobile = 'no-block';
  isCollapsedSideBar = 'no-block';
  toggleOn = true;
  windowWidth: number;
  alertSidebarStatus: boolean = false;
  showhideDeleteRule: boolean = false;
  // alertConfig: boolean = false;

  newPanelCollapsedHeight: string = '72px';
  newPanelExpandedHeight: string = '72px';
  panelCollapsedHeight: string = '50px';
  panelExpandedHeight: string = '70px';
  ifBetween: boolean = false;
  showToCalendar: boolean = true;
  nameInitials1: string;
  userRoleList = [];

  alertSidebarToggle() {
    this.notificationIconClick.emit();
    this.alertSidebarStatus = !this.alertSidebarStatus;

    if (this.showSettingNotification) {
      this.showSettingNotification = false;
    }
  }

  // alertConfigToggle() { 
  //   this.alertConfig = !this.alertConfig;
  // }

  public htmlButton: string;
  @Input() breadCrumbModuleName = 'Design System';
  @Input() breadCrumb1 = 'Breadcrumb 1';
  @Input() breadCrumb2 = 'Breadcrumb 2';
  @Input() breadCrumb3 = 'Breadcrumb 3';
  @Input() breadCrumb4 = 'Breadcrumb 4';
  appRedirection: boolean = false;
  @Input('appRedirection') set _appRedirection(val) {
    this.appRedirection = val;
  }
  // @Input() alertNotification: boolean = false;
  @Input() nameInitials = 'KM';
  @Input() loginName = 'Kevin Miranda';
  @Input() userEmailID = 'kevin.m@inatech.com';
  @Input() appLogo = 'designSystem'; // designSystem | techoil | shiptech | tenantWhite | tenantColor
  @Input() appVersion = 'Version 5.0.0';
  @Input() HomeBreadcrumb = 'Design System';

  pageTitle = "";
  menuFlteredByAccess: Menu[];
  @Input('pageTitle') set _pageTitle(val: string) {
    this.pageTitle = val;
    this.title.setTitle(this.pageTitle)
  }

  // Breadcrumb URL binding
  @Output() hrefClicked = new EventEmitter();
  redirectTo(url) {
    this.hrefClicked.emit(url);
  }
  private Approuter: any;
  public Breadcrumbs: any;

  routeMenuItems(routerLinkArr: any, MenuUrl: any) {
    var returnFormatHref = "";
    if (!this.UseMenuUrl) {

      for (let i = 0; i < routerLinkArr.length; i++) {
        if (routerLinkArr[i].indexOf('/') > -1)
          returnFormatHref += routerLinkArr[i];
        else
          returnFormatHref = returnFormatHref + "/" + routerLinkArr[i];
      }

    } else {
      returnFormatHref = MenuUrl;
    }
    return returnFormatHref;
  }



  constructor(private route: ActivatedRoute, private activatedRoute: ActivatedRoute, private title: Title, public menuItems: MenuItems, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private service: LocalService,
    private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.menus = Menus;
    this.menuFlteredByAccess = Menus;
    this.Approuter = router;
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
    iconRegistry.addSvgIcon(
      'data-picker-gray',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-gray.svg'));

  }
  ngAfterViewInit() {
    this.service.getGetUserRole().subscribe(() => this.filterMenu());

    // Menu Open/Collapse fix
    //  var sideNav = document.getElementsByClassName('pcoded');
    //  var sideNavElement = sideNav[0];
    //  sideNavElement.setAttribute('vertical-nav-type', 'collapsed');
    //this.toggleOpened();
  }

  ngOnInit() {
    this.filterMenu();
    // this.cdr.detectChanges();
    //console.log("ssssssss");
    this.closeSidemenu();
    //alert(this.userEmailID);
    var x = this.userEmailID.split("@");
    var firstInitial = x[0].substring(0, 1);
    var lastInitial = x[0].slice(- 1);
    this.nameInitials1 = firstInitial + lastInitial;
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          let child = route;

          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          return route;
        })
      )
      .subscribe(rt => {
        const data = rt?.data['value'];
        this.Breadcrumbs = data;
        //this.title.setTitle(data['Title'] !== undefined && data['Title'] !== '' ? data['Title'] : 'Techoil');

        //this.breadCrumbModuleName = data['breadCrumbModuleName'] !== undefined && data['breadCrumbModuleName'] !== '' ? data['breadCrumbModuleName'] : 'Design System';

        //this.breadCrumb1 = data['breadCrumb1'] !== undefined && data['breadCrumb1'] !== '' ? data['breadCrumb1'] : 'Design System';
        //this.breadCrumb2 = data['breadCrumb2'] !== undefined && data['breadCrumb2'] !== '' ? data['breadCrumb2'] : '';
        //this.breadCrumb3 = data['breadCrumb3'] !== undefined && data['breadCrumb3'] !== '' ? data['breadCrumb3'] : '';
        //this.breadCrumb4 = data['breadCrumb4'] !== undefined && data['breadCrumb4'] !== '' ? data['breadCrumb4'] : '';
        // const divss = document.getElementsByClassName('cdk-overlay-backdrop-showing');
        // if (divss.length > 0) {
        //   for (let i = 0; i < divss.length; i++) {
        //     const elem = divss[i] as HTMLElement;
        //     elem.click();
        //   }
        // }
      });

  }

  onActivate(elementRef) {
    this.checksmartTrader();
  }

  onDeactivate(elementRef) {
    // console.log(typeof(elementRef));
  }

  showMenu: boolean = false;
  showThemeMenu() {
    this.showMenu = !this.showMenu;
  }

  themeDark: boolean = true;
  changeTheme() {
    this.themeDark = !this.themeDark;
    this.service.setTheme(this.themeDark);
  }

  toggleMenu() {
    this.showMenu = false;
  }

  checksmartTrader() {
    if (this.isDesignSystem)
      this.isSmartTrader = this.Approuter.url.indexOf('planningdashboard') > -1;
    this.isControlTower = this.Approuter.url.indexOf('shiptech') > -1;
    if (this.isSmartTrader) {
      // this.breadCrumbModuleName = this.isSmartTrader ? "Smart Trader" : "Design System";
      this.showNotification = this.isSmartTrader;
      this.showSwitchThemeMenu = false;
    } else if (this.isControlTower) {
      // this.breadCrumbModuleName = this.isControlTower ? "Control Tower" : "Design System";
      this.showSwitchThemeMenu = this.isControlTower;
    }
    else {
      // this.breadCrumbModuleName = "Design System";
      this.showNotification = false;
      this.showSwitchThemeMenu = false;
    }

    // Setting Main header title
    if (this.Approuter.url.indexOf('techoil') > -1) {
      this.breadCrumbModuleName = "Techoil"
    }
    else if ((this.Approuter.url.indexOf('shiptech') > -1) || (this.Approuter.url.indexOf('smarttrader') > -1)) {
      this.breadCrumbModuleName = "Shiptech"
    }
    else
      this.breadCrumbModuleName = "Design System";
  }

  // Side menu close code
  closeSidemenu() {
    this.verticalNavType = 'collapsed';
    //document.getElementById('mainContainer').style.top=document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight+'px'
    document.getElementById('mainContainer').style.marginTop = document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight + 'px'
  }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }

    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  onEvent(event) {
    event.stopPropagation();
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'collapsed';
      this.verticalEffect = 'overlay'; //push
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'collapsed';
      this.verticalEffect = 'overlay'; //shrink
    }
  }

  refreshMenu() {
    this.onRefreshMenu.emit();
  }
  refreshCache() {
    this.onRefreshCache.emit();
  }
  logout() {
    this.onLogout.emit();
    this.service.logOut();
  }

  // Breadcrumb URL binding event
  breadcrumbClick(event) {
    this.onBreadcrumbClick.emit(event);
  }

  profilePage() {
    this.onProfile.emit();
  }
  openHelp() {
    this.router.navigateByUrl('/help');
    this.onHelp.emit();
  }

  onAppRedirection() {
    this.onAppRedirectClick.emit();
  }

  toggleOpened() {
    setTimeout(() => {
      if (this.windowWidth < 768) {
        this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
        this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
      } else {
        this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
      }
    }, 100);

    // Side menu height set margin by header height
    //document.getElementById('sideMenu').style.marginTop=document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight+'px'

    // Setting inner container margin top by header height
    document.getElementById('mainContainer').style.marginTop = document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight + 'px'
    // Setting Bottom menu bottom position to navbar height
    document.getElementById('bottomMenu').style.bottom = document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight + 'px'

    //document.getElementById('mainContainer').style.height=window.innerHeight-document.getElementsByClassName('navbar header-navbar pcoded-header')[0].clientHeight+'px'

    // Set height of Side menu = (Sidebar height - bottom menu height)-20px
    document.getElementById('sideMenu').style.height = document.getElementsByClassName('slimScrollDiv')[0].clientHeight - document.getElementById('bottomMenu').clientHeight - 35 + 'px'

  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  selectionConditions: any[] = [
    {
      key: 'equal', value: 'Equal To'
    },
    {
      key: 'greater', value: 'Greater Than'
    },
    {
      key: 'lesser', value: 'Lesser Than'
    },
    {
      key: 'lesserequal', value: 'Lesser Than'
    }
  ]

  alertConfigArray: any[] = [
    {
      name: 'ROB Alert',
      status: true,
      triggerRule: [
        {
          isSelected: true,
          conditionName: 'red',
          quantityConditon: 'equal',
          value: '2000',
          unit: 'BBL'
        },
        {
          isSelected: true,
          conditionName: 'yellow',
          quantityConditon: 'greater',
          value: '4000 BBL'
        }
      ],
      displayMessage: 'Message'
    }
  ]


  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  customSelect = new FormControl();
  selectOptions: string[] = ['Red Alert', 'Yellow Alert', 'Green Alert'];


  open() {
    this.mySelect.open();
  }


  clickNotification(notificationItem) {
    this.notificationClick.emit(notificationItem);
  }

  clearAllNotifiation() {
    this.clearAllNotification.emit();
  }

  deleteNotifiation(notificationItem) {
    this.deleteNotification.emit(notificationItem);
  }

  settingNotifiation() {
    this.notificationSettingClick.emit();
    console.log("emitted")
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  openMyMenu() {
    this.trigger.openMenu();
  }
  closeMyMenu() {
    this.trigger.closeMenu();
  }


  selectionChanged(event) {
    //console.log(event);
    //alert(event.value);
    if (event == "between") {
      this.ifBetween = true;
      this.showToCalendar = false;
    } else {
      this.ifBetween = false;
      this.showToCalendar = true;
    }
  }


  filterMenu() {
    let userRole = this.service.getUserRole();
    let menu = this.menuFlteredByAccess[0].main;
    let accessList;
    let newMenu = [{ main: [] }];
    if (userRole && userRole != '') {
      if (userRole != 'ADMIN') {
        this.getUserRoleList().subscribe(data => {
          this.userRoleList = data;
          if (this.userRoleList) {
            accessList = this.userRoleList.find(item => item.role == userRole);
            if (accessList.pages.length > 0) {
              newMenu[0].main = this.filterMenuByaccess(accessList.pages, menu);
              this.menuFlteredByAccess = newMenu;

            }
            else if (accessList.ex_pages.length > 0) {
              newMenu[0].main = this.excludeUrlByAccess(accessList.ex_pages, menu);
              this.menuFlteredByAccess = newMenu;

            }
            else
              this.menuFlteredByAccess = Menus;
          }
        });
      }
      else {
        this.menuFlteredByAccess = Menus;
      }
    }

  }

  filterMenuByaccess(pages, menu) {

    let newMenu = [];
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < menu.length; j++) {
        if (menu[j].state.indexOf(pages[i].url) == 0) {
          if (pages[i].pages.length > 0 && menu[j].children.length > 0) {
            menu[j].children = (this.filterMenuByaccess(pages[i].pages, menu[j].children));
          }
          newMenu.push(menu[j]);
          break;
        }
      }
    }
    return newMenu;


  }



  excludeUrlByAccess(ex_pages, menu) {
    let new_menu = menu;
    for (let k = 0; k < ex_pages.length; k++) {
      for (let m = 0; m < new_menu.length; m++) {
        if (ex_pages[k].url.indexOf(new_menu[m].state) == 0 && ex_pages[k].pages.length > 0) {
          new_menu[m].children = this.excludeUrlByAccess(ex_pages[k].pages, new_menu[m].children);
          if (new_menu[m].children.length <= 0) {
            new_menu.splice(m, 1);
            m--;
          }

        }
        else if (ex_pages[k].url.indexOf(new_menu[m].state) == 0) {
          new_menu.splice(m, 1);
          break;
        }
      }
    }
    return new_menu;
  }


  public getUserRoleList(): Observable<any> {
    return this.http.get("./assets/config/userRoles.json");
  }


}

