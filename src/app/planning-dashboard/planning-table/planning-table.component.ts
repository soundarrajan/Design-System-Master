import { Component, OnInit, ComponentRef, ComponentFactoryResolver, ApplicationRef, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { CommentPopupComponent } from '../comment-popup/comment-popup.component';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss']
})
export class PlanningTableComponent implements OnInit {
  vesHoverCompRef: ComponentRef<CommentPopupComponent>;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef; 
  ref: any;
  constructor(private resolver: ComponentFactoryResolver,private appRef: ApplicationRef,public vcRef: ViewContainerRef,
    private renderer: Renderer2) { }

  ngOnInit() {
  }
  
  hoverIcon(event){
    //event.stopPropagation();
    var emptyDiv = event.target.parentNode.nextElementSibling;
    let div = document.getElementById('divCommenthover');
    //div.appendChild(this.viewContainerRef);
    const factory = this.resolver.resolveComponentFactory(CommentPopupComponent);
    //div.appendChild(this.ref);
    this.ref = this.viewContainerRef.createComponent(factory);
    console.log(this.ref);
    console.log(this.vesHoverCompRef);
    console.log(emptyDiv);
    emptyDiv.appendChild(this.ref.location.nativeElement);
    //this.renderer.appendChild(emptyDiv, this.vesHoverCompRef);
    //emptyDiv.innerHTML = this.viewContainerRef.createComponent(factory);
    //div.appendChild(this.ref);
  //   this.renderer.appendChild(
  //     this.vcRef.element.nativeElement,
  //     this.ref.injector.get(CommentPopupComponent).elRef.nativeElement
  //  );
    //emptyDiv.appendChild(this.vesHoverCompRef);
    this.ref.changeDetectorRef.detectChanges();
    
    
    //if (this.vesHoverCompRef) this.vesHoverCompRef.destroy();

    //var currentVessel = this.vesselList.find(x => x.VesselIMONO == vesselId);

    //this.planningDashboardService.getVesselCommments(currentVessel.VesselIMONO).subscribe((comments) => {

      // if (comments == undefined || comments.length <= 0) {
      //   currentVessel.Comments = [];
      // }
      // else {
      //   comments = comments.sort((n1, n2) => {
      //     return this.planningDashboardService.naturalCompare(n2.CommentDate, n1.CommentDate);
      //   });
      //   currentVessel.Comments = comments;
      //   currentVessel.LastAction = new Date(comments[0].CommentDate);
      //   currentVessel.CommentsCount = comments.length;
      // }


      // currentVessel.CommentsCount = comments.length;

      // this.pagedVesselList.find(vessel => vessel.VesselIMONO == currentVessel.VesselIMONO).CommentsCount = comments.length;

      // const compFactory = this.resolver.resolveComponentFactory(CommentPopupComponent);
      // // this.vesHoverCompRef = compFactory.create(this.injector);
      // // var sortedCommentsByDate = currentVessel.Comments;
      // // this.vesHoverCompRef.instance.vesselCommentsLength = currentVessel.Comments.length;
      // // this.vesHoverCompRef.instance.vesselComments = sortedCommentsByDate.slice(0, 3);
      // //console.log(CommentPopupComponent);
      // if (div.hasChildNodes && div.childNodes.length > 0)
      //   div.removeChild(div.childNodes[0]);
      //   console.log(this.vesHoverCompRef);

      // div.appendChild(this.vesHoverCompRef.location.nativeElement);
      // this.appRef.attachView(this.vesHoverCompRef.hostView);
      // div.style.display = "block";
      // //position the element under current mouse-click
      // // var viewportX = event.clientX;
      // // var viewportY = event.clientY; 
      // //event.screenY, event.clientY - gives the viewport position co-ordinates
      // //event.pageX, pageY - gives the absolute mouse co-ordinate
      // //var divCommenthover = event.target.getBoundingClientRect();


      // div.style.right = "120px";
      // //div.style.top = (viewportY + parseInt(this.objAppsettings.commentsPadding)) + "px";



      // this.vesHoverCompRef.changeDetectorRef.detectChanges();

      // this.vesHoverCompRef.onDestroy(() => {
      //   this.appRef.detachView(this.vesHoverCompRef.hostView);
      // });

    //});
  }

  hoverOutIcon(event){
    this.ref.destroy();
  }

}
