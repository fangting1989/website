import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { sysmanagerServices } from '../../services';
import { Enums } from './../../../../shared/utils/enums';

@Component({
  selector: 'app-enterprise-passport',
  templateUrl: './enterprise-passport.component.html',
  styleUrls: ['./enterprise-passport.component.scss']
})
export class EnterprisePassportComponent implements OnInit {

  data:any;
  enterpriseData:any = {};
  model:any = {}
  stateArray:any = Object.assign([],Enums.stateArray);

  constructor(
    private msg:NzMessageService,
    private modal:NzModalRef,
    private sysService: sysmanagerServices,
  ) { }

  ngOnInit() {
    if(this.data){
      if(!this.data.HeadText){
        this.data.HeadText = "账号编辑"
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
      leveltype:2
    }
    this.sysService.findUser(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.model = result.data[0]
        console.log(this.model)
      }
    }) 
  }

  saveClick(){
    var self = this;
    this.model.leveltype = 2;
    this.model.enterpriseid = this.enterpriseData.keycode
    this.model.usertypeid = 0
    this.model.adminusertel = this.model.loginname
    this.model.adminusernickname = this.enterpriseData.enterprisename
    if(this.model.keycode){
      this.sysService.upUser(this.model).subscribe(result => {
        if(result){
          this.model = result.data
          this.msg.success("操作成功!")
          this.closeModal();
        }
      }) 
    }else{ 
      this.sysService.inUser(this.model).subscribe(result => {
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
}
