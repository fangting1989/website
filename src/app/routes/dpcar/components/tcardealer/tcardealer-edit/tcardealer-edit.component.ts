import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore';
import {Utils} from './../../../../../shared/utils/utils'
@Component({
  selector: 'dpworksiteservices-tcardealer-edit',
  templateUrl: './tcardealer-edit.component.html',
  styleUrls: ['./tcardealer-edit.component.scss']
})
export class TCardealerEditComponent implements OnInit {
  data: any;
  model: any = {
    isvalid:1,
  }
  chinaCity:any
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);

  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 5;
  TotalCount:any = 0;

  loading:any =false;

  regionDataList:any = []
  bankCheckList:any = []

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.chinaCity = chinaCity;
  }

  ngOnInit() { 
    console.log("1-2-") 
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        this.model.districtcode_show = Utils.formatCityArray(this.model.districtcode)
        this.loadRegionData()
      }
    }
    // if(this.route.snapshot.queryParams["keycode"])
    // this.loadModelData();
    // this.loadRegionData();

  }

  /*loadModelData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tcardealerList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  loadRegionData(){
    if(this.model.keycode)
    var postData = {
      cardealerid:this.route.snapshot.queryParams["keycode"]
    }
    this.dataServices.tregioncardealerList(postData).subscribe(result => {
      if(result){
        this.regionDataList = result.data;
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
      this.dataServices.tcardealerUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tcardealerIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

  oncityChanges(e){
    this.model.districtcode = e[e.length - 1]
  }

  citySelect(e){
    _.each(e.option.children,it=>{
      if(!it.children){
        it.isLeaf = true
      }
    })
  }

  //列表搜索
  SearchClick(e){
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.tregionList(postData).subscribe(result=>{
      if(result){
        this.DataList = result.data
        
      }
    })
  }
}
