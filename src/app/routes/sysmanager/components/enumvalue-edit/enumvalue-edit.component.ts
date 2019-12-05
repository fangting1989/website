import { Component, OnInit,ChangeDetectionStrategy,TemplateRef,Input, ViewChild,ChangeDetectorRef } from '@angular/core';
import {GlobalState} from './../../../../core/common';
import { sysmanagerServices } from '../../services';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { Enums } from './../../../../shared/utils/enums';

@Component({
  selector: 'app-enumvalue-edit',
  templateUrl: './enumvalue-edit.component.html',
  styleUrls: ['./enumvalue-edit.component.scss']
})

export class EnumvalueEditComponent implements OnInit {

  data:any;
  TreeData:any= [];
  SelTreeData:any;
  model:any = {}
  stateArray:any = Object.assign([],Enums.stateArray);
  explainData:any = {}
  HeadText:any = ""
  changeHeight: any;
  expandKeys:any = []
  
  constructor(
    private _state: GlobalState,
    private nzDropdownService: NzDropdownService,
    private sysService: sysmanagerServices,
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService:NzModalService,
  ) { }
  
  ngOnInit() {
    var self = this;
    self.changeHeight = window.innerHeight - 170;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 170;
    }
    if(this.data){
      if(this.data.itemdata){
        this.explainData = Object.assign({},this.data.itemdata);
        console.log(this.explainData)
      }
    }else{
      this.msg.error("参数错误");
      return;
    }
    this.LoadTreeData();
  }

  LoadTreeData(){
    this.model = {}
    this.SelTreeData = [{key:"-1",title:"默认类别",isLeaf:true}]
    //加载默认数据
    this.loadChildTreeData(-1,null)
  }

  TreeChild(e){
    if(e.eventName == 'expand'){
      //清空当前节点子节点
      this.loadChildTreeData(e.node.key,e)
    }
  }

  TreeItemClick(event){
    if(event.node){
      this.model = event.node.origin
    }
  }

  loadChildTreeData(pId,event){
    if(event){
      event.node.clearChildren();
    }
    var self = this;
    this.sysService.findEnumbyparent({ keycode:pId,explainid:this.explainData.keycode }).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key =  item.enumid
          item.title = item.enumname + "["+item.enumvalue+"]"
          item.type = "node"
          item.pid = item.pid + ""
          mmmdata.push(item)
        })
        if(!event){
          //初始化数据
          self.TreeData = mmmdata;
          var obdata = Object.assign([],self.SelTreeData)
          _.each(mmmdata,item=>{
            obdata.push(item);
          })
          self.SelTreeData = obdata
        }else{
          event.node.addChildren(mmmdata)
        }
      }
      if(event){
        event.node.isLoading = false
      }
    })
  }

  addClick(){
    this.model = {}
  }

  okClick(){
    var self = this;
    this.model.explainid = this.explainData.keycode
    //保存
    if(this.model.keycode){
      this.sysService.upEnumValue(this.model).subscribe(result => {
        if(result){
          this.msg.success("操作成功!");
          self.LoadTreeData();
        }
      })
    }else{
      this.sysService.inEnumValue(this.model).subscribe(result => {
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
        self.sysService.deEnumValue(postData).subscribe(result => {
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