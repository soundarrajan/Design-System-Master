import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pandl",
  templateUrl: "./pandl.component.html",
  styleUrls: ["./pandl.component.scss"]
})
export class PandlComponent implements OnInit {
  ngOnInit() {}
  public expanded: boolean;
  public isdisplaydensityhigh: boolean = false;
  public change_rowdensity() {
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
  }

  

  myTreeData = [
    {
      ////Main Parent row 1
      rowData: [
        {
          cname: "Physical Sales",
          value: "",
          total: "124,000 USD",
          mainparent: true,
          expanded: true,
          
        },        
      ],
      //1st row Child Data
      childData: [
               //1st row 1st child  
          {
          rowData: [
            {
              cname: "Sales",
              value: "112,000 USD",
              total: "",
              mainparent: false,
              expanded: true,
              
            },
           
            
          ],
          //subchild
          childData: []
        },
        //1st row 2nd child
        {
          rowData: [
            {
              cname: "Sales Accruals",
              value: "12,000 USD",
              total: "",
              mainparent: false,
              expanded: true,             
            },       
          ],
          childData: []
        },
        //1st row 3rd child
        {
          rowData: [
            {
              cname: "Physical Sales Total",
              value: "",
              total: "124,000 USD",
              mainparent: false,
              expanded: true,
             
            },
            
           
          ],
          childData: []
        },
      ]
    },
    //mainparent row 2
    {
      ////Main Parent row 1
      rowData: [
        {
          cname: "Physical Purchase",
          value: "",
          total: "(24,000 USD)",
          mainparent: true,
          expanded: true,       
        },        
      ],
      //1st row Child data1
      childData: [
                 
          {
          rowData: [
            {
              cname: "Purchases",
              value: "(12,000 USD)",
              total: "",
              mainparent: false,
              expanded: true,           
            },
            {
              cname: "Purchase Accruals",
              value: "(12,000 USD)",
              total: "",
              mainparent: false,
              expanded: true,            
            },
            {
              cname: " Physical Purchase Total",
              value: "",
              total: "(24,000 USD)",
              mainparent: false,
              expanded: true,           
            }
           
            
          ],
          childData: []
        },
 
      ]
    },
    //mainparent row3
    {
      ////Main Parent row 1
      rowData: [
        {
          cname: "Direct Cost",
          value: "",
          total: "124,000 USD",
          mainparent: true,
          expanded: true,
          
        },        
      ],
      //1st row Child Data
      childData: [
                 
          {
          rowData: [
            {
              cname: "Cost Of Goods Sold",
              value: "112,000 USD",
              total: "",
              mainparent: false,
              expanded: true,
              
            },
           
            
          ],
          childData: []
        },
        {
          rowData: [
            {
              cname: "Direct Cost",
              value: "(12,000 USD)",
              total: "",
              mainparent: false,
              expanded: true,
             
            },
            
           
          ],
          childData: []
        },
        {
          rowData: [
            {
              cname: "Cost Accruals",
              value: "(12,000 USD)",
              total: "",
              mainparent: false,
              expanded: true,
             
            },
            
           
          ],
          childData: []
        },
        {
          rowData: [
            {
              cname: "Physical Purchase Total",
              value: "",
              total: "124,000 USD",
              mainparent: false,
              expanded: true,
             
            },
            
           
          ],
          childData: []
        },
      ]
    },
    //Main Parent row 4
    {
      rowData: [
        {
          cname: "Inventory MTM",
          value: "",
          total: "84,000 USD",
          mainparent: true,
          expanded: true,        
        },
      ],
      childData: [
        {
          rowData: [
            {
              cname: "Inventory MTM Child",
              value: "",
              total: "",
              mainparent: false,
              expanded: true,            
            },          
          ],
          childData: []
        }
      ]
    },
    //Main Parent row 5
    {
      rowData: [
        {
          cname: "Derivative Realised",
          value: "",
          total: "(76,000 USD)",
          mainparent: true,
          expanded: true,       
        },
        
       
      ],
      childData: [
        {
          rowData: [
            {
              cname: "Derivative Realised Child",
              value: "",
              total: "",
              mainparent: false,
              expanded: true,            
            },          
          ],
          childData: []
        }
      ]
    },
    //Main Parent row 6
    {
      rowData: [
        {
          cname: "Derivative MTM",
          value: "",
          total: "132,000 USD",
          mainparent: true,
          expanded: true,        
        }     
      ],
      childData: [
        {
          rowData: [
            {
              cname: "Derivative MTM Child",
              value: "",
              total: "",
              mainparent: false,
              expanded: true,            
            },          
          ],
          childData: []
        }
      ]
    }
  ];

  
  toggle() {
    this.expanded = !this.expanded;
  }
}
