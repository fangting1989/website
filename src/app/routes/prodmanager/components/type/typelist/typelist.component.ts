import { Component, OnInit,ChangeDetectionStrategy,TemplateRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { prodServices } from '../../../services';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NzDropdownService,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices} from '../../../../../shared/services';

@Component({
  selector: 'app-typelist',
  templateUrl: './typelist.component.html',
  styleUrls: ['./typelist.component.scss']
})
export class TypelistComponent implements OnInit {

  changeHeight: number;
  TreeData:any= [];
  typeItemBox: number = 1;
  okType: string;
  SelTypeTreeData:any;
  submitting:any = false;
  SelTreeData:any;
  expandKeys:any = []
  model:any = {}
  EnterPriseCode:any;
  stateArray:any = Object.assign([],Enums.stateArray);
  
  constructor(
    private _state: GlobalState,
    private nzDropdownService: NzDropdownService,
    private prodServices: prodServices,
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private comservices:comservices
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "类别管理", routerLink: "./sysmanager/enumeration" });
    this.changeHeight = window.innerHeight - 110;

    this.EnterPriseCode = comservices.getEnterPrise
  }
  
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 110;
    }
    //下拉框默认值
    this.LoadTreeData();
  }

  LoadTreeData(){
    this.model = {}
    this.SelTreeData = []
    //初始化选择
    this.SelTypeTreeData = [{key:"-1",title:"默认类别",isLeaf:true}]
    //加载默认数据
    this.loadChildTreeData(-1,null)
  }

  TreeChild(e){
    if(e.eventName == 'expand'){
      if(e.node.origin.type == "node"){
        e.node.isLoading = false
        return
      }
      //清空当前节点子节点
      this.loadChildTreeData(e.node.key,e)
    }
  }

  loadChildTreeData(pId,event){
    if(event){
      event.node.clearChildren();
    }
    var self = this;
    var postData = {
      keycode:pId,
      enterpriseid: self.EnterPriseCode
    }
    this.prodServices.objecttype_findbyparent(postData).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key =  item.objectTypeID
          item.title = item.typeName
          item.type = "nodetype"
          mmmdata.push(item)
        })
        if(!event){
          //初始化数据
          self.TreeData = mmmdata;
          self.SelTreeData = mmmdata;
          var obdata = Object.assign([],self.SelTypeTreeData)
          _.each(mmmdata,item=>{
            obdata.push(item);
          })
          self.SelTypeTreeData = obdata
        }else{
          event.node.addChildren(mmmdata)
        }
      }
    })
  }

  addClick(){
    this.model = {}
  }

  TreeItemClick(event){
    if(event.node){
      if(event.node.origin.type == "nodetype"){
        this.typeItemBox = 1;
      }else{
        this.typeItemBox = 2;
      }
      this.model = event.node.origin
    }
  }
  okClick(){
    if(this.submitting){
      return
    }
    this.submitting = true
    var self = this;
      this.model.enterpriseid = this.EnterPriseCode
      //类别保存
      if(this.model.keycode){
        this.prodServices.objecttypeUp(this.model).subscribe(result => {
          this.submitting = false
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }else{
        this.prodServices.objecttypeIn(this.model).subscribe(result => {
          this.submitting = false
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }
  }

  deleteClick(){
    this.model
    var self = this;
    if(this.typeItemBox == 1){
      //类别删除
      var self = this;
      this.modalService.confirm({
        nzTitle     : '提示',
        nzContent   : '<b style="color: red;">是否确认删除对象</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          var postData = {
            keycode:self.model.keycode
          }
          self.prodServices.objecttypeDel(postData).subscribe(result => {
            if (result != null) {
              self.msg.success("删除成功!");
              self.LoadTreeData();
            }
          })
        },
        nzCancelText: '取消',
        nzOnCancel  : () => {
        
        }
      });
    }
  }
}
