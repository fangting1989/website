import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices,dataServices as baseservice } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {Utils} from './../../../../../shared/utils/utils'
import {_} from 'underscore';
@Component({
  selector: 'dpworksiteservices-tbank-edit',
  templateUrl: './tbank-edit.component.html',
  styleUrls: ['./tbank-edit.component.scss']
})
export class TBankEditComponent implements OnInit {
  data: any;
  model: any = {
    isvalid:1,
  }
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  worktypeArray: any = [{name:'影像件',value:'1'},{name:'电子签',value:'2'}];
  checkOptionsOne = [];
  chinaCity:any
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute,
    private baseservice:baseservice,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.chinaCity = chinaCity;
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        this.model.districtcode_show = Utils.formatCityArray(this.model.districtcode)
        this.loadEnums();
      }
    }
  }

  loadEnums(){
    var self =this;
    this.baseservice.loadEnum("dp_xxh_worktype").subscribe(result=>{
      if(result){
        _.each(result.data.enums,it=>{
          self.checkOptionsOne.push({
            label: it.enumname,
            value:it.enumvalue,
            checked: false 
          })
        })

        //初始化枚举
        if(self.model.worktype){
          var checkworktype = self.model.worktype.split(",")
          _.each(self.checkOptionsOne,it=>{
            _.each(checkworktype,iit=>{
              if(it.value == iit){
                it.checked = true
              }
            })
          })
        }

      }
    })
  }



  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tbankList(this.model).subscribe(result => {
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
      this.dataServices.tbankUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tbankIn(this.model).subscribe(result => {
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

  updateSingleChecked(){
    this.model.worktype = "";
    var self = this;
    _.each(this.checkOptionsOne,it=>{
      if(it.checked){
        self.model.worktype += (self.model.worktype  ==''?"":",") + it.value
      }
    })
  }
}
