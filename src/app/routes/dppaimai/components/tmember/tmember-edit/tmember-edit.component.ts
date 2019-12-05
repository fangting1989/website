import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import {TmemberAddmoneyComponent} from './../tmember-addmoney/tmember-addmoney.component';
import {TmemberEditmsgComponent} from './../tmember-editmsg/tmember-editmsg.component';
import {GlobalState} from '../../../../../core/common/global.state';
@Component({
  selector: 'paimai-tmember-edit',
  templateUrl: './tmember-edit.component.html',
  styleUrls: ['./tmember-edit.component.scss']
})
export class TMemberEditComponent implements OnInit {
  data: any;
  model: any = {}
  picmodel:any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router,
    private modalHelper:ModalHelper,
    private GlobalState:GlobalState,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    var self = this;
    this.GlobalState.subscribe("reflashuserdata","64d33e98-69e1-4a9c-b280-c93c7fc0ceb9",function(data){
      if(data.eventname == 'reload'){
        self.loadData();
      }
    })
  }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
         self.loadPicData();
       }
     })
  }


  loadPicData(){
    var postData = {
      memberid:this.model.keycode,
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.tmemberpicList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.picmodel = result.data[0]
        this.picmodel.idcardfront = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + this.picmodel.idcardfront
        this.picmodel.idcardback = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + this.picmodel.idcardback
        this.picmodel.rzt = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + this.picmodel.rzt
      }
    })
    
  }

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tmemberUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.dataServices.tmemberIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }

  goMemberPage(){
    this.router.navigate(['/dppaimai/tmemberlist']);
  }

  reload(){
      this.loadData();
  }

  MoneyDetail(){
    var data = {HeadText:'本金明细',itemdata:this.model }
    const modal = this.modalHelper.create(TmemberAddmoneyComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  goEditMemberMsg(){
    var data = {HeadText:'信息编辑',itemdata:this.model }
    const modal = this.modalHelper.create(TmemberEditmsgComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  ImageItemClick(itempath){
    var imageItem = {
      filepath:itempath
    }
    ComFun.ImageViewer(imageItem,true)
  }

}
