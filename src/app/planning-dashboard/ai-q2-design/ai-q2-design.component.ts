import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ai-q2-design',
  templateUrl: './ai-q2-design.component.html',
  styleUrls: ['./ai-q2-design.component.scss']
})
export class AiQ2DesignComponent implements OnInit {

  public selectedFillterTag="";
  public active: boolean = false;
  public tagfillterData=[
    {
      name:'VLSFO',
      count:'05',
      color:'#AEB3BC'
    },
    {
      name:'HSFO',
      count:'05',
      color:'#AEB3BC'
    },
    {
      name:'ULSFO',
      count:'05',
      color:'#AEB3BC'
    },
    {
      name:'DOGO',
      count:'05',
      color:'#AEB3BC'
    }
    
  ];

  constructor(private elem: ElementRef,private renderer: Renderer2) { }

  ngOnInit() {
    //(<HTMLElement>document.querySelector('.status-badge')).style.opacity = '1';
    // (<HTMLElement>document.getElementsByClassName('status-badge')[0]).style.opacity = '1';
    // (<HTMLElement>document.getElementsByClassName('status-badge')[1]).style.opacity = '0.4';
    // (<HTMLElement>document.getElementsByClassName('status-badge')[2]).style.opacity = '0.4';
    //var elements = this.elem.nativeElement.querySelectorAll('.price-btn');
    //console.log(elements);
  }

  ngAfterViewInit(){
    var elements = this.elem.nativeElement.querySelectorAll('.status-badge');
    //elements[0].classList.add('active');
    //elements[1].style.opacity = '0.4';
    //elements[2].style.opacity = '0.4';
    //console.log(elements);
  }

  filterChipClick(item){
    
    if(item !=null)
     this.selectedFillterTag = this.selectedFillterTag!=item.name?item.name:'';
    else
      this.selectedFillterTag ='';
   
  }

  fuelChipClick(event:any){
    //this.active = !this.active;
    //var pricechip = document.querySelector('.price-btn');
    //pricechip.classList.add('select');

    let elements = this.elem.nativeElement.querySelectorAll('.price-btn');
    //console.log(elements);
    elements.forEach( (element) => {
      element.classList.remove('active');
    });

    //console.log(event);
    //event.preventDefault();
    event.target.parentElement.classList.add('active'); // To ADD
    //this.renderer.setElementClass(event.target,"actives",true);
   
  }

}
