import { Component, OnInit,ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {WorkflowBaseComponent} from './../../../../../shared/components';
@Component({
  selector: 'dpworksiteservices-tcustomer-edit',
  templateUrl: './tcustomer-edit.component.html',
  styleUrls: ['./tcustomer-edit.component.scss']
})
export class TCustomerEditComponent extends WorkflowBaseComponent implements OnInit{
  data: any = {};
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    public elementRef:ElementRef,
  ) {
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  } 

  ngOnInit() {
    // this.setComponentName("生命组件")
    this.loadData();
  }

  loadData(){
    var self = this;
    this.model = {}
    this.model.proinst = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tcustomerList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tcustomerUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tcustomerIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    }
  }

  SaveComponent(){
    console.log("zheshiwojdadkashdkasd");
  }

  CheckComponentState(){
    return {code:99,msg:'检测通过..'}
 }


  cancelClick() {
    this.closeModal();
  }

  closeModal() {
 
  }
}
