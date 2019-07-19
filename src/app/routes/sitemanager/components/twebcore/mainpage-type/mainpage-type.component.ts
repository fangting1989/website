import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import {_} from 'underscore';
import {ArrayService } from '@delon/util';
@Component({
  selector: 'app-mainpage-type',
  templateUrl: './mainpage-type.component.html',
  styleUrls: ['./mainpage-type.component.scss']
})
export class MainpageTypeComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  nodes:any = [];

  ProductList:any = []
  expandKeys:any = []

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private sanitizer:DomSanitizer,
    private ArrayService:ArrayService,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    //
    this.loadProductType();
    
  }

  InitData(){
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        if(this.model.pid){
          this.expandKeys.push(this.model.pid)
        }
      }
    }
  }

  //加载商品
  loadProductType(){
    var self = this;
    
    var postData = {
      pagesize:5000,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
    }
    this.dataServices.tobjecttypeList(postData).subscribe(result => {
      if(result){
        this.ProductList = result.data;
        _.each(self.ProductList,it=>{
        //   it.id = it.objectTypeID
        //   it.parent_id = it.pid
          it.title = it.typeName
          it.key = it.objectTypeID
        })
        self.ArrayService.arrToTreeNode(this.ProductList,{
          idMapName:"objectTypeID",
          parentIdMapName:"pid",
        })
        this.ProductList = _.filter(this.ProductList,it=>{
          return it.pid == "-1"
        })
        self.InitData();
      }
    })
  }

  onChange(e){
    console.log(e)
  }
  saveClick() {
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.webcoretype = 40
    if (this.model.keycode) {
      this.dataServices.twebcoreUp(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data;
          this.msg.success("操作成功!")
          this.closeModal();
        }
      })
    } else {
      this.dataServices.twebcoreIn(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data;
          this.msg.success("操作成功!")
          this.closeModal();
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
}
