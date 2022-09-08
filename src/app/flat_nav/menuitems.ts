//import { Injectable } from '@angular/core';
//import { Menu, ChildrenItems, MainMenuItems } from '../shared/menu-items/menu-items';

// MAIN MENU ITEM CONFIGURATION SETTINGS
export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  //name: string;
  type: string;
  icon?: string;
  description?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  ModuleId: number;
  ModuleName: string;
  MainMenuDisplayName: string;
  ModuleUrl: string;
  IsVisible: boolean;
  ModuleOrder?: number;
  TenantId: number;
}

// CHILD MENU ITEM CONFIG SETTINGS
export interface ChildrenItems {
  state: string;
  target?: boolean;
  type?: string;
  children?: ChildrenItems[];
  subIcon?: string;
  leftIcon?: string;
  TenantId: number;
  IsPowerBI: boolean;
  ParentProduct: any;
  ModuleId: number;
  ParentMenuId: any;
  MenuUrl: string;
  MenuItemName: string;
  MenuItemId: number;
  IsVisible: boolean;
  ModuleName: string;
}

export interface BadgeItem {
  type: string;
  value: string;
}

export interface Menu {
  main: MainMenuItems[];
}

// ---------------------------------------------------------

export const Menus: Menu[] = [
  {
    /* MENU TYPES
    Main = Main Module Name
    Link = Will route (or) open page
    Sub = Has a sub-child and will expand further
    */

    main: [
      {
        ModuleName: "Design System Components",
        ModuleId: 1019,
        MainMenuDisplayName: "Design System  Components",
        ModuleUrl: null,
        IsVisible: true,
        ModuleOrder: 0,
        TenantId: 1,
        state: "dsComponents",
        type: "main",
        icon: null,
        description: 'Design System UI Components',
        children: [
          {
            ModuleName: "Components.V2",
            ModuleId: 1019,
            MenuItemName: "Components.V2",
            MenuUrl: "#",
            IsVisible: true,
            TenantId: 1,
            state: "v2Components",
            type: "link",
            IsPowerBI: true,
            MenuItemId: 2375,
            ParentMenuId: null,
            ParentProduct: null,
            leftIcon: null
          },
          {
            ModuleName: "Components.V1",
            ModuleId: 1019,
            MenuItemName: "Components.V1",
            MenuUrl: "#",
            IsVisible: true,
            TenantId: 1,
            state: "v1Components",
            type: "sub",
            IsPowerBI: true,
            MenuItemId: 2375,
            ParentMenuId: null,
            ParentProduct: null,
            leftIcon: null,
            subIcon: "chevron-down",
            children: [
              {
                ModuleName: "tradecomponents",
                ModuleId: 1019,
                MenuItemName: "Other Components",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "tradecomps",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "rackothercomponents",
                ModuleId: 1019,
                MenuItemName: "Rack - Other Components",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "rackothercomponents",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "filterchips",
                ModuleId: 1019,
                MenuItemName: "Filter Chips",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "filterchips",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "newheader",
                ModuleId: 1019,
                MenuItemName: "New Header",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "newheaderv2",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "scroll-test",
                ModuleId: 1019,
                MenuItemName: "Scrollbar Test",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "scrolltest",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
            ]
          },
          {
            ModuleName: "Map Components",
            ModuleId: 1019,
            MenuItemName: "Map Components",
            MenuUrl: "#",
            IsVisible: true,
            TenantId: 1,
            state: "mapComponents",
            type: "sub",
            IsPowerBI: true,
            MenuItemId: 2375,
            ParentMenuId: null,
            ParentProduct: null,
            leftIcon: null,
            subIcon: "chevron-down",
            children: [
              {
                ModuleName: "porthover",
                ModuleId: 1019,
                MenuItemName: "[NEW] Port Hover",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "porthover",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "vesselinfo",
                ModuleId: 1019,
                MenuItemName: "[NEW] Vessel Info",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "vesselinfo",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "vessel2info",
                ModuleId: 1019,
                MenuItemName: "[NEW] Expanded Vessel Info",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "vessel2info",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "Location Hover Popup",
                ModuleId: 1019,
                MenuItemName: "[NEW] Small Location Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "locationhover",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "Location Popup",
                ModuleId: 1019,
                MenuItemName: "Full Location Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "location2info",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },                      
              {
                ModuleName: "Location Popup",
                ModuleId: 1019,
                MenuItemName: "New - Full Location Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "port2tab",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "[AI] Bunkering Range",
                ModuleId: 1019,
                MenuItemName: "[AI] Bunkering Range",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "ai",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "[AI] Q2 Design",
                ModuleId: 1019,
                MenuItemName: "[AI] Q2 Design",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "ai-q2-design",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },                      
              {
                ModuleName: "smart-trader",
                ModuleId: 1019,
                MenuItemName: "[NEW] Table View",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "smarttrader",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "darkfilterpopup",
                ModuleId: 1019,
                MenuItemName: "[NEW] Dark Filter Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "darkfilter",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "Vessel&locationpopups-newdesign",
                ModuleId: 1019,
                MenuItemName: "Vessel & Location Popups [New Design]",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "Vessel&locationpopups-newdesign",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "map-panel",
                ModuleId: 1019,
                MenuItemName: "[NEW] Bottom Map Panel",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "mappanel",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              }, 
              {
                ModuleName: "Bunker News",
                ModuleId: 1019,
                MenuItemName: "Bunker News",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "news",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },         
              {
                ModuleName: "comments",
                ModuleId: 1019,
                MenuItemName: "Comments Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "comments",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },                              
              {
                ModuleName: "Filter Chips",
                ModuleId: 1019,
                MenuItemName: "Filter Chips",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "filterchips",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "Ship Popup",
                ModuleId: 1019,
                MenuItemName: "[OLD] Ship Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "shippopup",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },          
              {
                ModuleName: "Expanded Ship Popup",
                ModuleId: 1019,
                MenuItemName: "[OLD] Expanded Ship Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "fullshippopup",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "tableview",
                ModuleId: 1019,
                MenuItemName: "[OLD] Table View",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "tableview",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },
              {
                ModuleName: "Filter Popup",
                ModuleId: 1019,
                MenuItemName: "[OLD] Filter Popup",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "filterpopup",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              },                              
              {
                ModuleName: "others",
                ModuleId: 1019,
                MenuItemName: "Other Components",
                MenuUrl: "#",
                IsVisible: true,
                TenantId: 1,
                state: "others",
                type: "link",
                IsPowerBI: true,
                MenuItemId: 2375,
                ParentMenuId: null,
                ParentProduct: null,
                leftIcon: null
              }         
            ]
          },
          // {
          //   ModuleName: "Configurable UI",
          //   ModuleId: 1019,
          //   MenuItemName: "Configurable UI",
          //   MenuUrl: "#",
          //   IsVisible: true,
          //   TenantId: 1,
          //   state: "configUI",
          //   type: "link",
          //   IsPowerBI: true,
          //   MenuItemId: 2375,
          //   ParentMenuId: null,
          //   ParentProduct: null,
          //   leftIcon: null
          // }
          
         ]
      },
      
        {
          ModuleName: "Techoil",
          ModuleId: 1019,
          MainMenuDisplayName: "Techoil",
          ModuleUrl: null,
          IsVisible: true,
          ModuleOrder: 0,
          TenantId: 1,
          state: "techoil",
          type: "main",
          icon: null,
          description: 'Techoil Screens',
          children: [
            {
              ModuleName: "Trade",
              ModuleId: 1019,
              MenuItemName: "Trade List",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "trade",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "tradelist",
                  ModuleId: 1019,
                  MenuItemName: "Trade List",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "tradelist",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "risksimulator",
                  ModuleId: 1019,
                  MenuItemName: "Risk Simulator",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "risksimulator",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
              ]
            },
            {
              ModuleName: "Ops & Inventory",
              ModuleId: 1019,
              MenuItemName: "Ops & Inventory",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "opsinventory",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Inventory Details",
                  ModuleId: 1019,
                  MenuItemName: "Inventory Details",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "inventorydetails",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Pipeline Scheduling",
              ModuleId: 1019,
              MenuItemName: "Pipeline Scheduling",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "pipeline",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Pipeline Scheduling",
                  ModuleId: 1019,
                  MenuItemName: "Pipeline Scheduling",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "pipelinehome",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Rack Scheduling",
              ModuleId: 1019,
              MenuItemName: "Rack Scheduling",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "rackscheduling",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Rack Scheduling",
                  ModuleId: 1019,
                  MenuItemName: "Rack Scheduling",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "rackschedulingscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Rack Marketing",
              ModuleId: 1019,
              MenuItemName: "Rack Marketing",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "rackmarketing",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Rack Marketing",
                  ModuleId: 1019,
                  MenuItemName: "Rack Marketing",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "rackmarketinghome",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Freight Contracts",
              ModuleId: 1019,
              MenuItemName: "Freight Contracts",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "freightcontracts",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Freight Contracts Masters",
                  ModuleId: 1019,
                  MenuItemName: "Freight Contracts Masters",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "freightcontractsmasters",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Transaction List",
              ModuleId: 1019,
              MenuItemName: "Transaction List",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "transactionlist",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Transaction List",
                  ModuleId: 1019,
                  MenuItemName: "Transaction List",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "transactionlistscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Recon",
              ModuleId: 1019,
              MenuItemName: "Recon",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "blrecon",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "BL Recon",
                  ModuleId: 1019,
                  MenuItemName: "BL Recon",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "blreconlistscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "blrecon",
                  ModuleId: 1019,
                  MenuItemName: "BL List",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "bllistscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "blrecon",
                  ModuleId: 1019,
                  MenuItemName: "Reconciliation",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "reconciliationscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "journaldetail",
                  ModuleId: 1019,
                  MenuItemName: "Journal Detail",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "journaldetail",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Derivative Settlement",
              ModuleId: 1019,
              MenuItemName: "Derivative Settlement",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "derivative-settlement",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Swaps",
                  ModuleId: 1019,
                  MenuItemName: "Swaps",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "swaps",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "Futures",
                  ModuleId: 1019,
                  MenuItemName: "Futures",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "futures",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Futures Settlement",
              ModuleId: 1019,
              MenuItemName: "Futures Settlement",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "futures-settlement",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Futures Settlement",
                  ModuleId: 1019,
                  MenuItemName: "Futures Settlement",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "list",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Actualisation",
              ModuleId: 1019,
              MenuItemName: "Actualisation",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "actualisation",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Actualisation",
                  ModuleId: 1019,
                  MenuItemName: "Actualisation",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "actualisationhome",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Credit Actualisation",
              ModuleId: 1019,
              MenuItemName: "Credit Actualisation",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "creditactualisation",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Credit Actualisation",
                  ModuleId: 1019,
                  MenuItemName: "Credit Actualisation",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "creditactualisationscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Movements",
              ModuleId: 1019,
              MenuItemName: "Movements",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "movements",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "movements",
                  ModuleId: 1019,
                  MenuItemName: "Delivery Movements",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "delivery",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "movements",
                  ModuleId: 1019,
                  MenuItemName: "Transfer Movements",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "transfer",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "fuelactualisationscreen",
                  ModuleId: 1019,
                  MenuItemName: "Other Movements",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "other",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
    
                
              ]
            },
            {
              ModuleName: "Closure",
              ModuleId: 1019,
              MenuItemName: "Closure",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "closure",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                /* {
                  ModuleName: "eomscreen",
                  ModuleId: 1019,
                  MenuItemName: "EOM Closure",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "eomscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }, */
                {
                  ModuleName: "eom-list",
                  ModuleId: 1019,
                  MenuItemName: "End of Month List",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "eom-list",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "eom-closure",
                  ModuleId: 1019,
                  MenuItemName: "End of Month Closure",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "eom-closure",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
                
              ]
            },
            {
              ModuleName: "Masters",
              ModuleId: 1019,
              MenuItemName: "Masters",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "masters",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Site Master",
                  ModuleId: 1019,
                  MenuItemName: "Site Master",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "sitemaster",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "Vessel Master",
                  ModuleId: 1019,
                  MenuItemName: "Vessel Master",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "vesselmaster",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
              ]
            },
            {
              ModuleName: "Approval List",
              ModuleId: 1019,
              MenuItemName: "Approval List",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "approvallist",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Approval List",
                  ModuleId: 1019,
                  MenuItemName: "Approval List",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "approvallistscreen",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                }
              ]
            },
          
          ]
        },
        {
          ModuleName: "Smart Trader",
          ModuleId: 1019,
          MainMenuDisplayName: "Smart Trader",
          ModuleUrl: null,
          IsVisible: true,
          ModuleOrder: 0,
          TenantId: 1,
          state: "smarttrader",
          type: "main",
          icon: null,
          description: 'Smart Trader',
          children: [
            {
              ModuleName: "Smart Trader",
              ModuleId: 1019,
              MenuItemName: "Smart Trader",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "planningdashboard",
              type: "sub",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              subIcon: "chevron-down",
              children: [
                {
                  ModuleName: "Map View",
                  ModuleId: 1019,
                  MenuItemName: "Map View",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "olayersmap",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
                {
                  ModuleName: "Map [google-map]",
                  ModuleId: 1019,
                  MenuItemName: "Map [google-map]",
                  MenuUrl: "#",
                  IsVisible: true,
                  TenantId: 1,
                  state: "smarttraderapp",
                  type: "link",
                  IsPowerBI: true,
                  MenuItemId: 2375,
                  ParentMenuId: null,
                  ParentProduct: null,
                  leftIcon: null
                },
              ]
            }
           ]
        },
        {
          ModuleName: "Smart Operator",
          ModuleId: 1019,
          MainMenuDisplayName: "Smart Operator",
          ModuleUrl: null,
          IsVisible: true,
          ModuleOrder: 0,
          TenantId: 1,
          state: "smartoperator",
          type: "main",
          icon: null,
          description: 'Smart Operator',
          children: [
            {
              ModuleName: "Smart Operator",
              ModuleId: 1019,
              MenuItemName: "Smart Operator",
              MenuUrl: "http://demo-smartoperator.inatech.com/",
              IsVisible: true,
              TenantId: 1,
              state: "",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null,
              target: true
            }
          ]
        },
        {
          ModuleName: "Shiptech",
          ModuleId: 1019,
          MainMenuDisplayName: "Shiptech",
          ModuleUrl: null,
          IsVisible: true,
          ModuleOrder: 0,
          TenantId: 1,
          state: "shiptech",
          type: "main",
          icon: null,
          description: 'Shiptech Screens',
          children: [
            {
              ModuleName: "Shiptech Components",
              ModuleId: 1019,
              MenuItemName: "Shiptech Components",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "shiptechcomponents",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Invoice",
              ModuleId: 1019,
              MenuItemName: "Invoice",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "invoice",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Delivery",
              ModuleId: 1019,
              MenuItemName: "Delivery",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "delivery",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Contract",
              ModuleId: 1019,
              MenuItemName: "Contract",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "contract",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Control Tower",
              ModuleId: 1019,
              MenuItemName: "Control Tower",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "controlTower",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Control Tower - New",
              ModuleId: 1019,
              MenuItemName: "Control Tower - New",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "controlTowerNew",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            },
            {
              ModuleName: "Spot Negotiation",
              ModuleId: 1019,
              MenuItemName: "Spot Negotiation",
              MenuUrl: "#",
              IsVisible: true,
              TenantId: 1,
              state: "spotnegotiation",
              type: "link",
              IsPowerBI: true,
              MenuItemId: 2375,
              ParentMenuId: null,
              ParentProduct: null,
              leftIcon: null
            }
          ]
        },
        {
          ModuleName: "Configurable UI",
          ModuleId: 1019,
          MainMenuDisplayName: "Configurable UI",
          ModuleUrl: null,
          IsVisible: true,
          ModuleOrder: 0,
          TenantId: 1,
          state: "config",
          type: "main",
          icon: null,
          description: 'Configurable UI',
          children: [
            {          
            ModuleName: "Configurable UI List",
            ModuleId: 1019,
            MenuItemName: "Configurable UI List",
            MenuUrl: "#",
            IsVisible: true,
            TenantId: 1,
            state: "configUI",
            type: "link",
            IsPowerBI: true,
            MenuItemId: 2375,
            ParentMenuId: null,
            ParentProduct: null,
            leftIcon: null
          },
          {          
            ModuleName: "Figma links",
            ModuleId: 1019,
            MenuItemName: "Figma Links",
            MenuUrl: "#",
            IsVisible: true,
            TenantId: 1,
            state: "figmaLink",
            type: "link",
            IsPowerBI: true,
            MenuItemId: 2375,
            ParentMenuId: null,
            ParentProduct: null,
            leftIcon: null
          },
        ]
      }   
    ]
  }
]
