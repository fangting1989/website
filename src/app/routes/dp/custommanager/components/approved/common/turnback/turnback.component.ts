import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment'
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';

@Component({
  selector: 'app-turnback',
  templateUrl: './turnback.component.html',
  styleUrls: ['./turnback.component.scss']
})
export class TurnbackComponent implements OnInit {
  data:any;
  model: any = {
    backcode:1005
  }
  dataItem:any={}
  EnterPriseCode:any;
  backcode:any;
  BackArray:any = [{name:'修改政策',value:1005},{name:'补充材料',value:1025}]
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "驳回信息"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }
    this.backcode = 1005
  }


  ProinstBack(){
    //请求保存数据
    // console.log(this.backcode) 
    // this.model.backcode = this.backcode
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.model.currcode = this.dataItem.isvalid
    this.model.dealPerson = this.comservices.getUserName
    this.model.dealCode = this.comservices.getUserCode
    this.model.pactinsttime = moment(this.dataItem.actinstdate).format('YYYY-MM-DD HH:mm:ss')
    this.model.partnerkeycode = this.dataItem.keycode
    var proinstName = ''
    _.each(this.BackArray,item=>{
      if(item.value == this.model.backcode){
        proinstName = item.name
      }
    })
    
    console.log(this.model)
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定提交到['+proinstName+']环节?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        self.dataServices.turnback(this.model).subscribe(result => {
          if (result != null) {
           self.msg.success("驳回成功!");
           self.closeModal(true);
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
    

  }

  ChangeData(e){
    console.log(e)
  }
  cancelClick() {
    this.closeModal(false);
  }

  closeModal(type) {
    this.modal.close(type);
    this.modal.destroy();
  }

}
