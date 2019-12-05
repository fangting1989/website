import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore'
import {Utils} from './../../../../../shared/utils/utils'
@Component({
  selector: 'dpworksiteservices-tregion-edit',
  templateUrl: './tregion-edit.component.html',
  styleUrls: ['./tregion-edit.component.scss']
})
export class TRegionEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  bankDataList:any = []
  bankCheckList:any = []
  regionRtDataList:any = []

  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 5;
  TotalCount:any = 0;

  chinaCity:any

  loading:any = false;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.chinaCity = chinaCity;
  }

  ngOnInit() {
    
    this.loadData()
    this.loadBankData();
    this.loadcardealerData();
    if(this.model.keycode ||this.route.snapshot.queryParams["keycode"] ){
      //加载关联关系
      this.loadRelate();
    }
  }

  loadData(){
    if(!this.route.snapshot.queryParams["keycode"]){
      return;
    }
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.EnterPriseCode
    this.dataServices.tregionList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
         this.model.districtcode_show = Utils.formatCityArray(this.model.districtcode)
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
    //获得对应的银行清单
    this.model.rtbank = ""
    _.each(this.bankCheckList,it=>{
      if(it.checked){
        self.model.rtbank += (self.model.rtbank==""?"":",") + it.value
      }
    })
    //获得对应的关联车商
    self.model.rtcardealer = ""
    _.each(this.regionRtDataList,it=>{
      self.model.rtcardealer += (self.model.rtcardealer==""?"":",") + it.keycode
    })

    this.dataServices.tregionSave(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.closeModal();
      }
    })
    
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
   
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


  loadBankData(){
    var self = this;
    var postData = {
      enterpriseid:this.EnterPriseCode,
      pagesize:500,
    }
    this.dataServices.tbankList(postData).subscribe(result=>{
      if(result){
        this.bankDataList = result.data
        self.bankCheckList = []
        _.each(this.bankDataList,it=>{
          var obj = {
            label:it.bankname,
            value:it.keycode,
            checked:false
          }
          self.bankCheckList.push(obj)
        })
        //加载关联关系
        if(this.model.keycode ||this.route.snapshot.queryParams["keycode"] ){
          this.loadRelateBank()
        }
      }
    })
  }
  updateSingleChecked(){
  }



  //加载关联的车商
  SearchClick(e){
    this.loadcardealerData();
  }

  loadcardealerData(){
    var postData = {
      enterpriseid:this.EnterPriseCode,
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText
    }
    this.dataServices.tcardealerList(postData).subscribe(result=>{
      if(result){
        this.DataList = result.data
        this.TotalCount = result.recordcount
      }
    })

  }

  loadRelate(){
    var postData = {
      keycode:this.model.keycode ||this.route.snapshot.queryParams["keycode"] ,
      enterpriseid:this.EnterPriseCode,
      pagesize:5000,
    }
    this.dataServices.findrtcardealer(postData).subscribe(result=>{
      if(result){
        this.regionRtDataList = result.data;
      }
    })
  }

  loadRelateBank(){
    var postData = {
      keycode:this.model.keycode ||this.route.snapshot.queryParams["keycode"] ,
      enterpriseid:this.EnterPriseCode,
      pagesize:5000,
    }
    this.dataServices.findrtbank(postData).subscribe(result=>{
      if(result){
        _.each(this.bankCheckList,it=>{
          _.each(result.data,iit=>{
            if(it.value == iit.keycode){
              it.checked = true;
            }
          })
        })
      }
    }) 
  }

  relatecardealerItem(item){
    //关联对应的内容
    var index = _.findIndex(this.regionRtDataList,it=>{return it.keycode == item.keycode})
    if(index > -1){
      return;
    }
    this.regionRtDataList.push(item);
  }

  afterTagClose(item){
    var self = this;
    var index = _.findIndex(this.regionRtDataList,it=>{return it.keycode == item.keycode})
    if(index > -1){
      self.regionRtDataList.splice(index, 1);
      self.regionRtDataList = self.regionRtDataList.slice();
    }
    
  }
}
