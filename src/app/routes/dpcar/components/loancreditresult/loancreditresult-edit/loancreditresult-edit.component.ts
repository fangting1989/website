import { Component, OnInit,ElementRef } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import {WorkflowBaseComponent} from './../../../../../shared/components';
@Component({
  selector: 'app-loancreditresult-edit',
  templateUrl: './loancreditresult-edit.component.html',
  styleUrls: ['./loancreditresult-edit.component.scss']
})
export class LoanCreditResultEditComponent extends WorkflowBaseComponent implements OnInit {
  data: any = {};
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    public elementRef:ElementRef,
  ) {
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.setComponentName("生命组件")
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
      }
    }
    this.model.selected = false;
    this.loadData();
  }
  loadData(){
    console.log(this.task)
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.loancreditresultUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.loancreditresultIn(this.model).subscribe(result => {
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

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    history.go(-1)
  }

  CheckComponentState(){
     return {code:99,msg:'检测通过..'}
  }
}
