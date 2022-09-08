import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/services/local-service.service';
@Component({
  selector: 'app-spot-negotiation-new-comments',
  templateUrl: './spot-negotiation-new-comments.component.html',
  styleUrls: ['./spot-negotiation-new-comments.component.css']
})
export class SpotNegotiationNewCommentsComponent implements OnInit {

  @ViewChildren('cmttext') commentsTextarea: QueryList<ElementRef>
  @Input() commentsObj:any;
  @Input() requestOptions:any;
  showEditIcon: boolean = false;
  companyMaersk: boolean = false;

  constructor(private toaster: ToastrService, private localService:LocalService) { }

  ngOnInit(): void {
    let companyCode = this.localService.getcompayCode();
    if(companyCode=="maersk")
    this.companyMaersk = true;
    else
    this.companyMaersk = false;
  }

  editComments(s_item,edit_index,evt){
    evt.stopPropagation();
    let txtArea = this.commentsTextarea.find(f => f.nativeElement.id == s_item.id);
    txtArea.nativeElement.focus();
    s_item.currentEdit = true;
    this.resetIt(edit_index,true,false);
  }

  selectComments(selected_item,item_index,evt){
    evt.stopPropagation();
    if(selected_item.comments!=''){
      selected_item.selected = !selected_item.selected;
      this.resetIt(-1,true,false);
    }
    
  }

  resetIt(skip_index,isEdit,isSelection){
    this.commentsObj.forEach((item,index)=>{
      if(skip_index!=index){
        if(isEdit)
          item.currentEdit = false;
        if(isSelection) 
          item.selected = false;
      }       
    }) 
  }

  saveComment(item,evt){
    evt.stopPropagation();
    item.currentEdit = false;
  }

  displaySuccessMsg(){
    this.toaster.show('<div class="message cust-msg">Successfully Duplicated to:</div><div class="requests"><span class="circle internal"></span><span class="label">Req 12322 - Afif</span><span class="circle external"></span><span class="label">Req 12323 - Al Mashrab</span></div>',
    '' , {
             enableHtml: true,
             toastClass: "toast-alert cust-alert toast-darkGrey",
             timeOut: 2000
         });
  }

}
