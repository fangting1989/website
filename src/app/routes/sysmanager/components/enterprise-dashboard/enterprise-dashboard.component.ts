import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { sysmanagerServices } from '../../services';
import { Enums } from './../../../../shared/utils/enums';

@Component({
  selector: 'app-enterprise-dashboard',
  templateUrl: './enterprise-dashboard.component.html',
  styleUrls: ['./enterprise-dashboard.component.scss']
})
export class EnterpriseDashboardComponent implements OnInit {

  data:any;
  enterpriseData:any = {};
  model:any = {}
  stateArray:any = Object.assign([],Enums.stateArray);

  constructor(
    private msg:NzMessageService,
    private modal:NzModalRef,
    private sysService: sysmanagerServices,
    private modalService:NzModalService,
  ) { }

  ngOnInit() {
    if(this.data){
      if(!this.data.HeadText){
        this.data.HeadText = "桌面配置"
      }
      if(this.data.itemdata){
        this.enterpriseData = Object.assign({},this.data.itemdata);
      }
    }
    this.loadData();
  }

  loadData(){
    var self = this; 
    var postData = {
      enterpriseid:this.enterpriseData.keycode,
      systemconfigtype:10
    }
    this.sysService.tsystemconfigList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.model = result.data[0]
      }
    }) 
  }

  saveClick(){
    var self = this;
    this.model.leveltype = 2;
    this.model.enterpriseid = this.enterpriseData.keycode
    this.model.systemconfigtype = 10
    if(this.model.keycode){
      this.sysService.tsystemconfigUp(this.model).subscribe(result => {
        if(result){
          this.model = result.data
          this.msg.success("操作成功!")
          this.closeModal();
        }
      }) 
    }else{ 
      this.sysService.tsystemconfigIn(this.model).subscribe(result => {
        if(result){
          this.model = result.data
          this.msg.success("操作成功!")
          this.closeModal();
        }
      }) 
    }
  }

  cancelClick(){
    this.closeModal();
  }

  closeModal(){
    this.modal.close(true);
    this.modal.destroy();
  }


  deleteClick(){
    if(!this.model.keycode){
      this.msg.error("请先保存数据")
      return;
    }
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:this.model.keycode
        }
        self.sysService.tsystemconfigDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
}
