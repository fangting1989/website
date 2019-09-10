import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore';
@Component({
  selector: 'guokaiservices-tmember-edit',
  templateUrl: './tmember-edit.component.html',
  styleUrls: ['./tmember-edit.component.scss']
})
export class TMemberEditComponent implements OnInit {
  data: any;
  model: any = {}
  modelpic:any = {}
  EnterPriseCode: any;
  submitting:any = false;
  StateArray:any = [{name:"已驳回",value:-1},{name:'填写状态',value:0},{name:'审核中',value:1},{name:'审核通过',value:2}]
  checkArray:any=[{name:'1-3年',value:1,active:1},{name:'3-5年',value:2},{name:'5年以上(含5年)',value:3}]
  sexArray:any = [{name:'男',value:1,active:1},{name:'女',value:2},]

  isVisible:any = false;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
         _.each(self.StateArray,it=>{
           if(it.value+"" == self.model.memtype + ""){
             self.model.memtype_enum = it.name
           }
         })
         //性别
         _.each(self.sexArray,it=>{
          if(it.value+"" == self.model.memAge + ""){
            self.model.memAge_enum = it.name
          }
        })
        //工作年限
        _.each(self.checkArray,it=>{
          if(it.value+"" == self.model.work + ""){
            self.model.work_enum = it.name
          }
        })
         
         self.loadmemberpic();
       }
     })
  }

  loadmemberpic(){
    var self = this;
    var postData = {
      memberid:this.model.keycode
    }
    this.dataServices.tmemberpicList(postData).subscribe(result => {
      if(result){
        if(result.data.length > 0){
          self.modelpic = result.data[0]
          self.modelpic.idcardfront = WebConfig.BaseUrl + WebConfig.dpguokaiservices +  self.modelpic.idcardfront 
          self.modelpic.idcardback = WebConfig.BaseUrl + WebConfig.dpguokaiservices +  self.modelpic.idcardback 
        }
      }
    })
  }

  goMemberPage(){
    this.router.navigate(['/dpguokai/tmemberlist']);
  }


  reload(){
    this.loadData();
  }

  approved(){
    this.isVisible = true;
  }
  handleCancel(){
    var self = this;
    //审核不通过
    var postData ={
      keycode:this.model.keycode,
      memtype:-1,
      remark:this.model.advice
    }
    this.dataServices.tmemberUp(postData).subscribe(result => {
      if(result){
        self.msg.success("操作成功!");
      }
      this.isVisible = false;
    })
  }

  handleOk(){
    //审核通过
    var self = this;
    //审核不通过
    var postData ={
      keycode:this.model.keycode,
      memtype:2,
      remark:this.model.advice
    }
    this.dataServices.tmemberUp(postData).subscribe(result => {
      if(result){
        self.msg.success("操作成功!");
      }
      this.isVisible = false;
      this.loadData();
    })
  }
}
