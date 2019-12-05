import { Component, OnInit,ChangeDetectionStrategy,TemplateRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import {GlobalState} from './../../../../core/common';
import { dataServices } from '../../services';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NzDropdownService,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { Enums } from './../../../../shared/utils/enums';


@Component({
  selector: 'app-comp-defined',
  templateUrl: './comp-defined.component.html',
  styleUrls: ['./comp-defined.component.scss']
})
export class CompDefinedComponent implements OnInit {

  changeHeight: number;
  TreeData:any= [];
  typeItemBox: number = 1;
  okType: string;
  SelTypeTreeData:any;
  SelTreeData:any;
  model:any = {}
  stateArray:any = Object.assign([],Enums.stateArray);
  expandKeys:any = []
  constructor(
    private _state: GlobalState,
    private nzDropdownService: NzDropdownService,
    private dataServices: dataServices,
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "枚举管理", routerLink: "./sysmanager/enumeration" });
    this.changeHeight = window.innerHeight - 110;
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
    this.model = {
      isvalid:1
    }
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
    this.dataServices.Componenttype_childlist({ parentid:pId }).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key =  item.componenttypeid
          item.title = item.componenttypename
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
    
    if(pId == -1 || !event){
      return;
    }
    this.dataServices.Component_findbytype({ keycode:pId }).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key = item.componentid
          item.title = item.componentname,
          item.type = "node"
          item.isLeaf = true
          mmmdata.push(item)
        })
        event.node.isLoading = false
        event.node.addChildren(mmmdata)
      }
    })
  }

  addClick(index){
    this.model = {isvalid:1}
    this.typeItemBox = index
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
    var self = this;
    if(this.typeItemBox == 1){
      //类别保存
      if(this.model.keycode){
        this.dataServices.tcomponenttypeUp(this.model).subscribe(result => {
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }else{
        this.dataServices.tcomponenttypeIn(this.model).subscribe(result => {
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }
    }else if(this.typeItemBox == 2){
      //保存
      if(this.model.keycode){
        var postData = Object.assign({},this.model)
        delete postData.type
        this.dataServices.tcomponentUp(postData).subscribe(result => {
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }else{
        this.dataServices.tcomponentIn(this.model).subscribe(result => {
          if(result){
            this.msg.success("操作成功!");
            self.LoadTreeData();
          }
        })
      }
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
          self.dataServices.tcomponenttypeDel(postData).subscribe(result => {
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
    }else if(this.typeItemBox == 2){
      //删除
      this.modalService.confirm({
        nzTitle     : '提示',
        nzContent   : '<b style="color: red;">是否确认删除对象</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          var postData = {
            keycode:self.model.keycode
          }
          self.dataServices.tcomponentDel(postData).subscribe(result => {
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